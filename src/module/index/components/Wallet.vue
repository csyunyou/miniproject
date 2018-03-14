<template>
  <div class="wallet">
    <div class="walletInfo">
      <div class="balance-wrapper">
        <div class="title">账户余额:</div>
        <span class="content">{{balance}}</span>
        <span>RMB</span>
      </div>
      <span style="font-size:30px;">+</span>
      <div class="award-wrapper">
        <div class="title">赠送金额:</div>
        <span class="content">{{award}}</span>
      </div>
      <div class="note">(注:优先扣除赠送金额,赠送金额的有效为一个月)</div>
    </div>
    <div class="division"></div>
    <div class="bill-wrapper">
      <div class="title">支出明细</div>
      <div class="billTable">
        <el-table :data="tableData" style="width:460px">
          <el-table-column prop="date" label="时间" sortable width="180">
          </el-table-column>
          <el-table-column prop="money" label="金额" width="100">
          </el-table-column>
          <el-table-column prop="type" label="类型" width="180">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pageControl">
      <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      balance: 0,
      award: 0,
      tableData: [],
      currentPage: 1,
      pageSize: 6,
      totalCount: 0,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  watch: {
    currentPage() {
      this.getAllRecords()
    }
  },
  methods: {
    getAllRecords() {
      let vm = this
      this.$axios.post('user/getBillDetail', {
        user_id: this.userInfo.userid,
        page: this.currentPage - 1,
        pageSize: this.pageSize
      }).then(function({ data }) {
        vm.tableData = data.data
        vm.totalCount = +data.count
      })
    },
  },
  mounted() {
    let vm = this
    this.$axios.post('User/getWallet', {
      user_id: this.userInfo.userid
    }).then(({ data }) => {
      this.balance = +data.data.balance
      this.award = +data.data.award
    })
    this.getAllRecords()
    /*    this.$axios.post('user/getBillDetail', {
          user_id: this.userInfo.userid
        }).then(({ data }) => {
          this.tableData = data.data
        })*/
  }
}

</script>
<style type="text/css" scoped>
.walletInfo {
  margin: 20px;
}

.title {
  font-weight: bold;
}

.balance-wrapper,
.award-wrapper {
  display: inline-block;
  width: 280px;
}


.award-wrapper {
  margin-left: 20px;
}

.note {
  font-size: 12px;
  color: #93999f;
}

.content {
  font-size: 60px;
  margin-left: 90px;
}

.bill-wrapper {
  margin: 20px;
}

.bill-wrapper .title {
  margin-bottom: 10px;
}

</style>
