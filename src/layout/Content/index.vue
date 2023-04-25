<template>
  <div class="content">
    <div style="border-bottom: 1px solid #ccc; padding: 20px">内容区域</div>
    <div class="content-items" :key="item" v-for="item in 100">{{ item }}</div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.content {
  flex: 1;
  margin: 20px;
  border: 1px solid #ccc;
  overflow-y: auto;
}
.content-items {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
