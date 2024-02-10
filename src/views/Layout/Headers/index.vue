<template>
  <div style="width:100%;height:50px;background-color: #F4A460">
    <div class="time">
      <div style="margin-left: 20px;font-size: 25px;line-height: 20px;color: #909399;">在线监控系统</div>
    </div>
    <div class="time1">
      <timein />
    </div>
    <div div="zh">

      <div class="asv1">
        <screen />
      </div>
      <div class="asv">
        <avatar></avatar>
      </div>
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
.asv1 {
  position: absolute;
  margin-top: 6px;
  margin-left: 85%;
  cursor: pointer
}

.time {

  position: absolute;
  margin-top: 15px;

  cursor: pointer
}

.asv {
  position: absolute;
  margin-left: 94%;
  margin-top: 5px;
}

.time1 {
  position: absolute;
  height: 5%;
  margin-left: 70%;
  margin-top: 6px;
}
</style>