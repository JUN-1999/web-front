<template>
    <div class="time-line">
        <div class="main">
            <div class="name"> {{ articleInfo.TITLE }}</div>
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
        <el-timeline>
            <el-timeline-item v-for="item in list" :key="item.TIMER_SHAFT_UUID" :timestamp="item.TIME" placement="top">
                <el-card>
                    <div v-html="item.COMMENT"></div>
                    <div class="imgs">
                        <div v-for="picitem, picindex in item.PICS" :key="picindex" class="img-box">
                            <template v-if="picitem.type == 'img'">
                                <el-image class="img-item" fit="cover" :src="picitem.url" :preview-src-list="[picitem.url]"
                                    :zoom-rate="1.1"></el-image>
                            </template>
                            <template v-if="picitem.type == 'video'">
                                <div class="img-item" :key="picitem.url">
                                    <ViewVideo :src="picitem.url"></ViewVideo>
                                </div>
                            </template>
                        </div>
                    </div>
                </el-card>
            </el-timeline-item>

        </el-timeline>
        <div class="close" @click="closeTimeLine">
            <i class="iconfont icon-guanbi1"></i>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { getTimeLine } from '@/api/TreeHole/timerLine'
import ViewVideo from '@/components/ViewVideo.vue';
import type { IArticleItem } from '@/type/TreeHole/article';
const props = defineProps<{
    articleInfo: IArticleItem
}>()
const emits = defineEmits(['close'])
let list = ref();

onMounted(async () => {
    let { data } = await getTimeLine({
        ARTICLE_UUID: props.articleInfo.ARTICLE_UUID
    })

    list.value = data.map((item: any) => {
        item.PICS = JSON.parse(item.PICS)
        return item
    });
})


const closeTimeLine = () => {
    emits('close', false)
}
</script>
<style lang='scss' scoped>
.time-line {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    width: 600px;
    height: calc(90vh - 50px);
    background-color: #fff;
    border-radius: 15px;
    overflow-y: auto;
    padding: 20px;
    background-color: rgba($color: olivedrab, $alpha: 1);

    /*定义滚动条高宽及背景
    高宽分别对应横竖滚动条的尺寸*/
    &::-webkit-scrollbar {
        width: 0px;
    }

    // 主内容
    .main {
        background-color: #fff;
        border-radius: 15px;
        padding: 10px;
        margin-bottom: 20px;

        .name {
            margin-top: 10px;
            font-weight: 600;
            font-size: 25px;
            margin-bottom: 10px;
        }

    }

    .imgs {
        display: flex;
        flex-wrap: wrap;
        width: 80%;
        margin-top: 20px;

        .img-box {
            width: 120px;
            height: 120px;
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

    .close {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: black;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
}

:deep(.el-timeline-item__timestamp) {
    color: #fff;
}
</style>