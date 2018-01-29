<template>
  <div class="coupon-wrapper">
    <div class="header">
      <ul>
        <li>有效的优惠券</li>
        <li>过期的优惠券</li>
        <li>已使用的优惠券</li>
      </ul>
    </div>
    <div class="division"></div>
    <div class="coupon-list" ref="couponList">
      <div class="coupon" v-for="(coupon,idx) in tableData" :style="{'margin-right':(idx+1)%colNum===0?0:couponStyle.marginRight,'margin-bottom':couponStyle.marginBottom}">
        <div class="content">
          <div><span :style="{'font-size':'40px'}">{{coupon.discount}}</span>折优惠券</div>
          <div :style="{'font-size': '12px'}">有效期至{{coupon.expiredate}}</div>
        </div>
      </div>
      <!--       <div v-for="(video,idx) in tableData" class="video" :style="{'margin-right':(idx+1)%colNum===0?0:videoStyle.marginRight,'margin-bottom':videoStyle.marginBottom}" @click="itemClickHandler(video)">
        <img :src="video.picture" height="120" width="200">
        <div class="content">
          <div class="description">
            <span>{{video.title}}</span>
            <span>{{video.speaker}}</span>
          </div>
          <div class="price">123元</div>
        </div>
      </div> -->
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
      tableData: [],
      currentPage: 1,
      // pageSize: 10,
      // keyword:null,
      totalCount: 0,
      rowNum: 7,
      contentWidth: 0,
      couponStyle: {
        marginBottom: '10px',
        marginRight: 0
      },
      colNum: null,
      urls: ['user/getAllValidCoupon', 'user/getAllUsedCoupon', 'user/getAllExpiredCoupon'] //0 validate 1 used 2 expire 
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    pageSize() {
      return this.rowNum * this.colNum
    }
  },
  methods: {
    getAllCoupon(type) {
      let vm = this
      this.$axios.post(this.urls[type], {
        user_id: this.userInfo.userid,
        page: this.currentPage - 1,
        pageSize: this.pageSize
      }).then(({ data }) => {
        this.tableData = data.data
        this.totalCount = +data.count
      })
    }
  },
  mounted() {
    // console.log(this.$refs.couponList.clientWidth, window.getComputedStyle(this.$refs.couponList, null).width)
    this.contentWidth = +window.getComputedStyle(this.$refs.couponList, null).width.split('px')[0]
    this.colNum = Math.floor(this.contentWidth / 200)
    this.couponStyle.marginRight = (this.contentWidth - 200 * this.colNum) / (this.colNum - 1) + 'px'
    this.getAllCoupon(0)
  }
}

</script>
<style type="text/css" scoped>
ul {
  list-style: none;
}

.header {
  font-weight: bold;
  margin: 30px;
  font-size: 17px;
}

.coupon-wrapper {}

.coupon-list {
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}

.coupon {
  width: 200px;
  height: 100px;
  background: #3690c0;
  opacity: 0.8;
  border-radius: 5px;
  position: relative;
  flex: 0 0 auto;
  /*	background-image: url(../../../assets/couponBg.jpeg);
	background-size: cover;*/
}

.coupon .content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}
.coupon .content div{
	text-align: center;
}
</style>
