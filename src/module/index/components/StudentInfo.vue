<template>
  <div class="student-info">
    <div class="exit">
      <a href="">退出</a>
    </div>
    <div class="info">
      <div class="maininfo-wrapper">
        <div class="avatar">
          <img src="../../../assets/favicon.jpg" height="50" width="50" />
        </div>
        <div class="content">
          <div class="student-name">学生用户</div>
          <div>云游的小迷弟</div>
        </div>
      </div>
      <div class="extrainfo-wrapper">
      	<ul class="extrainfo-list">
          <li v-for="(val,key) in linkInfo"><router-link :to="`/${key}`">{{val}}</router-link></li>
      	</ul>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
  	return{
      linkInfo:{
        wallet:'钱包余额',
        footprint:'脚步记录',
        share:'我的分享',
        coupoun:'我的优惠',
        supplementaryInfo:'资料补充',
      }
  		// extraInfoItems:["钱包余额","脚步记录","我的分享","我的优惠","资料补充"]
  	}
  }
}

</script>
<style type="text/css" scoped>
.student-info {
  height: 50%;
  position: relative;
  border-bottom: 15px solid #feb24c;
}

.exit {
  margin: 20px 20px;
  text-align: end;
}

.exit a {
  /*text-decoration: underline;*/
}
.info{
 margin: 40px;
}
.avatar,.content{
	vertical-align:top;
}
.avatar {
  display: inline-block;
  margin-right: 5px;
}
.content{
	font-weight: bold;
}
.student-name{
	color:#e31a1c;
}
.maininfo-wrapper .content {
  display: inline-block;
}
.extrainfo-wrapper{
	/*width:30%;*/
}
.extrainfo-list{
	background:#c7e9c0;
	color:black;
	padding:0;
}
.extrainfo-list li{
	list-style: none;
	margin-bottom: 10px;
	text-align: center;
}
.extrainfo-list li a{
	list-style: none;
	margin-bottom: 10px;
}
</style>
