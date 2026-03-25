<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <Sidebar/>
      <el-container >
        <el-header height="60px">
          <Navbar/>
        </el-header>
        <el-main class="main-content">
            <router-view class="content-container"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue'

</script>

<style lang="scss" scoped>
.backend-layout {
  height: 100vh;
  .el-header{
    height: 74px !important;
  }
  // 继承父元素的高度
  .main-container {
    height: 100%;
    .content-container {
      padding: 20px;
      background-color: #f5f7fa;
      min-height: calc(100% - 74px);
    }
  }
}
</style>
