<template>
    <div class="vodList">
        <div class="title">视屏</div>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,(currentPage-1)*pageSize+pageSize)" stripe style="width: 100%" @row-click="rowClickHandler">
            <el-table-column prop="title" label="标题" width="180">
            </el-table-column>
            <el-table-column prop="date" label="时间" width="180">
            </el-table-column>
            <el-table-column prop="speaker" label="主讲人">
            </el-table-column>
        </el-table>
        <div class="pageControl">
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" :total="tableData.length">
            </el-pagination>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    computed: {
        arr() {
            console.log('mutated')
            let data = this.tableData.slice(0, 1)
        }
    },
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10
        }
    },
    methods: {
        rowClickHandler(row, evt, col) {
          this.$router.push({path:`/videoPlayer`,query:{id:`${row.id}`,type:'vod'}})
        }
    },
    mounted() {
        let rand,vm=this
        for (let i = 0; i < 20; i++) {
            rand = Math.floor(Math.random() * 5)
            if (rand % 2 === 0)
                this.tableData.push({
                    title: "和平与战争",
                    date: "2016-10-11",
                    speaker: "云游",
                    link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                    id:3
                })
            else
                this.tableData.push({
                    title: "如何高效地学习",
                    date: "2016-03-01",
                    speaker: "旋律",
                    link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                    id:4
                })
        }
        console.log(this.$route.query.keyword)
        if(!this.$route.query.keyword)
            return this.tableData
        this.tableData=this.tableData.filter(function(d){
          return d.title.indexOf(vm.$route.query.keyword)!==-1||d.speaker.indexOf(vm.$route.query.keyword)!==-1;
        })
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
