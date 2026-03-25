<template>
    <div class="page-head">
        <p class="page-title">{{props.title}}</p>
        <div class="action-btn">
            <slot name="buttons"></slot>
        </div>
    </div>
</template>

<script setup>
// 接收属性
const props = defineProps({
    title: {
        type: String,
        default: '页面标题'
    }
})
</script>



<style lang="scss" scoped>
.page-head {
    // height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // padding: 0 20px;
    // background-color: #f5f7fa;
    // box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    // border: 1px solid #e4e7ed;
    .page-title {
        font-size: 24px;
        font-weight: bold;
        color: #303133;
    }
}
</style>