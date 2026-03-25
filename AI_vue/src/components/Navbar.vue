<template>
    <!-- 顶部导航栏 -->
     <div class="navbar">
        <div class="flex-box">
            <el-button>
                <el-icon><Expand></Expand></el-icon>
            </el-button>
            <p class="page-title">导航栏</p>
        </div>
        <div class="flex-box">
            <el-dropdown @command="handleCommand">
                <div class="flex-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" alt="用户头像"></el-avatar>
                    <p class="user-name">admin</p>
                    <el-icon><ArrowDown></ArrowDown></el-icon>
                </div>
                <!-- v-slot插槽：自定义下拉菜单内容————# -->
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>

                </template>
            </el-dropdown>
        </div>
     </div>
</template>

<script setup>
import {ElDropdown} from 'element-plus'

const handleCommand=(command)=>{
    if(command==='logout'){
        // 退出登录
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    background-color: #f5f7fa;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border: 1px solid #e4e7ed;
    .flex-box {
        display: flex;
        align-items: center;
        // justify-content: center;
        .page-title {
        font-size: 26px;
        margin-left: 20px;
        font-weight: bold;
        color: #303133;
    }
    }
    
}

</style>
