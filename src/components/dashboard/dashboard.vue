<template>
  <div class="detail-content">
    <div class="wordDetail">
      <div class="wordContent">
        <el-row>
          <el-col :span="8">
            <div class="topName special-padding">
              <div class="lineThrough"></div>
              <div class="circleRun" v-if="showFirst"></div>
              <div class="nameStyle" :class="showFirst?'activeOuter':''">
                <div class="inner_box" :class="showFirst||showFirstStyle?'activeInner':''">
                  <img src="../../assets/init.png">
                </div>
              </div>
              <span
                class="line-text"
                style="padding-right:50px;"
              >初始化</span>
            </div>
            <div class="bottomCon analysis">
              <ul>
                <li v-for="(item,index) in newdata.a" :key="index">
                  <span
                    class="pointer"
                    :style="{'animation-duration':item.duration+'s','animation-delay':item.delay+'s'}"
                  ></span>
                  <div class="wordProgressTop">
                    <span class="textSpan">{{item.taskName}}</span>
                  </div>
                  <div class="wordProgressBottom">
                    <div
                      class="activeP_rogress"
                      :style="{'animation-duration':item.duration+'s','animation-delay':item.delay+'s'}"
                    ></div>
                  </div>
                </li>
              </ul>
              <div class="arrowProgress">
                <div class="markArrow"></div>
                <i class="fa fa-long-arrow-right spcialArrow" aria-hidden="true"></i>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="topName">
              <div class="lineThrough"></div>
              <div class="circleRun" v-if="showTwo"></div>
              <div class="nameStyle" :class="showTwo?'activeOuter':''">
                <div class="inner_box" :class="showTwo||showTwoStyle?'activeInner':''">
                  <img src="../../assets/analics.png">
                </div>
              </div>
              <span class="line-text">预处理文档</span>
            </div>
            <div class="bottomCon">
              <ul>
                <li v-for="(item,index) in newdata.b" :key="index">
                  <span
                    class="pointer"
                    :style="{'animation-duration':item.duration+'s','animation-delay':item.delay+'s'}"
                  ></span>
                  <div class="wordProgressTop">
                    <span class="textSpan">{{item.taskName}}</span>
                  </div>
                  <div class="wordProgressBottom">
                    <div
                      class="activeP_rogress"
                      :style="{'animation-duration':item.duration+'s','animation-delay':item.delay+'s'}"
                    ></div>
                  </div>
                </li>
              </ul>
              <div class="arrowProgress">
                <div class="markArrow"></div>
                <i class="fa fa-long-arrow-right spcialArrow" aria-hidden="true"></i>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="topName last-padding">
              <div class="lineThrough"></div>
              <div class="circleRun" v-if="showThree"></div>
              <div class="nameStyle" :class="showThree?'activeOuter':''">
                <div class="inner_box" :class="showThree||showThreeStyle?'activeInner':''">
                  <img src="../../assets/result.png">
                </div>
              </div>
              <span
                class="line-text"
                style="padding-left:50px;"
              >文档分析</span>
            </div>
            <div class="bottomCon operation">
              <ul>
                <li v-for="(item,index) in newdata.c" :key="index">
                  <span
                    class="pointer"
                    :style="{'animation-duration':item.duration+'s','animation-delay':item.delay+'s'}"
                  ></span>
                  <div class="wordProgressTop">
                    <span class="textSpan">{{item.taskName}}</span>
                  </div>
                  <div class="wordProgressBottom">
                    <div
                      class="activeP_rogress"
                      :style="{'animation-duration':item.duration+'s','animation-delay':item.delay+'s'}"
                    ></div>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {proccessData} from './data.js'
export default {
  data () {
    return {
      showFirst: false,
      showTwo: false,
      showThree: false,
      showFirstStyle: false,
      showTwoStyle: false,
      showThreeStyle: false,
      newdata: proccessData,
      firstTime: proccessData.b[0].delay,
      twoTime: proccessData.c[0].delay,
      threeTime: proccessData.c[5].delay
    }
  },
  async mounted () {
    this.showFirst = true
    await this.sleep(this.firstTime * 1000)
    this.showFirst = false
    this.showTwo = true
    this.showFirstStyle = true
    await this.sleep((this.twoTime - this.firstTime) * 1000)
    this.showTwo = false
    this.showThree = true
    this.showTwoStyle = true
    await this.sleep((this.threeTime - this.twoTime + 4) * 1000)
    this.showThree = false
    this.showThreeStyle = true
  },
  methods: {
    sleep (ms) {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, ms)
      })
    }
  }
}
</script>

