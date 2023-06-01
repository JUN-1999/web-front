<template>
    <nav class="menu">
        <div class="actionBar">
            <button id="menuBtn" type="button">
                <img class="menu-img" src="@/assets/svg/TreeHole/menu.svg" alt="">
            </button>
            <h3 class="menuText">菜单</h3>
        </div>
        <ul class="optionsBar">
            <li class="menuItem">
                <a href="#" class="menuOption">
                    <img class="menu-img" src="@/assets/svg/TreeHole/home.svg" alt="">
                    <h5>个人中心</h5>
                </a>
            </li>
            <li class="menuBreak">
                <hr>
            </li>
            <li class="menuItem">
                <button class="menuOption">
                    <img class="menu-img" src="@/assets/svg/TreeHole/youxi_3.svg" alt="">
                    <h5>游戏大厅</h5>
                </button>
            </li>
            <li class="menuItem">
                <button class="menuOption">
                    <img class="menu-img" src="@/assets/svg/TreeHole/tuichudenglu.svg" alt="">
                    <h5>退出登录</h5>
                </button>
            </li>
        </ul>
        <div class="about" id="about"></div>
        <div class="menuUser">
            <a href="#">
                <div>
                    <img class="user-avatar" :src="TreeHoleUserStore.userInfo?.AVATAR" alt="">
                </div>
                <h5 class="Username menuText">{{ TreeHoleUserStore.userInfo?.ACCOUNT }}</h5>
                <p class="menuText">
                    <img class="menu-img" src="@/assets/svg/TreeHole/right_arrows.svg" alt="">
                </p>
            </a>
        </div>
        <div class="themeBar">
            <div>
                <button type="button">
                    <img class="menu-img" src="@/assets/svg/TreeHole/tuichudenglu.svg" alt="">
                </button>
            </div>
        </div>
    </nav>
</template>
<script setup lang='ts'>
import { onMounted } from 'vue';
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser'
const TreeHoleUserStore = useTreeHoleUserStore();

onMounted(() => {
    const menuBtn = document.getElementById('menuBtn') as HTMLButtonElement;
    const menu = document.querySelector('.menu') as HTMLDivElement;
    const menuText = document.querySelectorAll('.menuText');
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('open');
        menuText.forEach(function (text, index) {
            setTimeout(() => {
                text.classList.toggle('open2');
            }, index * 50);
        });
    });
})


</script>
<style lang='scss' scoped>
.menu-img {
    width: 40px;
    height: 40px;
}

.menu {
    position: fixed;
    width: 60px;
    height: 600px;
    background-color: #111727;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 10px;
    margin: auto;
    border-radius: 0.8rem;
    transition: 0.3s ease 0.15s;
    font-family: sans-serif;

    a {
        text-decoration: none;
    }

    .actionsBar {
        width: 100%;
        height: 10%;
        padding: 0.5rem;
        overflow: hidden;

        div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            border-radius: 0.5rem;
            transition: 0.3s ease;

            button {
                background-color: transparent;
                outline: none;
                border: none;
                border-radius: 0.5rem;
                color: #fff;
                width: 45px;
                height: 45px;
                transition: 0.3s ease;
                font-size: 1rem;

                &:hover {
                    background-color: #364152;
                }
            }

            h3 {
                width: calc(100% - 45px);
                text-align: center;
            }
        }
    }

    .optionsBar {
        overflow: hidden;
        display: flex;
        width: 100%;
        height: 60%;
        padding: 0 0.5rem;
        align-items: center;
        flex-direction: column;

        .menuItem {
            width: 100%;
            height: 45px;
            margin: 0.3rem;

            .menuOption {
                font-size: 1rem;
                outline: none;
                border: none;
                background-color: transparent;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                border-radius: 0.5rem;
                transition: 0.3s ease;

                &:hover {
                    background-color: #364152;
                }

                i {
                    width: 45px;
                    text-align: center;
                    color: #fff;
                }

                h5 {
                    width: calc(100% - 45px);
                }
            }
        }
    }

    .about {
        width: 100%;
        height: 10%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 1rem;
        flex-direction: column;
        font-family: sans-serif;
        opacity: 0;
        white-space: nowrap;
        transition: 0.3s ease 0.15s;
    }

    &.open {
        width: 240px;
    }

    .menuBreak {
        width: 100%;
        height: 10px;
        display: flex;
        align-items: center;
        justify-content: center;

        hr {
            width: 70%;
            height: 3px;
            background-color: #fff;
            border: none;
            border-radius: 5px;
        }
    }

    .themeBar {
        overflow: hidden;
        width: 100%;
        height: 10%;
        padding: 0.5rem;

        div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            border-radius: 0.5rem;
            transition: 0.3s ease;

            button {
                background-color: transparent;
                outline: none;
                border: none;
                border-radius: 0.5rem;
                color: #fff;
                width: 100%;
                height: 45px;
                transition: 0.3s ease;
                font-size: 1rem;

                &:hover {
                    background-color: #364152;
                }
            }
        }
    }

    .menuUser {
        width: 100%;
        height: 10%;

        a {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            text-decoration: none;
            padding: 0.5rem;
            position: relative;

            div {
                width: 45px;
                height: 45px;
                position: relative;
                border-radius: 0.5rem;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 0.5rem;
                }
            }

            .Username {
                width: calc(70% - 45px);
            }

            p {
                width: calc(30% - 45px);
            }

            &:hover {
                p {
                    animation: animArrow 0.3s ease 2;
                }
            }
        }

        &:hover {
            .userInfo {
                pointer-events: all;
                opacity: 1;
                transform: scale(1);
            }
        }
    }
}

.menuText {
    color: rgba(255, 255, 255, 0.8);
    transform: translateX(-250px);
    opacity: 0;
    transition: transform 0.3s ease 0.1s;

    &.open2 {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes animArrow {

    0% {
        transform: translateX(0);

    }

    50% {
        transform: translateX(5px);
    }

    100% {
        transform: translateX(0);
    }
}

.menu {
    .menuUser {
        .userInfo {
            position: absolute;
            width: 20rem;
            height: 18rem;
            opacity: 0;
            pointer-events: none;
            top: 34%;
            left: 1.5rem;
            transition: 0.3s ease;
            transform: scale(0);
            transform-origin: bottom left;
        }
    }
}
</style>