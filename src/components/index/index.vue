<template>
  <div class="index-wrap">
    <div class="input-boxes">
      <div class="input-wrap">
        <el-select v-model="value" placeholder="请选择" @change="change">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <i style="padding:0 10px"></i>
        <el-input v-model="input" @keyup.enter.native="search"/>
        <i style="padding:0 10px"></i>
        <el-button @click="search" type="primary">搜索</el-button>
      </div>
      <div class="space-index"></div>
    </div>
      <div style="margin:20px 0;" v-if="totalList.length>0">
        <p>共为你找到相关结果
          <span>{{result.length}}</span>条
        </p>
      </div>
      <!-- <div class="noresult">
      <p>哎呀呀! 页面没有找到!</p>
      <p>很抱歉, 没有匹配的。</p>
      </div>-->
      <div class="body-wrap" >
        <div class="result-wrap" v-if="totalList.length>0">
          <div class="result-img" v-if="images.length !== 0">
            <div class="result-title" style="margin-bottom:10px;display:inline-block;">相关图片</div>
            <div style="clear:both"></div>
            <div class="image" v-if="!showphone">
              <!-- <div class="prevbtn" @click="goPrev">
                <i class="el-icon-arrow-left"></i>
              </div>
              <div class="nextbtn" @click="goNext">
                <i class="el-icon-arrow-right"></i>
              </div> -->
              <ul>
                <li v-for="(item,index) in images" :key="index">
                  <img :src="require(`./images/${seletName}/${item}.png`)">
                </li>
              </ul>
            </div>
            <div v-else style="margin-bottom:15px;">
                <div class="block">
                  <el-carousel height="150px" arrow="always">
                    <el-carousel-item v-for="(item,index) in images" :key="index">
                      <div :style="{backgroundImage:`url(${require('./images/'+seletName+'/'+item+'.png')})`}" class="backgroundImg"></div>
                    </el-carousel-item>
                  </el-carousel>
                </div>
              </div>
          </div>
          <div  v-if="result.length > 0" class="result-item" v-for="(item,index) in result" :key="index">
            <div class="result-header">
              <span class="result-title" v-html="item.title"></span>
              <a :href="item.href" :download="item.href"><i class="el-icon-download"></i></a>
              <span v-if="item.recomend" class="tuijian">推荐</span>
            </div>
            <div class="result-content" v-html="item.content"></div>
            <div class="result-footer">
              <div class="keyword-wrap">
                <span class="keyword">目录:</span>
                <div v-for="(keyword,index) in item.keywords" :key="index">
                  <span v-if="index!==0" style="marginLeft:3px;">/</span>
                  <span class="result-keyword">{{keyword}}</span>
                </div>
              </div>
              <div class="result-welcome">人气（
                <span class="welcome-num">{{item.count}}</span>）
              </div>
            </div>
          </div>
          <div class="no-result" v-if="result.length === 0">
            <p>暂无搜索结果</p>
          </div>
          <!-- <div class="page-result">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="3"
          layout="total, prev, pager, next"
          :total="totalList.length">
        </el-pagination>
          </div>-->
        </div>
        <div class="right" v-show="totalList.length > 0">
          <div>
            <span style="font-weight:600;margin-bottom:15px;display: inline-block;">热门查询</span>
            <div>
              <div id="main" ref="main" style="width:320px;height:320px;"></div>
            </div>
          </div>
          <div v-if="expert.length>0">
            <span style="font-weight:600;">相关问题专家</span>
            <div class="expert-item" v-for="(item,index) in expert" :key="index">
              <div class="expert-item-left">
                <div class="avatar-img">
                  <img :src="require(`./images/${item.img}`)">
                </div>
                <div class="expert-info">
                  <div class="expert-name">姓名：{{item.name}}</div>
                  <div class="expert-email">邮箱：
                    <a
                      style="color:#568cc0;text-decoration:none;"
                      :href="`mailto:${item.email}`"
                    >{{item.email || '暂无'}}</a>
                  </div>
                </div>
              </div>
              <el-button size="small" @click="gopush">呼叫支援</el-button>
            </div>
          </div>
          <div v-if="supplier.length>0">
            <span style="font-weight:600;margin-bottom:15px;display: inline-block;">供应商文档检索</span>
            <div class="supplier-wrap">
              <div class="supplier-item" v-for="(item,index) in supplier" :key="index">
                <img :src="require(`./images/${item.img}`)">
                <div class="supplier-name">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { result, wordCloud } from '../../data.js'
