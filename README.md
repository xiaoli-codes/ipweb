# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### 一、项目结构

### assets => 静态文件

### ————country => 国家缩写对应的 SVG 国旗

### ————default_head => 本地存储的用户头像

### ————icons => 项目中用到的小图标

### ————img => 项目中的 logo 图片等

### components => 通用组件

### ————chooseRegion => 封装完毕的地区->国家的组件

### ————latest_tutorial => 简单封装的最新教程组件

### ————loading => 作用于全局的 loading 组件 已和 api 联动

### ————mainEchart => 简单封装的 Echart 组件 暂时没有写入接口数据

### ————radioButton => 封装完毕的单选项组件

### components_switch => 对应页面级组件的子组件文件夹

### ————dynamic-residence => 动态代理的子组件

### ————————buyPlan => 购买计划组件

### ————————gennerateProxies => 生成代理组件

### ————————historicalBilling => 订单组件

### ————————trafficDetails => 流量详情组件

### —————static-residence => 静态代理的子组件

### ————————buyProxy => 购买代理组件

### ————————IPdetail => IP 详情组件

### ————————order => 订单组件

### —————unlimited-agency => 不限量代理的子组件

### ————————buyProxy => 购买代理组件

### ————————order => 订单组件

### layouts => 页面布局类组件文件夹

### —————aside => 侧边栏组件 已完成封装

### —————footer => 底部组件 暂时没有内容

### —————header => 头部组件

### —————nav => 二级导航组件 已经封装完成

### local => vue3 插件 i18n 用的相关国际化对应文本，目前只填写了中文，配置已经完成。

### router => 路由

### services => 里面有封装完成的 API 请求

### store => vuex

### style => 样式表文件，包含 CSS、scss，配置已完成

### utils => 包含一些通用的方法和操作类

### views => 页面级组件文件夹

### ————dynamic-residence => 动态代理页面

### ————login => 登录页面

### ————main => 主页面，也可以叫 index 页面

### ————question => 应该是用不上的，原本打算作为教程页使用，但是教程应该是外部的链接

### ————static-residence => 静态代理页面

### ————unlimited-agency => 不限量代理页面

### ————test.vue => 自己测试用

### App.vue => 项目根页面

### main.js => 项目全局配置文件

### 二、注意事项

### 项目目前使用的是.vue .js 分开编写的结构 具体实现方式为：

### .vue

<template></template>

<script>
    import componentA_Script from "./index.js"
    export default {
        components:{},
        ...componentsA_Script, // 在此处合并
    }
</script>

### .js

import {ref} from "vue"

export default {
    setup(){
        return {}
    }
}

### 当然也可以使用setup语法糖，但是那样一个文件的代码就会显得非常长，看起来费劲。

### 三、目前已知可能导致bug的原因

### ————1、antd 的 modal组件：如果需要在modal内使用其他组件或者传参什么的，需要在.js文件内进行组件注册，modal组件似乎有自己的生命周期

### ————其他：基本在代码的注释上