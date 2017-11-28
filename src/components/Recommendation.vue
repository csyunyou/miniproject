<template>
  <div class="recommendation">
<!--     <div class="books-carousel">
      <el-carousel :interval="4000" type="card" height="250px" arrow="always">
        <el-carousel-item v-for="item in 3" :key="item" class="item-wrapper">
          <img src='../assets/book1.jpg' height="200" width="200" />
          <div>今日推荐：红宝书</div>
          <div>时间：2017年11月14日</div>
        </el-carousel-item>
      </el-carousel>
    </div> -->
    <div>
          <video class="video-js" controls preload="auto"  poster="http://ppt.downhot.com/d/file/p/2014/08/12/9d92575b4962a981bd9af247ef142449.jpg" data-setup="{}">
            <source src="rtmp://localhost:1935/live1/root" type="rtmp/flv">  
          </video>
    </div>
  </div>
</template>
<script type="text/javascript">
// require('videojs-flash')
// console.log(flash)
// console.log(videojs.getTech('Flash')）
export default {
  data() {
    return {
      playerOptions: {
        autoplay: false, // 自动播放
        controls: true, // 是否显示控制栏
        techOrder: ['flash', 'html5'], // 兼容顺序
        sourceOrder: true, // 
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        sources: [{ // 流配置，数组形式，会根据兼容顺序自动切换
          type: 'rtmp/mp4',
          src: 'rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov'
        }, {
          withCredentials: false,
          type: 'application/x-mpegURL',
          src: 'http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8'
        }],
        poster: "/static/img/no_data.png", // 播放器默认图片
        // controlBar: { // 配置控制栏
        //   timeDivider: false, // 时间分割线
        //   durationDisplay: false, // 总时间
        //   progressControl: true, // 进度条
        //   customControlSpacer: true, // 未知
        //   fullscreenToggle: true // 全屏
        // },
      },
    }
  },
    components: {
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
