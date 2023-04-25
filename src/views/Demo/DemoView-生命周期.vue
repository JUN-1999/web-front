<template>
  <div ref="divRef">
    {{ str }}
    <input type="text" v-model="str" />
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onRenderTracked,
  onRenderTriggered,
} from "vue";
// beforeCreate created setup模式是没有这两个生命周期的  setup去代替
const str = ref("www");
const divRef = ref<HTMLDivElement>(null);
console.log("setup");

// 创建
// 获取dom只能在创建完成之后,onBeforeMount是取不到dom的
onBeforeMount(() => {
  console.log(divRef.value);
  console.log("创建之前");
});
onMounted(() => {
  console.log(divRef.value);
  console.log("创建完成");
});

// 更新
// onBeforeUpdate获取的是更新之前的dom  onUpdated获取更新之后的dom
onBeforeUpdate(() => {
  console.log(divRef.value.innerHTML);
  console.log("更新之前");
});
onUpdated(() => {
  console.log(divRef.value.innerHTML);
  console.log("更新完成");
});
// 销毁
onBeforeUnmount(() => {
  console.log("销毁之前");
});
onUnmounted(() => {
  console.log("销毁完成");
});

// 调试
onRenderTracked((e) => {
  console.log(e);
});
onRenderTriggered((e) => {
  console.log(e);
});
</script>
