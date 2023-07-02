<template>
    <div class="treehole">
        <!-- <SidebarNew></SidebarNew> -->
        <KeepAlive :include="['TreeUser']">
            <RouterView></RouterView>
        </KeepAlive>

        <Sidebar></Sidebar>

        <!-- 音乐播放器 -->
        <MusicPlayer></MusicPlayer>
        <!-- 冒泡泡 -->
        <!-- <bubbling></bubbling> -->
    </div>
</template>
<script setup lang='ts'>
import SidebarNew from '../components/SidebarNew.vue';
import Sidebar from '../components/SidebarWJC.vue';
import MusicPlayer from '../components/MusicPlayer.vue';
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