<template>
  <div class="homeitem"  @click="toPath">
    <img class="img" :src="props.pic" alt="" />
    <div class="name">{{ props.name }}</div>
  </div>
</template>
<script setup lang="ts">
import type { RouteLocationRaw } from "vue-router";
import { useRouter } from "vue-router";

const props = defineProps({
  pic: {
    type: String,
    default: "123",
  },
  name: {
    type: String,
    default: "",
  },
  path: {
    type: String,
    default: "",
  },
});
const router = useRouter();

// 跳转
const toPath = function () {
  router.push(props.path as RouteLocationRaw);
};
</script>
<style lang="scss" scoped>
.homeitem {
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border: 1px solid #222;
  transition: 0.5s;
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
    transition: 0.5s;
  }
}
.img {
  width: 100%;
  height: 250px;
  object-fit: cover;
}
.name {
  font-size: 20px;
  font-weight: 800;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

// 适配手机
@media screen and (max-width: 600px) {
  .homeitem {
    width: 650px;
    height: 650px;
  }
  .img {
    height: 500px;
  }
  .name {
    font-size: 60px;
    flex: 1;
  }
}
</style>
