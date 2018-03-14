<template>
  <div class="category-selector">
    <div class="title">
      <h4>类型选择：</h4></div>
    <div class="tag-wrapper">
      <el-radio v-model="categoryVal" :label="item" :disabled="disabled" border v-for="item in category" class="category-tag">{{item}}</el-radio>
      <!-- <div v-for="rowIdx in category.length/numPerRow" class="category-row"> -->
      <!-- 				<el-button type="primary"  plain v-for="item in category" class="category-tag" size="small" @click="clickHandler(item)" :class="{'active-category':item===selectedCategory}">{{item}}</el-button> -->
      <!-- <el-tag v-for="colIdx in numPerRow" class="category-tag">{{category[(rowIdx-1)*numPerRow+colIdx-1]}}</el-tag> -->
      <!-- </div> -->
      <el-button type="primary" class="resetbtn" @click="categoryVal=''">重置</el-button>
      <span>{{$route.path}}</span>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      category: ["哲学", "历史", "地理", "语文", "数学", "英语"],
      numPerRow: 3,
      categoryVal: ""
    }
  },
  methods: {
    clickHandler(category) {
      if (category === this.selectedCategory)
        this.$store.commit('SET_SELECTED_CATEGORY', null)
      else
        this.$store.commit('SET_SELECTED_CATEGORY', category)

      // console.log(arguments)
    },
    changeHandler() {

    }
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory
    },
    disabled(){
      // if(!this.$router.route) return true
      return this.$route.path!=='/livebroadcastList'&&this.$route.path!=='/vodList'
    }
  },
  watch: {
    categoryVal(val) {
/*      this.$router.push({
        path: `/vodList`
      })*/
      this.$store.commit('SET_SELECTED_CATEGORY', this.categoryVal)
    }
  }
}

</script>
<style type="text/css" scoped>
.resetbtn {
  width: 173px;
}

.category-selector {
  padding-left: 20px;
}

.title {
  margin-bottom: 10px;
}

.category-tag {
  /*margin-right: 5px;*/
  margin-bottom: 5px;
  margin-left: 0 !important;
}

.category-tag:nth-child(2n+1) {
  margin-right: 5px;
  ;
}

.category-row {
  margin-bottom: 10px;
}

.active-category {
  background-color: #409EFF;
  color: white;
}

</style>
