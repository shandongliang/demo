<template>
  <div>
    <div style="margin:20px 0;">
      <p>共为你找到相关结果<span>6</span>条</p>
    </div>
    <div class="result-wrap">
      <div class="result-img" v-if="images.length !== 0">
        <span class="result-title">相关图片</span>
        <div class="image">
          <img v-for="(item,index) in images" :key="index" :src="require(`./images/${item}.jpg`)"/>
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
      <!-- <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="perPage"
          layout="total, prev, pager, next"
          :total="suggestData.total">
      </el-pagination> -->
    </div>
  </div>
</template>

<script>
import {result, images} from '../../data.js'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    input: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: [],
      images: []
    }
  },
  methods: {
    // search () {
    //   this.result = result[this.input]
    //   this.images = images[this.input]
    // }
  },
  watch: {
    input (val) {
      this.result = result[val]
      this.images = images[val]
    }
  }

}
</script>

<style>
.input-wrap {
  display: flex;
}
.result-wrap {
  border: 1px solid #ccc;
  padding: 20px 25px;
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
}
.el-icon-download {
  font-size: 40px;
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
</style>
