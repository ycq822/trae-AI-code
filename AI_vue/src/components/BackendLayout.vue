<template>
  <div class="backend-layout">
    <el-container>
      <Sidebar/>
      <el-container>
        <Navbar/>
        <el-main>Main</el-main>
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
}
</style>
