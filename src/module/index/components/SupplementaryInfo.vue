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
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
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
    <div class="footer">
      <el-alert title="完善资料内容7个,获得赠送额度10;完善资料内容10个,获得赠送额度15" type="warning" show-icon center></el-alert>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      form: {
        name: '',
        gener: '',
        birthdate: '',
        residence: [],
        postcode: '',
        education: '',
        monthlyIncome: '',
        telephone:''
      },
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
        value:0
      }, {
        label: '研究生',
        value:1
      }, {
        label: '大专',
        value:2
      }, {
        label: '大专以下',
        value:3
      }]
    }
  },
  methods:{
    onSubmit(){
      console.log(this.form)
    }
  }
}

</script>
<style type="text/css" scoped>
.SupplementaryInfo {
  margin: 20px;
}

.content {
  padding-right: 50%;
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
  width: 90%;
  position: absolute;
  bottom: 10%;
}

</style>
