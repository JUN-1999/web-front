<template>
    <div :class="{ login_success: is_login_success }" class="box">
        <div class="center">
            <div class="news">
                <img src="@/assets/imgs/TreeHole/login_news.svg" alt="">
            </div>
            <div class="input-box">
                <LoginItem @login-success="loginSuccess" :zindex="is_login_icon ? 1 : 0" v-if="is_login"></LoginItem>
                <RegisterItem @registerSuccess="changeIsLogin" :zindex="is_register_icon ? 1 : 0" v-if="is_register">
                </RegisterItem>
                <div class="changbox" @click="changeIsLogin">
                    <div class="iconfont icon-zhuce1" v-show="is_login_icon"></div>
                    <div class="iconfont icon-dengluzhanghao" v-show="is_register_icon"></div>
                    <div :style="{
                        '--color': is_login_icon ? '#2398db' : '#87ceeb'
                    }" class="changebox-text">{{ is_login_icon ? '去注册' : '去登录' }}</div>
                </div>
            </div>
        </div>

        <img class="bg-img" src="@/assets/imgs/TreeHole/wallhaven-zx6rdw.jpg" alt="">
    </div>
</template>

<script setup lang='ts'>
import LoginItem from './components/LoginItem/IndexView.vue';
import RegisterItem from './components/RegisterItem/IndexView.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();
let is_login = ref(true);
let is_login_icon = ref(true);
let is_register = ref(false);
let is_register_icon = ref(false);
let is_change_tab = ref(true);
let is_login_success = ref(false); //登录成功标识

const changeIsLogin = function () {
    if (is_change_tab.value) {

        is_change_tab.value = false;
        if (is_login.value) {
            is_register.value = true;
            is_register_icon.value = true;

            is_login_icon.value = false;
            setTimeout(() => {
                is_login.value = false;
                is_change_tab.value = true;
            }, 1000);
        } else {
            is_login.value = true;
            is_login_icon.value = true;

            is_register_icon.value = false;
            setTimeout(() => {
                is_register.value = false;
                is_change_tab.value = true;
            }, 1000);
        }

    }
}
const loginSuccess = function () {
    is_login_success.value = true;
    setTimeout(() => {
        router.push('/Treehole/index')
    }, 300);
}

</script>
<style lang='scss' scoped>
.box {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .center {
        height: 70vh;
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba($color: #fff, $alpha: .5);
        width: 60vw;
        border-radius: 10px;
        overflow: hidden;


        .news {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                width: 80%;
                height: 80%;
            }

 
        }

        .input-box {
            width: 30vw;
            height: 70vh;
            background-color: rgba($color: #fff, $alpha: .5);
            filter: drop-shadow(4px 4px 8px gray);


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
                display: flex;
                justify-content: center;
                align-items: center;

                .iconfont {
                    font-size: 60px;
                    color: #fff;
                }

                .changebox-text {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translate(-80%, -50%);
                    font-size: 18px;
                    border: 1px solid #fff;
                    width: 70px;
                    height: 40px;
                    color: #fff;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 15px;

                    &::after {
                        content: '';
                        border-top: 10px solid transparent;
                        border-left: 8px solid var(--color);
                        border-bottom: 10px solid transparent;
                        border-right: 10px solid transparent;
                        position: absolute;
                        right: 0;
                        top: 0;
                        transform: translate(90%, 50%);
                    }

                    &::before {
                        content: '';
                        border-top: 10px solid transparent;
                        border-left: 8px solid #fff;
                        border-bottom: 10px solid transparent;
                        border-right: 10px solid transparent;
                        position: absolute;
                        right: 0;
                        top: 0;
                        transform: translate(100%, 50%);
                    }
                }
            }
        }
    }

    .bg-img {
        width: 100%;
        height: 100%;
    }


}

.login_success {
    animation: loginSuccessA .3s linear;
}

@keyframes loginSuccessA {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>