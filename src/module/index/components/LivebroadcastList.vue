<template>
  <div class="livebroadcastList">
    <div class="proceed-list-wrapper">
      <div class="proceed-list">
        <div class="title">直播中</div>
        <el-table :data="proceedInfo.tableData" stripe style="width: 100%" @row-click="rowClickHandler">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <!--           <el-table-column prop="date" label="时间" width="180">
          </el-table-column> -->
          <el-table-column prop="speaker" label="主讲人">
          </el-table-column>
          <!--           <el-table-column prop="place" label="地点">
          </el-table-column> -->
        </el-table>
      </div>
      <div class="pageControl">
        <el-pagination :current-page.sync="proceedInfo.currentPage" :page-size="proceedInfo.pageSize" layout="total, prev, pager, next" :total="proceedInfo.totalCount" @current-change="proccedPageHanler">
        </el-pagination>
      </div>
    </div>
    <div class="division"></div>
    <div class="end-list-wrapper">
      <div class="end-list">
        <div class="title">已结束</div>
        <el-table :data="endInfo.tableData" stripe style="width: 100%">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <!--           <el-table-column prop="date" label="时间" width="180">
          </el-table-column> -->
          <el-table-column prop="speaker" label="主讲人">
          </el-table-column>
          <!--           <el-table-column prop="place" label="地点">
          </el-table-column> -->
        </el-table>
      </div>
      <div class="pageControl">
        <el-pagination :current-page.sync="endInfo.currentPage" :page-size="endInfo.pageSize" layout="total, prev, pager, next" :total="endInfo.totalCount" @current-change="endPageHanler">
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
        pageSize: 3,
        tableData: [],
        totalCount: 0
      },
      endInfo: {
        currentPage: 1,
        pageSize: 3,
        tableData: [],
        totalCount: 0
      },
      // keyword: null
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    keyword() {
      return this.$store.state.liveKeyword
    }
  },
  methods: {
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
        pageSize: this.proceedInfo.pageSize,
        play_state: 1
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
        pageSize: this.endInfo.pageSize,
        play_state: 2
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
.livebroadcastList {}

.division {
  position: absolute;
  width: 100%;
  top: 48%;
  /*margin: 10px 0;*/
}

.proceed-list {
  position: absolute;
}

.end-list {
  position: absolute;
  top: 50%;
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

.proceed-list-wrapper .pageControl {
  position: absolute;
  top: 40%;
  right: 1.5%;
}

.end-list-wrapper .pageControl {
  position: absolute;
  top: 90%;
  right: 1.5%;
}

</style>