import echarts from 'echarts'
import 'echarts-wordcloud/dist/echarts-wordcloud.js'
export default {
  data () {
    return {
      currentPage: 1,
      options: [
        {
          value: '0',
          label: '全部'
        },
        {
          value: '1',
          label: '重大停机时间报告'
        },
        {
          value: '2',
          label: '内部培训'
        },
        {
          value: '3',
          label: '供应商文档'
        },
        {
          value: '4',
          label: '标准文档'
        }
      ],
      seletName: '',
      value: '0',
      input: '',
      result: [],
      images: [],
      expert: [],
      supplier: [],
      wordList: wordCloud,
      totalList: [],
      showphone: false
    }
  },
  mounted () {
    const that = this
    if (document.body.clientWidth < 768) {
      that.showphone = true
    }
    window.addEventListener('resize', function () {
      if (document.body.clientWidth < 768) {
        that.showphone = true
      } else {
        that.showphone = false
      }
    })
  },
  methods: {
    getWordCloud () {
      var chart = echarts.init(this.$refs.main)
      var option = {
        tooltip: {},
        series: [
          {
            type: 'wordCloud',
            gridSize: 8,
            shape: 'circle',
            sizeRange: [12, 40],
            rotationRange: [-90, 90],
            rotationStep: 45,
            textPadding: 0,
            left: 'center',
            top: 'center',
            autoSize: {
              enable: true,
              minSize: 14
            },
            drawOutOfBound: true,
            itemStyle: {
              normal: {},
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.wordList
          }
        ]
      }
      chart.setOption(option)
      window.onresize = chart.resize
    },
    gopush () {
      this.$router.push({
        name: 'graph'
      })
    },
    search () {
      if (result[this.input.toLowerCase()]) {
        this.seletName = this.input.toLowerCase()
        this.images = result[this.input.toLowerCase()]['images'] || []
        this.expert = result[this.input.toLowerCase()]['experts'] || []
        this.supplier = result[this.input.toLowerCase()]['supplier'] || []
        this.totalList = result[this.input.toLowerCase()].result || []
        const arr = []
        if (this.value !== '0') {
          this.totalList.forEach((item, index) => {
            if (item.keywords[0] === this.options[parseInt(this.value)].label) {
              arr.push(item)
            }
          })
          this.result = arr
        } else {
          this.result = this.totalList
        }
        this.getWordCloud()
      }
      // let listre = result[this.input.toLowerCase()].result || []
      // this.result = listre.slice((this.currentPage - 1) * 3, 3 * this.currentPage)
    },
    change (val) {
      const arr = []
      if (val !== '0') {
        this.totalList.forEach((item, index) => {
          if (item.keywords[0] === this.options[parseInt(val)].label) {
            arr.push(item)
          }
        })
        this.result = arr
      } else {
        this.result = this.totalList
      }
    },
    goPrev () {},
    goNext () {},
    handleCurrentChange (val) {
      this.currentPage = val
      this.search()
    }
  }
}
</script>

<style>
.index-wrap{
  padding: 30px;
}
.input-boxes {
  display: flex;
  flex-direction: row;
}
.input-wrap {
  display: flex;
  flex:1;
}
.space-index{
  width:360px;
  margin-left:30px;
}
.body-wrap {
  display: flex;
  flex-direction: row;
}
.result-wrap {
  border: 1px solid #ccc;
  padding: 20px 25px 40px 25px;
  flex-grow: 1;
  position: relative;
  background: #fff;
}
.result-header {
  display: flex;
  align-items: center;
}
.result-img {
  border-bottom: 1px dashed #797979;
  display: inline-block;
  width:100%;
}
.image {
  padding: 20px 0;
  position: relative;
  display: inline-block;
}
.backgroundImg{
  height:200px;
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
}
.image .prevbtn i,
.image .nextbtn i {
  font-size: 30px;
}
.image .prevbtn {
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 50%;
  width: 30px;
  height: 30px;
  margin-top: -15px;
}
.image .nextbtn {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  width: 30px;
  height: 30px;
  margin-top: -15px;
}
.image ul {
  width:100%;
}
.image ul li {
  list-style: none;
  float:left;
  margin-right:15px;
}
.image img {
  width: 100px;
  height: 100px;
}
.result-item {
  border-bottom: 1px dashed #797979;
  padding: 20px 0 10px 0;
}
.result-title {
  text-decoration: underline;
  color: #568cc0;
  cursor: pointer;
  word-break: break-all;
}
.el-icon-download {
  font-size: 26px;
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
  background: #fff;
  margin-left: 30px;
  flex:1;
  width: 360px;
  border: 1px solid #ccc;
  padding: 20px;
}
.expert-item {
  display: flex;
  align-items: center;
  padding: 20px 10px 20px 0;
  justify-content: space-between;
}
.expert-item-left {
  display: flex;
  align-items: center;
}
.avatar-img {
  border-radius: 50%;
  height: 50px;
  width: 50px;
  overflow: hidden;
}
.avatar-img img {
  height: 100%;
  width: 100%;
}
.expert-info {
  padding: 0 15px;
  font-size: 14px;
  width: 190px;
}
.expert-email {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.supplier-wrap {
  padding: 10px 0;
  display: flex;
}
.supplier-item {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100px;
}
.supplier-item img {
  width: 100%;
  height: 120px;
}
.no-result {
  text-align: center;
  margin-top:100px;
  color:#909399;
}
.supplier-name {
  color: #568cc0;
  margin-top: 8px;
  text-align: center;
}
.page-result {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 10px;
  display: flex;
  width: 100%;
}
.el-pagination {
  margin: 0 auto;
}
.el-carousel__indicators{
  display:none!important;
}
.tuijian{
  display: inline-block;
  padding: 8px 30px;
  font-size: 14px;
  border-radius: 2px;
  background-color: rgba(215, 215, 215, 1);
  white-space: nowrap;
}
no-result{
  margin-top: 100px;
  text-align: center;
  color: #909399;

}
@media (max-width: 767px) {
  .body-wrap {
    flex-direction: column;
    width: 100%;
  }
  .right {
    margin-left: 0;
    padding: 20px 10px;
    margin-top: 20px;
    width:100%;
  }
  .input-wrap {
    margin-right: 0;
  }
  .expert-item {
    padding: 20px 0;
    flex-direction: column;
    align-items: initial;
  }
  .expert-item-left {
    margin-bottom: 10px;
  }
  .supplier-name {
    font-size: 12px;
  }
  .result-wrap {
    min-height: 350px;
    padding:20px 10px 40px 10px;
  }
  #main{
    max-width:320px!important;
    width:300px!important;
    height:300px!important;
  }
  .index-wrap{
    padding:20px 15px;
  }
  .space-index{
    width:0;
    margin-left:0;
  }
}
@media (min-width: 769px) and (max-width: 992px){
  .body-wrap {
    flex-direction: column;
    width: 100%;
  }
  .space-index{
    width:0;
    margin-left:0;
  }
  .right {
    margin-left: 0;
    padding: 20px 10px;
    margin-top: 20px;
    width:100%;
  }
  .expert-info{
    width:auto;
  }
  #main{
    width:100%!important;
  }
}
</style>
