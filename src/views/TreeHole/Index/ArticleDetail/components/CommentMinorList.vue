<template>
    <div>
        <div class="comment-item" v-for="(item, index) in commentList" :key="index">
            <div class="left">
                <div class="avatar"><img :src="item.AVATAR" alt="" /></div>
            </div>
            <div class="right">
                <div>
                    <span class="name">{{ item.ACCOUNT }}</span>
                    <template v-if="item.USERINFO">
                        <span class="at">@{{ item.USERINFO.ACCOUNT }} ：</span>
                    </template>
                    <span class="comment">{{ item.COMMENT }}</span>
                </div>
                <div class="pics">
                    <template v-for="(pic, index) in item.PICS">
                        <template v-if="pic.type == 'img'">
                            <el-image lazy class="brief-img" :key="pic.url" :src="pic.url" :preview-src-list="[pic.url]"
                                :zoom-rate="1.1" fit="cover" />
                        </template>
                        <template v-if="pic.type == 'video'">
                            <div class="brief-img" :key="pic.url">
                                <ViewVideo :src="pic.url"></ViewVideo>
                            </div>
                        </template>
                    </template>
                </div>
                <div class="tool">
                    <span class="tool-item time">{{ $common.timeFilter(item.ADD_TIME) }}</span>
                    <span class="tool-item reply" @click="reply(item)">回复</span>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import type { IComment } from '@/type/TreeHole/comment';
import ViewVideo from '@/components/ViewVideo.vue';
const emits = defineEmits(['minorReply'])
const props = defineProps<{
    commentList: IComment[]
}>()
// 回复按钮
const reply = (data: IComment) => {
    emits('minorReply', data.FATHER_COMMENT_UUID, data.USER_UUID, data.ACCOUNT)
}

</script>
<style lang='scss' scoped>
.comment-item {
    width: 100%;
    margin-bottom: 15px;
    display: flex;

    .left {
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 20px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .right {
        padding-top: 10px;
        flex: 1;

        .name {
            color: #585454;
            font-size: 20px;
            margin-bottom: 10px;
            margin-right: 10px;
        }

        .tool {
            margin-top: 10px;
            color: #585858;
            font-size: 20px;

            .tool-item {
                margin-right: 15px;
            }
        }

        .minor-reply {
            margin-top: 20px;
            width: 100%;
        }
    }
}

.pics {
    .brief-img {
        width: 80px;
        height: 80px;
        margin-right: 10px;
    }
}
</style>