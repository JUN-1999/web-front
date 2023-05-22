<template>
    <!-- 中心表格功能 -->
    <div class="table">
        <section class="header">
            <h1>瓜大棚<img src="@/assets/imgs/TreeHole/watermelon.png" alt=""></h1>
            <div class="EditArticle" @click="EditArticle">
                <div class="text">种瓜</div>
                <img src="@/assets/imgs/TreeHole/EditArticle1.png" alt="新增瓜">
            </div>
            <div class="input-group">
                <input type="search" placeholder="请输入...">
                <img src="@/assets/imgs/TreeHole/find.png" alt="">
            </div>
        </section>
        <section class="shell">
            <table>
                <thead>
                    <tr>
                        <th>用户</th>
                        <th>信息</th>
                        <th>日期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in article_list" :key="item.ARTICLE_UUID">
                        <td>{{ item.ACCOUNT }} <img class="avatar" :src="item.AVATAR" alt="">
                        </td>
                        <td class="brief">
                            <div class="brief-title">
                                {{ item.TITLE }}
                            </div>
                            <div class="brief-text" v-html="item.CONTENT"></div>
                            <div class="brief-imgs" >
                                <ViewImg v-for="(pic, index) in item.PICS" :key="index" class="brief-img" :src="pic.url"></ViewImg>
                            </div>
                        </td>
                        <td>{{ item.ADD_TIME }}</td>
                        <td>
                            <p class="button">查看</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script setup lang='ts'>
import { articleList } from '@/api/TreeHole/article'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import ViewImg from '@/components/ViewImg.vue'


let page = ref(1); // 页码
let pageSize = ref(5); // 页数
let article_list = ref<any[]>([]);//文章列表

const router = useRouter();
const EditArticle = () => [
    router.push('/TreeHole/TreeHoleIndex/TreeHoleEdit')
]
const getArticleList = async () => {
    let res = await articleList({
        page: page.value,
        pageSize: pageSize.value
    });
    let data = res.data.data;
    data = data.map((item) => {
        item.PICS = JSON.parse(item.PICS).slice(0,3)
        console.log(item);
        
        return item;
    })
    article_list.value = data;
}
onMounted(async () => {
    await getArticleList();
})
</script>
<style lang='scss' scoped>
.table {
    width: 82vw;
    height: 90vh;
    background-color: #fff5;
    box-shadow: 0 8px 16px #0005;
    border-radius: 16px;
    overflow: hidden;

    .header {
        width: 100%;
        height: 10%;
        background-color: #fff4;
        padding: 0 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;

        h1 {
            display: flex;
            align-items: center;
            color: #36ae39;
            text-shadow: #f2f2f2 1px 0 0, #f2f2f2 0 1px 0, #f2f2f2 -1px 0 0, #f2f2f2 0 -1px 0;

            img {
                width: 80px;
                height: 80px;
            }
        }

        // 添加记录
        .EditArticle {
            position: absolute;
            width: 120px;
            height: 50px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: #fff;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;

            .text {
                font-size: 16px;
                font-weight: 800;
                color: #544e49;
            }

            img {
                width: 40px;
                height: 40px;
            }
        }

        .input-group {
            width: 35%;
            height: 50%;
            background-color: #fff5;
            padding: 0 20px;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .2s;

            &:hover {
                width: 45%;
                background-color: #fff8;
                box-shadow: 0 5px 40px #0002;
            }

            img {
                width: 35px;
                height: 35px;
            }

            input {
                width: 100%;
                background-color: transparent;
                border: none;
                outline: none;
            }
        }
    }

    .shell {
        width: 95%;
        max-height: calc(90% - 25px);
        background-color: #fffb;
        margin: 8px auto;
        border-radius: 10px;
        overflow: auto;


        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }


        table {
            width: 100%;
        }

        td .avatar {
            width: 50px;
            height: 50px;
            margin-right: 10px;
            border-radius: 50%;
            vertical-align: middle;
            margin-left: 10px;
        }

        table,
        th,
        td {
            border-collapse: collapse;
            padding: 20px;
            text-align: left;
        }


        thead th {
            position: sticky;
            top: 0;
            left: 0;
            background-color: #d5d1defe;
            cursor: pointer;
        }

        tbody tr .brief {
            width: 850px;

            .brief-title {
                font-size: 24px;
                margin-bottom: 15px;
            }

            .brief-text {
                margin-bottom: 10px;
                color: #6d757a;
                font-size: 20px;
                max-height: 200px;
                overflow: hidden;
            }

            .brief-imgs {
                .brief-img {
                    display: inline-flex;
                    width: 30%;
                    height: 200px;
                    overflow: hidden;
                    margin-right: 10px;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        // 偶数行背景色
        tbody tr:nth-child(even) {
            background-color: #0000000b;
        }

        tbody tr:hover {
            background-color: #fff6 !important;
        }

        .button {
            padding: 5px 0;
            border-radius: 40px;
            text-align: center;
        }

        tr:nth-child(4n) .button {
            background-color: #86e49d;
            color: #006b21;
        }

        tr:nth-child(4n-1) .button {
            background-color: #ebc474;
            color: #b17611;
        }

        tr:nth-child(4n+1) .button {
            background-color: #d893a3;
            color: #b30021;
        }

        tr:nth-child(4n+2) .button {
            background-color: #6fcaea;
            color: #04395e
        }
    }
}
</style>