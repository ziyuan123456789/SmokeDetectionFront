<template>
  <div class="header">
    <div class="title">在线监控系统</div>
    <div class="tools">
      <timein />
      <screen />
      <avatar />
    </div>
  </div>
</template>

<script>
import avatar from './components/avatar.vue'
import screen from './components/screenFull.vue'
import timein from './components/time.vue'
export default {
  name: "LayoutIndex",
  components: { avatar, screen, timein },
  setup() {

  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: #F4A460;
  padding: 0 20px;
}

.title {
  font-size: 25px;
  color: #909399;
  line-height: 50px; 
}

.tools {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-right: 50px;
}
</style>