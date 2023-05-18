<template>
    <div style="border: 1px solid #ccc">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
        <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
            @onCreated="handleCreated" @onChange="handleChange" />
    </div>
</template>
<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted, nextTick } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import type { IToolbarConfig } from '@wangeditor/editor';
import { DomEditor } from '@wangeditor/editor'
const mode = 'simple';
const props = defineProps<{
    content: string
}>();
const emits = defineEmits(['editorChange'])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
// 初始化内容
onMounted(() => {
    valueHtml.value = props.content;
})
const toolbarConfig: Partial<IToolbarConfig> = {}
toolbarConfig.excludeKeys = [
    'group-image',
    'insertLink',
    'insertVideo',
    'codeBlock'
]
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor: any) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}

const handleChange = (editor: any) => [
    emits('editorChange', editor.getHtml())
]


</script>
<style lang='scss' scoped></style>