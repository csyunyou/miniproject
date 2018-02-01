<template>
  <div class="student-info">
    <div class="status">
      <span @click="$store.commit('SET_SHOWLOGIN',true)" v-if="status==='offLine'">登录|注册</span>
      <span v-else @click="logout">退出</span>
    </div>
    <div class="info">
      <div class="maininfo-wrapper" v-show="status==='onLine'">
        <!--         <div class="avatar">
          <img src="../../../assets/favicon.jpg"  height="50" width="50"/>
        </div>

 -->
        <el-upload class="avatar-uploader" action="http://hyh.bojiatouzi.com/User/upLoadAvatar" :show-file-list="false" :on-success="handleAvatarSuccess" :on-error="handleAvatarMyError" :data="{user_id:userInfo.userid}" name="photo" :with-credentials="true">
          <img v-if="userInfo.imgeUrl" :src='"http://hyh.bojiatouzi.com/"+userInfo.imgeUrl' class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="content">
          <div class="student-name">学生用户</div>
          <div>{{userInfo?userInfo.nickname:"null"}}</div>
        </div>
      </div>
      <div class="extrainfo-wrapper">
        <ul class="extrainfo-list">
          <li v-for="(val,key) in linkInfo">
            <router-link :to="`/${key}`">{{val}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!--     <button @click="checkLogin">log in?</button>
    <button @click="setpwd">setpwd</button> -->
    <div v-show="showLogin||showRegister||showForgetPwd" class="shadow"></div>
    <div class="register-login-wrapper">
      <login v-show="showLogin" @close="$store.commit('SET_SHOWLOGIN',false)" @register="showRegister=true" @forgetPwd="showForgetPwd=true"></login>
      <register v-show="showRegister" @close="showRegister=false" @login="$store.commit('SET_SHOWLOGIN',true)"></register>
      <forget-password v-show="showForgetPwd" @close="showForgetPwd=false" @validateSuccess="validateSuccessHandler"></forget-password>
      <set-password v-show="showSetPwd" @close="showSetPwd=false" :credential="setPwdCredential"></set-password>
    </div>
    <!--     <form action="http://hyh.bojiatouzi.com/User/upLoadAvatar" enctype="multipart/form-data" method="post">
      <input type="file" name="photo" @change="changeHandler"/>

    </form> -->
  </div>
</template>
<script type="text/javascript">
import login from './Login.vue'
import register from './Register.vue'
import forgetPassword from './ForgetPassword.vue'
import setPassword from './SetPassword.vue'
export default {
  data() {
    return {
      linkInfo: {
        wallet: '钱包余额',
        footprint: '脚步记录',
        share: '我的分享',
        coupon: '我的优惠',
        supplementaryInfo: '资料补充',
      },
      // showLogin: false,
      showRegister: false,
      showForgetPwd: false,
      showSetPwd: false,
      setPwdCredential: null,
      // imageUrl: null
      // extraInfoItems:["钱包余额","脚步记录","我的分享","我的优惠","资料补充"]
    }
  },
  methods: {
    logout() {
      let vm = this
      this.$axios.post('public/logout').then(function(data) {
        vm.$store.commit('SET_USERINFO', {})
        vm.$store.commit('SET_STATUS', "offLine")
      })
    },
    checkLogin() {
      this.$axios.post('public/islogin').then(function(data) {
        // console.log(data)
      })
    },
    validateSuccessHandler(credential) {
      console.log('credential', credential)
      this.showSetPwd = true
      this.setPwdCredential = credential
    },
    setpwd() {

    },
    handleAvatarSuccess(res, file) {
      console.log('suceess')
      // console.log('res',res)
      this.$store.commit('SET_USERINFO',{...this.userInfo,imgeUrl:res.data.imgeUrl})
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    handleAvatarMyError(error, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log('erro', arguments)
    },
    changeHandler(e) {
      console.log("change")
      this.upLoadFile(e.target.files)
    },
    upLoadFile(files) {
      const xhr = new XMLHttpRequest();
      xhr.open('post', 'http://hyh.bojiatouzi.com/user/upLoadAvatar', true);
      xhr.withCredentials = true;
      let formData = new FormData()
      formData.append("user_id", "3")
      formData.append("name", "pic")
      formData.append("pic", files[0])
      xhr.send(formData);
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    showLogin() {
      return this.$store.state.showLogin
    },
    status() {
      return this.$store.state.status
    }
  },
  components: {
    login,
    register,
    forgetPassword,
    setPassword
  }
}

</script>
<style type="text/css" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader:hover {
  border-color: #409EFF;
}

.avatar-uploader {
  display: inline-block;
  margin-right: 5px;
}

.avatar-uploader-icon {
  font-size: 25px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.avatar {
  width: 50px;
  height: 50px;
  display: block;
}

.shadow {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 8888;
  opacity: 0.7;
  background-color: rgb(0, 0, 0);
  display: block;
}

.register-login-wrapper {
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  margin-top: -257.5px;
  margin-left: -200px;
}

.student-info {
  height: 50%;
  position: relative;
  border-bottom: 15px solid #feb24c;
}

.status {
  margin: 20px 20px;
  text-align: end;
}

.info {
  margin: 40px;
}

.avatar-uploader,
.content {
  vertical-align: top;
}







/*.avatar {
  display: inline-block;
  margin-right: 5px;
}*/

.content {
  font-weight: bold;
}

.student-name {
  color: #e31a1c;
}

.maininfo-wrapper .content {
  display: inline-block;
}

.extrainfo-wrapper {
  /*width:30%;*/
}

.extrainfo-list {
  background: #c7e9c0;
  color: black;
  padding: 0;
}

.extrainfo-list li {
  list-style: none;
  margin-bottom: 10px;
  text-align: center;
}

.extrainfo-list li a {
  list-style: none;
  margin-bottom: 10px;
}

</style>
