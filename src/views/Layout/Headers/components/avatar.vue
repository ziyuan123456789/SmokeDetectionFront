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
  'https://img.zcool.cn/community/01b01b58f906c1a8012049efa20067.jpg@1280w_1l_2o_100sh.jpg'
)
const logout =()=>{
    router.replace('/'), ElMessage({
              message: '已退出！',
              type: 'success'
            })
}
</script>

<style lang="scss" scoped></style>
