<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

</script>

<template>
  <el-container>
    <el-header class="header" :class="isDark ? 'dark dark-shadow' : ''">
      <div></div>
      <div class="content">NovelAiMagicBook</div>
      <el-button @click="toggleDark()">{{ isDark ? "Light" : "Dark" }}</el-button>
    </el-header>
    <el-main :class="isDark ? 'dark' : ''" class="main-body">
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped lang="less">
.header {
  position: relative;
  height: 56px;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  width: 100%;
  z-index: 999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .content {
    font-size: 20px;
    font-weight: 400px;
  }
}
.dark-shadow {
  box-shadow: 0px 0px 12px rgba(167, 139, 139, 0.72);
}
.dark {
  background-color: #1D1E20;
  --el-box-shadow-light: 0px 0px 12px rgba(167, 139, 139, 0.72);
  color: #ffffff;
}
.main-body {
  height: 100%;
}
</style>
