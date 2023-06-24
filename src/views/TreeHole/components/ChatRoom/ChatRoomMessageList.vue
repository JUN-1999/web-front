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
                    {{ item.message }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
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
}</style>