<template>
    <div class="commont-list">
        <div class="comment-item" v-for="(item, index) in commentList" :key="index">
            <div class="left">
                <div class="avatar"><img :src="item.AVATAR" alt="" /></div>
            </div>
            <div class="right">
                <div class="name">{{ item.ACCOUNT }}</div>
                <div class="content">{{ item.COMMENT }}</div>
                <div class="tool">
                    <span class="tool-item time">{{ $common.timeFilter(item.ADD_TIME)  }}</span>
                    <span class="tool-item reply" @click="reply(item)">回复</span>
                </div>
                <div v-if="item.childComment" style="margin-left: 0px; padding-top: 10px;">
                    <CommentMinorList @minorReply="minorReply" :commentList="item.childComment"></CommentMinorList>
                </div>
                <CommentInput class="minor-reply" @successComment="(data) => { successComment(index, data) }"
                    v-show="active_comment_uuid === item.COMMENT_UUID" :articleuuid="item.ARTICLE_UUID"
                    :toUserUUID="toUserUUID" :toUserName="toUserName" :fatherCommentUUID="fatherCommentUUID">
                </CommentInput>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import CommentInput from './CommentInput.vue';
import CommentMinorList from './CommentMinorList.vue';
import type { ICommentWithChild, IChildComment } from '@/type/TreeHole/comment';
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
const treeHoleUsers = useTreeHoleUserStore(); // 树洞的用户信息
import { ref } from 'vue';
const props = defineProps<{
    commentList: ICommentWithChild[]
    articleuuid: string
}>()


const emits = defineEmits(['minorSuccessComment'])
let active_comment_uuid = ref(); // 当前选择的id
let toUserUUID = ref(''); // @某个用户
let toUserName = ref(''); // @某个用户账户
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
const minorReply = (id: string, user_uuid: string, account: string) => {
    if (!active_comment_uuid.value) {
        active_comment_uuid.value = id;
        toUserUUID.value = user_uuid;
        toUserName.value = account;
        fatherCommentUUID.value = id;
    } else {
        active_comment_uuid.value = '';
    }
}
const successComment = (index: number, data: ICommentWithChild) => {
    const newComment: IChildComment = {
        AVATAR: treeHoleUsers.userInfo?.AVATAR as string,
        COMMENT: data.COMMENT,
        ADD_TIME: '刚刚',
        ACCOUNT: treeHoleUsers.userInfo?.ACCOUNT as string,
        COMMENT_UUID: Date.now() + '', // 临时评论id
        ARTICLE_UUID: props.articleuuid, // 文章id
        USER_UUID: treeHoleUsers.userInfo?.USER_UUID as string,
        TO_USER_UUID: data.TO_USER_UUID as string,
        FATHER_COMMENT_UUID: data.FATHER_COMMENT_UUID as string,
        USERINFO: {
            ACCOUNT: data.USERINFO?.ACCOUNT as string,
            AVATAR: data.USERINFO?.AVATAR as string,
        }
    };
    emits('minorSuccessComment', index, newComment)
}

</script>
<style lang='scss' scoped>
.commont-list {
    width: 80%;
    margin: 0 auto;

    .comment-item {
        width: 100%;
        margin-bottom: 5px;
        display: flex;

        .left {
            .avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 20px;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

        }

        .right {
            padding-top: 10px;
            flex: 1;

            .name {
                color: #585454;
                font-size: 20px;
                margin-bottom: 10px;
            }

            .tool {
                margin-top: 10px;
                color: #585858;
                font-size: 20px;

                .tool-item {
                    margin-right: 15px;
                }
            }

            .minor-reply {
                margin-top: 20px;
                width: 100%;
            }
        }
    }
}
</style>