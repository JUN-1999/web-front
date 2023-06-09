<template>
    <div class="comment">
        <div class="comment-input">
            <div class="avatar"><img :src="treeHoleUsers.userInfo?.AVATAR" alt=""></div>
            <input :placeholder="`${props.toUserUUID ? '@' + props.toUserName + '  ' : ''}` + commentPlaceholder"
                class="comment_input" v-model="comment_text" ref="content" @keyup.enter="checkComment">
            <div class="comment_input_right" :class="canSend ? 'can-send' : 'not-can-send'" @click="checkComment">
                评论
            </div>
        </div>
        <div class="media" v-show="pics.length > 0">
            <WjcUpload ref="WjcUploadRef" label-style-width="80px" label-style-height="80px" :accept="'video/*,image/*'"
                @upload-success="uploadSuccess" @mediaDelete="mediaDelete" :pics="pics"></WjcUpload>
        </div>
        <div class="tools">
            <div class="comment" @click="uploadFile">
                <img src="@/assets/svg/TreeHole/media.svg" alt="">
            </div>
            <div class="emoji">
                <V3Emoji @clickEmoji="selectEmoji" :options-name="optionsName" :recent="true" />
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, watch, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
import { postSendCommentApi } from '@/api/TreeHole/comment';
import type { ICommentWithChild } from '@/type/TreeHole/comment';
import type { IIMG } from '@/type/TreeHole/file'
import WjcUpload from '@/components/WjcUpload.vue';
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
const optionsName = {
    'Smileys & Emotion': '笑脸&表情',
    'Food & Drink': '食物&饮料',
    'Animals & Nature': '动物&自然',
    'Travel & Places': '旅行&地点',
    'People & Body': '人物&身体',
    Objects: '物品',
    Symbols: '符号',
    Flags: '旗帜',
    Activities: '活动'
};
const WjcUploadRef = ref<InstanceType<typeof WjcUpload> | null>();
const treeHoleUsers = useTreeHoleUserStore(); // 树洞的用户信息
const emits = defineEmits(['successComment']);
const props = withDefaults(
    defineProps<{
        articleuuid: string,
        toUserUUID?: string,
        toUserName?: string,
        fatherCommentUUID?: string,
        flag: string,
    }>(
    ), {
    articleuuid: '',
    toUserUUID: '',
    toUserName: '',
    fatherCommentUUID: '',
    flag: 'out',
}
)


// 评论信息
const commentPlaceholder = '留下你精彩的评论吧';
const comment_text = ref(''); // 评论内容，由v-model实现双向绑定
const hasSend = ref(false); // 标识评论是否已经发送过，防止同一条评论被重复提交
const canSend = ref(false); //canSend用来标识评论是否可以发送
const pics = ref<IIMG[]>([]);


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
        const PICS = pics.value;
        const newComment: ICommentWithChild = {
            AVATAR: treeHoleUsers.userInfo?.AVATAR as string,
            COMMENT: comment,
            PICS: PICS,
            ADD_TIME: '刚刚',
            ACCOUNT: treeHoleUsers.userInfo?.ACCOUNT as string,
            COMMENT_UUID: Date.now() + '', // 临时评论id
            ARTICLE_UUID: props.articleuuid, // 文章id
            USER_UUID: treeHoleUsers.userInfo?.USER_UUID as string,
            USERINFO: {
                ACCOUNT: props.toUserName as string,
                AVATAR: ''
            }
        };
        console.log('newComment', newComment);

        let res = await postSendCommentApi({
            to_user_uuid: props.toUserUUID,
            father_comment_uuid: props.fatherCommentUUID,
            comment,
            article_uuid: props.articleuuid,
            PICS: JSON.stringify(PICS)
        })
        comment_text.value = "";
        hasSend.value = true;
        pics.value = [];
        emits('successComment', newComment) //评论成功后给文章添加一条数据
    }
}
const uploadSuccess = (list: IIMG[]) => {
    pics.value = JSON.parse(JSON.stringify(list));
}
// 删除媒体
const mediaDelete = (src: string) => {
    pics.value = pics.value.filter(itme => {
        return itme.url != src
    })
}
const selectEmoji = (emoji: any) => {
    comment_text.value += emoji
}
// 上传媒体
const uploadFile = () => {
    WjcUploadRef.value?.inputFile?.click()
}
</script>
<style lang='scss' scoped>
.comment-input {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;

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

    input {
        flex: 1;
        border-radius: 10px;
        overflow: hidden;
        padding: 0 10px;
        border: 0px solid transparent;

    }

    .comment_input_right {
        width: 100px;
        background-color: #6b8e23;
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 20px;
        color: aliceblue;
    }

    .not-can-send {
        background-color: gray;
        color: #f2f2f2;
        cursor: no-drop;
    }
}

.media {
    margin-top: 10px;
    padding-left: 80px;
}

.tools {
    margin-top: 10px;
    padding-left: 80px;
    display: flex;
    align-items: center;


    .comment-title {
        color: #f2f2f2;
        font-size: 20px;
        width: 40px;
        margin-right: 10px;
    }

    .media-item {
        display: flex;
        align-items: center;
        color: #f2f2f2;
        cursor: pointer;

        .icon-tupian,
        .icon-shipin {
            font-size: 20px;
        }

        .media-text {

            margin: 0 12px 0 2px;
            font-size: 20px;
        }
    }

    .emoji {
        width: 40px;
        height: 40px;
    }

    :deep(.emoji-container-open-btn) {
        font-size: 35px;
    }

    .comment {
        width: 40px;
        height: 40px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
        }
    }



}
</style>