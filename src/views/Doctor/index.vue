<template>
  <el-button type="primary" @click="addoctor" class="box-card1">
    添加医生
  </el-button>
  <el-card class="box-card">
    <el-table :data="types" stripe style="width: 100%" height="500">
      <el-table-column prop="docName" label="姓名" width="150" />
      <el-table-column prop="docTitle" label="职位" width="150" />
      <el-table-column prop="politicstatus" label="政治面貌" width="150" />
      <el-table-column prop="education" label="学历" width="150" />

      <el-table-column prop="img" label="头像" sortable width="150">
        <!--插入图片链接的代码-->
        <template #default="row">
          <el-image :src="row.row.img" style="width: 70px; height: 70px" />
        </template>
      </el-table-column>

      <el-table-column label="是否推荐" width="150">
        <template #default="row">
          <el-switch v-model="row.row.recommend" class="mt-2"  @click="tuijina(row)"/>
        </template>
      </el-table-column>

      <el-table-column prop="nation" label="民族" width="150" />
      <el-table-column prop="userName" label="用户名" width="150" />
      <el-table-column prop="telephone" label="电话" width="150" />
      <el-table-column fixed="right" label="操作" width="310">
        <template #default="row">
          <el-button type="success" @click="handleDiaClick(row)">
            更多编辑
          </el-button>
          <el-button type="warning" @click="allocation(row)">
            分配账号
          </el-button>
          <!-- 删除确认框 -->
          <el-popconfirm title="确定要删除吗?" @confirm="deleks(row)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑 -->
    <el-dialog v-model="dialogVisible" title="编辑" width="30%" @close="shiqu">
      <el-form label-width="100px">
        <el-form-item label="用户名" :data="types">
          <el-input v-model="Edit.docName" />
        </el-form-item>
        <el-form-item label="职位" :data="types">
          <el-input v-model="Edit.docTitle" />
        </el-form-item>
        <el-form-item label="政治面貌" :data="types">
          <el-input v-model="Edit.politicstatus" />
        </el-form-item>
        <el-form-item label="学历" :data="types">
          <el-input v-model="Edit.education" />
        </el-form-item>
        <el-form-item label="电话" :data="types">
          <el-input v-model="Edit.telephone" />
        </el-form-item>
        <el-form-item label="民族" :data="types">
          <el-input v-model="Edit.nation" />
        </el-form-item>
        <el-form-item label="科室">
          <el-cascader
            :data="types"
            :props="defaultParams"
            :options="options"
            v-model="selectedOptions1"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="个人简历">
          <el-input
            v-model="Edit.introduction"
            :rows="2"
            type="textarea"
            placeholder="Please input"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="quxiao()">取消</el-button>
          <el-button
            type="primary"
            @click="updatedoctor()"
            v-model="dialogVisible"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 添加医生 -->
    <el-dialog v-model="dialogVisible1" title="添加医生" width="30%">
      <el-form label-width="120px">
        <el-form-item label="姓名">
          <el-input v-model="form.doc_name" width="250" />
        </el-form-item>
        <el-form-item label="民族">
          <el-input v-model="form.nation" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.doc_title" />
        </el-form-item>
        <el-form-item label="学历">
          <el-input v-model="form.education" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.telephone" />
        </el-form-item>
        <el-form-item label="面貌">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="共产党员" value="共产党员" />
            <el-option label="群众" value="群众" />
          </el-select>
        </el-form-item>
        <!-- 科室选择二级联动 -->
        <el-form-item label="科室">
          <el-cascader
            :props="defaultParams"
            :options="options"
            v-model="form.selectedOptions"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.resource">
            <el-radio label="男" />
            <el-radio label="女" />
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="edit1()" v-model="dialogVisible1"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- 分配账号 -->
    <el-dialog v-model="dialogVisible2" title="分配账号" width="30%">
      <el-form label-width="120px">
        <el-form-item label="用户名" :data="types">
          <el-input v-model="Edit.userName" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="fenpei()" v-model="dialogVisible2"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import { ElMessage } from 'element-plus'
