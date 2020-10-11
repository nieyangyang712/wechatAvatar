
/** 
 * 需要一个目标日期，初始化时，先得出到当前时间还有剩余多少秒
 * 1.将秒数换成格式化输出为XX天XX小时XX分钟XX秒 XX
 * 2.提供一个时钟，每10ms运行一次，渲染时钟，再总ms数自减10
 * 3.剩余的秒次为零时，return，给出tips提示说，已经截止
 */
 
// 定义一个总毫秒数，以一天为例
// var total_micro_second = 3600 * 1000*24;//这是一天倒计时
var total_micro_second = 10 * 1000;//这是10秒倒计时
 
/* 毫秒级秒杀倒计时 */
function countdown(that) {
   // 渲染倒计时时钟
   that.setData({
     clock:dateformat(total_micro_second)//格式化时间
   });
 
   if (total_micro_second <= 0) {
     that.setData({
       clock:"秒杀结束"
     });
     // timeout则跳出递归
     return ;
   }  
   //settimeout实现倒计时效果
   setTimeout(function(){
    // 放在最后--
    total_micro_second -= 10;
    countdown(that);
  }
  ,10)//注意毫秒的步长受限于系统的时间频率，于是我们精确到0.01s即10ms
}
 
// 时间格式化输出，如1天天23时时12分分12秒秒12 。每10ms都会调用一次
function dateformat(micro_second) {
   // 总秒数
   var second = Math.floor(micro_second / 1000);
   // 天数
   var day = Math.floor(second / 3600/24);
   // 总小时
   var hr = Math.floor(second / 3600);
   // 小时位
   var hr2 = hr%24;
   // 分钟位
   var min = Math.floor((second - hr * 3600) / 60);
   // 秒位
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = Math.floor((micro_second % 1000) / 10);
  return day+"天"+hr2 + "时" + min + "分" + sec + "秒" + micro_sec;
}
Page({
  //跳转到视频播放器
  videos() {
    wx.navigateTo({
      url: '../videos/video',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    clock: '',
    imgUrls: [
      "../../images/img1.png",
      "../../images/img2.png"
    ]
  },
  getImages() {
    let that = this;
    let imgArr = [];
    wx.cloud.database().collection("images").get({
      success(res) {
        console.log("请求成功", res.data)
        let dataList = res.data;
        for (let i = 0; i < dataList.length; i++) {
          imgArr.push(dataList[i].url)
        }
        console.log("imgArr的数据", imgArr)
        that.setData({
          imgUrls: imgArr
        })
      },
      fail(res) {
        console.log("请求失败", res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    countdown(this);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage () {

  }
})
