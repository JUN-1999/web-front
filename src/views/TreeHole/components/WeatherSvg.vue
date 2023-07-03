<template>
    <img style="width: 100%;height: 100%;" :src="weathIMG" alt="">
    <!-- <img style="width: 100%;height: 100%;" :src="weathIMG2"> -->
</template>
<script setup lang='ts'>
import { computed } from 'vue';
import tianqi_baoyu from '@/assets/svg/weather/tianqi-baoyu.svg';
import tianqi_dayu from '@/assets/svg/weather/tianqi-dayu.svg';
import tianqi_dabaoyu from '@/assets/svg/weather/tianqi-dabaoyu.svg';
import tianqi_xiaoyu from '@/assets/svg/weather/tianqi-xiaoyu.svg';
import tianqi_leiyu from '@/assets/svg/weather/tianqi-leiyu.svg';
import tianqi_yintian from '@/assets/svg/weather/tianqi-yintian.svg';
import tianqi_yangsha from '@/assets/svg/weather/tianqi-yangsha.svg';
import tianqi_wu from '@/assets/svg/weather/tianqi-wu.svg';
import tianqi_shachen from '@/assets/svg/weather/tianqi-shachen.svg';
import tianqi_qing from '@/assets/svg/weather/tianqi-qing.svg';
import tianqi_xiaoxue from '@/assets/svg/weather/tianqi-xiaoxue.svg';
import tianqi_duoyun from '@/assets/svg/weather/tianqi-duoyun.svg';
import tianqi_zhongxue from '@/assets/svg/weather/tianqi-zhongxue.svg';
import tianqi_daxue from '@/assets/svg/weather/tianqi-daxue.svg';
import tianqi_zhongyu from '@/assets/svg/weather/tianqi-zhongyu.svg';
import tianqi_baoxue from '@/assets/svg/weather/tianqi-baoxue.svg';
import tianqi_yujiaxue from '@/assets/svg/weather/tianqi-yujiaxue.svg';
import tianqi_shuang from '@/assets/svg/weather/tianqi-shuang.svg';
import tianqi_xuezhuanqing from '@/assets/svg/weather/tianqi-xuezhuanqing.svg';
const props = defineProps<{
    text: string
}>();
const weathIMG = computed(() => {
    if (props.text == '305') return tianqi_xiaoyu;
    if (props.text == '306') return tianqi_zhongyu;
    // 大雨
    if (props.text == '307') return tianqi_dayu;
    // 暴雨
    if (props.text == '310') return tianqi_baoyu;
    // 大暴雨
    if (props.text == '311' || props.text == '312' || props.text == '316' || props.text == '317' || props.text == '318') return tianqi_dabaoyu;
    // 雷雨
    if (props.text == '302' || props.text == '303') return tianqi_leiyu;
    // 晴
    if (props.text == '100' || props.text == '150') return tianqi_qing;
    // 阴
    if (props.text == '104') return tianqi_yintian;
    // 多云
    if (props.text == '101'|| props.text == '103'|| props.text == '151'|| props.text == '153') return tianqi_duoyun;
    // 雾
    if (props.text == '500' || props.text == '501' || props.text == '509' || props.text == '509' || props.text == '514' || props.text == '514') return tianqi_wu;
    // 扬沙
    if (props.text == '503') return tianqi_yangsha;
    // 沙尘
    if (props.text == '507'|| props.text == '508') return tianqi_shachen;
    // 小雪
    if (props.text == '400') return tianqi_xiaoxue;
    // 中雪
    if (props.text == '401') return tianqi_zhongxue;
    // 大雪
    if (props.text == '402') return tianqi_daxue;
    // 暴雪
    if (props.text == '403') return tianqi_baoxue;
    // 雨夹雪
    if (props.text == '404') return tianqi_yujiaxue;
    // // 霜
    // if (props.text == '') return tianqi_shuang;
    // // 雪转晴
    // if (props.text == '') return tianqi_xuezhuanqing;
    return '';
})

</script>
<style lang='scss' scoped></style>