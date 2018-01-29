<template>
  <div class="share">
    <div class="shareInfo">
      <div class="shareScore-wrapper">
        <div class="title">分享赠送额度:</div>
        <span class="shareScore">{{shareaward}}</span>
      </div>
      <div class="clickNumber-wrapper">
        <span>点击量:{{clickNum}}次</span>
      </div>
      <div class="note">(注:额度当月有效，及时使用)</div>
    </div>
    <div class="division"></div>
    <div class="linkInfo">
      <div class="inviteLink-wrapper">
        <div class="title">邀请注册链接:</div>
        <div class="content">{{inviteLink}}</div>
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
        <!-- <i class="el-icon-share"></i> -->
      </div>
      <div>
        <div class="title">邀请码:</div>
        <div class="content">{{userInfo.invite}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import jrQrcode from 'jr-qrcode'
export default {
  data() {
    return {
      /*      shareScore: 10,
            clickNum: 200,
            inviteLink: 'http://baidu.com',
            inviteCode: 'YUQIXS',*/
      showQRCode: false,
      clickNum: 0,
      shareaward:0
    }
  },
  computed: {
    QRCode() {
      return jrQrcode.getQrBase64(this.inviteLink, { width: 120, height: 120 })
    },
    userInfo() {
      return this.$store.state.userInfo
    },
    inviteLink() {
      return `http://localhost:8087/module/invitation.html?inviteCode=${this.userInfo.invite}&id=${this.userInfo.userid}`
    }
  },
  methods: {},
  mounted() {
    this.$axios.post("user/getClickNum", {
      user_id: this.userInfo.userid
    }).then(({ data }) => this.clickNum = data.data.num)
    this.$axios.post('User/getWallet', {
      user_id: this.userInfo.userid
    }).then(({ data }) => {
      this.shareaward = +data.data.shareaward
    })
  }
}

</script>
<style type="text/css" scoped>
/*.share {
  margin: 20px 40px;
}*/

.qrCode .header {
  margin-top: 10px;
  text-align: center;
}

.title {
  font-weight: bold;
  margin-bottom: 10px;
}

.content {
  margin-left: 50px;
  margin-right: 10px;
  display: inline-block;
}

.shareScore-wrapper,
.clickNumber-wrapper {
  display: inline-block;
}

.shareInfo,
.linkInfo {
  margin: 20px;
}

.shareScore-wrapper {
  margin-right: 100px;
}

.shareScore {
  font-size: 60px;
  margin-left: 130px;
}

.note {
  font-size: 12px;
  color: #93999f
}

.division {
  height: 10px;
  background-color: #fb6a4a;
}

.inviteLink-wrapper {
  margin-bottom: 10px;
}

.qrCode-wrapper {
  display: inline-block;
  position: relative;
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

.wechatFavicon {
  display: inline-block;
  vertical-align: top;
  width: 30px;
  height: 18px;
  background-image: url(../../../assets/wechat.jpg);
  background-size: 30px 18px;
  background-repeat: no-repeat;
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

</style>
