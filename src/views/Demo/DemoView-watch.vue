<template>
  <div class="demo-view">
    <input type="text" v-model="wjcRef" />
    <br />
    <input type="text" v-model="wjc2Ref" />

    <br />
    <div>ref监听对象</div>
    <input type="text" v-model="objRef.a.b.c" />

    <br />
    <div>reactive监听对象</div>
    <input type="text" v-model="objReactive.a.b.c" />
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, reactive } from "vue";

// ref 监听单个
const wjcRef = ref("wjc");

const wjcRefWatch = watch(wjcRef, (newValue, oldValue) => {
  console.log("newValue-wjcRefWatch", newValue);
  console.log("oldValue-wjcRefWatch", oldValue);
});
// console.log('wjcRefWatch', wjcRefWatch), // wjcRefWatch() 通过运行返回的参数可以停止监听

// ref 监听多个
const wjc2Ref = ref("");
const wjc2RefWatch = watch([wjcRef, wjc2Ref], (newValue, oldValue) => {
  console.log("newValue-wjc2RefWatch", newValue);
  console.log("oldValue-wjc2RefWatch", oldValue);
});

// ref 监听对象 (需要第三个参数 深度监听 deep：true)
const objRef = ref({
  a: {
    b: {
      c: "",
    },
  },
});
//监听整个
const objRefWatch = watch(
  objRef,
  (newValue, oldValue) => {
    console.log("newValue-objRefWatch", newValue);
    console.log("oldValue-objRefWatch", oldValue);
  },
  {
    deep: true, //是否深度监听
    immediate: true, //是否首次监听
  }
);
// 监听单个属性
const obj1RefWatch = watch(
  () => objRef.value.a.b.c,
  (newValue, oldValue) => {
    console.log("newValue-obj1RefWatch", newValue);
    console.log("oldValue-obj1RefWatch", oldValue);
  },
  {
    deep: true, //是否深度监听
    immediate: true, //是否首次监听
    flush: "pre", //pre 组件更新之前调用， sync 同步执行，post组件更新之后执行
  }
);

// reactive 监听深层次 (newValue, oldValue)的值相同
const objReactive = reactive({
  a: {
    b: {
      c: "",
    },
  },
});
// 监听reactive对象，会自动设置deep为true
const objReactiveWatch = watch(objReactive, (newValue, oldValue) => {
  console.log("newValue-objReactive", newValue);
  console.log("oldValue-objReactive", oldValue);
});
// reactive 监听深层次单个 (需要写成函数的形式，返回需要监听的单个属性)
const obj1ReactiveWatch = watch(
  () => objReactive.a.b.c,
  (newValue, oldValue) => {
    console.log("newValue-obj1ReactiveWatch", newValue);
    console.log("oldValue-obj1ReactiveWatch", oldValue);
  }
);
</script>

<style lang="scss" scoped>
.demo-view {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1500px;
  height: 800px;
  background-color: rgba(135, 206, 235, 0.5);
}
</style>