<style>
.detail-content {
  background: #080e1a;
  padding: 15px;
  height: 100%;
}
.wordDetail {
  min-width: 800px;
  background: #212731;
  padding: 20px 30px;
}
.wordContent {
  position: relative;
  padding: 0 2px;
  margin-top: 20px;
}
.lineThrough {
  position: absolute;
  width: 100%;
  height: 5px;
  background: #03a9f4;
  left: 0;
  top: 50px;
}
.topName {
  display: flex;
  padding: 15px 0;
  margin-bottom: 45px;
  align-items: center;
  justify-content: center;
  position: relative;
}
.special-padding {
  padding-right: 50px;
}
.last-padding {
  padding-left: 50px;
}
.nameStyle {
  position: relative;
  background: #007bb2;
  width: 70px;
  height: 70px;
  border-radius: 50%;
}
.inner_box {
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  background: #394351;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  color: #fff;
  flex-direction: column;
}
.inner_box span {
  text-align: center;
}
.bottomCon {
  margin-top: 25px;
  padding: 0 50px;
  position: relative;
}
.analysis {
  padding-left: 0;
}
.operation {
  padding-right: 0;
}
.bottomCon ul {
  border: 1px dashed #fff;
  padding: 0 20px;
}
.bottomCon ul li {
  list-style: none;
  padding-left: 20px;
  position: relative;
  border-bottom: dashed 1px #171d27;
  padding: 20px 0 20px 20px;
}
.bottomCon ul li .pointer {
  display: block;
  width: 10px;
  height: 10px;
  position: absolute;
  background: #03a9f4;
  left: 0;
  top: 27px;
  border-radius: 50%;
  -webkit-animation: withPointer 1 linear;
  animation: withPointer 1 linear;
  animation-fill-mode: forwards;
}
@-webkit-keyframes withPointer {
  0% {
    background: #03a9f4;
  }
  99% {
    background: #03a9f4;
  }
  100% {
    background: #3aad73;
  }
}
@keyframes withPointer {
  0% {
    background: #03a9f4;
  }
  99% {
    background: #03a9f4;
  }
  100% {
    background: #3aad73;
  }
}
.wordProgressTop {
  color: #7f96a3;
  display: flex;
  justify-content: space-between;
}
.textSpan {
  width: 70%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.wordProgressBottom {
  height: 7px;
  width: 100%;
  position: relative;
  background: #373d46;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 12px;
}
.activeP_rogress {
  position: absolute;
  left: 0;
  top: 0;
  height: 7px;
  -webkit-animation: widthAnimation 1 linear;
  animation: widthAnimation 1 linear;
  animation-fill-mode: forwards;
}
@-webkit-keyframes widthAnimation {
  0% {
    width: 0;
    background: #03a9f4;
  }
  99% {
    width: 99%;
    background: #03a9f4;
  }
  100% {
    width: 100%;
    background: #3aad73;
  }
}
@keyframes widthAnimation {
  0% {
    width: 0;
    background: #03a9f4;
  }
  99% {
    width: 99%;
    background: #03a9f4;
  }
  100% {
    width: 100%;
    background: #3aad73;
  }
}
.titleDetail {
  display: flex;
  flex-direction: row;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}
.link-dashboard {
  color: #fff;
}
.tickLink {
  margin: 0 10px;
}
.taskDetail {
  display: flex;
  flex-direction: row;
  font-size: 16px;
  color: #cfd9e0;
  padding: 25px 0;
}
.task-item {
  margin-right: 25px;
}
.activebg {
  background: #3aad73 !important;
}
.activeText {
  color: #3aad73;
}
.line-text {
  display: block;
  text-align: center;
  width: 100%;
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
}
.activeInner {
  background: #03a9f4;
}
.activeOuter {
  background: #171d27;
}
.circleRun {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #03a9f4;
  position: absolute;
  top: 50%;
  margin-top: -40px;
  background: -moz-linear-gradient(
    45deg,
    #03a9f4 30%,
    rgba(3, 169, 244, 0.5) 50%,
    rgba(3, 169, 244, 0) 90%
  );
  background: -webkit-linear-gradient(
    45deg,
    #03a9f4 30%,
    rgba(3, 169, 244, 0.5) 50%,
    rgba(3, 169, 244, 0) 90%
  );
  background: -o-linear-gradient(
    45deg,
    #03a9f4 30%,
    rgba(3, 169, 244, 0.5) 50%,
    rgba(3, 169, 244, 0) 90%
  );
  background: -ms-linear-gradient(
    45deg,
    #03a9f4 30%,
    rgba(3, 169, 244, 0.5) 50%,
    rgba(3, 169, 244, 0) 90%
  );
  background: linear-gradient(
    45deg,
    #03a9f4 30%,
    rgba(3, 169, 244, 0.5) 50%,
    rgba(3, 169, 244, 0) 90%
  );
  -webkit-animation: loading 1.4s infinite linear;
  animation: loading 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.circleRun:before {
  width: 50%;
  height: 50%;
  background: #03a9f4;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.circleRun:after {
  background: red;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes loading {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.arrowProgress {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -15px;
}
.arrowProgress i {
  color: #394351;
  font-size: 50px;
}
.markArrow {
  width: 20px;
  position: absolute;
  height: 50px;
  left: -1px;
  top: 0;
  background: #212731;
}
@-webkit-keyframes arrow {
  0% {
    color: #394351;
  }
  50% {
    color: #03a9f4;
  }
  100% {
    color: #394351;
  }
}
@keyframes arrow {
  0% {
    color: #394351;
  }
  50% {
    color: #03a9f4;
  }
  100% {
    color: #394351;
  }
}
.spcialArrow {
  -webkit-animation: arrow 1.4s infinite linear;
  animation: arrow 1.4s infinite linear;
}
</style>
