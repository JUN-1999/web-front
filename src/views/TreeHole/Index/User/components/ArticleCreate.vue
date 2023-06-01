<template>
    <h3>种下的瓜</h3>
    <hr>
    <div class="list">
        <div class="list-item" v-for="item in list" :key="item.ARTICLE_UUID">
            <span></span>
            <span>{{ item.TITLE }}</span>
            <span>
                <el-button type="success" size="large" @click="editArticle(item)">修改</el-button>
                <el-button type="danger" size="large" @click="deleteArticle(item)">删除</el-button>
            </span>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getArticleCreateApi, postDeleteArticleApi } from '@/api/TreeHole/article';
import type { IArticleItem } from '@/type/TreeHole/article';
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter();
const list = ref<IArticleItem[]>([])

onMounted(async () => {
    await getList();
})
// 获得列表
const getList = async () => {
    let res = await getArticleCreateApi();
    list.value = res.data;
}
// 修改瓜
const editArticle = (data: IArticleItem) => {
    router.push(`/TreeHole/TreeHoleIndex/ArticleEdit/${data.ARTICLE_UUID}`)
}
// 删除瓜
const deleteArticle = async (data: IArticleItem) => {
    ElMessageBox.confirm(
        '删除后无法回复，是否确认删除?',
        '提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            await postDeleteArticleApi({
                id: data.ARTICLE_UUID
            })
            getList();
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
        })
        .catch(() => {

        })
}

</script>
<style lang='scss' scoped>
h3 {
    margin-bottom: 15px;
    color: #fff;
}

.list {
    margin-top: 30px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: 50px;

    &::-webkit-scrollbar {
        width: 0px;
    }

    .list-item {
        width: 100%;
        height: 100px;
        margin-bottom: 10px;
        border-radius: 5px;
        background-color: rgba($color: #fff, $alpha: .2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        transition: all 0.3s linear;

        &:hover {
            background-color: rgba($color: #fff, $alpha: .4);
            transform: scale(1.01);
        }
    }
}
</style>