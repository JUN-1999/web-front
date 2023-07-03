<template>
    <div class="item">
        <div class="title" v-if="index == 0">今天</div>
        <div class="title" v-if="index == 1">明天</div>
        <div class="title" v-if="index == 2">后天</div>
        <div class="weather-img">
            <WeatherSvg :text="data.iconDay"></WeatherSvg>
        </div>
        <div class="text">{{ data.textDay }}/{{ data.textNight }}</div>
        <div class="text">{{ data.tempMin }}°/{{ data.tempMax }}°</div>
    </div>
</template>
<script setup lang='ts'>
import WeatherSvg from './WeatherSvg.vue';
const props = defineProps<{
    data: any,
    index: number
}>()
</script>
<style lang='scss' scoped>
.item{
    display: flex;
    flex-direction: column;
    align-items: center;   
    flex:1;
    margin-top: 10px;
}
.title{
    font-size: 12px;
    color: #fff;
}
.weather-img {
    width: 30px;
    height: 30px;
    margin-bottom: 10px;
}
.text{
    color: #fff;
    font-size: 8px;
}
</style>