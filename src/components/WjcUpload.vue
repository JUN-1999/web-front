<template>
    <div class="wjc-upload" ref="wjcUpload">
        <div class="input-label" v-for="item in pics" :key="item.name" :style="{
            width: labelStyleWidth ? labelStyleWidth : '140px',
            height: labelStyleHeight ? labelStyleHeight : '140px'
        }">
            <template v-if="item.type == 'img'">
                <ViewImg :loading="loading" :src="item.url" :showDelete="true" @imgDelete="mediaDelete" />
            </template>
            <template v-if="item.type == 'video'">
                <ViewVideo :src="item.url" :showDelete="true" @videoDelete="mediaDelete"></ViewVideo>
            </template>
        </div>
        <label :style="{
            width: labelStyleWidth ? labelStyleWidth : '140px',
            height: labelStyleHeight ? labelStyleHeight : '140px'
        }" :for="uploadImg_ID" class="input-label">
            <i class="iconfont icon-tianjia"></i>
        </label>
        <input :accept="accept" ref="inputFile" @change="inputChange" type="file" name="" :id="uploadImg_ID"
            style="display: none;">
    </div>
</template>
<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue';
import { uploadFile } from '@/api/common/file';
import ViewImg from './ViewImg.vue';
import ViewVideo from './ViewVideo.vue';
import type { IIMG } from '@/type/TreeHole/file';
// 图片列表
const uploadImg_ID = 'uploadIMG_' + Math.random() * 1000;

interface IProps {
    pics: IIMG[];
    accept?: string,
    labelStyleWidth?: string,
    labelStyleHeight?: string,
}
// ts 不适用默认值使用
// const props = defineProps<IProps>();

// ts 设置默认值
const props = withDefaults(
    defineProps<IProps>(),
    {
        accept: 'image/*'
    }
)
const emits = defineEmits(['uploadSuccess', 'mediaDelete'])

const wjcUpload = ref();
let loading = ref(false);

// 上传功能
const inputFile = ref<HTMLInputElement | null>(null)
const inputChange = async () => {
    loading.value = true;
    if (inputFile.value?.files && inputFile.value?.files.length>0) {
        ElMessage({
            message: '图片开始上传',
            type: 'success',
        })
        const file = (inputFile.value?.files && inputFile.value.files[0]) as Blob;
        const formData = new FormData();
        formData.append('file', file)
        let res = await uploadFile(formData)
        loading.value = false;

        if (res.errno === 0) {
            ElMessage({
                message: '图片上传成功',
                type: 'success',
            })
            let imgs = JSON.parse(JSON.stringify(props.pics))
            imgs.push({
                name: res.data.name,
                url: res.data.url,
                type: res.data.type
            })
            emits('uploadSuccess', imgs)
            inputFile.value.value='';
        }
    } else {
        loading.value = false;
        ElMessage({
            message: '取消上传',
        })
    }

}
// 媒体删除
const mediaDelete = (src: string) => {
    emits('mediaDelete', src)
};

defineExpose({
    wjcUpload,
    inputFile
})

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