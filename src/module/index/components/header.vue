<template>
  <div class="header">
    <div class="trademark-wrapper">
      <div class="content">
        <div>
          <h1>今朝讲坛</h1></div>
        <div>
          <h2>JZJT.com</h2></div>
      </div>
    </div>
    <div class="explore-wrapper">
      <el-input placeholder="请输入内容" v-model="input" class="explore-btn">
        <template slot="append">搜索</template>
      </el-input>
      <div @click="showLogin=true">登录|注册</div>
      <ul class="linklist-wrapper">
        <li v-for="(val,key) in linkInfo">
          <router-link :to="key">{{val}}</router-link>
        </li>
      </ul>
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
import axios from 'axios'
import login from './Login.vue'
import register from './Register.vue'
import forgetPassword from './ForgetPassword.vue'
import setPassword from './SetPassword.vue'
export default {
  data() {
    return {
      input: "",
      showLogin: false,
      showRegister: false,
      showForgetPwd: false,
      showSetPwd: false,
      linkInfo: {
        index: '首页',
        vodList: '视屏',
        livebroadcastList: '直播',
        about: '关于'
      }
    }
  },
  methods: {


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
.header {
  border-bottom: 9px solid #ef3b2c;
  flex: 0 0 9em;
  display: flex;
  position: relative;
}














/*.header:after{
    display: block;
    position: absolute;
    left:0;
    bottom:0;
    width: 100%;
    border-bottom: 10px solid rgba(7,17,27,0.1);
    content: ' ';
}*/

.trademark-wrapper {
  flex: 0 0 20em;
  /*height: 100%;*/
  background: #99d8c9;
  position: relative;
}

.trademark-wrapper .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.explore-wrapper {
  flex: 1;
  position: relative;
  background: #f0f0f0;
}

.explore-btn {
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
.linklist-wrapper{
  position: absolute;
  right: 15px;
  bottom: 0;
}
.linklist-wrapper li{
  list-style: none;
  display: inline-block;
  margin-right: 20px;
}
</style>
