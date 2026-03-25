<template>
  <div class="backend-layout">
    <el-container class="main-container">
      <Sidebar/>
      <el-container>
        <Navbar/>
        <el-main>
            <router-view></router-view>
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
  // 继承父元素的高度
  .main-container {
    height: 100%;
  }
}
</style>
