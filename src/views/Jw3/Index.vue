<template>
  <div class="main">
    <div class="mp-box">
      <div
        class=""
        v-for="(item, index) in mpArr"
        :key="item.icon"
        :class="
          'mp-item' +
          ' ' +
          item.icon +
          ' ' +
          (currentIndex == index && !is_show_mp_name ? 'active' : '')
        "
        @mouseenter="
          () => {
            mpmouseenter(index)
          }
        "
      >
        <div
          @click="
            () => {
              toWeb(item)
            }
          "
          class="mp-name"
          v-show="(currentIndex == index || current2Index == index) && is_show_mp_name"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="btn" @click="radomIndex">随机选择一个门派</div>

    <div class="toLeft" @click="toLeft">返回</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { mpArrDefault } from './mp'

const router = useRouter()
let currentIndex = ref(0)
let current2Index = ref(0)

const mpArr = mpArrDefault
let is_show_mp_name = ref(true)

const radomIndex = function () {
  if (!is_show_mp_name.value) return false
  is_show_mp_name.value = false
  current2Index.value = -1

  // 圈数
  let quan_num = 0
  let max_num = mpArr.length
  let index = 0
  let step = 30

  const createcurrentIndex = function (step: number) {
    if (is_show_mp_name.value) return false
    if (quan_num < 2) {
      currentIndex.value = index
      index++
      if (index % max_num == 0) {
        quan_num++
        index = 0
      }
    } else {
      currentIndex.value = Math.floor(Math.random() * 18)
    }
    let newstep = step + 3
    if (newstep > 300) newstep = 300
    setTimeout(() => {
      createcurrentIndex(newstep)
    }, step)
  }
  createcurrentIndex(step)

  setTimeout(() => {
    is_show_mp_name.value = true
  }, 6000)
}

const toWeb = function (item: any) {
  window.open(item.url, '_blank')
}
const mpmouseenter = function (index: number) {
  current2Index.value = index
}
const toLeft = function () {
  router.push('/')
}
</script>

<style lang="scss" scoped>
@import url('./icon_mp.scss');

.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url('@/assets/imgs/jw3/jw3-bg.jpg');
  background-size: 100% 100%;
  background-position: center center;
  background-repeat: no-repeat;
}

.mp-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  width: 800px;
}
.mp-item {
  width: 105px;
  height: 105px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  margin: 0 5px 20px 5px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}
.active {
  box-shadow: 0 0 15px 2px #f2f2f2;
}
.btn {
  font-size: 30px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: 700;
  color: #f2f2f2;

  border-radius: 15px;
  border: 2px solid #f2f2f2;
  padding: 20px 30px;
  margin-top: 30px;
  cursor: pointer;
}
.mp-name {
  position: absolute;
  z-index: 5;
  top: -22px;
  left: -22px;
  width: 150px;
  height: 150px;
  background-image: url('@/assets/imgs/jw3/icon-mpact.png');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #fff;
  animation: mp-name-sc 1s;
}
@keyframes mp-name-sc {
  0% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

// 适配手机
@media screen and (max-width: 600px) {
  .mp-box {
    width: 90vw;
  }
  .mp-item {
    width: 250px;
    height: 250px;
  }
  .btn {
    margin-top: 100px;
    font-size: 100px;
    padding: 80px 120px;
  }
  .mp-name {
    width: 380px;
    height: 380px;
    top: -63px;
    left: -63px;
  }
}
</style>
