<template>
    <el-dialog @close="close" v-model="dialogVisible" title="图片裁剪" center>
        <vueCropper class="vueCropper" ref="cropper" :img="url" :autoCrop="true" :outputSize="1" :outputType="'png'"
            :fixedNumber="[1, 1]" :fixed="true">
        </vueCropper>
        <template #footer>
            <el-button type="primary" plain @click="confirm">确认</el-button>
            <el-button plain @click="close">取消</el-button>
        </template>
    </el-dialog>
</template>
<script setup lang='ts'>
import { ref } from 'vue';
const dialogVisible = ref(true);
const props = defineProps({
    url: {
        type: String,
        default: "",
    },
});
const emits = defineEmits(['close', 'confirm'])
const cropper = ref();
// 关闭弹窗
const close = () => {
    emits('close')
}
// 确认按钮
const confirm = () => {
    cropper.value.startCrop();
    cropper.value.getCropBlob((data: any) => {
        console.log(data);
        emits('confirm', data)
    })
}


</script>
<style lang='scss' scoped>
.vueCropper {
    width: 500px;
    height: 500px;
    margin: 0 auto;
}
</style>