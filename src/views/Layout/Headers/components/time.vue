<template>
  <div>
    <el-button size="large">
      <p>{{ newDate }}</p>
    </el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newDate: new Date()
    }
  },
  mounted() {
    let that = this
    this.timer = setInterval(function () {
      that.newDate = new Date().toLocaleString()
    })
  }
}
</script>

<style lang="scss" scoped></style>
