<template>
  <div class="video-recommend">
    <div class="live-broadcast">
      <div class="title"><h4>今日直播类：</h4></div>
      <ul>
        <li v-for="item in liveBroadCastItems">
          <a href="">
      		<span>{{item.itme}}</span>
      		<span>{{item.name}}</span>
      		<span>{{item.host}}</span>
      	</a>
        </li>
      </ul>
    </div>
    <div class="vod">
      <div class="title"><h4>今日视屏类：</h4></div>
      <ul>
        <li v-for="item in vodItems">
          <a href="">
      		<span>{{item.itme}}</span>
      		<span>{{item.name}}</span>
      		<span>{{item.host}}</span>
      	</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      liveBroadCastItems: [{
        time: "11:30",
        name: "underscore源码解析",
        host: "云游"
      }, {
        time: "17:00",
        name: "zepto源码解析",
        host: "云游"
      }],
      vodItems: [{
        time: "18:00",
        name: "vue源码解析",
        host: "云游"
      }]
    }
  }
}

</script>
<style type="text/css" scoped>
li {
  list-style: none;
}
.video-recommend{
	padding: 40px;
}
</style>
