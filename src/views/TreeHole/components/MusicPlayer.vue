<template>
    <div class="main">
        <div class="music-box" id="music-box"></div>
    </div>
</template>
<script setup lang='ts'>
import { onMounted } from 'vue';
import { articleList } from '@/api/TreeHole/audio';
import 'aplayer/dist/APlayer.min.css';
import APlayer from 'aplayer';

interface IAudioItem {
    NAME: string,
    ARTIST: string,
    URL: string,
    Cover: string,
    LRC: string
}
onMounted(async () => {
    const audioLRef = await articleList();
    const data: IAudioItem[] = audioLRef.data;
    let audio: any[] = [];
    data.forEach(item => {
        audio.push({
            name: item.NAME,
            artist: item.ARTIST,
            url: item.URL,
            cover: item.Cover,
            lrc: item.LRC,
        })
    });


    const ap = new APlayer({
        container: document.getElementById('music-box'),
        fixed: true,
        autoplay: true,
        audio,
    });
})

</script>
<style lang='scss' scoped></style>