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
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      balance: 0,
      award: 0
    }
  },
  computed:{
    userInfo(){
      return this.$store.state.userInfo
    }
  },
  mounted() {
    let vm=this
    this.$axios.post('User/getWallet',{
      user_id:this.$store.state.userInfo.userid
    }).then(({ data })=>{
      this.balance=+data.data.balance
      this.award=+data.data.award
    })
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
  width:200px;
}


.award-wrapper {
  margin-left: 20px;
}

.note {
  font-size: 12px;
  color: #93999f
}

.content {
  font-size: 60px;
  margin-left: 90px;
}

</style>
