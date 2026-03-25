import { defineStore } from 'pinia'
import {ref} from 'vue'

export const useAdminStore=defineStore('admin',()=>{
    const isCollapse=ref(false)//是否折叠侧边栏，默认展开

    const toggleCollapse=()=>{
        isCollapse.value=!isCollapse.value
    }
    return{
        isCollapse,
        toggleCollapse
    }
})