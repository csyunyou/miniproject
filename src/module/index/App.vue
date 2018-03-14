<template>
  <div id="app">
    <v-header></v-header>
    <div class="HolyGrail-body" ref="holyGrailBody">
      <main class="HolyGrail-content">
        <router-view :contentHeight="holyGrailHeight"></router-view>
      </main>
      <nav class="HolyGrail-nav">
        <student-info></student-info>
        <special-recommend></special-recommend>
      </nav>
      <aside class="HolyGrail-ads">
        <category-selector></category-selector>
      </aside>
    </div>
    <v-footer></v-footer>
  </div>
</template>
<script>
import header from './components/header.vue'
import footer from './components/footer.vue'
import studentInfo from './components/StudentInfo.vue'
import specialRecommend from './components/SpecialRecmmend.vue'
import categorySelector from './components/CategorySelector.vue'
export default {
  name: 'app',
  components: {
    "v-header": header,
    'v-footer': footer,
    studentInfo,
    specialRecommend,
    categorySelector,
  },
  data() {
    return {
      holyGrailHeight: 0
    }
  },
  methods: {
    setPassword() {
      let url = window.location.href
      let code = url.split('?')[1].split('=')
      console.log(code)
      if (code[0] === 'pwdCode' && code[1])
        this.$store.commit("SET_PWD_CODE", code[1])
    },
    autoLogin() {
      let vm=this
      this.$axios.post('/public/islogin').then(function({ data }) {
        if (data.code === 0) {
          vm.$store.commit('SET_STATUS', 'onLine')
          vm.$store.commit('SET_USERINFO', data.data)
        }
      })
    }
  },
  mounted() {
    this.holyGrailHeight = this.$refs.holyGrailBody.clientHeight
    this.autoLogin()
    this.setPassword()
    // console.log(this.$refs.holyGrailBody.clientHeight,this.$refs.holyGrailBody.offsetHeight)
  }
}

</script>
<style type="text/css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /*font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 90%;
  margin: 0 auto;
  /*
  text-align: center;
  color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*display: flex;*/
  /*flex-direction: column;*/
  /*border:1px solid black;*/
  /*height: 950px;*/
}

.HolyGrail-content .division {
  height: 10px;
  background-color: #fb6a4a;
}

.HolyGrail-body {
  display: flex;
  /*flex:2;*/
  height: 770px;
}

.HolyGrail-content {
  flex: 1;
  background-color: #f7fcf5;
  border-right: 2px solid #ef3b2c;
  border-left: 2px solid #ef3b2c;
  position: relative;
}

.HolyGrail-nav,
.HolyGrail-ads {
  flex: 0 0 220px;
  background: #f0f0f0;
}

.HolyGrail-nav {
  order: -1;
  background: #f0f0f0;
}

</style>
