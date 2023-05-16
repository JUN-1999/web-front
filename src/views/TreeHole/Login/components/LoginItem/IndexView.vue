<template>
    <div :style="{ zIndex: zindex }" class="login-box">
        <img src="@/assets/svg/tree.svg" alt="">
        <div class="account form-item">
            <span class="input-title">账号</span>
            <input placeholder="请输入账号" type="text" v-model.trim="form.account">
            <span v-show="account_type == 1" class="input-tip">请输入账号</span>
        </div>
        <div class="password form-item">
            <span class="input-title">密码</span>
            <input type="password" v-model.trim="form.password">
            <span v-show="password_type == 1" class="input-tip">请输入密码</span>
        </div>
        <div class="log-btn" @click="loginBtn">
            登录
        </div>
    </div>
</template>
<script setup lang='ts'>
import {  ref } from 'vue';

import { useTreeHoleUserStore } from '@/stores/ThreeHoleUser'
const threeHoleUser = useTreeHoleUserStore();

const props = defineProps({
    zindex: {
        type: Number,
        required: true
    }
})
const emits=defineEmits(['login-success'])
const form = ref({
    account: '',
    password: ''
})
let account_type = ref(0);
let password_type = ref(0);

// 登录按钮
const loginBtn = async () => {
    if (!form.value.account.trim()) {
        account_type.value = 1;
        return false;
    } else {
        account_type.value = 0;
    }
    if (!form.value.password.trim()) {
        password_type.value = 1;
        return false;
    } else {
        password_type.value = 0;
    }
    const loginRes = await threeHoleUser.login(form.value)
    if (loginRes) {
        // 登录成功！
        emits('login-success');

    }
}

</script>
<style lang='scss' scoped>
.login-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: changA 1s linear;
    background-color:#2398db;


    .input-title {
        font-size: 20px;
        color: azure;
        border: 1px dashed #f2f2f2;
        padding: 10px;
        margin-right: 20px;
    }

    .log-btn {
        cursor: pointer;
        margin-top: 50px;
        width: 250px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: #f2f2f2;
        box-shadow: 0px 0px 2px 2px #f2f2f2;
    }

    input {
        all: initial;
        width: 200px;
        height: 40px;
        border-radius: 5px;
        padding: 5px;
        background-color: #fff;
    }
}

.form-item {
    position: relative;
    display: flex;
    align-items: center;
    margin-bottom: 40px;

    .input-tip {
        position: absolute;
        bottom: -5px;
        left: 80px;
        color: red;
        font-size: 15px;
        white-space: nowrap;
        transform: translate(0, 100%);
    }
}

@keyframes changA {
    0% {
        clip-path: ellipse(50px 50px at 100% 10%);
    }

    100% {
        clip-path: ellipse(100% 100% at 50% 50%);
    }
}
</style>