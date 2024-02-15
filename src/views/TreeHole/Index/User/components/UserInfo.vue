<template>
    <h3>个人信息</h3>
    <hr>
    <div class="user-info">
        <div class="form">
            <el-form size="large" :model="form" label-width="120px">
                <el-form-item label="账号">
                    <el-input disabled v-model="form.ACCOUNT" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input disabled v-model="form.EMAIL" />
                </el-form-item>
            </el-form>
        </div>
        <div class="avatar">
            <h4>头像</h4>
            <div class="avatar-box">
                <img :src="TreeHoleUserStore.userInfo.AVATAR" alt="">
                <label for="file" class="edit-avatar">
                    <i class='iconfont icon-bianji'></i>
                    <span>修改</span>
                </label>
            </div>
        </div>
    </div>

    <input ref="inputFile" type="file" id="file" style="display: none;" @change="inputFileChange">
    <WjcCropper v-if="showCropperIMG" :url="cropperIMG" @confirm="uploadIMG" @close="closeWjcCropper"></WjcCropper>
</template>
<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue';
import { useTreeHoleUserStore } from '@/stores/TreeHoleUser'
import type { IUserInfo } from '@/type/TreeHole/user';
import { uploadFile } from '@/api/common/file';
import { postUpdateAvatarApi } from '@/api/TreeHole/user';
import WjcCropper from '@/components/WjcCropper.vue';

const TreeHoleUserStore = useTreeHoleUserStore();
let form = ref<IUserInfo>(
    {
        ACCOUNT: '',
        AVATAR: '',
        EMAIL: '',
        USER_UUID: '',
        MOBILE_PHONE: '',
        PASSWORD: '',
        TOKEN: '',
        VERIFY_KEY: '',
        status: ''
    }
)
onMounted(() => {
    form.value = TreeHoleUserStore.userInfo as IUserInfo
})
const inputFile = ref<HTMLInputElement | null>(null);
const cropperIMG = ref(''); // 需要裁剪的图片地址
const showCropperIMG = ref(false); // 是否显示裁剪图片框

const inputFileChange = async () => {
    const file = (inputFile.value?.files && inputFile.value.files[0]) as Blob;
    const fileRead = new FileReader();
    fileRead.readAsDataURL(file);
    fileRead.addEventListener("load", function () {
        cropperIMG.value = fileRead.result as string;
        showCropperIMG.value = true;
    }, false);
}
const closeWjcCropper = () => {
    cropperIMG.value = '';
    showCropperIMG.value = false;
}
// 上传图片
const uploadIMG = async (data: any) => {
    const formData = new FormData();
    formData.append('file', data)
    let uploadRes = await uploadFile(formData)
    await postUpdateAvatarApi({
        url: uploadRes.data.url
    })
    // 更新pinia
    TreeHoleUserStore.userInfo.AVATAR = uploadRes.data.url as string;
    // 更新localstore
    localStorage.setItem('userInfo', JSON.stringify(TreeHoleUserStore.userInfo))
    ElMessage({
        message: '头像更新成功',
        type: 'success',
    })
    closeWjcCropper();
}
</script>
<style lang='scss' scoped>
h3 {
    margin-bottom: 15px;
    color: #fff;
}

.user-info {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;

    .form {
        width: 50%;
        padding-right: 100px;
    }

    .avatar {
        width: 50%;

        h4 {
            margin-bottom: 10px;
        }

        img {
            width: 220px;
            height: 220px;
            border-radius: 50%;
            object-fit: cover;
        }

        .avatar-box {
            position: relative;

            .edit-avatar {
                display: flex;
                position: absolute;
                bottom: 0;
                left: 0;
                width: 90px;
                height: 40px;
                background-color: #0d1117;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 0 5px 1px;
                border-radius: 5px;

                .icon-bianji {
                    font-size: 20px;
                    margin-right: 5px;
                }
            }
        }
    }
}
</style>