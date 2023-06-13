<template>
    <div class="commont-list">
        <div class="comment-item" v-for="(item, index) in commentList" :key="index">
            <div class="left">
                <div class="avatar"><img :src="item.AVATAR" alt="" /></div>
                <div class="tag" v-if="articleInfo.ACCOUNT === item.ACCOUNT">瓜主</div>
            </div>
            <div class="right">
                <div class="name">{{ item.ACCOUNT }} <el-button v-if="articleInfo.ACCOUNT === item.ACCOUNT"
                        @click="add(item)" :icon="Calendar">加入时间线</el-button> </div>
                <div class="content">{{ item.COMMENT }}</div>
                <div class="pics">
                    <template v-for="(pic, index) in item.PICS">
                        <template v-if="pic.type == 'img'">
                            <el-image lazy class="brief-img" :key="pic.url" :src="pic.url" :preview-src-list="[pic.url]"
                                :zoom-rate="1.1" fit="cover" />
                        </template>
                        <template v-if="pic.type == 'video'">
                            <div class="brief-img" :key="pic.url">
                                <ViewVideo :src="pic.url"></ViewVideo>
                            </div>
                        </template>
                    </template>
                </div>
                <div class="tool">
                    <span class="tool-item time">{{ $common.timeFilter(item.ADD_TIME) }}</span>
                    <span class="tool-item reply" @click="reply(item)">回复</span>
                </div>
                <div v-if="item.childComment" style="margin-left: 0px; padding-top: 10px;">
                    <CommentMinorList @minorReply="minorReply" :commentList="item.childComment"></CommentMinorList>
                </div>
                <CommentInput class="minor-reply" @successComment="(data) => { successComment(index, data) }"
                    v-if="active_comment_uuid === item.COMMENT_UUID" :articleuuid="item.ARTICLE_UUID"
                    :toUserUUID="toUserUUID" :toUserName="toUserName" :fatherCommentUUID="fatherCommentUUID">
                </CommentInput>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { Calendar } from '@element-plus/icons-vue';
import type { IArticleItem } from '@/type/TreeHole/article';
import type { ICommentWithChild, IChildComment } from '@/type/TreeHole/comment';
import {
    addTimeLine,
    deleteTimeLine
} from '@/api/TreeHole/timerLine';
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
import CommentInput from './CommentInput.vue';
import CommentMinorList from './CommentMinorList.vue';
import ViewVideo from '@/components/ViewVideo.vue';
const treeHoleUsers = useTreeHoleUserStore(); // 树洞的用户信息
import { ref } from 'vue';
const props = defineProps<{
    commentList: ICommentWithChild[]
    articleuuid: string
    articleInfo: IArticleItem
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
        PICS: data.PICS,
        ADD_TIME: '刚刚',
        ACCOUNT: treeHoleUsers.userInfo?.ACCOUNT as string,
        COMMENT_UUID: Date.now() + '', // 临时评论id
        ARTICLE_UUID: props.articleuuid, // 文章id
        USER_UUID: treeHoleUsers.userInfo?.USER_UUID as string,
        TO_USER_UUID: data.TO_USER_UUID as string,
        FATHER_COMMENT_UUID: data.FATHER_COMMENT_UUID as string,
        USERINFO: undefined
    };
    emits('minorSuccessComment', index, newComment)
}
// 加入时间线
const add = async (row: ICommentWithChild) => {
    console.log('文章id', row.ARTICLE_UUID);
    console.log('内容id', row.COMMENT_UUID);
    let res = await addTimeLine({
        ARTICLE_UUID: row.ARTICLE_UUID,
        COMMENT_UUID: row.COMMENT_UUID,
        TIME: row.ADD_TIME
    })
    ElMessage({
        message: '加入时间线成功',
        type: 'success',
    })
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
            margin-right: 20px;

            .tag {
                display: inline-block;
                padding: 3px 5px;
                background-color: green;
                color: #fff;
                border-radius: 5px;
                font-size: 14px;
                text-align: center;
                margin: 0 auto;
                position: relative;
                left: 50%;
                transform: translate(-50%, 0);
                margin-top: 10px;
            }

            .avatar {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                background-color: #fff;


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

            .pics {
                margin-top: 10px;

                .brief-img {
                    width: 80px;
                    height: 80px;
                    margin-right: 10px;
                }
            }

            .tool {
                margin-top: 10px;
                color: #585858;
                font-size: 20px;

                .tool-item {
                    margin-right: 15px;
                }

                .reply {
                    cursor: pointer;
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