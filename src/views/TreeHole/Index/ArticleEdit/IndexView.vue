<template>
    <div class="edit-article">
        <div class="header">
            <div class="header-left">
                <div class="back" @click="goBack"><i class="iconfont icon-fanhui"></i>返回</div>
                <div class="line"></div>
                <div class="title">{{ article_uuid == 0 ? '种瓜' : '编辑瓜' }}</div>
            </div>

            <el-button @click="postUpdateArticle" type="success" class="publish-btn">
                {{ article_uuid == 0 ? '发布' : '修改' }}
            </el-button>
        </div>
        <el-form :model="form" label-width="0px">
            <el-form-item label="">
                <span class="title-text">标题</span>
                <el-input size="large" maxlength="30" show-word-limit clearable style="width: 60%;" v-model="form.title" />
            </el-form-item>
            <el-form-item label="">
                <div style="width: 90%;">
                    <WjcEditor v-if="is_content" :content="form.content" @editor-change="editorChange"></WjcEditor>
                </div>
            </el-form-item>
            <el-form-item label="">
                <div class="media">
                    <span class="text">图片/视频</span>
                    <WjcUpload label-style-width="80px" label-style-height="80px" :accept="'video/*,image/*'"
                        @upload-success="uploadSuccess" :pics="form.pics"></WjcUpload>
                </div>
            </el-form-item>
            <el-form-item label="">

            </el-form-item>
        </el-form>
    </div>
</template>
<script setup lang='ts'>
import { ElMessage } from 'element-plus'
import { ref, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { updateArticle, getArticleInfoApi } from '@/api/TreeHole/article';
import WjcUpload from '@/components/WjcUpload.vue';
import WjcEditor from '@/components/WjcEditor.vue';
import type { IIMG } from '@/type/TreeHole/file';

const article_uuid = ref();
const router = useRouter();
const route = useRoute();
const form = ref<{
    title: string,
    content: string,
    pics: IIMG[]
}>({
    title: '',
    content: '',
    pics: [],
})
let is_content = ref(false);

onMounted(() => {
    article_uuid.value = route.params.id
    if (article_uuid.value != 0) {
        // 说明有文章 去获取文章
        getArticle();
    } else {
        is_content.value = true;
    }
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
    const res = await updateArticle(form.value, article_uuid.value);
    ElMessage({
        message: res.data,
        type: 'success',
    })
    setTimeout(() => {
        router.go(-1)
    }, 1000);
}
// 获得文章
const getArticle = async () => {
    let res = await getArticleInfoApi({
        article_uuid: article_uuid.value
    })
    let { TITLE, CONTENT, PICS } = res.data;
    form.value = {
        title: TITLE,
        content: CONTENT,
        pics: JSON.parse(PICS)
    };
    nextTick(() => {
        is_content.value = true;
    })

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

:deep(.el-divider--horizontal) {
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
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 80px;
        margin-top: 20px;
        margin-bottom: 20px;

        .header-left {
            display: flex;
            align-items: center;
            font-size: 30px;
            height: 60px;

            .back {
                color: #fff;
                cursor: pointer;
            }

            .icon-fanhui {
                margin-right: 10px;
                font-size: 30px;
            }

            .line {
                width: 2px;
                height: 50%;
                background-color: #dadada;
                margin: 0 20px;
            }

            .title {
                font-weight: 600;
                color: #36ae39;
                text-shadow: #f2f2f2 1px 0 0, #f2f2f2 0 1px 0, #f2f2f2 -1px 0 0, #f2f2f2 0 -1px 0;
            }
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

.media {
    width: 100%;
    padding: 0 80px;

    .text {
        font-size: 20px;
        color: white;
        display: block;
        margin-bottom: 10px;
    }
}

.title-text {
    font-size: 20px;
    color: white;
    margin-right: 10px;
}
</style>