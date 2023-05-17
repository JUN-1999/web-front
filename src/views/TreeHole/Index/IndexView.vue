<template>
    <div class="treehole">
        <div class="EditArticle" @click="EditArticle">
            <img src="@/assets/imgs/TreeHole/EditArticle1.png" alt="新增瓜">
        </div>
        <RouterView></RouterView>

        <!-- 冒泡泡 -->
        <!-- <bubbling></bubbling> -->
    </div>
</template>
<script setup lang='ts'>
import { useRouter } from 'vue-router'
import bubbling from '../components/bubbling.vue'
const router = useRouter();
const EditArticle = () => [
    router.push('/TreeHole/TreeHoleIndex/TreeHoleEdit')
]



</script>
<style lang='scss' scoped>
.treehole {
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: olivedrab;
    animation: intoA .3s linear;
    display: flex;
    justify-content: center;
    align-items: center;

    // 添加记录
    .EditArticle{
        width: 100px;
        height: 100px;
        border-radius: 20px;
        background-color: #fff;
        position: fixed;
        bottom: 2vh;
        right: 2vw;
        img{
            width: 100%;
            height: 100%;
        }
    }
}

@keyframes intoA {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>