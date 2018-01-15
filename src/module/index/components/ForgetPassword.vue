<template>
  <div class="forgetPassword">
    <div class="header">
      <span>找回密码</span>
      <i class="el-icon-circle-close-outline close-btn" @click="$emit('close')"></i>
    </div>
    <el-form :model="form" label-width="65px" size="small" class="form" ref="form" :rules="rules">
      <el-form-item label="账号" prop="account">
        <el-input v-model="form.account"></el-input>
      </el-form-item>
      <el-form-item label="校验码" prop="checkCode">
        <el-input v-model="form.checkCode" class="checkCode-input"></el-input>
        <el-button type="primary" class="checkCode-btn" @click="getCheckcode">免费获取校验码</el-button>
        <!-- <img :src="verificationImgSrc" height="32"/> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      form: {
        account: "",
        checkCode: "",
      },
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        checkCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      }
    }
  },
  methods: {
    next() {
      this.$emit("close")
      this.$emit("validateSuccess")
      return
      let vm = this
      this.$refs.form.validate(valid => {
        if (valid) {
          axios.post('user/login', {
            account: vm.form.account,
            checkCode: vm.form.checkCode
          }).then(function(reponse) {
            if (response.status === 0) {
              vm.$emit("validateSuccess")
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
    getCheckcode() {
      this.$axios.post('/public/sendCheckcode', {
        mobile: this.form.account,
        templatecode: 'tp_code2'
      }).then(function() {

      })
    }
  }
}

</script>
<style type="text/css" scoped>
.forgetPassword {
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

.form {
  padding: 30px 30px 0 30px;
}

.checkCode-input {
  width: 50%;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 25px;
}

</style>
