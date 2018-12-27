<template>
  <div>
    <div id="main" ref="mains" style="width: 1280px;height:800px;"></div>
  </div>
</template>

<script>
import { links, nodeData } from './data.js'
import echarts from 'echarts'
export default {
  data () {
    return {

    }
  },
  mounted () {
    setTimeout(() => {
      this.getPraph()
    }, 10)
  },
  methods: {
    getPraph () {
      var chart = echarts.init(this.$refs.mains)
      var option = {
        title: {
          text: 'DataMix',
          top: 'top',
          left: 'left'
        },
        color: ['#4472C5', '#ED7C30', '#80FF80', '#FF8096', '#800080', '#03a9f4'],
        legend: {
          data: ['人员', '其他', '标准文档', '重大停机时间报告', '供应商文档', '内部培训']
        },
        // selectedMode: 'single',
        series: [{
          type: 'graph',
          layout: 'force',
          animation: false,
          legendHoverLink: true, // 是否启用图例 hover(悬停) 时的联动高亮。
          hoverAnimation: true, // 是否开启鼠标悬停节点的显示动画
          coordinateSystem: null, // 坐标系可选
          label: {
            normal: {
              position: 'right',
              formatter: '{b}'
            }
          },
          draggable: true,
          roam: true,
          focusNodeAdjacency: true,
          data: nodeData,
          lineStyle: {
            color: 'source',
            curveness: 0.3
          },
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          emphasis: {
            lineStyle: {
              width: 2
            }
          },
          categories: [
            {
              'name': '人员'
            },
            {
              'name': '其他'
            },
            {
              'name': '标准文档'
            },
            {
              'name': '重大停机时间报告'
            },
            {
              'name': '供应商文档'
            },
            {
              'name': '内部培训'
            }
          ],
          edges: links
        }]
      }
      chart.setOption(option)
      window.onresize = chart.resize
    }
  }
}
</script>

<style>

</style>
