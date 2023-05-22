<template>
    <div>
        评论列表
        <div class="comment" v-for="(item, index) in commentList" :key="index">
            <div>头像：<img :src="item.AVATAR" alt="" /></div>
            <div>昵称：{{ item.ACCOUNT }}</div>
            <div>内容：{{ item.COMMENT }}</div>
            <div>时间：{{ item.ADD_TIME }} <span class="reply" @click="reply(item)">回复</span></div>
            <div v-if="item.childComment" style="margin-left: 20px;">
                <CommentMinorList @minorReply="minorReply" :commentList="item.childComment"></CommentMinorList>
            </div>
            <CommentInput @successComment="successComment(index, item)" v-show="active_comment_uuid === item.COMMENT_UUID"
                :articleuuid="item.ARTICLE_UUID" :toUserUUID="toUserUUID" :fatherCommentUUID="fatherCommentUUID">
            </CommentInput>
        </div>
    </div>
</template>
<script setup lang='ts'>
import CommentInput from './CommentInput.vue';
import CommentMinorList from './CommentMinorList.vue';
import type { ICommentWithChild } from '@/type/TreeHole/comment';
import { ref } from 'vue';
const props = defineProps<{
    commentList: ICommentWithChild[]
}>()
let active_comment_uuid = ref(); // 当前选择的id
let toUserUUID = ref(''); // @某个用户
let fatherCommentUUID = ref(''); // 父级的id
// 回复按钮
const reply = (data: ICommentWithChild) => {
    if (!active_comment_uuid.value) {
        active_comment_uuid.value = data.COMMENT_UUID;
        toUserUUID.value = '';
        fatherCommentUUID.value = data.COMMENT_UUID;
    } else {
        active_comment_uuid.value = '';
    }
}
// 二级回复
const minorReply = (id: string, user_uuid: string) => {
    if (!active_comment_uuid.value) {
        active_comment_uuid.value = id;
        toUserUUID.value = user_uuid;
        fatherCommentUUID.value = id;
    } else {
        active_comment_uuid.value = '';
    }
}
const successComment = (index: number, item: ICommentWithChild) => {
    console.log(index, item);
}



</script>
<style lang='scss' scoped>
.comment {
    border: 1px solid #f2f2f2;
    margin-bottom: 5px;

    img {
        width: 50px;
        height: 50px;
    }

    .reply {
        font-size: 16px;
        color: #f2f2f2;
    }
}
</style>