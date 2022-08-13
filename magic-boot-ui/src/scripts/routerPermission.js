import request from '@/scripts/request'
import common from '@/scripts/common'
import { sha256 } from 'js-sha256'

const viewModules = import.meta.glob("../views/**/**.vue")
const layoutModules = import.meta.glob("../layout/**.vue")

export const filterAsyncRouter = (routers, level) => {
  level = level || 0
  const accessedRouters = routers.filter(router => {
    if (router.isShow === 1) {
      var setIframe = () => {
        router.component = loadView(`/common/iframe`)
        router.props = { url: router.url }
        router.path = "/" + sha256(router.url)
      }
      if(router.url && router.url.startsWith('http')){
        if(router.openMode == '0'){
          setIframe()
        }
      } else if(router.url && router.url.startsWith('/') && router.url.indexOf('.htm') != -1) {
        if(router.openMode == '0'){
          setIframe()
        }else{
          router.path = location.href.substring(0, location.href.indexOf('/', location.href.indexOf('/', location.href.indexOf('/') + 1) + 1)) + router.path
        }
      } else if (router.componentName) {
        router.component = loadView(`/common/show-component`)
        router.props = { name: router.componentName }
      } else if (router.component) {
        const component = router.component
        if (component === 'Layout') {
          router.path = "/" + common.uuid()
          router.component = level > 0 ? layoutModules[`../layout/none.vue`] : loadLayoutView(component)
        } else {
          router.path = router.path.startsWith('/') ? router.path : '/' + router.path
          router.component = loadView(component) || layoutModules[`../layout/empty.vue`]
        }
      }
      if (router.children && router.children.length) {
        router.children = filterAsyncRouter(router.children, level + 1)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

export const loadLayoutView = () => {
  return layoutModules[`../layout/layout.vue`]
}

export const loadView = (view) => {
  view = view.substring(0, 1) === '/' ? view : '/' + view
  return viewModules[`../views${view}.vue`]
}

function loadComponent(router){
  var result = {
    path: router.path,
    meta: {
      title: router.name,
      keepAlive: router.keepAlive
    }
  }
  if(router.componentName){
    result.component = loadView(`/common/show-component`)
    result.props = { name: router.componentName }
  }else if(router.path){
    result.component = loadView(router.path) || layoutModules[`../layout/empty.vue`]
  }
  return result
}

export function loadHiddenRouter(routers){
  return routers.filter(router => {
    router.path = router.path.startsWith('/') ? router.path : '/' + router.path
    router.redirect = router.path
    router.component = loadLayoutView()
    router.hidden = true
    router.children = [loadComponent(router)]
    return true
  })
}

export function generateRoutes(){
  return new Promise((resolve, reject) => {
    request({
      url: '/system/menu/current/menus',
      method: 'post'
    }).then(response => {
      const { data } = response
      const asyncRouter = filterAsyncRouter(data)
      resolve(asyncRouter)
    })
  })
}

export function generateHiddenRoutes(){
  return new Promise((resolve, reject) => {
    request({
      url: '/system/menu/current/hidden/menus',
      method: 'post'
    }).then(response => {
      const { data } = response
      const asyncRouter = loadHiddenRouter(data)
      resolve(asyncRouter)
    })
  })
}
