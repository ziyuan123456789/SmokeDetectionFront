<template>
  <div class="header">
    <div class="title">在线吸烟监控系统</div>
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
  height: 45px;
  background-color: #F4A460;
  
}

.title {
  font-size: 28px;
  color: #FFFFFF;
  line-height: 60px;
  font-weight: bold;
  padding-left: 20px;
}

.tools {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-right: 50px;
}
</style>