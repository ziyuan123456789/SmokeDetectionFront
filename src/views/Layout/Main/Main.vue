<template>
  <div id="main-wrap">
      <router-view/>
  </div>
</template>

<script>
export default {
  name:"LayoutIndex", 
}
</script>

<style lang="scss" scoped>
#main-wrap{
    position: fixed;
    left: 201px;
    top: 50px;
    right: 0;
    bottom: 0;
    border: 5px solid #f7f7f7;
    border-bottom: none;
    -webkit-box-sizing:border;
}
</style>