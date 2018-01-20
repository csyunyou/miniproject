<template>
  <div class="vodList">
    <div class="title">视屏</div>
    <el-table :data="tableData" stripe style="width: 100%" @row-click="rowClickHandler">
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <!--       <el-table-column prop="date" label="时间" width="180">
      </el-table-column> -->
      <el-table-column prop="speaker" label="主讲人">
      </el-table-column>
    </el-table>
    <div class="pageControl">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
/*    keyword() {
      return this.$store.state.vodSearchKeyword
    }*/
  },
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 3,
      keyword:null,
      totalCount:0
    }
  },
  methods: {
    rowClickHandler(row, evt, col) {
      this.$axios.post('user/addRecord', {
        user_id: this.userInfo.userid,
        video_id: row.id,
        type: "vod"
      })
      this.$router.push({
        path: `/videoPlayer`,
        query: {
          id: `${row.id}`,
          type: 'vod'
        }
      })
    },
    getAllVideo() {
      // console.log(this.$route.query.keyword)
      // console.log(keyword)
      let vm = this
      this.$axios.post('index/getAllVideo', {
        type: 2,
        page: this.currentPage - 1,
        keyword:this.keyword,
        pageSize:this.pageSize
      }).then(({ data }) => {
        this.tableData = data.data
        this.totalCount=+data.count
        /*      if (this.$route.query.keyword)
                this.tableData = this.tableData.filter(function(d) {
                  return d.title.indexOf(vm.$route.query.keyword) !== -1 || d.speaker.indexOf(vm.$route.query.keyword) !== -1;
                })*/
      })
    }
  },
  watch: {
    currentPage(){
      this.getAllVideo()
    }
    // keyword(val) {
    //   this.getAllVideo(val)
    // }
  },
  beforeRouteUpdate(to) {
    // console.log('update', to)
    this.keyword = to.query.keyword
    this.getAllVideo()
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_IS_FIRST_SEARCH', true)
    next()
  },
  mounted() {
    console.log('vod mounted')
    this.$store.commit('SET_IS_FIRST_SEARCH', false)
    this.keyword = this.$route.query.keyword
    this.getAllVideo()
    /*    let rand, vm = this
        for (let i = 0; i < 10; i++) {
          if (i /5 <1) {
            this.tableData.push({
              title: "和平与战争",
              date: "2016-10-11",
              speaker: "云游",
              // link: "http://localhost:3001/video/testmp4.mp4",
              id: 3
            })
            this.tableData.push({
              title: "如何高效地学习",
              date: "2016-03-01",
              speaker: "旋律",
              // link: "http://localhost:3001/video/testmp4.mp4",
              id: 4
            })
          } else {
            this.tableData.push({
              title: "数学之美",
              date: "2016-03-01",
              speaker: "旋律",
              // link: "http://localhost:3001/video/testmp4.mp4",
              id: 4
            })
            this.tableData.push({
              title: "Linux从入门到死亡",
              date: "2016-10-11",
              speaker: "云游",
              // link: "http://localhost:3001/video/testmp4.mp4",
              id: 3
            })
          }
        }*/


  }
}

</script>
<style type="text/css" scoped>
.vodList {
  margin: 20px;
}

.title {
  text-align: center;
  /*font-weight: bold;*/
  font-size: 20px;
  margin-bottom: 10px;
}

.pageControl {
  text-align: right;
  margin-top: 10px;
}

</style>
