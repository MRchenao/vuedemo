import wx from "weixin-js-sdk";
import qs from 'qs'
export default {
  name: 'wxConfig',
  methods: {
    wxConfig(opt) {
      let self = this;
      let shareInfo = {
        title:'',
        desc:'',
        link:'',
        imgUrl:''
      }
      if(opt){
        for(let item in shareInfo){
          shareInfo[item] = opt[item]?opt[item]:self.shareConfig[item]
        }
      }else{
        shareInfo = this.shareConfig
      }
      return self.$axios({
        url: "/h5/dailyevent.php?op=getWeixinSign",
        method: "POST",
        data: qs.stringify({
          url: encodeURIComponent(window.location.href)
        })
      }).then(res => {
        // return new Promise((resolve, reject) => {
        if (res.data.code == 1) {
          wx.config({
            debug: false,
            appId: res.data.data.appid,
            timestamp: res.data.data.timestamp,
            nonceStr: res.data.data.nonceStr,
            signature: res.data.data.signature,
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "hideMenuItems",
              "showMenuItems",
              "hideAllNonBaseMenuItem",
              "showAllNonBaseMenuItem",
              "translateVoice",
              "startRecord",
              "stopRecord",
              "onRecordEnd",
              "playVoice",
              "pauseVoice",
              "stopVoice",
              "uploadVoice",
              "downloadVoice",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "downloadImage",
              "getNetworkType",
              "openLocation",
              "getLocation",
              "hideOptionMenu",
              "showOptionMenu",
              "closeWindow",
              "scanQRCode",
              "chooseWXPay",
              "openProductSpecificView",
              "addCard",
              "chooseCard",
              "openCard"
            ]
          });
          wx.ready(function() {
            self.wxShare(shareInfo.title, shareInfo.desc, shareInfo.link, shareInfo.imgUrl)
          })
        }
      });
    },
    wxShare(title, desc, link, imgUrl) {
      //朋友圈
      wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: link, // 分享链接
        imgUrl: imgUrl // 分享图标
      });
      //分享给朋友
      wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl // 分享图标
      });
      //QQ
      wx.onMenuShareQQ({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl // 分享图标
      });
      //腾讯微博
      wx.onMenuShareWeibo({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl // 分享图标
      });
      //QQ空间
      wx.onMenuShareQZone({
        title: title, // 分享标题
        desc: desc, // 分享描述
        link: link, // 分享链接
        imgUrl: imgUrl // 分享图标
      });
    }
  }
}
