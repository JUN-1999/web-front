<template>
    <div>
        <div v-for="item in list" :key="item.useruuid" class="user-item">
            <img :src="item.avatar" class="img" alt=""> <span>{{ item.username }} </span>
        </div>
    </div>
</template>
<script setup lang='ts'>
const props = defineProps<{
    list: any[]
}>()
</script>
<style lang='scss' scoped>
.user-item {
    display: flex;
    align-items: center;
    margin: 10px;
    color: #fff;
}

.img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 10px;
}
</style>