<template>
    <div class="view-video" @mouseenter="videoEnter" @mouseleave="videoLeave">
        <div class="video-box">
            <i class="iconfont icon-bofang"></i>
            <video id="video">
                <source :src="src">
            </video>
        </div>
        <div class="tip" v-show="show_tip">
            <i @click="changeVideo(true)" class="iconfont icon-fangda"></i>
            <i v-if="showDelete" @click="videoDelete(src)" class="iconfont icon-shanchu"></i>
        </div>
        <div class="mask_layer" v-show="show">
            <div :class="{ 'max-video-show': show }" class="max-video">
                <div class="header"> <i @click.stop="changeVideo(false)" class="iconfont icon-guanbi"></i></div>
                <div class="content">
                    <video controls id="viewvideo">
                        <source :src="src">
                    </video>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    showDelete: {
        type: Boolean,
        default: () => false
    },
});

const emits = defineEmits(['videoDelete'])
let show = ref(false);
let show_tip = ref(false);

const changeVideo = (flag: boolean) => {
    show.value = flag;
}
const videoEnter = () => { show_tip.value = true }
const videoLeave = () => { show_tip.value = false }
const videoDelete = (src: string) => { emits('videoDelete', src) }
</script>
<style lang='scss' scoped>
.view-video {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;
    overflow: hidden;

    .video-box {
        width: 100%;
        height: 100%;
        position: relative;

        .icon-bofang {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #fff;
            font-size: 80px;
        }
    }

    .tip {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba($color: #000, $alpha: .5);

        .iconfont {
            color: #fff;
            font-size: 25px !important;
            padding: 10px;
        }
    }

    #video {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
}


.max-video-show {
    animation: showA .3s linear;
}

@keyframes showA {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.mask_layer {
    background-color: rgba($color: #000000, $alpha: .5);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 998;
}

.max-video {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;

    background-color: #fff;
    z-index: 999;
    width: 80vw;
    height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: all;



    .header {
        width: 100%;
        position: sticky;
        box-sizing: border-box;
        padding: 30px 20px 0;
        text-align: right;
        background-color: transparent;
        margin-bottom: 10px;

        i {
            font-size: 40px;
        }
    }

    .content {
        flex: 1;
        overflow-x: auto;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.icon-guanbi {
    color: #000000;
}

#viewvideo {
   height: 95%;
   width: 90%;
}
</style>