<template>
    <div class="article-detail">
        <div class="back" @click="goBack"><i class="iconfont icon-fanhui"></i>返回</div>
        <ArticleInfo :articleInfo="articleInfo" />
        <div class="comment-box">
            <CommentInput @successComment="successComment" :articleuuid="article_uuid">
            </CommentInput>
        </div>
        <CommontList :commentList="commentList" :articleInfo="articleInfo"  :articleuuid="article_uuid" @minorSuccessComment="minorSuccessComment">
        </CommontList>
    </div>
</template>
<script setup lang='ts'>

import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCommentListAPi } from '@/api/TreeHole/comment';
import { getArticleInfoApi } from '@/api/TreeHole/article';
import type { IArticleItem } from '@/type/TreeHole/article';
import type { ICommentWithChild, IChildComment } from '@/type/TreeHole/comment';
import CommentInput from './components/CommentInput.vue';
import ArticleInfo from './components/ArticleInfo.vue';
import CommontList from './components/CommontList.vue';


const router = useRouter(); // v-router 实例
const route = useRoute(); // 当前路由信息

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
const goBack = () => { router.go(-1) }
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
    res.data = res.data.map((item: any) => {
        item.PICS = JSON.parse(item.PICS)
        if (item.childComment) {
            item.childComment.map((childItem: any) => {
                childItem.PICS = JSON.parse(childItem.PICS)
                return childItem
            })
        }
        return item
    })
    commentList.value = res.data;
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
// 评论的回复成功
const minorSuccessComment = async (index: number, data: IChildComment) => {
    commentList.value[index].childComment?.push(data);
}

</script>
<style lang='scss' scoped>
.back {
    padding: 30px;
    font-size: 30px;
    color: #fff;
    cursor: pointer;
    position: sticky;
    top: 0;
}

.icon-fanhui {
    font-size: 30px;
    margin-right: 10px;
}

.article-detail {
    width: 82vw;
    height: 90vh;
    background-color: #fff5;
    box-shadow: 0 8px 16px #0005;
    border-radius: 16px;
    overflow-x: hidden;
    overflow-y: overlay;
    padding-bottom: 50px;

    .comment-box {
        width: 80%;
        margin: 0 auto 50px;

    }
}
</style>