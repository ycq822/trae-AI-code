<template>
    <el-form>
        <template v-for="item in formItems" :key="item.prop">
            <!-- 数据联动保证prop与数据prop绑定一致 -->
            <el-form-item :label="item.label" prop="item.prop">
                <component :is="isComp(item.comp)" :placeholder="item.placeholder"></component>
            </el-form-item>
        </template>
    </el-form>
</template>

<script setup>
const props=defineProps({
    formItems:{
        type:Array,
        default:()=>[]
    }
})
//枚举，渲染输入框 
const isComp=(comp)=>{
    return {
        input:'el-input',
        select:'el-select'
    }[comp]
}
</script>
