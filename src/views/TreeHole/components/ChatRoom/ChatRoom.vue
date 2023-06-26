<template>
    <el-dialog v-if="dialogTableVisible" style="height: 90vh;width: 80vw;" :close-on-click-modal="false" align-center
        append-to-body v-model="dialogTableVisible" @close="closeChatRoom">
        <div class="box">
            <div class="message-list">
                <div class="message-box">
                    <ChatRoomMessageList ref="ChatRoomMessageListRef" :useruuid="treeHoleUserStore.userInfo.USER_UUID">
                    </ChatRoomMessageList>
                </div>
                <div class="send-message-box">
                    <ChatRoomSendMessage ref="ChatRoomSendMessageRef" @chatRoomMessage="chatRoomMessage">
                    </ChatRoomSendMessage>
                </div>
            </div>

            <div class="user-list">
                用户列表
            </div>
        </div>

    </el-dialog>
</template>
<script setup lang='ts'>
import { nextTick, ref } from 'vue';
import type { ICommentListItem } from './type'
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
import ChatRoomSendMessage from './ChatRoomSendMessage.vue';
import ChatRoomMessageList from './ChatRoomMessageList.vue';

const treeHoleUserStore = useTreeHoleUserStore();
const dialogTableVisible = ref(false);

const ChatRoomMessageListRef = ref<InstanceType<typeof ChatRoomMessageList> | null>(null);
const ChatRoomSendMessageRef = ref<InstanceType<typeof ChatRoomSendMessage> | null>(null);

// 获取从服务端得到的数据
const chatRoomMessage = (data: ICommentListItem) => {
    ChatRoomMessageListRef.value && ChatRoomMessageListRef.value.addMessageList(data);
}
const showChatRoom = () => {
    dialogTableVisible.value = true;

    nextTick(()=>{
        ChatRoomSendMessageRef.value && ChatRoomSendMessageRef.value.opend();
    })

}
const closeChatRoom = () => {
    ChatRoomSendMessageRef.value && ChatRoomSendMessageRef.value.closed();
    dialogTableVisible.value = false;

}
defineExpose({
    showChatRoom,
})
</script>
<style lang='scss' scoped>
.box {
    height: 80vh;
    display: flex;
    background-color: skyblue;

    .message-list {
        flex: 1;
        display: flex;
        flex-direction: column;

        .message-box {
            height: 65vh;
            background-color: #fff;
            border: 1px solid black;

        }

        .send-message-box {
            height: 15vh;
            background-color: #fff;
            border: 1px solid black;
            margin-top: -1px;
        }
    }

    .user-list {
        width: 10vw;
        background-color: greenyellow;
    }
}
</style>