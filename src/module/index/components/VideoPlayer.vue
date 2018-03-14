<template>
  <div class="videoPlayer">
    <video id="video-player" class="video-js vjs-big-play-centered">
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
        <span v-if="videoInfo.type==='2'">视屏:</span>
        <span v-else-if="videoInfo.type==='1'">直播:</span>
        <span>{{videoInfo.title}}</span>
      </div>
      <!--      <div class="date">
        <span>时间:</span>
        <span>{{videoInfo.date}}</span>
      </div> -->
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
// import videojsErrors from 'videojs-errors'
// videojs.registerPlugin('errors', videojsErrors)
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
      shareLink: "http://192.168.155.1:8087/#/videoPlayer?type=vod",
      showQRCode: false,
      validCoupons: null
    }
  },
  computed: {
    QRCode() {
      return jrQrcode.getQrBase64(this.shareLink, { width: 120, height: 120 })
    },
    /*    selectedVideo() {
          return this.$store.state.selectedVideo
        },*/
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  mounted() {
    console.log('mounted')
    // console.log('mounted', this.selectedVideo.id)
    let vm = this
    console.log(this.$route.query.id)

    /*    this.videoInfo = {
          title: this.selectedVideo.title,
          speaker: this.selectedVideo.speaker,
          link: this.selectedVideo.link,
          id: this.selectedVideo.id
        }*/
    this.videoPlayer = videojs('video-player', this.videoOpts)
    console.log('link:', this.videoInfo.link)

    // console.log('erros:',this.videoPlayer.errors)
    /*    this.videoPlayer.errors({
          errors: {
            4: {
              headline: '<a>',
              message: 'MESSAGE',
              dismiss: true
            }
          }
        });*/
    this.videoPlayer.on('play', function(e) {
      console.log('play')
    })
    this.videoPlayer.on('error', function(e) {
      console.log('error occur', e);
      e.stopImmediatePropagation();
      var error = this.error();
      console.log('error!', error.code, error.type, error.message);
      // const display = this.videoPlayer.getChild('errorDisplay');

    });
    this.videoPlayer.on('ready', e => {
      this.$axios.post('public/getVideoInfoById', {
        id: this.$route.query.id
      }).then(({ data }) => {
        this.videoInfo = data.data
        if (this.videoInfo.type === '2') {
          this.$axios.post('user/haveVideoAccess', {
            user_id: this.userInfo.userid,
            // vid: this.selectedVideo.id
            vid: this.$route.query.id
          }).then(function({ data }) {
            if (data.data.is_allow === 1) {
              console.log('playVideo')
              vm.videoPlayer.src({ type: 'video/mp4', src: `http://hyh.bojiatouzi.com/uploads/video/?user_id=${vm.userInfo.userid}&vid=${vm.$route.query.id}` })
            } else {
              console.log('not allowed')
              const display = vm.videoPlayer.getChild('errorDisplay');
              display.el().classList.remove('vjs-hidden')
              let div = document.createElement('div')
              div.classList.add('payTip')
              vm.$axios.post('user/getAllValidCoupon', {
                user_id: vm.userInfo.userid
              }).then(function({ data }) {
                vm.validCoupons = data.data
                let optsStr = `
                  <option value="null">不使用</option>
                `
                vm.validCoupons.forEach(function(coupon) {
                  optsStr += `<option value=${coupon.id}>${coupon.discount}折,有效期至${coupon.expiredate}</option>`
                })
                div.innerHTML =
                  `
                <div class='title'>此视屏需要${vm.videoInfo.price}额度哦！</div>
                <div class="couponSelector">
                <label>可以使用：</label>
                <select name="coupons" id="coupon-selector">
                ${optsStr}
                </select>
                </div>
              `
                let footer = document.createElement('div'),
                  confirmBtn = document.createElement('button')
                confirmBtn.innerHTML = '确定'
                confirmBtn.addEventListener('click', e => {

                  let selectElem = document.getElementById('coupon-selector')

                  let coupon = {
                    user_id: vm.userInfo.userid,
                    vid: vm.videoInfo.id,
                  }
                  if (selectElem.options[selectElem.selectedIndex].value !== "null")
                    coupon['coupo_id'] = selectElem.options[selectElem.selectedIndex].value
                  console.log(coupon)
                  vm.$axios.post('user/buyVideo', coupon).then(function({ data }) {
                    if (data.code === 1){
                      location.reload()
                      // display.contentEl().innerHTML = "<div class='payTip'>购买视屏成功，请刷新页面观看视屏</div>"
                    }
                    else
                      display.contentEl().innerHTML = "<div class='payTip'>购买视屏失败!</div>"
                  })

                })
                footer.appendChild(confirmBtn)
                div.appendChild(footer)
                display.contentEl().appendChild(div)

              })
            }

          })
          // this.videoPlayer.src({ type: 'video/mp4', src: this.videoInfo.link })
          // this.videoPlayer.src({ type: 'video/mp4', src: 'http://localhost:3000/static/test.mp4' })
          // this.videoPlayer.src({ type: 'video/mp4', src: "" })
          // this.videoPlayer.src({ type: 'video/mp4', src: '../../../../static/hwd.mp4' })
          // console.log('upLoadVideo')
        } else {
          // this.videoPlayer.src({ type: 'rtmp/flv', src: this.videoInfo.link })
          this.videoPlayer.src({ type: 'rtmp/flv', src: "rtmp://localhost:1935/live1/room"})
        }
      })
    })


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
  right: 10px;
}

.qrCode {
  border-radius: 9px;
  font-size: 13px;
  background-color: #fff;
  margin-top: 12px;
  position: absolute;
  left: -23px;
  box-shadow: 0 5px 20px rgba(0, 34, 77, .1);
  padding: 3px 0;
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
