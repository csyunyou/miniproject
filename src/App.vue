<template>
  <div id="app">
    <v-header></v-header>
    <div class="HolyGrail-body">
      <main class="HolyGrail-content">
        <recommendation></recommendation>
        <div class="division"></div>
        <video-recommendation></video-recommendation>
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
import recommendation from './components/Recommendation.vue'
import videoRecommendation from './components/VideoRecommend.vue'
import categorySelector from './components/CategorySelector.vue'
export default {
  name: 'app',
  components:{
    "v-header":header,
    'v-footer':footer,
    studentInfo,
    specialRecommend,
    recommendation,
    videoRecommendation,
    categorySelector
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width:80%;
  margin:0 auto;
/*
  text-align: center;
  color: #2c3e50;*/
  /*margin-top: 60px;*/
  display: flex;
  flex-direction: column;
  /*border:1px solid black;*/
  height: 950px;
}
.division{
  height: 10px;
  background-color: #fb6a4a;
}
.HolyGrail-body{
  display: flex;
  flex:2;
}
.HolyGrail-content{
  flex:1;
  background-color: #f7fcf5;
  border-right:2px solid #ef3b2c;
  border-left:2px solid #ef3b2c;


}
.HolyGrail-nav,.HolyGrail-ads{
  flex:0 0 20em;
  background:#f0f0f0;
}
.HolyGrail-nav{
  order:-1;
  background:#f0f0f0;
  


}
</style>
