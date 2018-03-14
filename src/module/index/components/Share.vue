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
      <div class="inviteLink-wrapper item">
        <div class="title">邀请注册链接:</div>
        <span class="invite-link">{{inviteLink}}</span>
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
      <div class="item">
        <span class="title">邀请码:</span>
        <span class="content">{{userInfo.invite}}</span>
      </div>
      <div class="item">
        <span class="title">朋友邀请码:</span>
        <span v-if="userInfo.friendInvite">
          {{userInfo.friendInvite}}
        </span>
        <div v-else class="invite-form">
          <el-input v-model="friendInvite" placeholder="请输入内容" class="invitecode-input" size="medium"></el-input>
          <el-button type="primary" icon="el-icon-edit" size="medium" @click="inviteHandler">填写</el-button>
        </div>
        <el-alert :title="warningInfo" type="error" show-icon v-show="warningInfo"></el-alert>

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
      shareaward: 0,
      friendInvite:"",
      warningInfo:""
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
  methods: {
    inviteHandler(){
      this.$axios.post('user/addFriendInvite',{
        user_id:this.userInfo.userid,
        friend_invite:this.friendInvite
      }).then(({data})=>{
        if(data.code===0){
          this.warningInfo=data.str
        }else{
          this.$store.commit('SET_USERINFO', {...this.userInfo,friendInvite:this.friendInvite})
        }
      })
    }
  },
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
.invitecode-input{
  /*display: inline-block;*/
  width:auto;
}
.qrCode .header {
  margin-top: 10px;
  text-align: center;
}

.title {
  font-weight: bold;
}

.invite-link {
  margin-left: 20px;
}

.shareScore-wrapper,
.clickNumber-wrapper {
  display: inline-block;
}

.shareInfo,
.linkInfo {
  margin: 20px;
}

.linkInfo .item:nth-child(n+2){
  margin-bottom:10px;
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
.invite-form{
  display: inline-block;
}
</style>
