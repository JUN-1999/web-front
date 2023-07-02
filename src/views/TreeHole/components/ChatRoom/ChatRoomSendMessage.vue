<template>
    <div class="main">
        <div class="tools">
            <div class="tool-item emoji">
                <V3Emoji @clickEmoji="selectEmoji" :options-name="optionsName" :recent="true" />
            </div>
            <div class="tool-item media" @click="uploadFile">
                <img src="@/assets/svg/TreeHole/media.svg" alt="" />
            </div>
        </div>
        <div class="input">
            <textarea style="resize:none" v-model="comment_text" placeholder="发表你的看法" maxlength="500"></textarea>
            <el-button class="send-messsage-btn" type="success" @click="sendData">发送</el-button>
        </div>
        <!-- 上传组件 -->
        <WjcUpload v-show="false" ref="WjcUploadRef" :pics="[]" :accept="'video/*,image/*'" @upload-success="uploadSuccess">
        </WjcUpload>
    </div>
</template>
<script setup lang='ts'>
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
import { ref, reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import type { IIMG } from '@/type/TreeHole/file'
import WjcUpload from '@/components/WjcUpload.vue';
import SocketService from '@/utils/websocket';
import { socket } from '@/utils/socket';
import V3Emoji from 'vue3-emoji';

const porps = defineProps<{
    articleuuid: string
}>();
const emits = defineEmits(['chatRoomMessage']);
const treeHoleUserStore = useTreeHoleUserStore();
const comment_text = ref('');

const WjcUploadRef = ref<InstanceType<typeof WjcUpload> | null>();
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
// 选择表情回调
const selectEmoji = (emoji: any) => {
    comment_text.value += emoji
}
// 上传媒体
const uploadFile = () => {
    WjcUploadRef.value?.inputFile?.click()
}
// 上传成功返回
const uploadSuccess = (list: IIMG[]) => {
    console.log(list);
    const data = {
        username: treeHoleUserStore.userInfo.ACCOUNT,
        useruuid: treeHoleUserStore.userInfo.USER_UUID,
        avatar: treeHoleUserStore.userInfo.AVATAR,
        message: {
            type: 'media',
            value: list[0],
        },
        callback: 'chatRoomMessage',
        articleuuid: porps.articleuuid
    }
    socket.send({
        event: 'sendChatRoom',
        data
    });
}

// websocket 发送信息
const sendData = () => {
    if (comment_text.value.length) {
        const data = {
            username: treeHoleUserStore.userInfo.ACCOUNT,
            useruuid: treeHoleUserStore.userInfo.USER_UUID,
            avatar: treeHoleUserStore.userInfo.AVATAR,
            message: {
                type: 'text',
                value: comment_text.value,
            },
            callback: 'chatRoomMessage',
            articleuuid: porps.articleuuid
        }
        socket.send({
            event: 'sendChatRoom',
            data
        });

        comment_text.value = '';
    } else {
        ElMessage({
            message: '发送内容不能为空',
            type: 'warning',
        })
    }

};


</script>
<style lang='scss' scoped>
.main {
    height: 100%;
    display: flex;
    flex-direction: column;

    .tools {
        height: 50px;
        display: flex;
        align-items: center;
        padding: 10px;
        background-color: gray;

        .tool-item:hover {
            background-color: #fff;
            border-radius: 10px;
        }

        :deep(.emoji-container-open-btn) {
            font-size: 35px;
        }

        .media {
            margin-left: 10px;
            width: 40px;
            height: 40px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .input {
        flex: 1;
        position: relative;

        textarea {
            padding: 10px;
            width: 100%;
            height: 100%;
        }

        .send-messsage-btn {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
    }
}
</style>