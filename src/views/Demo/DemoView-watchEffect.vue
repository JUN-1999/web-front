<template>
  <div>
    <input id="ipt" type="text" v-model="value1" />
    <input type="text" v-model="value2" />
  </div>
</template>

<script lang="ts" setup>
import { watchEffect, ref } from "vue";

const value1 = ref<string>("wenzi");
const value2 = ref<string>("wenzi");

// 首次会触发
// 会自动收集依赖并且监听
const stop = watchEffect(
  (oninvalidate) => {
    const iptDOM = document.getElementById("ipt");
    console.log("iptDOM", iptDOM);
    console.log(value1.value + "  " + value2.value);
    oninvalidate(() => {
      // 在监听 之前操作
      console.log("before");
    });
  },
  {
    flush: "post", // pre 组件更新之前调用， sync 同步执行，post组件更新之后执行
    onTrigger(e) {},
  }
);
// stop(); //停止监听
</script>
