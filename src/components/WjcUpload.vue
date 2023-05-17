<template>
    <div class="wjc-upload" ref="wjcUpload">
        <div class="input-label" v-for="item in imgList" :key="item.name">
            <ViewImg :src="item.url" :showDelete="true" @imgDelete="imgDelete" />
        </div>
        <label for="uploadImg" class="input-label">
            <i class="iconfont icon-tianjia"></i>
        </label>
        <input ref="inputFile" @change="inputChange" type="file" name="" id="uploadImg" style="display: none;">
    </div>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
import { uploadFile } from '@/api/common/file'
import ViewImg from './ViewImg.vue';
// 上传功能
const inputFile = ref<HTMLInputElement | null>(null)
const inputChange = async (e) => {
    const file = (inputFile.value?.files && inputFile.value.files[0]) as Blob;
    const formData = new FormData();
    formData.append('file', file)
    let res = await uploadFile(formData)
    if (res.errno === 0) {
        imgList.value.push({
            name: res.data.name,
            url: res.data.url,
        })
    }
}
// 图片列表
interface IIMG {
    name: string,
    url: string,
}
const wjcUpload = ref();
const imgList = ref<IIMG[]>([]);//图片列表
const imgDelete = (src: string) => {
    imgList.value = imgList.value.filter(item => {
        return item.url != src
    })
};//图片删除

</script>
<style lang='scss' scoped>
.wjc-upload {
    display: flex;
}

.input-label {
    width: 140px;
    height: 140px;
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
    position: relative;



    i {
        font-size: 30px;
    }
}
</style>