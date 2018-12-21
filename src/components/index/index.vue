<template>
<div class="index-wrap">
  <img src="./images/logo.png"/>
  <div class="input-wrap">
    <el-select v-model="value" placeholder="请选择" @change="change">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <i style="padding:0 10px"></i>
    <el-input v-model="input" @keyup.enter="search"/>
    <i style="padding:0 10px"></i>
    <el-button @click="search" type="primary">搜索</el-button>
  </div>
  <div style="margin:20px 0;">
      <p>共为你找到相关结果<span>{{result.length}}</span>条</p>
  </div>
  <div class="noresult">
      <p>哎呀呀! 页面没有找到!</p>
      <p>很抱歉, 没有匹配的。</p>
    </div>
  <div class="body-wrap">
    <div class="result-wrap">
      <div class="result-img" v-if="images.length !== 0">
        <span class="result-title">相关图片</span>
        <div class="image">
          <img v-for="(item,index) in images" :key="index" :src="require(`./images/${item}`)"/>
        </div>
      </div>
      <div class="result-item" v-for="(item,index) in result" :key="index">
        <div class="result-header">
          <span class="result-title" v-html="item.title"></span>
          <i class="el-icon-download"></i>
          <el-button  class="recomend">推荐</el-button>
        </div>
        <div class="result-content" v-html="item.content"></div>
        <div class="result-footer">
          <div class="keyword-wrap">
            <span class="keyword">关键词:</span>
            <div v-for="(keyword,index) in item.keywords" :key="index">
              <span v-if="index!==0" style="marginLeft:3px;">/</span>
              <span class="result-keyword">{{keyword}}</span>
            </div>
          </div>
          <div class="result-welcome">
            人气（<span class="welcome-num">{{item.count}}</span>）
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div>
        <span style="font-weight:600;margin-bottom:15px;display: inline-block;">热门查询</span>
        <div>
          <div id="main" style="width:100%;height:400px;"  ref="main"></div>
        </div>
      </div>
      <div>
        <span  style="font-weight:600;">相关问题专家</span>
        <div class="expert-item" v-for="(item,index) in expert" :key="index">
        <div class="expert-item-left">
          <div class="avatar-img">
            <img :src="require(`./images/${item.img}`)"/>
          </div>
          <div class="expert-info">
            <div class="expert-name">{{item.job}}：{{item.name}}</div>
            <div class="expert-email">邮箱：<a style="color:#568cc0;text-decoration:none;" :href="`mailto:${item.email}`">{{item.email}}</a></div>
          </div>
        </div>
          <el-button size="small">呼叫支援</el-button>
        </div>
      </div>
      <div>
        <span  style="font-weight:600;margin-bottom:15px;display: inline-block;">供应商文档检索</span>
        <div class="supplier-wrap">
          <div class="supplier-item" v-for="(item,index) in supplier" :key="index">
            <img :src="require(`./images/${item.img}`)"/>
            <div class="supplier-name">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {result, images, expert, supplier, wordCloud} from '../../data.js'
import echarts from 'echarts/echarts'
import 'echarts/component/title'
import 'echarts/component/tooltip'
import 'echarts/chart/wordCloud'
export default {
  data () {
    return {
      options: [
        {
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '故障维修'
        }, {
          value: '2',
          label: '内部培训'
        }, {
          value: '3',
          label: '使用说明'
        }, {
          value: '4',
          label: '机械维护'
        }
      ],
      value: '0',
      input: '',
      result: [],
      images: [],
      expert: expert,
      supplier: supplier,
      wordList: wordCloud
    }
  },
  mounted () {
    this.getWordCloud()
  },
  methods: {
    getWordCloud () {
      var chart = echarts.init(this.$refs.main)
      var option = {
        tooltip: {},
        series: [{
          type: 'wordCloud',
          size: ['100%', '100%'],
          textRotation: [0, 45, 90, -45],
          textPadding: 0,
          shape: 'pentagon',
          autoSize: {
            enable: true,
            minSize: 14
          },
          drawOutOfBound: true,
          itemStyle: {
            normal: {

            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: this.wordList
        }]
      }
      chart.setOption(option)
      window.onresize = chart.resize
    },
    search () {
      this.result = result[this.input.toLowerCase()] || []
      this.images = images[this.input.toLowerCase()] || []
    },
    change (val) {
      console.log(val)
    }
  }
}
</script>

<style>
.input-wrap {
  display: flex;
  margin-right: 470px;
}
.body-wrap {
  display: flex;
  flex-direction: row;
}
.result-wrap {
  border: 1px solid #ccc;
  padding: 20px 25px;
  flex-grow : 1
}
.result-header {
  display: flex;
  align-items: center;
}
.result-img {
  border-bottom: 1px dashed #797979;
}
.image {
  padding:20px 0;
  display: flex;
  justify-content: space-around;
}
.image img {
  width: 100px;
  height: 100px;
}
.result-item {
  border-bottom: 1px dashed #797979;
  padding:20px 0 10px 0;
}
.result-title {
  /* border-bottom: 1px solid #568cc0; */
  text-decoration: underline;
  color: #568cc0;
  cursor: pointer;
}
.el-icon-download {
  font-size: 30px;
  color: #568cc0;
  margin: 0 20px;
}
.result-content {
  font-size: 14px;
  padding: 15px 0;
}
.result-footer {
  display: flex;
  justify-content: space-between;
}
.keyword-wrap {
  display: flex;
  align-items: center;
  color: #1c8f1f;
  font-size: 14px;
}
.keyword {
  margin-right: 5px;
}
.result-keyword {
  margin: 0 2px;
}
.result-welcome {
  font-size: 14px;
}
.right {
  margin-left: 30px;
  flex: 0 0 400px;
  border: 1px solid #ccc;
  padding:20px;
}
.expert-item {
  display: flex;
  align-items: center;
  padding:20px 10px;
  justify-content: space-between;
}
.expert-item-left {
  display: flex;
  align-items: center;
}
.avatar-img {
  border-radius:50%;
  height:60px;
  width:60px;
  overflow: hidden;
}
.avatar-img img {
  height:100%;
  width:100%;
}
.expert-info {
  padding: 0 15px;
  font-size: 14px;
  width:220px;
}
.expert-email{
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.supplier-wrap {
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
}
.supplier-item {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width:120px;
}
.supplier-item img{
  width:100%;
  height:100px;
}
.noresult {
  min-height: 100%;
  background-color: #fff;
  position: relative;
}
.supplier-name{
  color:#568cc0;
  margin-top:8px;
  text-align: center;
}
@media (max-width: 767px) {
  .body-wrap {
    flex-direction: column;
    width:100%;
  }
  .right{
    margin-left:0;
    padding:20px 10px;
    margin-top:20px;
  }
  .input-wrap{
    margin-right:0;
  }
  .expert-item{
    padding:20px 0;
    flex-direction: column;
    align-items: initial;
  }
  .expert-item-left{
    margin-bottom:10px;
  }
  .supplier-name{
    font-size:12px;
  }
}
</style>
