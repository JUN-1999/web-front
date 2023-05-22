<template>
    <div>
        <div class="comment" v-for="(item, index) in commentList" :key="index">
            <div>头像：<img :src="item.AVATAR" alt="" /></div>
            <div v-if="item.USERINFO">
                @<span>{{ item.USERINFO.ACCOUNT }}</span>
            </div>
            <div>昵称：{{ item.ACCOUNT }}</div>
            <div>内容：{{ item.COMMENT }}</div>
            <div>时间：{{ item.ADD_TIME }} <span class="reply" @click="reply(item)">回复</span></div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import CommentInput from './CommentInput.vue';
import type { IComment } from '@/type/TreeHole/comment';
import { ref } from 'vue';
let active_comment_uuid = ref();
const emits = defineEmits(['minorReply'])
const props = defineProps<{
    commentList: IComment[]
}>()
// 回复按钮
const reply = (data: IComment) => {
    emits('minorReply', data.FATHER_COMMENT_UUID, data.USER_UUID)
}

const successComment = (index: number, item: IComment) => {
    console.log(index, item);
}


</script>
<style lang='scss' scoped>
.comment {
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