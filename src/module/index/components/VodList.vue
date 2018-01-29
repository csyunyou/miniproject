<template>
  <div class="vodList" ref="vodList">
    <!--     <div class="title">视屏</div>
    <el-table :data="tableData" stripe style="width: 100%" @row-click="rowClickHandler">
      <el-table-column prop="title" label="标题" width="180">
      </el-table-column>
      <el-table-column prop="speaker" label="主讲人">
      </el-table-column>
    </el-table>-->
    <div class="video-list">
      <div v-for="(video,idx) in tableData" class="video"
      :style="{'margin-right':(idx+1)%colNum===0?0:videoStyle.marginRight,'margin-bottom':videoStyle.marginBottom}" 
      @click="itemClickHandler(video)">
        <img :src="video.picture" height="120" width="200"><!--width 200 height 120-->
        <div class="content">
          <div class="description">
            <span>{{video.title}}</span>
            <span>{{video.speaker}}</span>
          </div>
          <div class="price">123元</div>
        </div>
      </div>
    </div>
    <div class="pageControl">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
    <!--     <div v-for="row in rowNum" class="row">
      <div v-for="column in columnNum" class="column video">
        <img src="../../../assets/videoDefualt.jpg" />
        <div class="content">
          <div class="description">
            <span>some Text</span>
          </div>
          <div class="price">123元</div>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script type="text/javascript">
export default {
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    keyword() {
      return this.$store.state.vodKeyword
    },
/*    colNum() {
      return Math.floor(this.$refs.vodList.clientWidth / 200)
    },*/
    pageSize() {
      return this.rowNum * this.colNum
    },
    selectedCategory() {
      return this.$store.state.selectedCategory
    }
  },
  props: ["contentHeight"],
  data() {
    return {
      tableData: [],
      currentPage: 1,
      // pageSize: 10,
      // keyword:null,
      colNum:null,
      totalCount: 0,
      rowNum: 4,
      contentWidth: 0,
      videoStyle: {
        marginBottom: '10px',
        marginRight: 0
      }
    }
  },
  methods: {
    itemClickHandler(video) {
      console.log(video)
      this.$axios.post('user/addRecord', {
        user_id: this.userInfo.userid,
        video_id: video.id,
        type: "vod"
      })
      this.$router.push({
        path: `/videoPlayer`,
/*        query: {
          id: `${video.id}`,
          type: 'vod'
        }*/
      })
      this.$store.commit('SET_SELECTED_VIDEO',video)
    },
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
        keyword: this.keyword,
        pageSize: this.pageSize,
        category_title: this.selectedCategory
      }).then(({ data }) => {
        this.tableData = data.data
        this.totalCount = +data.count
        /*      if (this.$route.query.keyword)
                this.tableData = this.tableData.filter(function(d) {
                  return d.title.indexOf(vm.$route.query.keyword) !== -1 || d.speaker.indexOf(vm.$route.query.keyword) !== -1;
                })*/
      })
    }
  },
  watch: {
    currentPage() {
      this.getAllVideo()
    },
    keyword(val) {
      this.getAllVideo()
    },
    selectedCategory(val) {
      this.getAllVideo()
    }
    // keyword(val) {
    //   this.getAllVideo(val)
    // }
  },
  /*  beforeRouteUpdate(to) {
      // console.log('update', to)
      this.keyword = to.query.keyword
      this.getAllVideo()
    },*/
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_VOD_KEYWORD', null)
    next()
  },
  mounted() {
    console.log('vod mounted')
    // this.$store.commit('SET_IS_FIRST_SEARCH', false)
    // this.keyword = this.$route.query.keyword
    // let rowNum=Math.floor(this.$refs.vodList.clientWidth/200)
    // console.log('pageSize:', this.pageSize, this.rowNum)
    // console.log(this.$refs.vodList.clientWidth,window.getComputedStyle(this.$refs.vodList, null).width)
    this.colNum=Math.floor(this.$refs.vodList.clientWidth / 200)
    this.videoStyle.marginRight = +(window.getComputedStyle(this.$refs.vodList, null).width.split('px')[0]- 200 * this.colNum) / (this.colNum-1) + 'px'
    // this.videoStyle.mar
    this.getAllVideo()

    // console.log(this.contentHeight,this.$refs.vodList.clientWidth)
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
  /*margin: 20px;*/
  padding: 20px;
  /*height: 90%;*/
  /*width: 100%;*/
  /*flex-direction:column;*/
  /*justify-content: space-between;*/
}

.video-list {
  display: flex;
  flex-wrap: wrap;
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

.video {
  flex: 0 0 auto;
  /*margin-right: 5px;*/
}

.video .content {
  background-color: white;
}


.description {
  font-size: 12px;
}

</style>
