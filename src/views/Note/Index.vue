<template>
    <v-md-editor :model-value="previewData" mode="preview"></v-md-editor>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import axios from "axios";
const previewData = ref();
onMounted(async () => {
    axios.get(`https://qiniu.junstart.top/md/note.md?time=${new Date().getTime()}`).then(res => {
        console.log(res);
        previewData.value = res.data;
    })
})
</script>
<style lang='scss' scoped></style>