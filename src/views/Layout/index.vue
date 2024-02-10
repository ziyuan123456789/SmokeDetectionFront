<template>
  <div id="layout">
     <LayoutHeader/>
     <LayoutMain/>
     <LayoutNav/>
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

</style>