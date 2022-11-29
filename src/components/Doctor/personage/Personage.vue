<template>
  <div class="child4">
      <div class="aa">
        <el-image :src="message.img" class="image" />
      </div>
      <el-form class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="message.docName" class="inp" />
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="message.education" class="inp" />
        </el-form-item>
        <el-form-item label="名族">
          <el-input v-model="message.nation" class="inp" />
        </el-form-item>
        <el-form-item label="面貌">
          <el-input v-model="message.politicstatus" class="inp" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="message.docTitle" class="inp" />
        </el-form-item>
        <el-form-item label="性别" :size="size">
          <el-select v-model="message.sex">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="message.telephone" class="inp" />
        </el-form-item>
        <el-form-item label="简历">
          <el-input
            v-model="message.introduction"
            type="textarea"
            placeholder="Please input"
            class="inp"
          />
        </el-form-item>
      </el-form>
     
      <el-popconfirm title="确认修改医生基本信息?" @confirm="updata">
        <template #reference>
          <el-button type="success" round class="update" >修改</el-button>
        </template>
      </el-popconfirm>
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
      message: [],
      formInline: [],
      Edit:[]
    }
  },
  mounted() {
    get('/getDoctorId/'+this.doctor.docId).then((res) => {
      this.message = res.data.data
      console.log(this.message)
    })
  },
  methods:{
    updata() {
       get('/updateDoctors', { 
        docId: this.doctor.docId ,
        docTitle: this.message.docTitle
       }).then((res) => {
        console.log(this.Edit)
    })
    },
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
.inp {
  width: 60%;
}
</style>
