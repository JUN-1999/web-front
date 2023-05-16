<template>
    <div class="treehole">
        <RouterView></RouterView>

        
         <label for="uploadImg"
            style="width: 100px;height: 50px;background-color: #fff;border-radius: 15px;display: flex;justify-content: center;align-items: center;">上传测试</label>
        <input ref="inputFile" @change="inputChange" type="file" name="" id="uploadImg" style="display: none;"> 
        <!-- 冒泡泡 -->
        <!-- <bubbling></bubbling> -->
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import { uploadFile } from '@/api/common/file'
import bubbling from '../components/bubbling.vue'


const inputFile = ref<HTMLInputElement | null>(null)
const inputChange = async (e) => {
    const file = (inputFile.value?.files && inputFile.value.files[0]) as Blob;
    const formData = new FormData();
    formData.append('file', file)
    let res = await uploadFile(formData)
    console.log(res);
}
</script>
<style lang='scss' scoped>
.treehole {
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: olivedrab;
    animation: intoA .3s linear;
    display: flex;
    justify-content: center;
    align-items: center;


}

@keyframes intoA {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>