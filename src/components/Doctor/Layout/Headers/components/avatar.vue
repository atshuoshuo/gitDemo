<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" :size="40" :src="circleUrl" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import router from '@/router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const circleUrl = ref(
  'https://img2.baidu.com/it/u=1814268193,3619863984&fm=253&fmt=auto&app=138&f=JPEG?w=632&h=500'
)
const logout =()=>{
   sessionStorage.clear();
    router.replace('/'), ElMessage({
              message: '已退出！',
              type: 'success'
            })
}
</script>

<style lang="scss" scoped></style>
