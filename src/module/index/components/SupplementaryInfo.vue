<template>
  <div class="SupplementaryInfo">
    <div class="header">
      <el-tabs v-model="activeTag" type="card">
        <el-tab-pane label="基本信息" name="first"></el-tab-pane>
        <el-tab-pane label="安全设置" name="second"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <div class="basicinfo-wrapper">
        <el-form ref="form" :model="form" label-width="80px" size="small" v-show="activeTag==='first'">
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio :label=1>男</el-radio>
              <el-radio :label=2>女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthdate" style="width: 100%;" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="固定电话">
            <el-input v-model="form.telephone"></el-input>
          </el-form-item>
          <el-form-item label="居住地">
            <el-cascader expand-trigger="hover" :options="cityOptions" v-model="form.residence">
            </el-cascader>
          </el-form-item>
          <el-form-item label="邮政编码">
            <el-input v-model="form.postcode"></el-input>
          </el-form-item>
          <el-form-item label="教育程度">
            <el-select v-model="form.education" placeholder="请选择">
              <el-option v-for="item in educationLevel" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月收入">
            <el-input v-model="form.monthlyIncome">
              <template slot="prepend">大约</template>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="secureInfo-wrapper" v-show="activeTag==='second'">
        <div class="item">
          <span>昵称:</span>
          <span>{{secureInfo.nickname}}</span>
        </div>
        <div class="item">
          <span>手机:</span>
          <span>{{secureInfo.cellphone}}</span>
        </div>
        <div class="item">
          <span>邮箱:</span>
          <span>{{secureInfo.email}}</span>
        </div>
      </div>
    </div>
    <el-alert :title="modifyMsg" type="success" show-icon v-show="modifyMsg"></el-alert>
    <el-alert title="完善资料内容4个,获得赠送额度5;完善资料内容8个,获得赠送额度10" type="warning" show-icon></el-alert>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      form: {
        name: '',
        gender: '',
        birthdate: '',
        residence: [],
        postcode: '',
        education: '',
        monthlyIncome: '',
        telephone: ''
      },
      /*      form: {
              name: 'wenda',
              gender: 1,
              birthdate: '1995-05-11',
              residence: ['ZheJiang', 'HangZhou', 'BinJiang'],
              postcode: '123123',
              monthlyIncome: '3000',
              telephone: '13123123123',
              education: 1

            },*/
      showTips: true,
      secureInfo: {
        nickname: 'yunyou',
        cellphone: '13235711219',
        email: '1205361247@qq.com'
      },
      activeTag: 'first',
      showBasicInfo: true,
      cityOptions: [{
        label: '浙江省',
        value: 'ZheJiang',
        children: [{
          label: '杭州市',
          value: 'HangZhou',
          children: [{
            label: '西湖区',
            value: 'XiHu'
          }, {
            label: '滨江区',
            value: 'BinJiang'
          }]
        }]
      }],
      educationLevel: [{
        label: '本科',
        value: 0
      }, {
        label: '研究生',
        value: 1
      }, {
        label: '大专',
        value: 2
      }, {
        label: '大专以下',
        value: 3
      }],
      modifyMsg: ""
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  methods: {
    onSubmit() {
      /*      console.log({
              user_id:this.userInfo.userid,
              ...this.form,
              residence:this.form.residence.join('/')
            })*/
      let vm = this
      console.log(this.form)
      this.$axios.post('user/addUserInfo', {
        user_id: this.userInfo.userid,
        name: this.form.name,
        sex: this.form.gender,
        birthdate: this.form.birthdate,
        telephone: this.form.telephone,
        address: this.form.residence.join('/'),
        postcode: this.form.postcode,
        education: this.form.education,
        monthlyIncome: this.form.monthlyIncome
      }).then(function({ data }) {
        vm.modifyMsg = data.str

      })
    }
  },
  mounted() {
    let vm = this
    this.$axios.post('user/getUserSupplementaryInfo', {
      user_id: this.userInfo.userid
    }).then(function({ data }) {
      let info = data.data
      vm.form = {
        name: info.name,
        gender: +info.sex,
        birthdate: info.birthdate,
        telephone: info.telephone,
        residence: info.address.split('/'),
        postcode: info.postcode,
        education: +info.education,
        monthlyIncome: info.monthlyincome
      }
    })
  }
}

</script>
<style type="text/css" scoped>
.SupplementaryInfo {
  margin: 20px;
}

.content {
  /*padding-right: 50%;*/
  width: 400px;
}

.secureInfo-wrapper {
  padding: 0 10px;
  font-size: 15px;
  color: #5a5e66
}

.secureInfo-wrapper .item {
  margin-bottom: 10px;
}

.footer {
  /*width: 400px;*/
  /*position: absolute;*/
  /*bottom: 10%;*/
}

</style>
