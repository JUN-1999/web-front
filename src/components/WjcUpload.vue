<template>
    <div class="wjc-upload" ref="wjcUpload">
        <div class="input-label" v-for="item in imgList" :key="item.name">
            <template v-if="item.type == 'img'">
                <ViewImg :loading="loading" :src="item.url" :showDelete="true" @imgDelete="imgDelete" />
            </template>
            <template v-if="item.type == 'video'">
                <ViewVideo :src="item.url" :showDelete="true"></ViewVideo>
            </template>
        </div>
        <label for="uploadImg" class="input-label">
            <i class="iconfont icon-tianjia"></i>
        </label>
        <input :accept="accept" ref="inputFile" @change="inputChange" type="file" name="" id="uploadImg"
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

interface IProps {
    pics: IIMG[];
    accept?: string
}
// ts 不适用默认值使用
// const props = defineProps<IProps>();

// ts 设置默认值
const props = withDefaults(
    defineProps<IProps>(),
    {
        pics: () => { return [] },
        accept: 'image/*'
    }
)

let loading = ref(false);
const emits = defineEmits(['uploadSuccess'])
watch(
    () => props.pics,
    (newVal: IIMG[], oldVal: IIMG[]) => {
        if (newVal.length > 0) {
            imgList.value = newVal.map(item => {
                return {
                    name: item.name,
                    url: item.url,
                    type: item.type,
                };
            });
        }
    }
);

// 上传功能
const inputFile = ref<HTMLInputElement | null>(null)
const inputChange = async () => {
    loading.value = true;
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
        imgList.value.push({
            name: res.data.name,
            url: res.data.url,
            type: res.data.type
        })
        emits('uploadSuccess', imgList.value)
    }
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