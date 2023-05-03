<template>
  <div class="shell" id="shell">
    <div class="header">
      <h2 class="title">君de世界</h2>
      <h3 class="subtitle">JUNSTART</h3>
    </div>
    <div class="timeline">
      <div
        v-for="(item, index) in 18"
        :key="item"
        class="item"
        :class="activeIndex == index ? 'item--active' : ''"
        dat-text="《你好，世界》"
      >
        <div class="content">
          <img src="@/assets/imgs/jw3/jw3-bg.jpg" class="img" alt="" />
          <h2 class="content-title">2020</h2>
          <p class="content-desc">
            如果你停止，就是谷底。如果你还在继续，
            就是上坡。这是我听过关于人生低谷最好的阐述
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="toLeft" @click="toLeft">返回</div>
</template>

<script setup lang="ts">
import IMG from "@/assets/imgs/jw3/jw3-bg.jpg";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// 默认第一个选中
let activeIndex = ref(0);

onMounted(() => {
  // 初始化第一个背景
  const shellDom = document.querySelector("#shell");
  (shellDom as HTMLElement).style.backgroundImage = `url('${IMG}')`;

  // 获取时间轴项目的总数
  var itemLength = 18;
  // 当页面滚动时，触发滚动事件
  window.onscroll = () => {
    let max,
      min = 0;
    let pos = window.scrollY; //获取当前页面滚动距离
    console.log("pos", pos);
  };
});

const toLeft = function () {
  router.push("/");
};
</script>
<style>
body {
  overflow: auto !important;
}
</style>
<style lang="scss" scoped>
.shell {
  width: 100%;
  position: relative;
  padding: 80px 0;
  transition: 0.3s ease 0s;
  background-attachment: fixed;
  background-size: cover;
}
.shell::before {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(99, 99, 99, 0.8);
  content: "";
}
.header {
  width: 100%;
  text-align: center;
  margin-bottom: 80px;
  position: relative;
}
.title {
  color: #fff;
  font-size: 46px;
  font-weight: normal;
  margin: 0;
}
.timeline {
  display: flex;
  margin: 0 auto;
  flex-wrap: wrap;
  flex-direction: column;
  max-width: 700px;
  position: relative;
}
.content-title {
  font-weight: normal;
  font-size: 66px;
  margin: -1px 0 0 0;
  transition: 0.4s;
  padding: 0 10px;
  box-sizing: border-box;
  color: #fff;
}
.content-desc {
  margin: 0;
  font-size: 15px;
  box-sizing: border-box;
  color: rgba(255, 255, 255, 0.7);
  line-height: 25px;
}
.timeline::before {
  position: absolute;
  left: 50%;
  width: 2px;
  height: 100%;
  margin-left: -1px;
  content: "";
  background: rgba(255, 255, 255, 0.07);
}
.item {
  padding: 40px 0;
  opacity: 0.3;
  filter: blur(2px);
  transition: 0.5s;
  box-sizing: border-box;
  width: calc(50% - 40px);
  display: flex;
  position: relative;
  transform: translateY(-80px);
}
.item::before {
  content: attr(data-text);
  // 字间距
  letter-spacing: 3px;
  width: 100%;
  position: absolute;
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
  border-left: 2px solid rgba(255, 255, 255, 0.5);
  top: 70%;
  margin-top: -5px;
  padding-left: 15px;
  opacity: 0;
  right: calc(-100% - 56px);
}
.item:nth-child(even) {
  align-self: flex-end;
}
.item:nth-child(even)::before {
  right: auto;
  text-align: right;
  left: calc(-100% - 56px);
  padding-left: 0;
  border-left: none;
  border-right: 2px solid rgba(255, 255, 255, 0.5);
  padding-right: 15px;
}
.item--action {
  opacity: 1;
  transform: translateY(0);
  filter: blur(0px);
}
.item--active::before {
  top: 50%;
  transition: 0.3s all 0.2s;
  opacity: 1;
}
.item--action .content-title {
  margin: -50px 0 20px 0;
}
.img {
  max-width: 100%;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.4);
}
.subtitle {
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  letter-spacing: 5px;
  margin: 10px 0 0 0;
  font-weight: normal;
}
.footer {
  padding: 95px 0;
  text-align: center;
}
.footer a {
  color: #999;
  display: inline-block;
}

@media only screen and (max-width: 767px) {
  .item {
    align-self: baseline !important;
    width: 100%;
    padding: 0 30px 150px 80px;
  }
  .item::before {
    left: 10px !important;
    padding: 0 !important;
    top: 50px;
    text-align: center !important;
    width: 60px;
    border: none !important;
  }
  .item:last-child {
    padding-bottom: 40px;
  }
}
@media only screen and (max-width: 767px) {
  .timeline::before {
    left: 40px;
  }
}
</style>
