<template>
<div class="time1">
  <timein/>
</div>
<div div="zh">
  
  <div class="asv1">
    <screen/>
  </div>
  <div class="asv">
  <avatar></avatar>
  </div>
</div>
</template>

<script>
import avatar from './components/avatar.vue'
import screen from './components/screenFull.vue'
import timein from './components/time.vue'
export default {
  name:"LayoutIndex", 
  components:{avatar,screen,timein},
  setup() {
      
  }
}
</script>

<style lang="scss" scoped>
.asv1{
  position: absolute;
  margin-top: 6px;
  margin-left: 90%;
  cursor:pointer
}
.asv {
  position: absolute;
  margin-left: 94%;
  margin-top: 5px;
}
.time1{
  position: absolute;
  height: 5%;
  margin-left: 77%;
  margin-top: 6px;
}
</style>