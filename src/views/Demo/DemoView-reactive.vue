<template>
  <div>
    <form>
      <input v-model="form.name" type="text" />
      <br />
      <input v-model="form.age" type="text" />
      <br />
      <button @click.prevent="submit">提交</button>
    </form>

    <ul>
      <li v-for="(item, index) in list" :key="index">
        {{ item }}
      </li>
    </ul>
    <button @click="addlist">添加</button>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
const form = reactive({
  name: "wjc",
  age: 18,
});

// const list = reactive<string[]>([]);
const list = reactive<{ arr: string[] }>({
  arr: [],
});

const submit = () => {
  console.log(form);
};
const addlist = () => {
  list.arr.push("123");
};
</script>
