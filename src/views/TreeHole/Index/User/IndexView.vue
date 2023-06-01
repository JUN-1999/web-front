<template>
    <div class="main">
        <div class="menu">
            <div>
                <h5>用户</h5>
                <div @click="selectType = 1" class="meun-item">个人信息</div>
            </div>
            <hr>
            <div>
                <h5>瓜</h5>
                <div @click="selectType = 2" class="meun-item">种下的瓜</div>
                <div @click="selectType = 3" class="meun-item">关注的瓜</div>
            </div>
        </div>
        <div class="box">
            <UserInfo v-if="selectType == 1"></UserInfo>
            <ArticleCreate v-if="selectType == 2"></ArticleCreate>
            <ArticleFollow v-if="selectType == 3"></ArticleFollow>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import UserInfo from './components/UserInfo.vue';
import ArticleCreate from './components/ArticleCreate.vue';
import ArticleFollow from './components/ArticleFollow.vue';
let selectType = ref(1);


</script>
<style lang='scss' scoped>
.main {
    width: 82vw;
    height: 90vh;
    display: flex;
    border-radius: 16px;
    overflow: hidden;

    .menu {
        width: 250px;
        height: 100%;
        background-color: rgba($color: #9e9c9c, $alpha: .7);
        padding: 30px;

        h5 {
            color: #f2f2f2;
            font-weight: 400;
            margin-bottom: 10px;
        }

        hr {
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .meun-item {
            cursor: pointer;
            border-radius: 5px;
            width: 100%;
            height: 40px;
            border: 1px solid #fff5;
            margin-bottom: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #f2f2f2;
            transition: all .3s linear;

            &:hover {
                background-color: #f2f2f2;
                color: #201c1c;
            }
        }
    }

    .box {
        flex: 1;
        height: 100%;
        background-color: #fff5;
        box-shadow: 0 8px 16px #0005;
        padding: 50px;
    }
}
</style>