<template>
  <div class="livebroadcastList">
    <div class="proceed-list-wrapper">
      <div class="proceed-list">
        <div class="title">直播中</div>
        <el-table :data="proceedInfo.tableData.slice((proceedInfo.currentPage-1)*proceedInfo.pageSize,(proceedInfo.currentPage-1)*proceedInfo.pageSize+proceedInfo.pageSize)" stripe style="width: 100%" @row-click="rowClickHandler">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="date" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="speaker" label="主讲人">
          </el-table-column>
          <el-table-column prop="place" label="地点">
          </el-table-column>
        </el-table>
      </div>
      <div class="pageControl">
        <el-pagination :current-page.sync="proceedInfo.currentPage" :page-size="proceedInfo.pageSize" layout="total, prev, pager, next" :total="proceedInfo.tableData.length">
        </el-pagination>
      </div>
    </div>
    <div class="division"></div>
    <div class="end-list-wrapper">
      <div class="end-list">
        <div class="title">已结束</div>
        <el-table :data="endInfo.tableData.slice((endInfo.currentPage-1)*endInfo.pageSize,(endInfo.currentPage-1)*endInfo.pageSize+endInfo.pageSize)" stripe style="width: 100%">
          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="date" label="时间" width="180">
          </el-table-column>
          <el-table-column prop="speaker" label="主讲人">
          </el-table-column>
          <el-table-column prop="place" label="地点">
          </el-table-column>
        </el-table>
      </div>
      <div class="pageControl">
        <el-pagination :current-page.sync="endInfo.currentPage" :page-size="endInfo.pageSize" layout="total, prev, pager, next" :total="endInfo.tableData.length">
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
        tableData: []
      },
      endInfo: {
        currentPage: 1,
        pageSize: 3,
        tableData: []
      }
    }
  },
  methods: {
    rowClickHandler(row, evt, col) {
      this.$router.push({ path: `/videoPlayer`, query: { id: `${row.id}`, type: 'live' } })
    }
  },
  mounted() {
    let rand
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
    }
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
