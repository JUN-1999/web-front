<template>
  <RouterView></RouterView>
  <BottomFiling></BottomFiling>
</template>

<script setup lang="ts">
import BottomFiling from './components/BottomFiling.vue';
import { RouterView } from 'vue-router'
</script>

<style lang="scss"  scoped></style>