import { get } from '@/utils/request'
export default {
  name: 'DrugIndex',
  data() {
    return {
      types: [],
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      Edit: [],
      form: [],
      value2: false,
      //二级联动
      options: [],
      selectedOptions: [],
      selectedOptions1: [],
      defaultParams: {
        label: 'departmentName',
        value: 'departmentId',
        children: 'children'
      }
    }
  },
  mounted() {
    get('/getDoctors').then((res) => {
      this.types = res.data.data
      console.log(this.types)
    }),
      get('/getAllDepartments').then((res) => {
        this.options = res.data.data
        console.log(this.options)
      })
  },
  methods: {
    //分配账号
    allocation(row) {
      this.Edit = row.row
      this.selectedOptions1[0] = this.Edit.departId1
      this.selectedOptions1[1] = this.Edit.departId2
      console.log(this.Edit)
      console.log(this.selectedOptions1)
      this.dialogVisible2 = !this.dialogVisible2
    },
    shiqu() {
      window.location.reload()
    },
    quxiao() {
      this.dialogVisible = !this.dialogVisible
    },
    updatedoctor() {
      this.dialogVisible = !this.dialogVisible
      console.log(this.Edit)
      console.log(this.Edit)
      //修改医生
      get('/updateDoctors', {
        docId: this.Edit.docId,
        docName: this.Edit.docName,
        docTitle: this.Edit.docTitle,
        politicstatus: this.Edit.politicstatus,
        education: this.Edit.education,
        telephone: this.Edit.telephone,
        nation: this.Edit.nation,
        introduction: this.Edit.introduction,
        departId1: this.selectedOptions1[0],
        departId2: this.selectedOptions1[1]
      })
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
    },
    //编辑医生
    handleDiaClick(row) {
      this.dialogVisible = !this.dialogVisible
      this.Edit = row.row
      this.selectedOptions1[0] = this.Edit.departId1
      this.selectedOptions1[1] = this.Edit.departId2
      console.log(this.Edit)
      console.log(this.selectedOptions)
    },
    handleChange(value) {
      this.Edit.departId1 = value[0]
      this.Edit.departId2 = value[1]
      console.log(value)
    },
    addoctor() {
      this.dialogVisible1 = !this.dialogVisible1
    },
    //添加医生
    edit1() {
      this.dialogVisible1 = !this.dialogVisible1
      get('/addDoctors', {
        docName: this.form.doc_name,
        docTitle: this.form.doc_title,
        education: this.form.education,
        nation: this.form.nation,
        politicstatus: this.form.region,
        sex: this.form.resource,
        telephone: this.form.telephone,
        departId1: this.form.selectedOptions[0],
        departId2: this.form.selectedOptions[1]
      })
      ElMessage({
        message: '添加成功',
        type: 'success'
      })
      window.location.reload()
      console.log(this.form)
    },
    edit() {
      this.dialogVisible = !this.dialogVisible
    },
    deleks(row) {
      console.log(row.row.docId)

      get('/deleteDoctors', {
        docId: row.row.docId
      })
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      window.location.reload()
    },
    //分配账号
    fenpei() {
      this.dialogVisible2 = !this.dialogVisible2
      get('/registerUser', {
        userName: this.Edit.userName,
        telephone: this.Edit.telephone,
        realName: this.Edit.docName,
        password: 123456,
        userRole: 'doctor'
      }).then((row) => {
        console.log(row)
        if (row.data.code == 0) {
          get('/updateDoctors', {
            docId: this.Edit.docId,
            userName: this.Edit.userName,
            departId1: this.selectedOptions1[0],
            departId2: this.selectedOptions1[1]
          })
          ElMessage({
            message: '分配成功',
            type: 'success'
          })
        } else {
          ElMessage({
            message: '分配失败，已经账号',
            type: 'error'
          })
          window.location.reload()
        }
      })
    },
    tuijina(row){
      console.log(row.row.docId)
       get('/updateRecommend', {
        docId: row.row.docId,
        recommend: row.row.recommend,
      })
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.box-card {
  margin-top: 5px;
  margin-left: 15px;
  margin-right: 15px;
}
.box-card1 {
  margin-top: 5px;
  margin-left: 15px;
}
</style>
