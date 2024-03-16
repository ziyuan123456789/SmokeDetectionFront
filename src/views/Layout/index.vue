<template>
  <el-container>
    <el-header style="height:45px" >
      <LayoutHeader />
    </el-header>
    <el-container>
      <el-aside width="200px">
        <LayoutNav />
      </el-aside>
      <el-main><layout-main /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from './Headers/index.vue'
import LayoutMain from './Main/Main.vue'
import LayoutNav from './Nav/Nav.vue'
export default {
  name: "LayoutIndex",
  components: { LayoutMain, LayoutHeader, LayoutNav },
  setup() {

  }
}
</script>

<style lang="scss" scoped>

.el-header {
  padding: 0px !important;
}
.el-main{
  overflow-y: auto; /* Show vertical scrollbar when content overflows */
  height: calc(100vh - 45px);
}
</style>