<template>
  <div class="register">
    <div class="header">
      <span>注册</span>
      <i class="el-icon-circle-close-outline close-btn" @click="$emit('close')"></i>
    </div>
    <el-form ref="registerForm" :model="registerForm" label-width="80px" size="small" class="register-form" :rules=rules>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="registerForm.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="校验码">
        <el-input v-model="registerForm.checkCode" class="checkCode-input"></el-input>
        <el-button type="primary" class="checkCode-btn">免费获取校验码</el-button>
        <!-- <img :src="verificationImgSrc" height="32"/> -->
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="registerForm.nickname"></el-input>
      </el-form-item>
      <!--       <el-form-item label="验证码" prop="verificationCode">
        <el-input v-model="registerForm.verificationCode"></el-input>
      </el-form-item> -->
      <el-form-item label="密码" prop="password">
        <el-input v-model="registerForm.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPwd">
        <el-input v-model="registerForm.confirmPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="register">马上注册</el-button>
      </el-form-item>
    </el-form>
    <div class="footer">
      <div @click="loginHandler">已有账号，立即登录</div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      registerForm: {
        phoneNumber: "",
        checkCode: "",
        nickname:"",
        // verificationCode: "",
        password: "",
        confirmPwd: ""
      },
      verificationImgSrc: "",
      rules: {
        phoneNumber: [{ validator: this.phoneValidator, trigger: 'blur' }],
        password: [{ validator: this.passwordValidator, trigger: 'blur' }],
        confirmPwd: [{ validator: this.confirmPwdValidator, trigger: 'blur' }],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
      }
    }
  },
  methods: {
    register() {
      let vm = this
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          axios.post('user/register', {
            phoneNumber: this.registerForm.phoneNumber,
            password: this.registerForm.password,
            checkCode: this.registerForm.checkCode
          }).then(function(response) {

          })
        } else {
          console.log('error')
        }
      })

    },
    loginHandler() {
      this.$emit("close")
      this.$emit("login")
    },
    phoneValidator(rule, val, cb) {
      if (val === "")
        cb(new Error("请输入手机号"))
      else if (!val.match(/^1[3|4|5|8][0-9]\d{4,8}$/))
        cb(new Error('无效的手机号'))
    },
    passwordValidator(rule, val, cb) {
      if (val === '') {
        cb(new Error('请输入密码'));
      } else {
        if (this.registerForm.confirmPwd !== '') {
          this.$refs.registerForm.validateField('confirmPwd');
        }
        cb();
      }
    },
    confirmPwdValidator(rule, val, cb) {
      if (val === '') {
        cb(new Error('请再次输入密码'));
      } else if (val !== this.registerForm.password) {
        cb(new Error('两次输入密码不一致!'));
      } else {
        cb();
      }
    }
  },
  mounted() {
    this.verificationImgSrc = "http://localhost:3000/images/timg.jpg"
  }
}

</script>
<style type="text/css" scoped>
.register {
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

.register-form {
  padding: 30px 30px 0 30px;
}

.checkCode-input {
  width: 50%;
}





/*.checkCode-btn{
	font-size:10px;
}*/

</style>
