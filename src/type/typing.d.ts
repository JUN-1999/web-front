// 注意，扩展vue的接口需要先import vue进来, 不导入原来的环境进来，直接扩展的话，就不是扩展了，变成覆盖
import Vue from 'vue'
// 引入了element-plus的Message的ts类型声明
import type { Message } from 'element-plus'
declare module '@vue/runtime-core' {
    // 扩展全局变量的接口内容，需要扩展ComponentCustomProperties这个接口，不要乱改成别的
    interface ComponentCustomProperties {
        $common: {
            timeFilter: (time: string) => string
        },
    }
}