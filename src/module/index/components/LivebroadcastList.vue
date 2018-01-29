<template>
  <div class="livebroadcastList" ref="livebroadcastList">
    <div class="proceed-list" ref="proceedList">
      <div class="title">直播中</div>
      <!--         <el-table :data="proceedInfo.tableData" stripe style="width: 100%" @row-click="rowClickHandler">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="speaker" label="主讲人">
          </el-table-column>
        </el-table> -->
      <div class="video-list">
        <div v-for="(video,idx) in proceedInfo.tableData" class="video" :style="{'margin-right':(idx+1)%colNum===0?0:videoStyle.marginRight,'margin-bottom':videoStyle.marginBottom}" @click="itemClickHandler(video)">
          <img :src="video.picture" height="120" width="200">
          <!--width 200 height 120-->
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
        <el-pagination :current-page.sync="proceedInfo.currentPage" :page-size="proceedPageSize" layout="total, prev, pager, next" :total="proceedInfo.totalCount" @current-change="proccedPageHanler">
        </el-pagination>
      </div>
    </div>
    <div class="division"></div>
    <div class="end-list">
      <div class="title">已结束</div>
      <!--         <el-table :data="endInfo.tableData" stripe style="width: 100%">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="speaker" label="主讲人">
          </el-table-column>
        </el-table> -->
      <div class="video-list">
        <div v-for="(video,idx) in endInfo.tableData" class="video" :style="{'margin-right':(idx+1)%colNum===0?0:videoStyle.marginRight,'margin-bottom':videoStyle.marginBottom}" @click="itemClickHandler(video)">
          <img :src="video.picture" height="120" width="200">
          <!--width 200 height 120-->
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
        <el-pagination :current-page.sync="endInfo.currentPage" :page-size="endPageSize" layout="total, prev, pager, next" :total="endInfo.totalCount" @current-change="endPageHanler">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      proceedInfo: {
        currentPage: 1,
        tableData: [],
        totalCount: 0
      },
      endInfo: {
        currentPage: 1,
        tableData: [],
        totalCount: 0
      },
      colNum:null,
      proceedRowNum: 2,
      endRowNum: 1,
      contentWidth: 0,
      videoStyle: {
        marginBottom: '10px',
        marginRight: 0
      }
      // keyword: null
    }
  },
  props: ["contentHeight"],
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    keyword() {
      return this.$store.state.liveKeyword
    },
/*    colNum() {
      return Math.floor(this.$refs.livebroadcastList.clientWidth / 200)
    },*/
    proceedPageSize() {
      return this.proceedRowNum * this.colNum
    },
    endPageSize() {
      return this.endRowNum * this.colNum
    },
    selectedCategory() {
      return this.$store.state.selectedCategory
    }
  },
  methods: {
    itemClickHandler(video) {
      this.$axios.post('user/addRecord', {
        user_id: this.userInfo.userid,
        video_id: video.id,
        type: "live"
      })
      this.$router.push({ path: `/videoPlayer`})
      this.$store.commit('SET_SELECTED_VIDEO',video)
    },
    rowClickHandler(row, evt, col) {
      this.$axios.post('user/addRecord', {
        user_id: this.userInfo.userid,
        video_id: row.id,
        type: "live"
      })
      this.$router.push({ path: `/videoPlayer`, query: { id: `${row.id}`, type: 'live' } })
    },
    getAllProceedVideo() {
      // console.log(this.$route.query.keyword)
      // console.log(keyword)
      let vm = this
      this.$axios.post('index/getAllVideo', {
        type: 1,
        page: this.proceedInfo.currentPage - 1,
        keyword: this.keyword,
        pageSize: this.proceedPageSize,
        play_state: 1,
        category_title: this.selectedCategory
      }).then(({ data }) => {
        this.proceedInfo.tableData = data.data
        this.proceedInfo.totalCount = +data.count
      })
    },
    getAllEndVideo() {
      // console.log(this.$route.query.keyword)
      // console.log(keyword)
      let vm = this
      this.$axios.post('index/getAllVideo', {
        type: 1,
        page: this.endInfo.currentPage - 1,
        keyword: this.keyword,
        pageSize: this.endPageSize,
        play_state: 2,
        category_title: this.selectedCategory
      }).then(({ data }) => {
        this.endInfo.tableData = data.data
        this.endInfo.totalCount = +data.count
      })
    },
    proccedPageHanler(page) {
      this.getAllProceedVideo()
    },
    endPageHanler(page) {
      this.getAllEndVideo()
    }
  },
  watch: {
    keyword(val) {
      this.getAllProceedVideo()
      this.getAllEndVideo()
    },
    selectedCategory(val) {
      this.getAllProceedVideo()
      this.getAllEndVideo()
    }
  },
  /*  watch: {
      proceedInfo.currentPage() {
        this.getAllProceedVideo()
      }
    },*/
  /*  beforeRouteUpdate(to) {
      // console.log('update', to)
      this.keyword = to.query.keyword
      this.getAllProceedVideo()
    },*/
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_LIVE_KEYWORD', null)
    next()
  },
  mounted() {
    /*    let vm = this
        this.$store.commit('SET_IS_FIRST_SEARCH', false)
        this.keyword = this.$route.query.keyword*/
    console.log(this.colNum, window.getComputedStyle(this.$refs.proceedList, null).width)
    this.colNum=Math.floor(this.$refs.proceedList.clientWidth / 200)
    //20px margin,200px width video
    this.videoStyle.marginRight = (+window.getComputedStyle(this.$refs.proceedList, null).width.split('px')[0] - 40 - 200 * this.colNum) / (this.colNum - 1) + 'px'
    this.getAllProceedVideo()
    this.getAllEndVideo()
    /*    let rand
        for (let i = 0; i < 10; i++) {
          if (i/ 5 <1) {
            this.proceedInfo.tableData.push({
              title: "和平与战争",
              date: "2016-10-11",
              speaker: "云游",
              place: "杭州西湖区",
              id:1
            })
            this.endInfo.tableData.push({
              title: "如何高效地学习",
              date: "2016-03-01",
              speaker: "旋律",
              place: "杭州余杭区",
              id:2
            })
          } else {
            this.proceedInfo.tableData.push({
              title: "编程之美",
              date: "2016-03-01",
              speaker: "旋律",
              place: "杭州余杭区",
              id:3
            })
            this.endInfo.tableData.push({
              title: "数学之美",
              date: "2016-10-11",
              speaker: "云游",
              place: "杭州西湖区",
              id:4
            })
          }
        }*/
  }
}

</script>
<style type="text/css" scoped>
.livebroadcastList {
  /*padding: 20px;*/
}

.video-list {
  display: flex;
  flex-wrap: wrap;
}


.division {
  /*position: absolute;*/
  width: 100%;
  /*top: 470px;*/
  /*margin: 10px 0;*/
}

.proceed-list {
  /*position: absolute;*/
}

.end-list {
  /*position: absolute;*/
}

.proceed-list,
.end-list {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
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
  /*position: absolute;*/
  /*top: 40%;*/
  /*right: 1.5%;*/
}

.description {
  font-size: 12px;
}

</style>
