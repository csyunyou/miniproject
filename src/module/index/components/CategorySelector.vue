<template>
	<div class="category-selector">
		<div class="title"><h4>类型选择：</h4></div>
		<div class="tag-wrapper">
			<!-- <div v-for="rowIdx in category.length/numPerRow" class="category-row"> -->
				<el-button type="primary"  plain v-for="item in category" class="category-tag" size="small" @click="clickHandler(item)" :class="{'active-category':item===selectedCategory}">{{item}}</el-button>
				<!-- <el-tag v-for="colIdx in numPerRow" class="category-tag">{{category[(rowIdx-1)*numPerRow+colIdx-1]}}</el-tag> -->
			<!-- </div> -->
		</div>
	</div>
</template>
<script type="text/javascript">
export default{
	data(){
		return{
			category:["哲学","历史","地理","语文","数学","英语"],
			numPerRow:3
		}
	},
	methods:{
		clickHandler(category){
			if(category===this.selectedCategory)
				this.$store.commit('SET_SELECTED_CATEGORY',null)
			else
				this.$store.commit('SET_SELECTED_CATEGORY',category)

			// console.log(arguments)
		}
	},
	computed:{
		selectedCategory(){
			return this.$store.state.selectedCategory
		}
	}
}
</script>
<style type="text/css" scoped>
.category-selector{
	padding-left:20px;
	
}
.title{
	margin-bottom: 10px;
}
.category-tag{
	margin-right: 5px;
	margin-bottom: 5px;
	margin-left: 0;
}
.category-row{
	margin-bottom: 10px;
}
.active-category{
	background-color:#409EFF;
	color:white;
}
</style>