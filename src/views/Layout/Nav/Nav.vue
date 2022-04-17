<template>
    <div id="nav-wrap">
      <div class="lgoinImg">
        <img src="../../../assets/img/logo.jpeg"  />
      </div>
      <div id="xl">
     <el-menu
    default-active="2" 
    class="el-menu-vertical-demo"  
    :collapse="isCollapse" 
    @open="handleOpen" 
    @close="handleClose"  
     background-color="transparent" 
     text-color="#fff" 
     active-text-color="#7F7F7F"
     router>

     <template v-for="(item,index) in router.options.routes">
    <el-sub-menu  v-if="!item.hidden"  :key="item.id" :index="index+''">
     <!-- 一级菜单 -->
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"/>  
        </el-icon>
        <span >{{item.meta.name}}</span>
      </template>
      <!-- 子级菜单 -->
      <el-menu-item v-for="subItem in item.children" :key="subItem"   :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
    </el-sub-menu>
    </template>
  </el-menu>
  
     </div>
    </div>
</template>

<script >
import {  ref} from '@vue/reactivity'
import { useRouter } from "vue-router";
export default {
  name:"navMenu",
  setup(){   
   
  const router = useRouter();//获取所有路由
 

   const isCollapse = ref(false)
   const handleOpen = (key,keyPath) => {
   console.log(key, keyPath)
  }
   const handleClose = (key, keyPath) => {
   console.log(key, keyPath)
  }
   return{
     isCollapse,
     handleOpen,
     handleClose,router
   }
  },
}

</script>

<style lang="scss" scoped>
.lgoinImg {
  margin-left: 127px;
  margin-top: 75px;
  margin-bottom: -55px;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lgoinImg img {
  width: 85px;
  height: 85px;
  background: #eceeed;
  border-radius: 50%;
  border: 10px solid #fff;
}
#nav-wrap{
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 250px;
    background-color: #344a5f;
}
#xl{
  width: 251px;
}
.logo{
  text-align: center;
  img{
    margin: auto;
    width: 100px;
  }
}
</style>