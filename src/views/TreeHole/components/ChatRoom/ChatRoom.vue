<template>
    <el-dialog style="height: 90vh;width: 80vw;" :close-on-click-modal="false" align-center append-to-body
        v-model="dialogTableVisible">
        <div class="box">
            <div class="message-list">
                <div class="message-box">
                    <ChatRoomMessageList ref="ChatRoomMessageListRef" :useruuid="treeHoleUserStore.userInfo.USER_UUID">
                    </ChatRoomMessageList>
                </div>
                <div class="send-message-box">
                    <ChatRoomSendMessage @chatRoomMessage="chatRoomMessage"></ChatRoomSendMessage>
                </div>
            </div>

            <div class="user-list">
                用户列表
            </div>
        </div>

    </el-dialog>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import type { ICommentListItem } from './type'
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
import ChatRoomSendMessage from './ChatRoomSendMessage.vue';
import ChatRoomMessageList from './ChatRoomMessageList.vue';

const treeHoleUserStore = useTreeHoleUserStore();
const dialogTableVisible = ref(true);

const ChatRoomMessageListRef = ref<InstanceType<typeof ChatRoomMessageList> | null>(null);

// 获取从服务端得到的数据
const chatRoomMessage = (data: ICommentListItem) => {
    ChatRoomMessageListRef.value && ChatRoomMessageListRef.value.addMessageList(data);
}

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