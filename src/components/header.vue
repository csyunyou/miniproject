<template>
  <div class="header">
    <div class="trademark-wrapper">
      <div class="content">
        <div><h1>今朝讲坛</h1></div>
        <div><h2>JZJT.com</h2></div>
      </div>
    </div>
    <div class="explore-wrapper">
      <el-input placeholder="请输入内容" v-model="input" class="explore-btn">
        <template slot="append">搜索</template>
      </el-input>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      input:""
    }
  }
}

</script>
<style type="text/css" scoped>
.header {
  border-bottom: 9px solid #ef3b2c;
  flex: 0 0 9em;
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
  background:#99d8c9;
  position: relative;
}

.trademark-wrapper .content{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.explore-wrapper{
  flex:1;
  position: relative;
  background:#f0f0f0;
}
.explore-btn{
  width:50%;
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  
}
</style>
