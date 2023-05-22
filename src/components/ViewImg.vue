<template>
    <div @mouseenter="imgEnter" @mouseleave="imgLeave" class="view-img">
        <img id="img" :src="src" />
        <div class="tip" v-show="show_tip">
            <i @click="changeIMG(true)" class="iconfont icon-fangda"></i>
            <i v-if="showDelete" @click="imgDelete(src)" class="iconfont icon-shanchu"></i>
        </div>
        <div v-show="show" :class="{ 'max-img-show': show }" class="max-img">
            <div class="header"> <i @click.stop="changeIMG(false)" class="iconfont icon-guanbi"></i></div>
            <div class="content">
                <img :src="src" alt="">
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import 'viewerjs/dist/viewer.css'
import { api as viewerApi } from "v-viewer"
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
    loading: {
        type: Boolean,
        default: false
    }
});
const emits = defineEmits(['imgDelete'])
let show = ref(false);
let show_tip = ref(false);

const changeIMG = (flag: boolean) => {
    // show.value = flag;.
    const $viewer = viewerApi({
        images: [props.src]
    })
}
const imgEnter = () => { show_tip.value = true }
const imgLeave = () => { show_tip.value = false }
const imgDelete = (src: string) => { emits('imgDelete', src) }
</script>
<style lang='scss' scoped>
.view-img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    position: relative;

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
}

#img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.max-img-show {
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

.max-img {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;

    background-color: #fff;
    z-index: 20;
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
        padding: 10px 20px 0;
        text-align: right;
        background-color: transparent;
        margin-bottom: 10px;

        i {
            font-size: 30px;
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
</style> 