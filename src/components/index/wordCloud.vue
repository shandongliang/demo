<template>
  <div>
    <div>

    </div>
    <div>
      <span>相关问题专家</span>
      <div v-for="(item,index) in expert" :key="index">
        <div>
          <img/>
        </div>
        <div>
          <div>{{item.job}}{{item.name}}</div>
          <div>{{item.email}}</div>
        </div>
        <el-button>呼叫支援</el-button>
      </div>
    </div>
    <div>
      <span>供应商文档检索</span>
      <img/>
    </div>
  </div>
</template>

<script>
import {expert} from "../../data.js"
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    input: {
      type: String,
      default: ''
    },
  },
  data(){
    return{
      expert:expert
    }
  }
}
</script>

<style>

</style>
