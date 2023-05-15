<template>
    <div @click.stop="changeIMG(true)" class="view-img">
        <img id="img" :src="props.src">
        <div v-show="show" :class="{ 'max-img-show': show }" class="max-img">
            <div class="header"> <i @click.stop="changeIMG(false)" class="iconfont icon-guanbi"></i></div>
            <div class="content">
                <img :src="props.src" alt="">
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const props = defineProps(['src']);
let show = ref(false);

const changeIMG = (flag: boolean) => {
    console.log(flag);
    show.value = flag;
}
</script>
<style lang='scss' scoped>
.view-img {
    border-radius: 5px;
    background-color: #e1e1e1;
}

#img {
    object-fit: cover;
    width: auto;
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

    background-color: rgba($color: #ececec, $alpha: 1);
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
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 95%;
        }
    }
}

.icon-guanbi {
    color: #000000;
}
</style> 