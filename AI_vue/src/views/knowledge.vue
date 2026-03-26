<template>
    <div>
        <PageHead title="知识文章">
            <!-- 具名插槽 -->
            <template #buttons>
                <el-button type="primary">新增</el-button>
                <el-button type="primary">编辑</el-button>
            </template>
        </PageHead>
        <TableSearch :formItems="formItems" @search="handleSearch"/>
    </div>
</template>

<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
const formItems=[
    {
        prop:'title',
        comp:'input',
        label:'文章标题',
        placeholder:'请输入文章标题',
    },
    {
        prop:'categoryId',//唯一标识
        comp:'select',//输入框类型
        label:'分类',//输入框前提示文字标签
        placeholder:'请选择分类',//输入框占位符
        options:[
            {label:'心理健康基础',value:'1'},
            {label:'情绪管理',value:'2'},
            
        ]
    }
]
// v-on_@执行回调函数，接收搜索参数，提供封装信息
const handleSearch=(formData)=>{
    console.log(formData,'搜索参数')
}
</script>
