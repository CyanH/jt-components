## 简介

金土公共组件：<br>
imageView：可以显示、下载图片及各种附件的插件，图片有预览功能

## 安装

npm install jt-common

## 引入

import imageView from 'jt-common'
import 'jt-common/jt-common.css'

## 全局注册

Vue.use(imageView)

## 使用

<image-view  :base-api="baseApi"></image-view>

```js
// baseApi：图片 ip 地址
//imgArr：图片集合，即后端接口返回的picList
this.$refs.imgView.setImageList(imgArr);
```
