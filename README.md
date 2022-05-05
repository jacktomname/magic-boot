##

<p align="center">
    <img src="https://gitee.com/ssssssss-team/magic-boot/raw/master/images/magic-boot.png" />
</p>

## 简介

基于[ **magic-api** ](https://gitee.com/ssssssss-team/magic-api)搭建的快速开发平台，前端采用Vue3 + Element Plus最新版本搭建，依赖较少，运行速度快。对常用组件进行封装。利用Vue3的`@vue/compiler-sfc`单文件编译，动态编译组件，可以实现在浏览器编写Vue代码，既改即生效快速开发，利用magic-api本身特性安全隔离生产和开发环境。将Vue代码以插件化的方式交给`magic-api`管理。

| 代码 | 效果 |
|----|----|
| ![](images/code.png)  | ![](images/view.png)  |


## 功能
- 菜单管理：树结构，配置菜单、权限按钮、选择关联组件等，支持全局模糊搜索
- 组织机构：树结构，配置组织机构，类型：部门、公司（选择项存在数据字典），支持全局模糊搜索
- 角色管理：角色菜单权限分配、设置数据范围等。
- 用户管理：用户添加、导入用户（支持导入前预览数据）、登录状态更改等
- 数据字典：分为`系统类`和`业务类`两类数据维护
- 代码生成：生成`magic-api`接口代码和前端代码，自动保存到`magic-api`的“接口”和“组件”栏中
- 操作日志：接口调用操作日志查询
- 登录日志：系统登录日志查询，包含登录失败日志
- 数据库监控：Druid Monitor SQL监控、数据源信息查看等
- 在线用户：当前活跃在系统内的用户，可以选择踢人下线

## 在线体验
- 演示地址：
- 文档地址：
- admin/123456

## 系统截图
| ![](images/1.png)  | ![](images/2.png)  |
|---|---|
| ![](images/3.png)  | ![](images/4.png)  |
| ![](images/5.png)  | ![](images/6.png)  |
| ![](images/7.png)  | ![](images/8.png)  |


