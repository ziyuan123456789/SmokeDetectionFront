<template>
    <el-container>
        <el-header>
            <div class="header-flex-container">
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">首页</el-menu-item>
                    <el-sub-menu index="2">
                        <template #title>实验简介</template>
                        <el-menu-item index="2-1">item one</el-menu-item>
                        <el-menu-item index="2-2">item two</el-menu-item>
                        <el-menu-item index="2-3">item three</el-menu-item>
                        <el-sub-menu index="2-4">
                            <template #title>item four</template>
                            <el-menu-item index="2-4-1">item one</el-menu-item>
                            <el-menu-item index="2-4-2">item two</el-menu-item>
                            <el-menu-item index="2-4-3">item three</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="3">专题知识</el-menu-item>
                    <el-menu-item index="4">实验指南</el-menu-item>
                    <el-menu-item index="5">资料库</el-menu-item>
                </el-menu>
                <div class="login-container">
                    <el-button type="text">登录</el-button>
                </div>
            </div>
        </el-header>
        <!-- 其他页面内容 -->
    </el-container>
</template>
  
<script>
export default {
    data() {
        return {
            activeIndex: '1' // 默认激活的菜单项
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
  
<style scoped>
.header-flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.el-menu-demo {
    flex-grow: 1;
}

.login-container {
    margin-left: auto;
}
</style>
  