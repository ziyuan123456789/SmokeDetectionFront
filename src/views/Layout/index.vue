<template>
  <el-container style="height: 100vh;">
    <el-header style="height: 45px;">
      <LayoutHeader />
    </el-header>
    <el-container style="height: calc(100vh - 50px);">
      <el-aside width="200px" >
        <LayoutNav />
      </el-aside>
      <el-main >
        <layout-main />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from './Headers/index.vue'
import LayoutMain from './Main/Main.vue'
import LayoutNav from './Nav/Nav.vue'

export default {
  name: "LayoutIndex",
  components: { LayoutMain, LayoutHeader, LayoutNav }
}
</script>

<style lang="scss" scoped>
.el-header {
  padding: 0 !important;
}

.el-main {
  --el-main-padding:10px
}
</style>
