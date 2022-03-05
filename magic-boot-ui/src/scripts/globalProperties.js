import * as PlusIcons from '@element-plus/icons-vue'
import VueUeditorWrap from 'vue-ueditor-wrap'
import request from './request'
import global from './global'
import common from './common'
import treeTable from './treeTable'

const install = (app) => {
  app.config.globalProperties.$request = request
  app.config.globalProperties.$post = (url, data) => request.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [data => Object.keys(data).map(it => encodeURIComponent(it) + '=' + encodeURIComponent(data[it] === null || data[it] === undefined ? '' : data[it])).join('&')]
  })
  app.config.globalProperties.$postJson = (url, data) => request.post(url, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  app.config.globalProperties.$get = (url, data) => request({ url, params: data })
  app.config.globalProperties.$global = global
  app.config.globalProperties.$common = common
  app.config.globalProperties.$treeTable = treeTable
  for(var key in PlusIcons) {
    app.component(`El${key}`, PlusIcons[key])
  }
  app.use(VueUeditorWrap)
}
export default install
