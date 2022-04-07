// index.js
// const app = getApp()
// const { envList } = require('../../envList.js');

// Page({
  
// });

import {createScopedThreejs} from 'threejs-miniprogram'

Page({
  onReady() {
    wx.createSelectorQuery()
      .select('#webgl')
      .node()
      .exec((res) => {
        const canvas = res[0].node
        // 创建一个与 canvas 绑定的 three.js
        const THREE = createScopedThreejs(canvas)
        // 传递并使用 THREE 变量
      })
  }
})