<template>
  <div class="login">
    <div class="header">
      <span>登录</span>
      <i class="el-icon-circle-close-outline close-btn" @click="$emit('close')"></i>
    </div>
    <el-alert title="warningInfo" type="error" show-icon v-show="warningInfo">
    </el-alert>
    <el-form :model="loginForm" label-width="70px" size="small" class="login-form" ref="registerForm" :rules="rules">
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="loginForm.verificationCode" class="verification-input"></el-input>
        <img :src="verification.dataURL" @click="changeVerification" class="verification-img" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">立即登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="autoLogin">下次自动登录</el-checkbox>
      </el-form-item>
    </el-form>
    <div class="footer">
      <div @click="turn2Register">注册新账号</div>|
      <div @click="turn2ForgetPwd">忘记密码</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'
import verification from 'verification-code';
export default {
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
        verificationCode: ""
      },
      autoLogin: false,
      warningInfo: "",
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        verificationCode: [{ validator: this.verificationCodeValidator, trigger: 'blur' }]
      },
      verification: null
    }
  },
  methods: {
    login() {
      let vm = this
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          axios.post('user/login', {
            account: this.loginForm.account,
            password: this.loginForm.password
          }).then(function(reponse) {
            if (response.status === 0) {
              vm.$store.commit('SET_USRINFO', response.data)
              vm.$sotre.commit('SET_LOGIN', true)
            } else if (response.status === 1) {
              vm.warningInfo = "账户不存在或密码错误"
            }
          })
        } else {
          console.log('erro')
          return false;
        }
      })

    },
    turn2Register() {
      this.$emit("close")
      this.$emit("register")
    },
    turn2ForgetPwd() {
      this.$emit("close")
      this.$emit("forgetPwd")
    },
    changeVerification() {
      this.verification = verification.create();
    },
    verificationCodeValidator(rule, val, cb) {
      if (val === "")
        cb(new Error('请输入验证码'));
      else if (val.toLowerCase() !== this.verification.code)
        cb(new Error('验证码不正确'));
    }
  },
  created() {
    this.verification = verification.create();

  },
  mounted() {
    // console.log(this.verification.code, this.verification.dataURL, "mounted")
  }
}

</script>
<style type="text/css" scoped>
.login {
  width: 400px;
  background-color: #fff;
  color: #2d2f33;
  border: 1px solid black;
  border-radius: 5px;
}

.header {
  border-bottom: 1px solid #e6ebf5;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  font-size: 20px;
}

.login-form {
  padding: 30px 30px 0 30px;
}

.footer {
  border-top: 1px solid #e6ebf5;
  font-size: 12px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  color: #93999f;
}

.footer div {
  display: inline-block;
  margin: 0 10px;
  text-decoration: underline;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 25px;
}

.verification-input {
  width: 50%;
}

.verification-img {
  vertical-align: top;
  margin-left: 10px;
}

</style>
