<template>
  <div class="home">
    <div class="box">
      <div class="box-item" v-for="(item, index) in items" :key="index">
        <HomeItem v-bind="item"> </HomeItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import HomeItem from "../components/HomeItem.vue";
// 引入图片
import muyuIMG from "../assets/imgs/ElectronicWoodfish/muyu.png";
import jw3IMG from "../assets/imgs/jw3/jw3.png";
import Scrolling from '../assets/imgs/ScrollingTimeline/BG.jpg'
import treehole from '../assets/imgs/TreeHole/TreeHoleBG3.webp'

const items = [
  { name: "电子木鱼", pic: muyuIMG, path: "/ElectronicWoodfish" },
  { name: "剑三职业选择", pic: jw3IMG, path: "/Jw3" },
  { name: "滚动时间轴", pic: Scrolling, path: "/ScrollingTimeline" },
  { name: "树屋", pic: treehole, path: "/TreeHole" },
  { name: "笔记", pic: muyuIMG, path: "/Note" },
];
</script>

<style lang="scss" scoped>
body {
  overflow: hidden;
}

.box {
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1500px;
  height: 800px;
  background-color: rgba(250, 250, 250, 0.5);
  border-radius: 15px;
  backdrop-filter: blur(1px);

  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: start;
  overflow-y: scroll;
  padding-top: 30px;

  /*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
  &::-webkit-scrollbar {
    width: 0px;
    height: 16px;
    background-color: #f5f5f5;
    overflow: hidden;
  }

  /*定义滚动条轨道
 内阴影+圆角*/
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
    overflow: hidden;
  }

  /*定义滑块
 内阴影+圆角*/
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(85, 85, 85, 0.7);
    overflow: hidden;
  }
}

.home {
  width: 100vw;
  height: 100vh;
  // background: linear-gradient(-45deg, #ee7752, #dd7ba1, #23a6d5, #23d5ab);
  background: linear-gradient(-45deg, #bbff00, #69d123, #33cc54, #1f90c4, #0084ff);
  background-size: 600% 600%;
  background-repeat: no-repeat;
  background-position: 0% 0%;
  animation: APosition 8s linear infinite;
}

@keyframes APosition {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}


.box-item {
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

// 适配手机
@media screen and (max-width: 600px) {
  .box {
    width: 80vw;
    height: 80vh;
    padding-top: 90px;
  }

  .box-item {
    width: 50%;
    margin-bottom: 90px;
  }

  .home {
    background-size: auto;
  }
}
</style>
