<template>
    <div>
        <PageHead title="情绪日志" />
        <TableSearch :formItem="formItem"  @search="handleSearch" />
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="用户ID" prop="id" width="80" />
            <el-table-column label="会话ID" width="80" >
                <template #default="scope">
                    <el-avatar>{{scope.row.nickname}}</el-avatar>
                </template>
            </el-table-column>
            <el-table-column label="记录日期" prop="diaryDate" width="120" />
            <el-table-column label="情绪评分" >
                <template #default="scope">
                    <el-rate :model-value="scope.row.moodScore" :max="10" disabled></el-rate>
                </template>
            </el-table-column>
            <el-table-column label="生活指标" width="130" >
                <template #default="scope">
                    <div>
                        <p>睡眠：{{scope.row.sleepQuality}}/5</p>
                        <p>压力：{{scope.row.stressLevel}}/5</p> 
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="情绪触发因素" prop="emotionTriggers" width="130" />
            <el-table-column label="日记内容" prop="diaryContent" width="140" />
            <el-table-column label="操作" width="180" fixed="right">
                <template #default="scope">
                    <el-button text type="primary" >详情</el-button>
                    <el-button text type="danger" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination 
            style="margin-top: 25px"
            :page-size="pagination.size"
            layout="prev,pager,next"
            :total="pagination.total"
            @change="handleChange" />
    </div>
</template>
<script setup>
import { ref,onMounted,reactive } from 'vue'
import PageHead from '@/components/PageHead.vue'
import TableSearch from '@/components/TableSearch.vue'
import { getEmotionalPage } from '@/api/admin'


const formItem = [
    {
        prop:'userId',
        comp:'input',
        label:'用户ID',
        placeholder:'请输入用户ID'
    },
    {
        prop:'moodScoreRange',
        comp:'select',
        label:'情绪评分',
        placeholder:'选择评分范围',
        options:[
            {label:'低分（1-3）',value:'1-3'},
            {label:'中分（4-6）',value:'4-6'},
            {label:'高分（7-10）',value:'7-10'}
        ]
    }
]

//列表
const tableData = ref([])

const pagination = reactive({
    currentPage:1,
    size:10,
    total:0
})
const handleChange=(page)=>{
    pagination.currentPage = page
    handleSearch()
}

const handleSearch=async (formData)=>{
    const params = {
        ...pagination,
        ...formData,
        
    }
    //调用分页查询接口，请求分页数据
    const {records,total} = await getEmotionalPage(params)
    //更新表格数据
    tableData.value = records
    //更新分页参数
    pagination.total = total
}
onMounted(()=>{
    handleSearch()
})
</script>
