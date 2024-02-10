<template>
    <div @click="handleFull">
        <el-icon size="35px"><FullScreen /></el-icon>
    </div>
</template>

<script setup>
import screenfull from 'screenfull'
const handleFull =()=>{
  if(screenfull.isEnabled){
      screenfull.toggle()
  }
}
</script>

<style lang="scss" scoped>

</style>