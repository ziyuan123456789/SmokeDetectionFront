<template>
  <div id="nav-wrap">

    <div id="xl">
      <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
        @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#fff" router>
        <template v-for="(item, index) in router.options.routes">
          <el-sub-menu v-if="!item.hidden && item.meta" :key="item.id" :index="index + ''">
            <!-- 一级菜单 -->
            <template #title>
              <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
              <span v-if="item.meta">{{ item.meta.name }}</span>
            </template>
            <!-- 子级菜单 -->
            <el-menu-item v-if="item.children && item.children.length > 0" v-for="subItem in item.children"
              :key="subItem.id" :index="subItem.path">{{ subItem.meta && subItem.meta.name }}</el-menu-item>
          </el-sub-menu>
        </template>

      </el-menu>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
export default {
  name: 'navMenu',
  setup() {
    const router = useRouter() //获取所有路由
    const isCollapse = ref(false)
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      isCollapse,
      handleOpen,
      handleClose,
      router
    }
  }
}
</script>

<style lang="scss" scoped>
#nav-wrap {
  position: fixed;
  margin-top: 15px;
  top: 35px;
  left: 0;
  height: 100vh;
  width: 200px;
  background-color: #545c64;
}
</style>
