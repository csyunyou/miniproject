<template>
  <div class="forgetPassword">
    <div class="header">
      <span>找回密码</span>
      <i class="el-icon-circle-close-outline close-btn" @click="closeBtnHandler"></i>
    </div>
    <el-alert :title="warningInfo" type="error" show-icon v-show="warningInfo"></el-alert>
    <el-alert :title="successInfo" type="success" show-icon v-show="successInfo">
    </el-alert>
    <div v-if="!searchMethod" class="method-panel">
      <span @click="searchMethod='email'">通过邮箱找回</span>
      <span>|</span>
      <span @click="searchMethod='phone'">通过手机找回</span>
    </div>
    <div v-else-if="searchMethod==='phone'">
      <el-form :model="form" label-width="65px" size="small" class="form" ref="form" :rules="rules">
        <el-form-item label="账号" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="校验码" prop="checkCode">
          <el-input v-model="form.checkCode" class="checkCode-input"></el-input>
          <el-button type="primary" class="checkCode-btn" @click="getCheckcode" :disabled="isChecking">{{checkCodeMsg}}</el-button>
          <!-- <img :src="verificationImgSrc" height="32"/> -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="next">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="searchMethod==='email'">
      <el-form :model="form" label-width="65px" size="small" class="form" ref="form" :rules="rules">
        <el-form-item label="邮箱" prop="account">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="emailFormHandler">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      },
      warningInfo: "",
      successInfo:"",
      isChecking: false,
      checkCodeMsg: '免费获取校验码',
      searchMethod: ""
    }
  },
  methods: {
    next() {
      // this.$emit("close")
      // this.$emit("validateSuccess")
      // return
      let vm = this
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$axios.post('public/validateSetPwdcheckCode', {
            mobile: vm.form.account,
            checkCode: vm.form.checkCode
          }).then(function({ data }) {
            if (data.code === 1) {
              vm.$emit("validateSuccess", { mobile: vm.form.account, checkCode: vm.form.checkCode })
              vm.closeBtnHandler()
            } else if (data.code === 0) {
              vm.warningInfo = data.str
            }
          })
        } else {
          console.log('erro')
          return false;
        }
      })
    },
    emailFormHandler(){
      this.successInfo=""
      this.warningInfo=""
      this.$axios.post('public/sendEmailpwdCode',{
        email:this.form.account
      }).then(({data})=>{
        if(data.code===1){
          this.successInfo=data.str
        }
        else
          this.warningInfo=data.str
      })
    },
    getCheckcode() {
      let vm = this,
        start = 60
      this.$axios.post('/public/sendCheckcode', {
        mobile: this.form.account,
        templatecode: 'tp_code2'
      }).then(function({ data }) {
        if (data.code === 1) {
          vm.isChecking = true

          function count() {
            start--
            vm.checkCodeMsg = `${start}秒后重新获取`
            if (start > 0)
              setTimeout(count, 1000)
            else {
              vm.checkCodeMsg = '免费获取校验码'
              vm.isChecking = false
            }
          }
          count()
        } else {
          vm.warningInfo = data.str
        }
      })
    },
    closeBtnHandler(){
      this.resetState()
      this.$emit('close')
    },
    resetState(){
      this.searchMethod=""
      this.form={}
      this.warningInfo=""
      this.successInfo=""
    }
  }
}

</script>
<style type="text/css" scoped>
.method-panel {
  padding: 20px;
  text-align: center;
  text-decoration: underline;
  /*height: 40px;*/
}

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
