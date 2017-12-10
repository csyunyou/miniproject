<template>
    <div class="videoPlayer">
        <video class="video-js" controls preload="auto" poster="http://ppt.downhot.com/d/file/p/2014/08/12/9d92575b4962a981bd9af247ef142449.jpg" data-setup="{}">
            <!-- <source src="rtmp://localhost:1935/live1/root" type="rtmp/flv"> -->
            <!-- <source :src="$route.query.videoLink" type="rtmp/flv"> -->
              <source="rtmp://live.hkstv.hk.lxdns.com/live/hks" type="rtmp/flv">
            <!-- <source src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" type: "video/mp4"> -->
        </video>
    </div>
</template>
<script type="text/javascript">
export default {
    data() {
            return {

            }
        },
        mounted() {

            // console.log(this.$route.query.videoLink)
        }
}
</script>
<style type="text/css" scoped>
</style>
