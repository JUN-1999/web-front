<template>
    <div class="edit-article">
        <div class="header">
            <div class="back" @click="goBack"><i class="iconfont icon-fanhui"></i>返回</div>
            <div class="line"></div>
            <h1 class="title">编辑瓜</h1>
        </div>
        <el-form :model="form" label-width="0px">
            <el-divider><span>标题</span></el-divider>
            <el-form-item label="">
                <el-input size="large" maxlength="30" show-word-limit clearable style="width: 60%;" v-model="form.title" />
            </el-form-item>
            <el-divider><span>正文</span></el-divider>
            <el-form-item label="">
                <div style="width: 90%;">
                    <WjcEditor :content="form.content" @editor-change="editorChange"></WjcEditor>
                </div>
            </el-form-item>
            <el-divider><span>图片</span></el-divider>
            <el-form-item label="">
                <WjcUpload @upload-success="uploadSuccess" :pics="form.pics"></WjcUpload>
            </el-form-item>
            <el-form-item label="">
                <el-button @click="postUpdateArticle" type="success" class="publish-btn">发布</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { updateArticle } from '@/api/TreeHole/article'

import WjcUpload from '@/components/WjcUpload.vue';
import WjcEditor from '@/components/WjcEditor.vue';
interface IIMG {
    name: string,
    url: string,
}
const router = useRouter();

const form = ref<{
    title: string,
    content: string,
    pics: IIMG[]
}>({
    title: '',
    content: '',
    pics: [],
})

const uploadSuccess = (list: IIMG[]) => {
    form.value.pics = list;
}
const editorChange = (html: string) => {
    form.value.content = html
}
const goBack = () => { router.go(-1) }
// 发布、修改文章
const postUpdateArticle = async () => {
    const res = await updateArticle(form.value, 0);
    ElMessage({
        message: res.data,
        type: 'success',
    })
    setTimeout(() => {
        router.go(-1)
    }, 1000);
}

</script>
<style lang='scss' scoped>
:deep(.el-divider__text) {
    background-color: #9cb46c;
    font-size: 25px;
    font-weight: 600;
    color: greenyellow;
}

:deep(.el-form-item__content) {
    display: flex;
    justify-content: center;
    align-items: center;
}
:deep(.el-divider--horizontal){
    width: 90%;
    margin: 30px auto;
}

.edit-article {
    width: 82vw;
    height: 90vh;
    background-color: #fff5;
    box-shadow: 0 8px 16px #0005;
    border-radius: 16px;
    overflow-x: hidden;
    overflow-y: auto;

    .header {
        display: flex;
        align-items: center;
        height: 80px;
        box-sizing: border-box;
        padding-left: 80px;

        .back {
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 25px;

            .icon-fanhui {
                font-size: 25px;
            }
        }

        .line {
            width: 2px;
            height: 50%;
            background-color: #dadada;
            margin: 0 20px;
        }

        .title {
            color: #36ae39;
            text-shadow: #f2f2f2 1px 0 0, #f2f2f2 0 1px 0, #f2f2f2 -1px 0 0, #f2f2f2 0 -1px 0;
        }
    }

    .publish-btn {
        width: 120px;
        height: 60px;
        border-radius: 15px;
        background-color: #36ae39;
        color: #fff;
        font-size: 20px;
        font-weight: bolder;
        box-shadow: 0 0 10px 1px #fff;
    }
}
</style>