<template>
  <div class="videoPlayer">
    <video id="video-player" class="video-js">
      <!-- <source src="http://localhost:3001/video/testFlv.flv" type="video/flv"> -->
      <!-- <source src="http://localhost:3001/video/testmp4.mp4" type="video/mp4"> -->
      <!-- <source src="rtmp://live.hkstv.hk.lxdns.com/live/hks" type="rtmp/flv"> -->
      <!-- <source src="../../../assets/testFlv.flv" type="video/flv"> -->
      <!-- <source src="rtmp://localhost:1935/live1/root" type="rtmp/flv"> -->
      <!-- <source :src="$route.query.videoLink" type="rtmp/flv"> -->
      <!-- <source="rtmp://live.hkstv.hk.lxdns.com/live/hks" type="rtmp/flv"> -->
      <!-- <source src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" type: "video/mp4"> -->
    </video>
    <div class="videoInfo">
      <div class="title">
        <span v-if="$route.query.type==='vod'">视屏:</span>
        <span v-else-if="$route.query.type==='live'">直播:</span>
        <span>{{videoInfo.title}}</span>
      </div>
      <div class="date">
        <span>时间:</span>
        <span>{{videoInfo.date}}</span>
      </div>
      <div class="speaker">
        <span>主讲人:</span>
        <span>{{videoInfo.speaker}}</span>
      </div>
      <div class="qrCode-wrapper">
        <el-button type="primary" icon="el-icon-share" size="mini" @click="showQRCode=!showQRCode" class="shareBtn">分享</el-button>
        <div class="qrCode" v-show="showQRCode">
          <div class="header">
            <span class="wechatFavicon"></span>
            <span>微信扫一扫</span>
          </div>
          <img :src="QRCode" />
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import videojs from 'video.js'
require('videojs-flash')
export default {
  data() {
    return {
      videoOpts: {
        fluid: true,
        controls: true,
        preload: "auto",
        poster: "http://ppt.downhot.com/d/file/p/2014/08/12/9d92575b4962a981bd9af247ef142449.jpg"

      },
      videoPlayer: null,
      videoInfo: {},
      shareLink:"http://baidu.com",
      showQRCode: false
    }
  },
  computed: {
    QRCode() {
      return jrQrcode.getQrBase64(this.shareLink, { width: 120, height: 120 })
    }
  },
  mounted() {
    console.log('mounted')
    // console.log(this.$route.query.id)
    this.videoPlayer = videojs('video-player', this.videoOpts)
    if (this.$route.query.type === "vod") {
      this.videoInfo = {
        title: "如何高效地学习",
        date: "2016-03-01",
        speaker: "旋律",
        link: "http://localhost:3001/video/testmp4.mp4",
        id: 4
      }
      this.videoPlayer.src({ type: 'video/mp4', src: this.videoInfo.link })
    } else {
      this.videoInfo = {
        title: "和平与战争",
        date: "2016-10-11",
        speaker: "云游",
        place: "杭州西湖区",
        link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
        id: 1
      }
      this.videoPlayer.src({ type: 'rtmp/flv', src: this.videoInfo.link })
    }
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    this.videoPlayer.dispose()
  }
}

</script>
<style type="text/css" scoped>
.videoPlayer {
  padding: 20px 40px;
}

.video-js {}

.videoInfo {
  margin-top: 10px;
  text-align: center;
  position: relative;
}

.title,
.date,
.speaker {
  display: inline-block;
  margin-right: 20px;
}
.qrCode-wrapper {
  display: inline-block;
  position: absolute;
  right:10px;
}
.qrCode {
border-radius: 9px;
  font-size: 13px;
  background-color: #fff;
  margin-top: 12px;
  position: absolute;
  left: -23px;
  box-shadow: 0 5px 20px rgba(0, 34, 77, .1);
  padding:3px 0;
}
.qrCode::before {
  /*这里的伪元素用单冒号和双冒号都一样*/
  content: '';
  display: block;
  position: absolute;
  top: -10px;
  left: 50px;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 10px solid #fff;
}
.wechatFavicon {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 18px;
  background-image: url(../../../assets/wechat.jpg);
  background-size: 30px 18px;
  background-repeat: no-repeat;
}
</style>
