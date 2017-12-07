<template>
  <div class="index-recommendation">
    <recommendation></recommendation>
    <div class="division"></div>
    <video-list></video-list>
  </div>
</template>
<script type="text/javascript">
import recommendation from './Recommendation.vue'
import videoList from './VideoList.vue'
export default{
	components:{
		recommendation,
		videoList
	}
}
</script>
<style type="text/css" scoped>
.division {
  height: 10px;
  background-color: #fb6a4a;
}

</style>
