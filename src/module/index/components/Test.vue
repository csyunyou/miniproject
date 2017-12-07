<template>
	<div>
<!-- 		<ul>
			<li v-for="item in evenData">{{item}}</li>
		</ul> -->
		<button @click="data.push(4)">click</button>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			data:[1,2,3]
		}
	},
	computed:{
		evenData(){
			console.log('mutated')
			console.log(this.data)
			return this.data.slice(0,1)
		}
	},
	mounted(){
		for(let i=3;i<8;i++)
			this.data.push(i)
	}
}
</script>
<style type="text/css" scoped>
	
</style>