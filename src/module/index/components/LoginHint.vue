<template>
	<div class="loginHint">
		<p>很抱歉，您未登录无法查看</p>
		<p @click="$store.commit('SET_SHOWLOGIN',true)" class="clickInfo">点我登录</p>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			
		}
	}
}
</script>
<style type="text/css" scoped>
.loginHint{
	text-align: center;
	position: absolute;
	top:50%;
	left:50%;
	transform: translateX(-50%) translateY(-50%);
}
.clickInfo{
	text-decoration: underline;
	cursor: pointer;
}
</style>