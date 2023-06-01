<template>
    <!-- 中心表格功能 -->
    <div class="table">
        <section class="header">
            <h1>瓜大棚<img src="@/assets/imgs/TreeHole/watermelon.png" alt=""></h1>
            <div class="ArticleEdit" @click="ArticleEdit">
                <div class="text">种瓜</div>
                <img src="@/assets/imgs/TreeHole/EditArticle1.png" alt="新增瓜">
            </div>
            <div class="input-group">
                <input type="search" placeholder="请输入...">
                <img src="@/assets/imgs/TreeHole/find.png" alt="">
            </div>
        </section>
        <section class="shell" @scroll="handleScroll">
            <table>
                <thead>
                    <tr style="position: relative;z-index: 20;">
                        <th>用户</th>
                        <th>信息</th>
                        <th>日期</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in article_list" :key="item.ARTICLE_UUID">
                        <td class="user-info">
                            <img class="avatar" :src="item.AVATAR" alt="" />
                            <span>{{ item.ACCOUNT }} </span>
                        </td>
                        <td class="brief">
                            <div class="brief-title">
                                {{ item.TITLE }}
                            </div>
                            <div class="brief-text" v-html="item.CONTENT"></div>
                            <div class="brief-imgs">
                                <template v-for="(pic, index) in item.PICS">
                                    <template v-if="pic.type == 'img'">
                                        <el-image lazy class="brief-img" :key="pic.url" :src="pic.url"
                                            :preview-src-list="[pic.url]" :zoom-rate="1.1" fit="cover" />
                                    </template>
                                    <template v-if="pic.type == 'video'">
                                        <div class="brief-img" :key="pic.url">
                                            <ViewVideo :src="pic.url"></ViewVideo>
                                        </div>
                                    </template>
                                </template>

                            </div>
                        </td>
                        <td>{{ item.UPDATE_TIME || item.ADD_TIME }}</td>
                        <td>
                            <p class="button" @click="articleDetail(item)">查看</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
        <div class="toTop" @click="toTop" :style="{
            opacity: page > 1 ? 1 : 0
        }">
            <img src="@/assets/svg/TreeHole/ToTop.svg" alt="">
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { articleList } from '@/api/TreeHole/article'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue';
import ViewImg from '@/components/ViewImg.vue';
import ViewVideo from '@/components/ViewVideo.vue';
// 文章的每个类型
import type { IArticleItem } from '@/type/TreeHole/article';
const router = useRouter();

let page = ref(1); // 页码
let pageSize = ref(5); // 页数
let article_list = ref<IArticleItem[]>([]); // 文章列表
let timer = ref(0); // 定时器
let last_list = ref(false); // 是否最后的数据了
let is_top = ref(false);// 是否显示返回顶部按钮
onMounted(async () => {
    await getArticleList();
})

// 前往新增文章
const ArticleEdit = () => [
    router.push('/TreeHole/TreeHoleIndex/ArticleEdit/0')
]
// 前往查看文章详情
const articleDetail = async (data: IArticleItem) => {
    router.push(`/TreeHole/TreeHoleIndex/ArticleDetail/${data.ARTICLE_UUID}`)
}
// 获得文章列表
const getArticleList = async () => {
    if (last_list.value) {
        console.log('1');
        ElMessage({
            message: '没有更多瓜了',
            type: 'info',
        })
    } else {
        let res = await articleList({
            page: page.value,
            pageSize: pageSize.value
        });
        if (res.data.data.length === 0) {
            console.log('2');
            last_list.value = true;
            ElMessage({
                message: '没有更多瓜了',
                type: 'info',
            })
        } else {
            let data = res.data.data;
            data = data.map((item: IArticleItem) => {
                item.PICS = JSON.parse(item.PICS).slice(0, 3)
                return item;
            })
            article_list.value = [...article_list.value, ...data];
        }
    }
    setTimeout(() => {
        clearTimeout(timer.value)
        timer.value = 0
    }, 1500);
}

//  检测是否滚动到底部
const handleScroll = (e: any) => {
    if (timer.value == 0) {
        timer.value = setTimeout(() => {
            const { scrollTop, clientHeight, scrollHeight } = e.target
            if (scrollTop + clientHeight + 20 >= scrollHeight) {
                page.value += 1;
                getArticleList();
            } else {
                clearTimeout(timer.value)
                timer.value = 0
            }
        }, 0);
    }
}

// 返回顶部
const toTop = () => {
    const shellDom = document.querySelector('.shell') as HTMLDivElement;
    shellDom.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


</script>
<style lang='scss' scoped>
.table {
    width: 82vw;
    height: 90vh;
    background-color: #fff5;
    box-shadow: 0 8px 16px #0005;
    border-radius: 16px;

    position: relative;

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
        .ArticleEdit {
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

        .user-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            color: #222;
            font-size: 24px;
        }

        td .avatar {
            width: 150px;
            height: 150px;
            margin-right: 10px;
            border-radius: 10px;
            vertical-align: middle;
            margin-left: 10px;
            border: 1px solid rgba($color: #575353, $alpha: .5);
            margin-bottom: 20px;
            object-fit: cover;
        }

        &::-webkit-scrollbar {
            width: 0px;
            height: 0px;
        }


        table {
            width: 100%;
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
            width: 750px;

            .brief-title {
                font-size: 30px;
                margin-bottom: 15px;
                font-weight: 800;
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
                    border-radius: 10px;
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
            cursor: pointer;
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

    .toTop {
        position: absolute;
        bottom: 0px;
        right: -100px;
        transform: translate(0%, 0%);
        transition: opacity .3s linear;

        img {
            width: 100px;
            cursor: pointer;

            &:hover {
                animation: toTpA 2s infinite;
            }

            @keyframes toTpA {
                0% {
                    transform: translateY(0px);
                }

                50% {
                    transform: translateY(-20px);
                }

                100% {
                    transform: translateY(0px);
                }
            }
        }
    }
}
</style>