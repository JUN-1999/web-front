<template>
    <el-dialog style="height: 80vh;width: 80vw;" :close-on-click-modal="false" align-center append-to-body
        v-model="dialogTableVisible">
        <div class="box">
            <div class="message-list">
                <div class="message-box"></div>
                <div class="send-message-box">
                    <ChatRoomSendMessage></ChatRoomSendMessage> 
                </div>
            </div>

            <div class="user-list">
                用户列表
            </div>
        </div>

    </el-dialog>
</template>
<script setup lang='ts'>
import ChatRoomSendMessage from './ChatRoomSendMessage.vue';
import { ref } from 'vue';
const dialogTableVisible = ref(true);
</script>
<style lang='scss' scoped>
.box {
    height: 70vh;
    display: flex;
    background-color: skyblue;

    .message-list {
        flex: 1;
        display: flex;
        flex-direction: column;

        .message-box {
            flex: 1;
            background-color: #fff;
            border: 1px solid black;
        }

        .send-message-box {
            height: 200px;
            background-color: #fff;
            border: 1px solid black;
            margin-top: -1px;
        }
    }

    .user-list {
        width: 300px;
        background-color: greenyellow;
    }
}
</style>