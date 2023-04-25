<template>
  <div>
    <input type="text" v-model="firstName" />
    <input type="text" v-model="lastName" />

    <div>{{ firstName + lastName }}</div>
    <div>{{ name }}</div>
    <div>{{ name2 }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";

let firstName = ref("");
let lastName = ref("");

// 写法一 常用
let name = computed(() => {
  return firstName.value + "-1-" + lastName.value;
});

// 写法二
let name2 = computed({
  get() {
    return firstName.value + "-2-" + lastName.value;
  },
  set() {
    return firstName.value + lastName.value;
  },
});
</script>
