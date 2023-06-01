<template>
    <h3>关注的瓜</h3>
    <hr>
    <div class="list">
        <div class="list-item" v-for="item in list" :key="item.ARTICLE_UUID">
            <span> <img :src="item.AVATAR" alt=""></span>
            <span>{{ item.TITLE }}</span>
            <span> <el-button type="primary" size="large" @click="detailArticle(item)">查看</el-button> </span>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getArticleFollowApi } from '@/api/TreeHole/article'
import type { IArticleItem } from '@/type/TreeHole/article'

const router = useRouter();
const list = ref<IArticleItem[]>([])

onMounted(async () => {
    let res = await getArticleFollowApi();
    list.value = res.data;
})

const detailArticle=(data: IArticleItem)=>{
    router.push(`/TreeHole/TreeHoleIndex/ArticleDetail/${data.ARTICLE_UUID}`)
}

</script>
<style lang='scss' scoped>
h3 {
    margin-bottom: 15px;
    color: #fff;
}

.list {
    margin-top: 30px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 50px;

    &::-webkit-scrollbar {
        width: 0px;
    }

    .list-item {
        width: 100%;
        height: 100px;
        margin-bottom: 10px;
        border-radius: 5px;
        background-color: rgba($color: #fff, $alpha: .2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        transition: all 0.3s linear;

        &:hover {
            background-color: rgba($color: #fff, $alpha: .4);
            transform: scale(1.01);
        }

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }
}</style>