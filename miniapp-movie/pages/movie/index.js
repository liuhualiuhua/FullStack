//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    boards: [{
      "key": "in_theaters'"
    }, {
      key: 'coming_soon'
    }]

  },
  retrieveData() {
    wx.request({
      method: "POST",
      url: 'https://douban.uieee.com/v2/movie/coming_soon?start=0&count=3',
      header: {
        'content-type': 'json'
      },
      success: res => {
        console.log(res)
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'has_shown_splash',
      success: res=> {
        console.log("直接进入首页");
        this.retrieveData();
      },
      fail: err => {
        wx.redirectTo({
          url: '/pages/movie/splash',
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})