<template>
    <div class="sidebar">
        <div class="header">
            <div class="header-bg">
            </div>
            <div class="header-userinfo">
                <img class="header-img" :src="TreeHoleUserStore.userInfo?.AVATAR" alt="">
                <span class="header-user-name">{{ TreeHoleUserStore.userInfo?.ACCOUNT }}</span>
            </div>
            <div class="article-box">
                <div class="article-item">
                    <div class="article-num">
                        <span>12</span>
                        <img class="article-num-img" src="@/assets/imgs/TreeHole/is_eat_gua.png" alt="">
                    </div>
                    <div class="article-text">关注的瓜</div>
                </div>
                <div class="article-item">
                    <div class="article-num">
                        <span>13</span>
                        <img class="article-num-img" src="@/assets/imgs/TreeHole/EditArticle1.png">
                    </div>
                    <div class="article-text">种下的瓜</div>
                </div>
            </div>
        </div>
        <div class="sidebar-item" @click="toHome">
            <img class="sidebar-img" src="@/assets/svg/TreeHole/home.svg">
            <span class="sidebar-text">吃瓜中心</span>
        </div>
        <div class="sidebar-item" @click="toUser">
            <img class="sidebar-img" src="@/assets/svg/TreeHole/gerenzhongxin.svg">
            <span class="sidebar-text">个人中心</span>
        </div>
        <div class="sidebar-item" @click="toGame">
            <img class="sidebar-img" src="@/assets/svg/TreeHole/youxi_3.svg" alt="">
            <span class="sidebar-text">游戏大厅</span>
        </div>
        <div class="sidebar-item" @click="logOut">
            <img class="sidebar-img" src="@/assets/svg/TreeHole/tuichudenglu.svg">
            <span class="sidebar-text">退出登录</span>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser'
import { useRouter } from 'vue-router';
const TreeHoleUserStore = useTreeHoleUserStore();
const router = useRouter();

const toHome = () => { router.push('/TreeHole') };
const toUser = () => { router.push('/TreeHole/TreeHoleIndex/TreeUser') };
const toGame = () => { router.push('/TreeHole/TreeHoleIndex/TreeGame') };
const logOut = () => {
    // 清空缓存数据
    localStorage.removeItem('userInfo')
    localStorage.removeItem('token')
    // 清空pinia中的数据
    TreeHoleUserStore.setToken('');

    router.push('/TreeHole/login')
};

</script>
<style lang='scss' scoped>
.sidebar {
    width: 300px;
    height: 60vh;
    background-color: rgba($color: #fff, $alpha: .5);
    position: fixed;
    z-index: 999;
    top: 50%;
    right: -250px;
    // right: 0px;
    transform: translate(0, -50%);
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    transition: right 0.5s linear;
    overflow: hidden;

    .sidebar-item:nth-child(2) .sidebar-text {
        color: #ffe048;
    }

    .sidebar-item:nth-child(3) .sidebar-text {
        color: #8cf6fb;
    }

    .sidebar-item:nth-child(4) .sidebar-text {
        color: #af64f6;
    }

    .sidebar-item:nth-child(5) .sidebar-text {
        color: #04ad70;
    }

    &:hover {
        right: 0;
        backdrop-filter: blur(2px);

        .header {
            height: 300px;
            width: 100%;
            background-color: transparent;
            position: relative;
            padding-top: 0px;

            .header-userinfo {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                .header-user-name {
                    font-size: 18px;
                }

                .header-img {
                    width: 120px;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 50%;
                    margin-bottom: 10px;
                    background-color: #fff;
                }

            }

            .header-bg,
            .article-box {
                display: block;
            }

            .header-bg {
                height: 60%;
                width: 100%;
                background-image: url('@/assets/imgs/TreeHole/user_wall.jpg');
                background-size: 100%;
                background-repeat: no-repeat;
            }

            .article-box {
                display: flex;
                height: 40%;

                .article-item {
                    cursor: pointer;
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    justify-content: center;
                    align-items: center;

                    .article-num {
                        display: flex;
                        align-items: center;
                        margin-bottom: 5px;
                        color: #6b8e23;
                        font-weight: 800;
                        font-size: 20px;
                        text-shadow: #f2f2f2 1px 0 0, #f2f2f2 0 1px 0, #f2f2f2 -1px 0 0, #f2f2f2 0 -1px 0;

                        .article-num-img {
                            width: 28px;
                            height: 28px;
                            object-fit: contain;
                        }
                    }

                    .article-text {
                        line-height: 12px;
                        font-weight: 800;
                        font-size: 20px;
                        color: #36ae39;
                        text-shadow: #f2f2f2 1px 0 0, #f2f2f2 0 1px 0, #f2f2f2 -1px 0 0, #f2f2f2 0 -1px 0;
                    }
                }
            }

        }


        .sidebar-item {
            width: 80%;
            height: 55px;
            background-color: rgba($color: #36ae39, $alpha: .5);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 auto 10px;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                animation: sidebarItemColorA .5s linear;
                background-color: #6b8e23;
                color: #fff;
            }

            @keyframes sidebarItemColorA {
                0% {
                    background-color: rgba($color: #36ae39, $alpha: .5);
                    color: #000;
                }

                100% {
                    background-color: #6b8e23;
                    color: #fff;
                }
            }

            .sidebar-img {
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
        }


    }

    .header {
        height: 300px;
        padding-top: 100px;


        .header-userinfo {
            .header-img {
                width: 50px;
                height: 50px;
                border-radius: 5px;
                object-fit: cover;
            }
        }

        .header-bg,
        .article-box {
            display: none;
        }
    }

    .sidebar-item {
        overflow: hidden;
        position: relative;

        .sidebar-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
        }
    }

}

.sidebar-item:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, rgba(0, 0, 0, .5) 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform .3s, opacity .5s;
}

.sidebar-item:active:after {
    transform: scale(0, 0);
    opacity: .3;
    transition: 0s;
}
</style>