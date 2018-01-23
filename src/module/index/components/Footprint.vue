<template>
  <div class="footprint">
    <div class="category-statistics">
      <div class="title">类别统计</div>
      <div class="piechart"></div>
    </div>
    <div class="division"></div>
    <div class="record-wrapper">
      <div class="title">脚步记录</div>
      <div class="recordTable">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="title" label="标题" sortable width="180">
          </el-table-column>
          <el-table-column prop="type" label="类型" width="180">
          </el-table-column>
          <el-table-column prop="category_title" label="类别" width="100" :filters="filterOpts" :filter-method="filterTag" filter-placement="bottom-end">
            <!--                     <template slot-scope="scope">
                        <el-tag close-transition>{{scope.row.tag}}</el-tag>
                    </template> -->
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
import * as d3 from 'd3'
import _ from 'underscore'
export default {
  data() {
    return {
      filterOpts: [{
        text: '哲学',
        value: '哲学'
      }, {
        text: '数学',
        value: '数学'
      }, {
        text: '语文',
        value: '语文'
      }],
      tableData: [
        /*{
                title: "和平与战争",
                date: "2016-10-11",
                speaker: "云游",
                link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                category: "哲学",
                type: "直播"
              }, {
                title: "和平与战争",
                date: "2016-10-11",
                speaker: "云游",
                link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                category: "哲学",
                type: "视屏"
              }, {
                title: "和平与战争",
                date: "2016-10-11",
                speaker: "云游",
                link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                category: "数学",
                type: "直播"
              }, {
                title: "和平与战争",
                date: "2016-10-11",
                speaker: "云游",
                link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                category: "语文",
                type: "视屏"
              }*/
      ],
      pieData: [],
      radius: 70,
      categoryColorMap: ['#7fc97f', '#beaed4', '#fdc086'],
      currentPage: 1,
      pageSize: 4,
      totalCount: 0,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    }
  },
  watch:{
    currentPage(){
      this.getAllRecords()
    }
  },
  methods: {
    filterTag(value, row) {
      return row.category === value;
    },
    drawPieChart() {
      let vm = this
      var svg = d3.select(".piechart")
        .append("svg")
        .append("g").attr("transform", `translate(${this.radius*2},${this.radius})`)

      let slices = svg.append("g").attr("class", "slices"),
        labels = svg.append("g").attr("class", "labels"),
        lines = svg.append("g").attr("class", "lines");

      //Slice
      var pie = d3.pie().value(function(d) {
        return d.count;
      });
      var arc = d3.arc()
        .outerRadius(this.radius * 0.7)
        .innerRadius(this.radius * 0.4);
      // console.log(pie(this.pieData))
      slices.selectAll('.slice').data(pie(this.pieData)).enter().append("path").attr("d", arc)
        .attr("class", "slice").style("fill", (val, idx) => this.categoryColorMap[idx])

      //Label
      function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
      }
      var outerArc = d3.arc()
        .innerRadius(this.radius * 0.9)
        .outerRadius(this.radius * 0.9);
      var text = labels.selectAll(".label")
        .data(pie(this.pieData));

      text.enter()
        .append("text")
        .attr("transform", function(d) {
          let pos = outerArc.centroid(d);
          pos[0] = vm.radius * (midAngle(d) < Math.PI ? 1 : -1);
          return "translate(" + pos + ")";
        })
        .attr("font-size", "10px")
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) {
          return midAngle(d) < Math.PI ? "start" : "end";
        })
        .text(function(d) {
          return d.data.category_title;
        });

      //PolyLine
      lines.selectAll(".line").data(pie(this.pieData)).enter().append("polyline").attr("class",
          "line")
        .attr("points", function(d) {
          let pos = outerArc.centroid(d);
          pos[0] = vm.radius * 0.9 * (midAngle(d) < Math.PI ? 1 : -1);
          return [arc.centroid(d), outerArc.centroid(d), pos];
        })
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stoke-width", "3px")
        .attr("opacity", ".3")

    },
    getAllRecords() {
      let vm=this
      this.$axios.post('user/getAllRecords', {
        user_id: this.userInfo.userid,
        page: this.currentPage - 1,
        pageSize: this.pageSize
      }).then(function({ data }) {
        vm.tableData = data.data
        vm.totalCount = +data.count
      })
    },
    pieDataAdapter(data) {
      let categoryGroup = _.countBy(data, 'category_title'),
        res = []
      Object.keys(categoryGroup).forEach(function(key) {
        res.push({
          label: key,
          value: categoryGroup[key]
        })
      })
      return res
    }
  },
  mounted() {
    /*            let rand
                for (let i = 0; i < 20; i++) {
                    rand = Math.floor(Math.random() * 5)
                    if (rand % 2 === 0)
                        this.tableData.push({
                            title: "和平与战争",
                            date: "2016-10-11",
                            speaker: "云游",
                            link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                            category: "语文",
                            type: "视屏"
                        })
                    else
                        this.tableData.push({
                            title: "和平与战争",
                            date: "2016-10-11",
                            speaker: "云游",
                            link: "rtmp://live.hkstv.hk.lxdns.com/live/hks",
                            category: "数学",
                            type: "直播"
                        })
                }*/
    let vm = this
    this.$axios.post('user/getRecordCategoryCount', {
      user_id: this.userInfo.userid
    }).then(({ data }) => {
      this.pieData = data.data
      vm.drawPieChart()
    })
    this.getAllRecords()
  }
}

</script>
<style type="text/css" scoped>
.title {
  font-weight: bold;
  margin-bottom: 10px;
}

.category-statistics,
.record-wrapper {
  margin: 20px;
}

.category-statistics .piechart svg {
  font-size: 15px;
}

</style>
