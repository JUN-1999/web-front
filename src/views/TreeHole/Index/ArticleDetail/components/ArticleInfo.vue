<template>
    <div class="acticle-info">
        <div class="left">
            <div><img :src="articleInfo.AVATAR" /></div>
            <h5 style="width: 50px;text-align: center;word-wrap: break-word;">{{ articleInfo.ACCOUNT }}</h5>
        </div>
        <div class="right">
            <div class="tool">
                <img title="已关注" @click="follow" v-if="is_follow" class="tool-img follow"
                    src="@/assets/svg/TreeHole/follow.svg" alt="">
                <img title="未关注" @click="follow" v-else class="tool-img" src="@/assets/svg/TreeHole/not_follow.svg" alt="">
                <img title="聊天室" class="tool-img" src="@/assets/imgs/TreeHole/chat_room.png" alt="聊天室">
                <img title="时间线" @click="cahngeTimeLine(true)" class="tool-img" src="@/assets/svg/TreeHole/timeline.svg" alt="">
            </div>
            <div class="name"> {{ articleInfo.TITLE }}</div>
            <div class="time"> {{ articleInfo.UPDATE_TIME || articleInfo.ADD_TIME }}</div>
            <div class="content">
                <p v-html="articleInfo.CONTENT"> </p>
            </div>
            <div class="imgs">
                <div v-for="item, index in articleInfo.PICS" :key="index" class="img-box">
                    <template v-if="item.type == 'img'">
                        <el-image class="img-item" fit="cover" :src="item.url" :preview-src-list="[item.url]"
                            :zoom-rate="1.1"></el-image>
                    </template>
                    <template v-if="item.type == 'video'">
                        <div class="img-item" :key="item.url">
                            <ViewVideo :src="item.url"></ViewVideo>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
    <!--  -->
    <TimeLine ref="timeLine" @close="cahngeTimeLine" :articleInfo="articleInfo" v-if="showTimeLine"></TimeLine>
</template>
<script setup lang='ts'>
import { onMounted, computed, ref } from 'vue';
import type { IArticleItem } from '@/type/TreeHole/article';
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser';
import { postFllowApi } from '@/api/TreeHole/user';
import TimeLine from '@/views/TreeHole/components/TimeLine.vue';
import ViewVideo from '@/components/ViewVideo.vue';
const props = defineProps<{
    articleInfo: IArticleItem
}>()
const treeHoleUserStore = useTreeHoleUserStore();
onMounted(() => {
    if (!treeHoleUserStore.follow) treeHoleUserStore.getFollow();
})
const is_follow = computed(() => {
    if (!treeHoleUserStore.follow) {
        return false;
    } else {
        return treeHoleUserStore.follow.includes(props.articleInfo.ARTICLE_UUID)
    }
})
// 关注文章
const follow = async () => {
    await postFllowApi({
        id: props.articleInfo.ARTICLE_UUID
    })
    await treeHoleUserStore.getFollow();
}
let showTimeLine = ref(false);
// 显示时间轴
const cahngeTimeLine = (flag: boolean = true) => {
    console.log('cahngeTimeLine',flag);
    
    showTimeLine.value = flag;
}

</script>
<style lang='scss' scoped>
.acticle-info {
    padding: 30px;
    display: flex;

    .left {
        margin-right: 20px;
    }

    .left img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
    }

    .right {
        display: flex;
        flex-direction: column;
        position: relative;
        flex: 1;

        .tool {
            position: absolute;
            right: 20px;
            top: 0;
            display: flex;
            align-items: center;

            .tool-img {
                width: 50px;
                height: 50px;
                margin-left: 20px;
                cursor: pointer;
            }

            .follow {
                animation: floowA .5s linear;
            }

            @keyframes floowA {
                0% {
                    transform: scale(1);
                }

                50% {
                    transform: scale(1.1);
                }

                100% {
                    transform: scale(1);
                }
            }
        }

        .name {
            margin-top: 10px;
            font-weight: 600;
            font-size: 25px;
            margin-bottom: 10px;
        }

        .time {
            font-size: 18px;
            color: #333333;
            margin-bottom: 10px;
        }

        .imgs {
            display: flex;
            flex-wrap: wrap;
            width: 80%;
            margin-top: 20px;

            .img-box {
                width: 320px;
                height: 320px;
                overflow: hidden;
                margin-right: 50px;
                margin-bottom: 50px;
                border-radius: 10px;

                .img-item {
                    width: 100%;
                    height: 100%;
                }
            }

        }
    }
}
</style>