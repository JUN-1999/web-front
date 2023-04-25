<template>
  <div>
    {{ nameRef }}

    <button @click="change">显示</button>
  </div>
</template>

<script lang="ts" setup>
import { toRef, reactive, toRefs, toRaw } from "vue";
const obj = reactive({
  name: "wjc",
  age: 18,
});
console.log(obj, toRaw(obj));

const { name, age } = toRefs(obj);

const change = () => {
  console.log("name", name);
  console.log("age", age);
};

const nameRef = toRef(obj, "name");
</script>
