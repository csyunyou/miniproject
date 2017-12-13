<template>
  <div class="student-info">
    <div class="status">
      <span @click="showLogin=true" v-if="!$store.state.isLogin">登录|注册</span>
      <span v-else @click="logout">退出</span>
    </div>
    <div class="info">
      <div class="maininfo-wrapper">
        <div class="avatar">
          <img src="../../../assets/favicon.jpg" height="50" width="50" />
        </div>
        <div class="content">
          <div class="student-name">学生用户</div>
          <div>{{userInfo.user_nickname}}</div>
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
    <div v-show="showLogin||showRegister||showForgetPwd" class="shadow"></div>
    <div class="register-login-wrapper">
      <login v-show="showLogin" @close="showLogin=false" @register="showRegister=true" @forgetPwd="showForgetPwd=true"></login>
      <register v-show="showRegister" @close="showRegister=false" @login="showLogin=true"></register>
      <forget-password v-show="showForgetPwd" @close="showForgetPwd=false" @validateSuccess="showSetPwd=true"></forget-password>
      <set-password v-show="showSetPwd" @close="showSetPwd=false"></set-password>
    </div>
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
        coupoun: '我的优惠',
        supplementaryInfo: '资料补充',
      },
      showLogin: false,
      showRegister: false,
      showForgetPwd: false,
      showSetPwd: false,
      // extraInfoItems:["钱包余额","脚步记录","我的分享","我的优惠","资料补充"]
    }
  },
  methods:{
    logout(){
      this.$store.commit("SET_LOGIN",false)
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo
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

.avatar,
.content {
  vertical-align: top;
}

.avatar {
  display: inline-block;
  margin-right: 5px;
}

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
