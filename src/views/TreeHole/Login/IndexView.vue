<template>
    <div class="box">
        <div class="input-box">
            <LoginItem :zindex="is_login_icon ? 1 : 0" v-if="is_login"></LoginItem>
            <RegisterItem @registerSuccess="changeIsLogin" :zindex="is_register_icon ? 1 : 0" v-if="is_register"> </RegisterItem>
            <div class="changbox" @click="changeIsLogin">
                <div class="iconfont icon-zhuce" v-show="is_login_icon"></div>
                <div class="iconfont icon-denglu" v-show="is_register_icon"></div>
            </div>
        </div>
        <img class="bg-img" src="@/assets/imgs/TreeHole/wallhaven-ex9gwo.png" alt="">
    </div>
</template>

<script setup lang='ts'>
import LoginItem from './components/LoginItem/IndexView.vue';
import RegisterItem from './components/RegisterItem/IndexView.vue';

import { ref } from 'vue';
let is_login = ref(true);
let is_login_icon = ref(true);
let is_register = ref(false);
let is_register_icon = ref(false);
let is_change_tab = ref(true);

const changeIsLogin = function () {
    if (is_change_tab.value) {
        
        is_change_tab.value=false;
        if (is_login.value) {
            is_register.value = true;
            is_register_icon.value = true;

            is_login_icon.value = false;
            setTimeout(() => {
                is_login.value = false;
                is_change_tab.value=true;
            }, 1000);
        } else {
            is_login.value = true;
            is_login_icon.value = true;

            is_register_icon.value = false;
            setTimeout(() => {
                is_register.value = false;
                is_change_tab.value=true;
            }, 1000);
        }
        
    }
}


</script>
<style lang='scss' scoped>
.box {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-image: url('@/assets/imgs/TreeHole/bg.jpg');
    background-size: 100% 100%;
    background-repeat: no-repeat;

    .bg-img{
        width: 100vw;
        height: 100vh;
    }
    .input-box {
        width: 30vw;
        height: 70vh;
        background-color: rgba($color: #fff, $alpha: .5);
        filter: drop-shadow(4px 4px 8px gray);
        position: absolute;
        top: 50%;
        right: 10%;
        transform: translate(0, -50%);
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 5;

        .changbox {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 100px;
            height: 100px;
            z-index: 5;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%);

            .iconfont {
                position: absolute;
                top: 0px;
                right: 0px;
                font-size: 72px;
                color: green;
            }
        }
    }
}
</style>