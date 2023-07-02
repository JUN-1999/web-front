<template>
    <div class="main">
        <div class="item" :class="useruuid == item.useruuid ? 'oneself' : 'other-people'" v-for="item in commentList"
            :key="item.id">
            <div class="message-item">
                <div class="userinfo">
                    <img :src="item.avatar" alt="">
                    <span>{{ item.username }}</span>
                </div>
                <div class="message">
                    <template v-if="item.message.type == 'text'">{{ item.message.value }}</template>
                    <template v-if="item.message.type == 'media' && item.message.value.type == 'video'">
                        <video controls class="video" :src="item.message.value.url"></video>
                        <div class="video">
                            <ViewVideo :src="item.message.value.url"></ViewVideo>
                        </div>
                    </template>
                    <template v-if="item.message.type == 'media' && item.message.value.type == 'img'">
                        <!-- <img class="img" :src="item.message.value.url" alt=""> -->
                        <el-image lazy class="img" :src="item.message.value.url"
                            :preview-src-list="[item.message.value.url]" :zoom-rate="1.1" fit="contain" />
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import type { ICommentListItem } from './type'
interface ICommentListItemNew extends ICommentListItem {
    id: number
};
const commentList = ref<ICommentListItemNew[]>([]);
const props = defineProps<{
    useruuid: string
}>()
const addMessageList = (data: ICommentListItem) => {
    commentList.value.push({
        ...data,
        ...{ id: new Date().getTime() }
    })
}
defineExpose({
    addMessageList,
})

</script>
<style lang='scss' scoped>
.main {
    padding: 20px;
    width: 100%;
    height: 65vh;
    overflow-y: scroll;
    background-color: pink;

    .item {
        margin-bottom: 20px;
    }

    .userinfo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    img {
        margin-right: 10px;
        margin-left: 0px;
    }

    .message {
        margin-top: 10px;
        display: inline-block;
        background-color: #fff;
        padding: 5px;
        border-radius: 5px;
        font-size: 18px;

        .video {
            width: 200px;
            height: 200px;
        }

        .img {
            width: 200px;
            height: 200px;
            object-fit: contain;
        }
    }

    .oneself {
        text-align: right;

        .userinfo {
            justify-content: flex-start;
            flex-direction: row-reverse;
        }

        img {
            margin-right: 0px;
            margin-left: 10px;
        }
    }
}

img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 10px;
    margin-left: 0px;
}
</style>