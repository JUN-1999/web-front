<template>
    <div class="comment-input">
        <div class="comment_input_box" v-show="commentPop">
            <input :placeholder="commentPlaceholder" class="comment_input" v-model="comment_text" ref="content" />
            <div class="comment_input_right" @click="checkComment">
                发送评论【{{ canSend ? '可以发送' : '不能发送' }}】
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
import { postSendCommentApi } from '@/api/TreeHole/comment';
import type { ICommentWithChild } from '@/type/TreeHole/comment';

const treeHoleUsers = useTreeHoleUserStore(); // 树洞的用户信息
const emits = defineEmits(['successComment']);
const props = defineProps<{
    articleuuid: string,
    toUserUUID?: string,
    fatherCommentUUID?: string,
}>()
// 评论信息
const commentPlaceholder = '留下你精彩的评论吧';
const comment_text = ref(''); // 评论内容，由v-model实现双向绑定
const hasSend = ref(false); // 标识评论是否已经发送过，防止同一条评论被重复提交
const canSend = ref(false); //canSend用来标识评论是否可以发送
const commentPop = ref(true); //commentPop用来控制是否显示评论弹窗

watch(comment_text, (newValue, oldValue) => {
    if (newValue) {
        canSend.value = true;
    } else {
        canSend.value = false;
    }
})

// 在发送评论之前，我们需要对输入的内容做合法性判段
const checkComment = async () => {
    if (comment_text.value == "") {
        ElMessage({
            message: '评论不能为空',
            type: 'warning',
        })
    } else {
        const comment = comment_text.value;
        const newComment: ICommentWithChild = {
            AVATAR: treeHoleUsers.userInfo?.AVATAR as string,
            COMMENT: comment,
            ADD_TIME: '刚刚',
            ACCOUNT: treeHoleUsers.userInfo?.ACCOUNT as string,
            COMMENT_UUID: Date.now() + '', // 临时评论id
            ARTICLE_UUID: props.articleuuid, // 文章id
            USER_UUID: treeHoleUsers.userInfo?.USER_UUID as string,
        };
        let res = await postSendCommentApi({ to_user_uuid: props.toUserUUID, father_comment_uuid: props.fatherCommentUUID, comment, article_uuid: props.articleuuid })
        comment_text.value = "";
        hasSend.value = true;
        emits('successComment', newComment) //评论成功后给文章添加一条数据
    }
}
</script>
<style lang='scss' scoped></style>