<template>
    <div class="weather" :class="detail_show ? 'detail' : 'brief'" @click="weatherFlag" v-if="show">
        <template v-if="detail_show"></template>
        <template v-else>
            <div class="left" v-if="weatherNowData">
                <img v-if="weatherNowData.text == '暴雨'" src="@/assets/svg/weather/tianqi-baoyu.svg" alt="">
                <img v-if="weatherNowData.text == '大雨'" src="@/assets/svg/weather/tianqi-dayu.svg" alt="">
                <img v-if="weatherNowData.text == '大暴雨'" src="@/assets/svg/weather/tianqi-dabaoyu.svg" alt="">
                <img v-if="weatherNowData.text == '小雨'" src="@/assets/svg/weather/tianqi-xiaoyu.svg" alt="">
                <img v-if="weatherNowData.text == '雷雨'" src="@/assets/svg/weather/tianqi-leiyu.svg" alt="">
                <img v-if="weatherNowData.text == '阴天'" src="@/assets/svg/weather/tianqi-yintian.svg" alt="">
                <img v-if="weatherNowData.text == '扬沙'" src="@/assets/svg/weather/tianqi-yangsha.svg" alt="">
                <img v-if="weatherNowData.text == '雾'" src="@/assets/svg/weather/tianqi-wu.svg" alt="">
                <img v-if="weatherNowData.text == '沙尘'" src="@/assets/svg/weather/tianqi-shachen.svg" alt="">
                <img v-if="weatherNowData.text == '晴'" src="@/assets/svg/weather/tianqi-qing.svg" alt="">
                <img v-if="weatherNowData.text == '小雪'" src="@/assets/svg/weather/tianqi-xiaoxue.svg" alt="">
                <img v-if="weatherNowData.text == '多云'" src="@/assets/svg/weather/tianqi-duoyun.svg" alt="">
                <img v-if="weatherNowData.text == '中雪'" src="@/assets/svg/weather/tianqi-zhongxue.svg" alt="">
                <img v-if="weatherNowData.text == '大雪'" src="@/assets/svg/weather/tianqi-daxue.svg" alt="">
                <img v-if="weatherNowData.text == '中雨'" src="@/assets/svg/weather/tianqi-zhongyu.svg" alt="">
                <img v-if="weatherNowData.text == '暴雨'" src="@/assets/svg/weather/tianqi-baoxue.svg" alt="">
                <img v-if="weatherNowData.text == '雨夹雪'" src="@/assets/svg/weather/tianqi-yujiaxue.svg" alt="">
                <img v-if="weatherNowData.text == '霜'" src="@/assets/svg/weather/tianqi-shuang.svg" alt="">
                <img v-if="weatherNowData.text == '雪转晴'" src="@/assets/svg/weather/tianqi-xuezhuanqing.svg" alt="">
            </div>
            <div class="right">
                <div class="city" v-if="addressComponent">{{ addressComponent.city || addressComponent.province }}</div>
                <div class="temp" v-if="weatherNowData">{{ weatherNowData.temp }}°</div>
            </div>
        </template>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, nextTick } from 'vue';
import { shallowRef } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { weather3d, weatherNow } from '@/api/TreeHole/weather';

const show = ref(false);
const detail_show = ref(false);
const map = shallowRef(null);
const weather3dData = ref<any[]>([]); // 三天天气信息
const weatherNowData = ref();// 实时天气信息
const addressComponent = ref();//位置信息


if ('geolocation' in navigator) {
    /* geolocation 存在 */
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords);
        console.log('经度', position.coords.longitude);
        console.log('纬度', position.coords.latitude);

        // 利用高德地图api 将经纬度转换为城市名
        AMapLoader.load({
            key: "c0e0a80726e062ed44a9fcee1b6dbd5f",// 申请好的Web端开发者Key，首次调用 load 时必填
            version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
            plugins: ['AMap.Geocoder'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap: any) => {
            AMap.plugin('AMap.Geocoder', function () {
                let geocoder = new AMap.Geocoder({
                    city: '全国' // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                })
                let lnglat = [position.coords.longitude, position.coords.latitude];

                geocoder.getAddress(lnglat, function (status: any, result: any) {
                    if (status === 'complete' && result.info === 'OK') {
                        // result为对应的地理位置详细信息
                        // console.log('获取到的位置信息', result);
                        // console.log('具体的城市信息', result.regeocode.addressComponent);
                        addressComponent.value = result.regeocode.addressComponent;
                        console.log('当前城市', addressComponent.value);
                    }
                })
            })
        }).catch(e => {
            console.log(e);
        })

        weather3d({
            location: `${position.coords.longitude},${position.coords.latitude}`
        }).then(res => {
            // console.log('weather3d', res);
            weather3dData.value = res.data.daily;
            console.log('三日天气', weather3dData.value);

        })

        weatherNow({
            location: `${position.coords.longitude},${position.coords.latitude}`
        }).then(res => {
            // console.log('weatherNow', res);
            weatherNowData.value = res.data.now;
            console.log('今日天气', weatherNowData.value);
        })


    });
} else {
    /* geolocation 不存在 */
    console.log('不支持地理位置信息');

}
onMounted(() => {
    nextTick(() => {
        show.value = true;
    })
})

const weatherFlag = () => {
    detail_show.value = !detail_show.value;
}


</script>
<style lang='scss' scoped>
.weather {
    position: fixed;
    top: 5px;
    left: 5px;
    z-index: 999;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.3s;
}

.detail {
    width: 150px;
    height: 300px;
    background: linear-gradient(180deg, #2a6be9, #76bcfe);
}



.brief {
    width: 150px;
    height: 100px;
    background: linear-gradient(180deg, #2a6be9, #76bcfe);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;


    .left {
        img {
            width: 50px;
            height: 50px;
        }
    }

    .right {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-size: 22px;
        font-weight: 600;
    }
}
</style>