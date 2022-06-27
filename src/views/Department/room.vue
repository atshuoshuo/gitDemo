<template>
  <el-card class="box-card">
    <el-table :data="types" style="width: 100%">
      <el-table-column prop="departmentName" label="科室" width="180" />
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="row">
          <el-button type="success" @click="look(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-drawer v-model="table" direction="rtl" size="50%">
    <el-button size="large" round>{{ title }}</el-button
    ><br />
    <el-button type="primary" class="tian" @click="addwz">添加</el-button>
    <el-table :data="Room">
      <el-table-column property="floor" label="楼层" width="150" />
      <el-table-column property="roomName" label="名牌" />
      <el-table-column label="操作">
        <template #default="row">
          <el-button type="warning" @click="handleDiaClick(row)"
            >修改</el-button
          >
          <el-popconfirm title="确定要删除吗?" @confirm="deleks(row)">
            <template #reference>
              <el-button type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>

  <!-- 编辑位置 -->
  <el-dialog v-model="dialogVisible" title="编辑" width="30%">
    <el-form label-width="120px">
      <el-form-item label="楼层" :data="types">
        <el-input v-model="Edit.floor" />
      </el-form-item>
      <el-form-item label="名牌">
        <el-input v-model="Edit.roomName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="edit()" v-model="dialogVisible"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!-- 添加位置 -->
  <el-dialog v-model="dialogVisible1" title="添加" width="30%">
    <el-form label-width="120px">
      <el-form-item label="楼层">
        <el-input v-model="from.floor" />
      </el-form-item>
      <el-form-item label="名牌">
        <el-input v-model="from.roomName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取消</el-button>
        <el-button type="primary" @click="add()" v-model="dialogVisible1"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { get } from '@/utils/request'
import { ElMessage } from 'element-plus'
export default {
  name: 'infoIndex',
  setup() {},
  data() {
    return {
      types: [],
      Room: [],
      Edit: [],
      from: [],
      departmentId: '',
      input: '',
      table: false,
      title: '',
      dialogVisible: false,
      dialogVisible1: false
    }
  },
  methods: {
    look(row) {
      this.table = true
      this.title = row.row.departmentName
      this.departmentId = row.row.departmentId
      console.log(row.row)
      get('/getRoom', { departId1: row.row.departmentId }).then((res) => {
        this.Room = res.data.data
      })
    },
    handleDiaClick(row) {
      this.dialogVisible = !this.dialogVisible
      this.Edit = row.row
    },
    edit() {
      this.dialogVisible = !this.dialogVisible
      get('/updateRoom', {
        departId1: this.Edit.departId1,
        departId2: this.Edit.departId2,
        floor: this.Edit.floor,
        roomId: this.Edit.roomId,
        roomName: this.Edit.roomName
      }).then((res) => {
          ElMessage({
            message: '修改成功！',
            type: 'success'
          })
      })
    },
    addwz() {
      this.dialogVisible1 = !this.dialogVisible1
    },
    add() {
      console.log(this.departmentId)
      this.dialogVisible1 = !this.dialogVisible1
      if (this.from.floor != null && this.from.roomName != null) {
        get('/addRoom', {
          departId1: this.departmentId,
          floor: this.from.floor,
          roomName: this.from.roomName
        }).then((res) => {
            ElMessage({
              message: '添加成功！',
              type: 'success'
            })
        })
      } else {
        ElMessage.error('添加失败，请填写楼层或名牌！')
      }
      this.table = false
    },
    deleks(row) {
      console.log(row.row)

      get('/deleteRoom', {
        roomId: row.row.roomId
      })
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      this.table = false
    },
  },
  mounted() {
    get('/getAllDepartments').then((res) => {
      this.types = res.data.data
      console.log(this.types)
    })
  }
}
</script>

<style lang="scss" scope>
.top {
  margin-top: 15px;
}
.box-card {
  margin-top: 15px;
  margin-left: 15px;
  width: 95%;
  height: 600px;
  overflow-y: auto;
}
.tian {
  margin-top: 25px;
}
</style>
