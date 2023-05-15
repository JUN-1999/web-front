<template>
    <div class="bubbling">
        <div class="bubbling-item" :class="item.is_enter ? 'bubbling-enter' : 'bubbling-out'" :style="{
            left: item.left + 'px',
        }" v-for="(item, index) in bubblingList" :key="item.id" @mouseenter="BubblingChange(item, true)"
            @mouseout="BubblingChange(item, false)">
            {{ item.value }}
        </div>
    </div>
</template>
<script setup lang='ts'>
import type { IBubblingItem } from '../types/bubbling'
import { ref } from 'vue';
const list = ref([
    { id: 1, value: '内容1内容1内容1内容1内容1内容1' },
    { id: 2, value: '=========================' },
    { id: 3, value: '特大新闻，北三路' },
    { id: 4, value: '怎么回事怎么回事怎么回事' },
    { id: 5, value: '阿哲爱着啊这' },
    { id: 6, value: '特大新闻，北三路' },
    { id: 7, value: '怎么回事怎么回事怎么回事' },
    { id: 8, value: '阿哲爱着啊这' },
]);// 原始数据
const bubblingList = ref<Bubbling[]>([]); //泡泡展示的数据

class Bubbling {
    left = 0;
    value: string;
    id: number;
    is_enter: boolean;
    constructor(item: IBubblingItem) {
        this.left = Math.floor(Math.random() * 260);
        this.value = item.value;
        this.id = item.id;
        this.is_enter = false;
    }
}

for (let i = 0; i < list.value.length; i++) {
    let item = list.value[i];
    let time = 1200 * i;
    setTimeout(() => {
        const bubblingItem = new Bubbling(item)
        bubblingList.value.push(bubblingItem)
    }, time);
}

// 泡泡进入
const BubblingChange = function (data: Bubbling, flag: boolean) {
    for (let item of bubblingList.value) {
        if (item.id == data.id) {
            item.is_enter = flag;
        }
    }
}


</script>
<style lang='scss' scoped>
.bubbling {
    position: fixed;
    bottom: 3vh;
    left: 1vw;
    width: 600px;
    height: 1200px;
    background-color: transparent;
    overflow: hidden;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-image: url('@/assets/imgs/TreeHole/sea2.jpg');
    background-size: auto;
    background-repeat: no-repeat;

    .bubbling-item {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        box-shadow: inset 0 0 8px 2px #fff;
        position: absolute;
        bottom: -180px;
        left: 0;
        animation: floatUp 8s linear infinite;
        overflow: hidden;
        color: #fff;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        font-size: 14px;


        @keyframes floatUp {
            0% {
                bottom: -180px;
                transform: scale(1);
                opacity: 1;
            }

            5% {
                bottom: -180px;
                transform: scale(1);
                opacity: 1;
            }

            100% {
                bottom: 1200px;
                transform: scale(0.8);
                opacity: 0;
            }
        }
    }

    .bubbling-enter {
        animation-play-state: paused;
        transform: scale(1.5) !important;
        transition: all 1s linear !important;
        opacity: 1 !important;
    }

    .bubbling-out {
        animation-play-state: running;
    }
}
</style>