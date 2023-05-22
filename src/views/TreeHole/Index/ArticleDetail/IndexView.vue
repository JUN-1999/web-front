<template>
    <div class="article-detail">
        <ArticleInfo :articleInfo="articleInfo" />
        <div class="comment-box">
            <CommentInput @successComment="successComment" :articleuuid="article_uuid"></CommentInput>
        </div>
        <CommontList :commentList="commentList"></CommontList>
    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getCommentListAPi } from '@/api/TreeHole/comment';
import { getArticleInfoApi } from '@/api/TreeHole/article';
import type { IArticleItem } from '@/type/TreeHole/article';
import type { ICommentWithChild } from '@/type/TreeHole/comment';
import CommentInput from './components/CommentInput.vue';
import ArticleInfo from './components/ArticleInfo.vue';
import CommontList from './components/CommontList.vue';

const route = useRoute(); //当前路由信息
// 评论信息
let article_uuid = ref<string>('');// 标识是哪个文章的评论
let commentList = ref<ICommentWithChild[]>([]);//评论列表
let articleInfo = ref<IArticleItem>({
    ACCOUNT: '',
    ADD_TIME: '',
    ARTICLE_UUID: '',
    AVATAR: '',
    CONTENT: '',
    PICS: '',
    TITLE: '',
    UPDATE_TIME: '',
}); // 内容详情

onMounted(() => {
    article_uuid.value = route.params.id as string;// 对文章的uuid进行存储
    getArticleInfo();
    getCommentsList();
})
// 获得评论列表
const getCommentsList = async () => {
    const res = await getCommentListAPi({
        article_uuid: article_uuid.value
    })
    commentList.value = res.data
}
// 获得内容详情
const getArticleInfo = async () => {
    const res = await getArticleInfoApi({
        article_uuid: article_uuid.value
    })
    res.data.PICS = JSON.parse(res.data.PICS);
    articleInfo.value = res.data;
}
// 发布评论成功  , 在本地添加一条数据
const successComment = async (data: ICommentWithChild) => {
    commentList.value.unshift(data)
}

</script>
<style lang='scss' scoped>
.article-detail {
    width: 82vw;
    height: 90vh;
    background-color: #fff5;
    box-shadow: 0 8px 16px #0005;
    border-radius: 16px;
    overflow-x: hidden;
    overflow-y: auto;
    .comment-input{
        margin: 10px 0;
        border: 1px solid salmon;
    }
}
</style>