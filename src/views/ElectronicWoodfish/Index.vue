<template>
  <div class="Electronic-Woodfish">
    <div class="num">
      <div class="reset" @click="reset">重置</div>
      <div>{{ num }}</div>
    </div>

    <div id="add">
      <div v-for="item in addTextArr" :key="item" class="text">+1</div>
    </div>
    <img
      draggable="false"
      id="muyuIMG"
      @click="hit"
      :class="scale ? 'scale' : ''"
      src="@/assets/imgs/muyu.png"
      alt=""
    />
    <img
      draggable="false"
      :style="{
        top: chuizi_position.top + 'px',
        left: chuizi_position.left + 'px'
      }"
      :class="scale ? 'muyuhit' : ''"
      id="chuiziIMG"
      src="@/assets/imgs/chuizi.png"
      alt=""
    />
    <div class="toLeft" @click="toLeft">返回</div>

    <div class="auto" @click="auto">
      <div class="auto-text">自动积德：{{ is_auto ? '开' : '关' }}</div>
      <img
        class="auto-img"
        :class="is_auto ? 'auto-img-a' : ''"
        src="@/assets/imgs/OIP.png"
        alt=""
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import muyuMP3 from '@/assets/audio/muyu.mp3'
const router = useRouter()

let num = ref(0)
let scale = ref(false)
let index = 0
let addTextArr = ref<number[]>([])
let timer: number = 0 //定时器
let is_auto = ref(false)

const chuizi_position = ref({
  top: 0,
  left: 0
})

// 木鱼点击
const hit = function () {
  scale.value = true
  addTextArr.value.push(index)
  index++
  num.value++

  const audio = new Audio(muyuMP3)
  audio.play()

  setTimeout(() => {
    addTextArr.value.shift()
    scale.value = false
  }, 250)
}
// 锤子跟随事件
const chuiziMove = function () {
  window.onmousemove = function (e) {
    chuizi_position.value.left = e.x
    chuizi_position.value.top = e.y
  }
}
chuiziMove()
// 重置
const reset = function () {
  num.value = 0
}
// 自动积德
const auto = function () {
  if (!is_auto.value) {
    is_auto.value = !is_auto.value
    hit()
    timer = setInterval(() => {
      hit()
    }, 1000)
  } else {
    is_auto.value = !is_auto.value
    clearInterval(timer)
    timer = 0
  }
}

// 返回
const toLeft = function () {
  router.push('/')
}
</script>
<style lang="scss" scoped>
.num {
  width: 100vw;
  position: fixed;
  top: 10vh;
  left: 0;
  text-align: center;
  color: #fff;
  font-size: 120px;
}
.reset {
  color: #fff;
  font-size: 30px;
  padding: 10px;
}
.auto {
  width: 500px;
  height: 150px;
  text-align: center;
  position: fixed;
  bottom: 5vh;
  left: 50%;
  transform: translate(-50%, -50%);
}
.auto-text {
  color: #fff;
  font-size: 30px;
}
.auto-img {
  width: 100px;
  height: 100px;
  color: #fff;
}
.Electronic-Woodfish {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #010101;
  cursor: none;
}

#muyuIMG {
  width: 30vw;
}
#chuiziIMG {
  width: 10vw;
  position: absolute;
  transform: rotate(180deg);
  pointer-events: none;
}

.scale {
  animation: scaleA 0.3s linear;
}

@keyframes scaleA {
  0% {
    transform: scale(1);
  }

  25% {
    transform: scale(1.1);
  }

  40% {
    transform: scale(1);
  }

  100% {
    transform: scale(1);
  }
}

.text {
  color: #fff;
  animation: upA 0.3s linear;
  margin-top: 10px;
  font-size: 60px;
}

@keyframes upA {
  0% {
    transform: translate(0px, 0px);
    opacity: 1;
  }

  100% {
    transform: translate(0px, -10px);
    opacity: 0;
  }
}

.muyuhit {
  animation: muyuhitA 0.3s;
}
@keyframes muyuhitA {
  0% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(160deg);
  }
  100% {
    transform: rotate(180deg);
  }
}

.text-opacity {
  opacity: 0;
}
#add {
  width: 100px;
  height: 80px;
  text-align: center;
}

.auto-img-a {
  animation: autoImgA 1s infinite;
}

@keyframes autoImgA {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

// 适配手机
@media screen and (max-width: 600px) {
  .text {
    font-size: 100px;
  }
  .auto-img {
    width: 200px;
    height: 200px;
  }

  .auto-text {
    font-size: 80px;
  }
  .num {
    font-size: 200px;
  }
  #muyuIMG {
    width: 50vw;
  }
  #chuiziIMG {
    width: 20vw;
  }

  #add {
    width: 150px;
    height: 120px;
    position: relative;
    left: 50px;
  }

  @keyframes upA {
    0% {
      transform: translate(0px, 0px);
      opacity: 1;
    }

    100% {
      transform: translate(0px, -30px);
      opacity: 0;
    }
  }

  .reset {
    font-size: 80px;
  }
}
</style>
