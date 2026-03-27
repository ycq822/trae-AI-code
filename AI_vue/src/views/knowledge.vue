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
        <el-table :data="tableData" style="width: 100%;margin-top: 25px">
            <el-table-column prop="title" label="文章标题" width="200" fixed="left">
                <!-- 自定义插槽，显示文章标题，scope作用域中.row包含当前行数据对象 -->
                <template #default="scope">
                    <div style="display: flex;align-items: center;">
                        <el-icon><timer /></el-icon>
                        <span>{{scope.row.title}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="categoryId" label="分类" width="200">
                <template #default="scope">
                    <div style="display: flex;align-items: center;">
                        <el-icon><timer /></el-icon>
                        <span>{{categoryMap[scope.row.categoryId]}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="authorName" label="作者" width="150"></el-table-column>
            <el-table-column prop="readCount" label="阅读量" width="150"></el-table-column>
            <el-table-column prop="publishedAt" label="发布时间" width="150"></el-table-column>
            <el-table-column label="操作" width="225" fixed="right">
                <template #default="scope">
                    <el-button text type="primary" >编辑</el-button>
                    <el-button v-if="scope.row.status===0 || scope.row.status===2" text type="success" >发布</el-button>
                    <el-button v-else-if="scope.row.status===1" text type="warning" >下线</el-button>
                    <el-button text type="danger" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination 
        style="margin-top: 25px"
        :page-size="pagination.size"
        layout="prev,pager,next"
        :total="pagination.total"
        @change="handleChange" />
    </div>
</template>

<script setup>
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { categoryTree,articlePage } from '@/api/admin'
import { onMounted, ref, reactive } from 'vue'

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
        placeholder:'请选择分类'//输入框占位符
        
    },
    {
        prop:'status',//唯一标识
        comp:'select',//输入框类型
        label:'状态',//输入框前提示文字标签
        placeholder:'请选择状态',//输入框占位符
        options:[
            {
                label:'草稿',
                value:0
            },
            {
                label:'已发布',
                value:1
            },
            {
                label:'已下线',
                value:2
            }
        ]
        
    }
]
//分页参数
const pagination = reactive({
    currentPage:1,
    size:10,
    total:0
})
// v-on_@执行回调函数，接收搜索参数，提供封装信息
const handleSearch=async (formData)=>{
    console.log(formData,'搜索参数')

    const params = {
        ...pagination,
        ...formData,
        
    }
    //调用分页查询接口，请求分页数据
    const {records,total} = await articlePage(params)
    //更新表格数据
    tableData.value = records
    //更新分页参数
    pagination.total = total
    
}
const handleChange=(page)=>{
    pagination.currentPage = page
    handleSearch()
}
// 分类映射，建立 ID 到名称的映射，用于详情展示
const categoryMap = reactive({})

//分类列表，存储分类下拉框的选项数据
const categorises= ref([])

//列表数据，定义ref以便赋值
const tableData = ref([])



onMounted(async()=>{
    //等待封装好的获取请求接口categoryTree返回数据
    const data = await categoryTree()

    categorises.value = data.map(item=>{
        categoryMap[item.id] = item.categoryName
        //将后端返回的数据结构转换为 UI 组件所需的 { label, value } 格式
        return {
            label:item.categoryName,
            value:item.id
        }
    })
    formItems[1].options = categorises.value

    //获取列表
    handleSearch()

})
//回调函数写法➡️响应式
// onMounted(()=>{
//     categoryTree().then(data=>{
//         console.log(data,'分类树')
//     })
// })
</script>
