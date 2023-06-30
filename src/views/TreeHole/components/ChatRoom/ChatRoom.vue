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
                    <ChatRoomSendMessage :articleuuid="articleuuid" ref="ChatRoomSendMessageRef" @chatRoomMessage="chatRoomMessage">
                    </ChatRoomSendMessage>
                </div>
            </div>

            <div class="user-list">
                <ChatRoomUserList ref="ChatRoomUserListRef" :list="userList"></ChatRoomUserList>
            </div>
        </div>

    </el-dialog>
</template>
<script setup lang='ts'>
import { nextTick, ref } from 'vue';
import { socket } from '@/utils/socket';
import type { ICommentListItem } from './type'
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
import ChatRoomSendMessage from './ChatRoomSendMessage.vue';
import ChatRoomMessageList from './ChatRoomMessageList.vue';
import ChatRoomUserList from './ChatRoomUserList.vue';

const porps = defineProps<{
    articleuuid: string
}>()
const treeHoleUserStore = useTreeHoleUserStore();
const dialogTableVisible = ref(false);
const userList = ref<any>([]);

const ChatRoomMessageListRef = ref<InstanceType<typeof ChatRoomMessageList> | null>(null);
const ChatRoomSendMessageRef = ref<InstanceType<typeof ChatRoomSendMessage> | null>(null);

const showChatRoom = () => {
    dialogTableVisible.value = true;
    nextTick(() => {
        opend();
    })
}
const closeChatRoom = () => {
    closed();
    dialogTableVisible.value = false;
}
const opend = () => {
    socket.send({
        event: 'joinChatRoom',
        data: {
            username: treeHoleUserStore.userInfo.ACCOUNT,
            useruuid: treeHoleUserStore.userInfo.USER_UUID,
            avatar: treeHoleUserStore.userInfo.AVATAR,
            articleuuid:porps.articleuuid
        }
    });
    socket.registerCallBack('chatRoomMessage', (data: any) => {
        chatRoomMessage(data)
    });
    socket.registerCallBack('joinChatRoom', (data: any) => {
        chatRoomUser(data);
    });
    socket.registerCallBack('closeChatRoom', (data: any) => {
        chatRoomUser(data);
    });
}
const closed = () => {
    socket.send({
        event: 'closeChatRoom',
        data: {
            username: treeHoleUserStore.userInfo.ACCOUNT,
            useruuid: treeHoleUserStore.userInfo.USER_UUID,
            avatar: treeHoleUserStore.userInfo.AVATAR,
            articleuuid:porps.articleuuid
        }
    });
    socket.unRegisterCallBack('chatRoomMessage');
    socket.unRegisterCallBack('joinChatRoom');
    socket.unRegisterCallBack('closeChatRoom');
}

// 得到别人发送的信息
const chatRoomMessage = (data: ICommentListItem) => {
    ChatRoomMessageListRef.value && ChatRoomMessageListRef.value.addMessageList(data);
}
// 得到当前聊天室在线的人员列表
const chatRoomUser = (data: any) => {
    console.log(data.data);
    userList.value = data.data;
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
        background: linear-gradient(180deg, green, rgb(98, 145, 28), )
    }
}
</style>