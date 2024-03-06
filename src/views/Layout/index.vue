<template>
  <div id="layout">
     <LayoutHeader class="layout-header"/>
     <layout-main id="main-wrap"></layout-main>
     <LayoutNav class="layout-nav"/>
  </div>
</template>


<script>
import LayoutHeader from './Headers/index.vue'
import LayoutMain from './Main/Main.vue'
import LayoutNav from './Nav/Nav.vue'
export default {
  name:"LayoutIndex", 
  components:{LayoutMain,LayoutHeader,LayoutNav},
  setup() {
      
  }
}
</script>

<style lang="scss" scoped>

/* 顶部栏样式 */
.layout-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; // 确保顶部栏在最上层
}

/* 侧边栏样式 */
.layout-nav {
  position: fixed;
  top: 50px; // 或者顶部栏的高度，如果顶部栏不是全宽度的话
  left: 0;
  width: 200px; // 侧边栏的宽度
  height: 100vh; // 视口高度
  z-index: 1000; // 确保侧边栏在最上层
  overflow-y: auto; // 超出内容滚动
}

/* 主内容区样式 */
#main-wrap {
  margin-left: 200px; // 侧边栏宽度
  margin-top: 10px; // 顶部栏高度
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto; // 主内容区滚动
 
  border-bottom: none;
  box-sizing: border-box;
}

</style>