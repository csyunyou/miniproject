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
      <el-input placeholder="请输入内容" v-model="searchInput" class="explore-btn">
        <el-select v-model="type" slot="prepend" placeholder="视屏类型" class="typeSelector">
          <el-option label="视屏" :value="0"></el-option>
          <el-option label="直播" :value="1"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchBtnClickHandler"></el-button>
      </el-input>
      <ul class="linklist-wrapper">
        <li v-for="(val,key) in linkInfo">
          <router-link :to="`/${key}`">{{val}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
import axios from 'axios'
export default {
  data() {
    return {
      searchInput: "",
      linkInfo: {
        index: '首页',
        vodList: '视屏',
        livebroadcastList: '直播',
        about: '关于'
      },
      type: ''
    }
  },
  methods: {
    searchBtnClickHandler() {
      // console.log(this.type,this.searchInput)
      this.$store.commit(this.type===0?'SET_VOD_KEYWORD':'SET_LIVE_KEYWORD',this.searchInput)
      // this.$store.commit('')
      this.$router.push({
        path: this.type === 0 ? "/vodList" : "/livebroadcastList",
        // query: { keyword: this.searchInput,isFirst:this.isFirstSearch}
      })
    }

  },
  computed:{
    isFirstSearch(){
      return this.$store.state.isFirstSearch
    }
  }
}

</script>
<style type="text/css" scoped>
.header {
  border-bottom: 9px solid #ef3b2c;
  flex: 0 0 7em;
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
  width: 400px;
  position: absolute;
  top: 50%;
  left: 40%;
  transform: translate(-50%, -50%);
}





.linklist-wrapper {
  position: absolute;
  right: 15px;
  bottom: 0;
}

.linklist-wrapper li {
  list-style: none;
  display: inline-block;
  margin-right: 20px;
}

.typeSelector {
  width: 120px;
}

</style>
