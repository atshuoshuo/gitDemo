<template>
  <div id="nav-wrap">
    <div class="lgoinImg">
      <img src="../../../../assets/img/login.jpeg" />
    </div>
    <div id="xl">
      <el-menu background-color="#336a53" text-color="#fff">
        <el-menu-item index="1" @click="paiban">
          <el-icon><Calendar /></el-icon>
          <template #title>排班信息</template>
        </el-menu-item>
        <el-menu-item index="2" @click="huanze">
          <el-icon><Postcard /></el-icon>
          <template #title>患者信息</template>
        </el-menu-item>
        <el-menu-item index="3" @click="xinxi">
          <el-icon><user /></el-icon>
          <template #title>个人信息</template>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navMenu',
  methods: {
    paiban() {
      this.$router.push({
        name: 'paiban'
      })
    },
    huanze() {
      this.$router.push({
        name: 'huanze'
      })
    },
    xinxi() {
      this.$router.push({
        name: 'xinxi'
      })
    }
  }
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
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #336a53;
}
#xl {
  margin-left: 15px;
  margin-top: 25px;
  width: 236px;
}
.logo {
  text-align: center;
  img {
    margin: auto;
    width: 100px;
  }
}
</style>
