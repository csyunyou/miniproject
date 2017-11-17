<template>
  <div class="recommendation">
    <div class="books-carousel">
      <el-carousel :interval="4000" type="card" height="250px" arrow="always">
        <el-carousel-item v-for="item in 3" :key="item" class="item-wrapper">
          <img src='../assets/book1.jpg' height="200" width="200" />
          <div>今日推荐：红宝书</div>
          <div>时间：2017年11月14日</div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {

    }
  }
}

</script>
<style type="text/css" scoped>
.books-carousel {
  margin: 20px;
}
.item-wrapper{
	text-align: center;
}
</style>
