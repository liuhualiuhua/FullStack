const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      method: "POST",
      url: 'https://douban.uieee.com/v2/movie/coming_soon?start=0&count=3',
      header: {
        'content-type': 'json'
      },
      success: res => {
        this.setData({
          "subjects": res.data.subjects
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
    wx.setStorage({
      key: "has_shown_splash",
      data: true
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