<template>
  <div class="child4">
    <div class="jz" v-for="doctor in data" :key="doctor">
      <el-card shadow="always" class="card">
        <div class="aa">
          <el-image :src="doctor.img" class="image" />
        </div>
        <el-form class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="doctor.docName" class="inp"/>
          </el-form-item>
          <el-form-item label="学历">
            <el-input v-model="doctor.education" class="inp"/>
          </el-form-item>
          <el-form-item label="名族">
            <el-input v-model="doctor.nation" class="inp"/>
          </el-form-item>
          <el-form-item label="面貌">
            <el-input v-model="doctor.politicstatus" class="inp"/>
          </el-form-item>
          <el-form-item label="职位">
            <el-input v-model="doctor.docTitle" class="inp"/>
          </el-form-item>
          <el-form-item label="性别" :size="size">
            <el-select v-model="doctor.sex">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>

          <el-form-item label="电话">
            <el-input v-model="doctor.telephone" class="inp"/>
          </el-form-item>
          <el-form-item label="简历">
            <el-input
              v-model="doctor.introduction"
              type="textarea"
              placeholder="Please input"
              class="inp"
            />
          </el-form-item>
        </el-form>
        <el-button type="success" round class="update">修改</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import { get } from '@/utils/request'
export default {
  data() {
    return {
      loginState: sessionStorage.login,
      doctor: {
        docId: sessionStorage.docId
      },
      data: [],
      formInline: []
    }
  },
  mounted() {
    get('/getDoctorsByName', { docId: this.doctor.docId }).then((res) => {
      this.data = res.data.data
      console.log(this.data)
    })
  }
}
</script>

<style>
.aa {
  width: 10%;
  height: 10%;
  margin-top: 5%;
  overflow: hidden;
  position: absolute;
  margin-left: 5%;
}
.aa img {
  border-radius: 9px;
  -webkit-border-radius: 9px;
  -moz-border-radius: 9px;
}
.demo-form-inline {
  margin-top: 5%;
  margin-left: 20%;
}
.update {
  margin-left: 65%;
}
.card {
  position: relative;
  height: 750px;
}
.inp{
  width: 60%;
}
</style>
