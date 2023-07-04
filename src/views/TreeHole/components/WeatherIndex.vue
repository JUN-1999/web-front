<template>
    <div class="weather" :class="detail_show ? 'detail' : 'brief'" @click="weatherFlag" v-if="show">
        <template v-if="detail_show">
            <div class="city">{{ addressComponent.city || addressComponent.province }}</div>
            <div class="updateTime">{{ weatherUpdateTime }}发布</div>
            <div class='weather-now'>
                <div class="weather-img">
                    <WeatherSvg :text="weatherNowData.icon"></WeatherSvg>
                </div>
                <p class="weather-temp">{{ weatherNowData.temp }}°</p>
                <p class="weather-text">{{ weatherNowData.text }}</p>
            </div>
            <div class="weather-now-other-info">
                <div class="weather-other-flex">
                    <div class="text"> {{ weatherNowData.windDir }}</div>
                    <div class="num"> {{ weatherNowData.windScale }}级</div>
                </div>
                <div class="weather-other-flex">
                    <div class="text"> 空气质量</div>
                    <div class="num"> 无</div>
                </div>
                <div class="weather-other-flex">
                    <div class="text">相对湿度</div>
                    <div class="num">{{ weatherNowData.humidity }}%</div>
                </div>
            </div>
            <div class="weather3d">
                <Weather3DItem v-for="item, index in weather3dData" :index="index" :key="item.fxDate" :data="item">
                </Weather3DItem>
            </div>
        </template>
        <template v-else>
            <div class="left" v-if="weatherNowData">
                <div class="weather-img">
                    <WeatherSvg :text="weatherNowData.icon"></WeatherSvg>
                </div>
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
import { shallowRef, computed } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { weather3d, weatherNow } from '@/api/TreeHole/weather';
import WeatherSvg from './WeatherSvg.vue';
import Weather3DItem from './Weather3DItem.vue';

const show = ref(false);
const detail_show = ref(false);
const map = shallowRef(null);
const weather3dData = ref<any[]>([]); // 三天天气信息
const weatherNowData = ref();// 实时天气信息
const addressComponent = ref();//位置信息
const weatherUpdateTime = computed(() => {
    let time = '';
    let times = weatherNowData.value.obsTime;
    let h = new Date(times).getHours();
    let m = new Date(times).getMinutes();
    time = h + ':' + m;
    return time;
})



onMounted(() => {
    if ('geolocation' in navigator) {
        /* geolocation 存在 */
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            console.log('经度', position.coords.longitude);
            console.log('纬度', position.coords.latitude);

            nextTick(() => {
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

                                show.value = true;
                            }
                        })
                    })
                }).catch(e => {
                    console.log(e);
                })
            })
        });
    } else {
        /* geolocation 不存在 */
        console.log('不支持地理位置信息');

    }
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
    width: 260px;
    height: 400px;
    background: linear-gradient(180deg, #2a6be9, #76bcfe);

    .city {
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        margin-left: 10px;
        margin-top: 20px;
    }

    .updateTime {
        font-size: 14px;
        color: #c5c3c3;
        font-weight: 600;
        margin-left: 10px;
        margin-top: 5px;
    }

    .weather-now {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .weather-img {
            width: 50px;
            height: 50px;
        }

        .weather-temp {
            font-size: 40px;
            color: #fff;
        }

        .weather-text {
            font-size: 12px;
            color: #fff;
        }
    }

    .weather-now-other-info {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        color: #fff;
        margin-top: 20px;

        .weather-other-flex {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .text {
            font-size: 8px;
        }

        .num {
            font-size: 20px;
        }

    }

    .weather3d {
        display: flex;
        align-items: center;
        border-top: 1px solid rgba($color: #fff, $alpha: .5);
        margin-top: 20px;
    }
}

.brief {
    width: 160px;
    height: 100px;
    background: linear-gradient(180deg, #2a6be9, #76bcfe);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;


    .left {
        .weather-img {
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