<template>
  <div class="footer">
    <div v-for="group in linksGroup" class="link-group">
      <div class="title">{{group.title}}</div>
      <div class="subtitle">
        <div v-for="item in group.links" class="link">
         <a :href="item.url">{{item.title}}</a>
    	</div>
      </div>
    </div>
    <div class="qrcode-wrapper">
    	<div class="title">微信公众号</div>
    	<img src="../../../assets/publicQrcode.jpg" height="80">
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      linksGroup: [{
        title: '教育部',
        links: [{
          title: '浙江省教育部',
          url: 'http://www.zjedu.gov.cn/default.html'
        }]
      }, {
        title: '高校',
        links: [{
          title: '浙江大学',
          url: 'http://www.zju.edu.cn/'
        }, {
          title: '浙江大学研究生',
          url: 'http://grs.zju.edu.cn/'
        }, {
          title: '浙江大学管理学院',
          url: 'http://www.som.zju.edu.cn/'
        }]
      }, {
        title: '图书馆',
        links: [{
          title: '浙江省图书馆',
          url: 'http://www.zjlib.cn/'
        }, {
          title: '浙江大学图书馆',
          url: 'http://libweb.zju.edu.cn/libweb/'
        }]
      }, {
        title: '搜索',
        links: [{
          title: 'CALIS联合目录简单检索',
          url: 'http://opac.calis.edu.cn/opac/simpleSearch.do'
        }, {
          title: 'E读',
          url: 'http://www.yidu.edu.cn/'
        }]
      }]
    }
  }
}

</script>
<style type="text/css" scoped lang="scss">
.footer {
padding-top:10px;
  background-color: #f7fcf5;

  // height: 100px;
  border: 1px solid black;
  display: flex;
  .link-group,.qrcode-wrapper {
    flex: auto;
    text-align: center;

    .title {
    	margin-bottom: 5px;
    	font-weight: bold;
    }
    .subtitle {}
  }
}

</style>
