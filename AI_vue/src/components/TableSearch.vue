<template>
    <el-form :model="formData" ref="roleFormRef">
        <el-row :gutter="24">
            <template v-for="item in formItemAttrs" :key="item.prop">
                <el-col v-bind="item.col">
                <!-- 表单校验数据联动保证prop与数据prop绑定一致 -->
                <el-form-item :label="item.label" :prop="item.prop">
                    <component v-model="formData[item.prop]" :is="isComp(item.comp)" :placeholder="item.placeholder">
                        <!-- 下拉框组件渲染 -->
                        <template v-if="item.comp === 'select'">
                            <el-option label="全部" value=""></el-option>
                            <el-option 
                            v-for="opt in item.options" 
                            :key="opt.value" 
                            :label="opt.label"
                            :value="opt.value">
                            </el-option>
                        </template>
                    </component>
                </el-form-item>
                </el-col>
            </template>
        </el-row>

        <el-row>
            <el-button type="primary" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset(roleFormRef)">重置</el-button>
        </el-row>
        
    </el-form>
</template>

<script setup>
import { ref, reactive,computed } from 'vue'

const props = defineProps({
    formItems: {
        type: Array,
        default: () => []
    }
})

const emit = defineEmits(['search'])//父组件中显示search事件

const formItemAttrs = computed(()=>{
    const {formItems} = props
    formItems.forEach(item=>{
        item.col={ xs: 24, sm: 12,md: 8,lg: 6,xl: 4 }
    })
    return formItems
})

//表单数据
const formData = reactive({})

const roleFormRef = ref()
//枚举，渲染输入框 
const isComp = (comp) => {
    return {
        input: 'el-input',
        select: 'el-select'
    }[comp]
}
const handleSearch=()=>{
    emit('search', formData)
}
const handleReset=(formEl)=>{
    //先重置表单，再触发查询
    if(!formEl) return
    formEl.resetFields()
    emit('search', formData)
}
</script>
