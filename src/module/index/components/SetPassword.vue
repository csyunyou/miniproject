<template>
  <div class="setPassword">
    <div class="header">
      <span>设置新密码</span>
      <i class="el-icon-circle-close-outline close-btn" @click="closeBtnHandler"></i>
    </div>
    <el-alert :title="warningInfo" type="error" show-icon v-show="warningInfo"></el-alert>
    <el-alert :title="successInfo" type="success" show-icon v-show="successInfo"></el-alert>
    <el-form :model="form" size="small" class="form" ref="form" :rules="rules">
      <el-form-item prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPwd">
        <el-input v-model="form.confirmPwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      form: {
        password: "",
        confirmPwd: "",
      },
      rules: {
        password: [{ validator: this.passwordValidator, trigger: 'blur' }],
        confirmPwd: [{ validator: this.confirmPwdValidator, trigger: 'blur' }]
      },
      warningInfo: "",
      successInfo: ""
    }
  },
  props: ['credential', 'type'],
  methods: {
    passwordValidator(rule, val, cb) {
      if (val === '') {
        cb(new Error('请输入密码'));
      } else {
        if (this.form.confirmPwd !== '') {
          this.$refs.form.validateField('confirmPwd');
        }
        cb();
      }
    },
    confirmPwdValidator(rule, val, cb) {
      if (val === '') {
        cb(new Error('请再次输入密码'));
      } else if (val !== this.form.password) {
        cb(new Error('两次输入密码不一致!'));
      } else {
        cb();
      }
    },
    submit() {
      let vm = this

      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('success')
          if (this.type === "phone") {
            this.$axios.post('public/setPassword', {
              mobile: this.credential.mobile,
              checkCode: this.credential.checkCode,
              password: this.form.password
            }).then(function({ data }) {
              vm.successInfo = data.str
              /*            if (data.str === 1) {
                            vm.$emit("validateSuccess")
                          } else if (response.status === 1) {
                            vm.warningInfo = "账户不存在或密码错误"
                          }*/
            })
          } else if (this.type === "email") {
            this.$axios.post("public/setPwdBypwdCode", {
              pwdCode: this.credential,
              password: this.form.password
            }).then(({ data }) => {
              vm.successInfo = data.str
            })
          }

        } else {
          console.log('erro')
          return false;
        }
      })
    },
    resetState(){
      this.form={}
      this.warningInfo=""
      this.successInfo=""
    },
    closeBtnHandler(){
      this.resetState()
      this.$emit('close')
    }
  }
}

</script>
<style type="text/css" scoped>
.setPassword {
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

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 25px;
}

</style>
