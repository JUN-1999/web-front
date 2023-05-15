<template>
    <div :style="{ zIndex: zindex }" class="register-box">
        <img class="top-img" src="@/assets/svg/sandbeach.svg" alt="">
        <div class="account form-item">
            <span class="input-title">账号</span>
            <input @blur="accountBlur" placeholder="请输入账号" type="text" v-model="form.account">
            <span v-show="account_type == 1" class="input-tip">请输入账号</span>
            <span v-show="account_type == 2" class="input-tip">当前账号已存在，请重新输入账号</span>
        </div>
        <div class="password form-item">
            <span class="input-title">密码</span>
            <input @blur="passwordBlur" type="password" v-model="form.password">
            <span v-show="password_type == 1" class="input-tip">请输入密码</span>
        </div>
        <div class="password form-item">
            <span class="input-title">确认密码</span>
            <input @blur="confirmPasswordBlur" type="password" v-model="form.confirm_password">
            <span v-show="confirm_password_type == 1" class="input-tip">请输入确认密码</span>
            <span v-show="confirm_password_type == 2" class="input-tip">两次密码不一致</span>
        </div>
        <div class="email form-item">
            <span class="input-title">邮箱</span>
            <input @blur="emailBlur" type="email" placeholder="请输入邮箱" v-model="form.email">
            <span v-show="email_type == 1" class="input-tip">请输入邮箱</span>
            <span v-show="email_type == 2" class="input-tip">该邮箱已被使用</span>
            <span v-show="email_type == 3" class="input-tip">邮箱格式不正确</span>
        </div>
        <div class="authcode form-item">
            <span class="input-title">验证码</span>
            <div class="auth-code">
                <input class="auth-code-input" @input="authcodeInput" @blur="authcodeBlur" type="number"
                    placeholder="请输入验证码" v-model="form.authcode">
                <div @click="postRegister" class="post-authcode">{{ is_second ? second : '发送验证码' }}</div>
            </div>
            <span v-show="authcode_type == 1" class="input-tip">请输入验证码</span>
        </div>
        <div class="log-btn" @click="register">
            注册
        </div>
    </div>
</template>
<script setup lang='ts'>
import {  defineEmits, ref } from 'vue';
import { sendAuthCode, isAccountOnly, isEmailOnly, postRegisterApi } from '@/api/TreeHole/user'
let second = ref(60);// 倒计时
let is_second = ref(false);// 是否开启倒计时
let secondTimer = ref(0);// 倒计时的定时器
const props = defineProps({
    zindex: {
        type: Number,
        required: true
    }
})

const emits = defineEmits(['register-success'])
// 数据
const form = ref({
    account: '',// 输入昵称 账号
    password: '',//密码
    confirm_password: '',//二次确认密码
    email: '', // 邮箱
    authcode: '' // 验证码
})

let account_type = ref(0); // 账号的验证 0正常 1为空 2重复
// 验证是否账号有重复
const accountBlur = async () => {
    if (!form.value.account) {
        account_type.value = 1;
    } else {
        const res = await isAccountOnly({
            account: form.value.account
        })
        if (!res.data) {
            account_type.value = 2;
        } else {
            account_type.value = 0;
        }
    }

}
let password_type = ref(0);// 密码的验证  0正常 1为空
const passwordBlur = async () => {
    if (!form.value.password) {
        password_type.value = 1;
    } else {
        password_type.value = 0;
    }
}
let confirm_password_type = ref(0);// 二次密码的验证  0正常 1为空 2重复
// 判断二次密码是否一致
const confirmPasswordBlur = () => {
    if (!form.value.confirm_password) {
        confirm_password_type.value = 1;
    } else if (form.value.password != form.value.confirm_password) {
        confirm_password_type.value = 2;
    } else {
        confirm_password_type.value = 0;
    }
}
let email_type = ref(0);//邮箱的验证 0正常 1为空 2已被使用 3格式不正确
const emailBlur = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.value.email) {
        email_type.value = 1;
    } else if (!emailRegex.test(form.value.email)) {
        email_type.value = 3;
    } else {
        const res = await isEmailOnly({
            email: form.value.email
        })
        if (!res.data) {
            email_type.value = 2;
        } else {
            email_type.value = 0;
        }
    }
}
let authcode_type = ref(0);//验证码的验证 0正常 1为空
const authcodeBlur = () => {
    if (!form.value.authcode) {
        authcode_type.value = 1
    } else {
        authcode_type.value = 0
    }
}
// 验证码省略6位数
const authcodeInput = (e: any) => {
    const value: string = e.target.value;
    const isValid = /^\d{0,6}$/.test(value);

    if (isValid) {
        form.value.authcode = value
    } else {
        form.value.authcode = value.substring(0, 6);
    }
}

// 发送邮箱验证码
const postRegister = async () => {

    if (is_second.value) {
        return false
    } else {
        await emailBlur();
        if (email_type.value == 1) {
            alert('请输入邮箱')
        } else if (email_type.value == 2) {
            alert("当前邮箱已被使用，不能再注册")
        } else if (email_type.value == 3) {
            alert('当前邮箱格式不正确')
        } else {
            let res = await sendAuthCode({
                email: form.value.email
            })
            if (res.errno == 0) {
                is_second.value = true;
                second.value = 60;
                secondTimer.value = setInterval(() => {
                    second.value--;
                    if (second.value == 0) {
                        is_second.value = false;
                        second.value = 60;
                        clearInterval(secondTimer.value);
                        secondTimer.value = 0;
                    }
                }, 1000)
            }
        }
    }


}
// 注册
const register = async () => {
    await accountBlur();
    await passwordBlur();
    await confirmPasswordBlur();
    await emailBlur();
    await authcodeBlur();
    if (
        account_type.value == 0 &&
        password_type.value == 0 &&
        confirm_password_type.value == 0 &&
        email_type.value == 0 &&
        authcode_type.value == 0
    ) {
        let res = await postRegisterApi(form.value)
        if (res.errno != 0) {
            // 注册失败
            alert(res.errmsg)
        } else {
            alert('注册成功')
            emits('register-success')
        }
    }
}
</script>
<style lang='scss' scoped>
.register-box {
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
    background-color: skyblue;

    .form-item {
        position: relative;
        display: flex;
        align-items: center;
        margin-bottom: 30px;

        // 标题
        .input-title {
            font-size: 20px;
            color: azure;
            border: 1px dashed #f2f2f2;
            padding: 10px;
            margin-right: 20px;
            width: 90px;
            text-align: center;
        }

        // 提示
        .input-tip {
            position: absolute;
            bottom: -5px;
            left: 130px;
            color: red;
            font-size: 15px;
            white-space: nowrap;
            transform: translate(0, 100%);
        }

        // 输入框
        input {
            all: initial;
            width: 300px;
            height: 40px;
            border-radius: 5px;
            padding: 5px;
            background-color: #fff;
        }

        .auth-code {
            width: 310px;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            // 验证码输入框
            .auth-code-input {
                width: 160px;
            }

            // 发送验证码按钮
            .post-authcode {
                width: 100px;
                background-color: #fff;
                padding: 5px;
                text-align: center;
                border-radius: 5px;
                font-size: 16px;
            }
        }
    }

    .log-btn {
        cursor: pointer;
        width: 110px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5px;
        background-color: #f2f2f2;
        box-shadow: 2px 2px 0px 0px #9e9d9d;
    }

    .top-img {
        width: 150px;
        height: 150px;
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