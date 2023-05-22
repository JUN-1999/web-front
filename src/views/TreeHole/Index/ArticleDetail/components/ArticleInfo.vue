<template>
    <div>
        <div> 发布者：{{ articleInfo.ACCOUNT }}</div>
        <div>头像：<img style="width: 50px;height: 50px;" :src="articleInfo.AVATAR" /></div>
        <div>内容：
            <p v-html="articleInfo.CONTENT"> </p>
        </div>
        <div>图片：
            <img style="width: 50px;height: 50px;" v-for="item, index in articleInfo.PICS" :key="index" :src="item.url" />
        </div>
    </div>
</template>
<script setup lang='ts'>
import type { IArticleItem } from '@/type/TreeHole/article';
const props = defineProps<{
    articleInfo: IArticleItem
}>()
</script>
<style lang='scss' scoped></style>