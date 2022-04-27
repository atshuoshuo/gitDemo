<template>
  <div class="biao1">
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input clearable></el-input>
      </el-col>
      <el-button type="primary">搜索</el-button>
    </el-row>
  </div>
  <div class="biao">
    <el-row>
      <el-col :span="1"></el-col>
      <el-col :span="22">
        <el-card class="box-card">
          <el-table :data="types" stripe style="width: 100%">
            <el-table-column prop="userName" label="用户名" />
            <el-table-column prop="telephone" label="电话" />
            <el-table-column prop="realName" label="真实姓名" />
            <el-table-column prop="roleName" label="用户类型" />
            <el-table-column prop="lastLogin" label="最后登录时间" />
            <el-table-column align="right" label="操作">
              <template #default="{ row }">
                <el-button
                  type="success"
                  size="small"
                  @click="handleDiaClick(row)"
                >
                  编辑
                </el-button>
                <el-popconfirm title="确认要重置密码吗?" @confirm="reset(row)">
                  <template #reference>
                    <el-button type="warning" size="small">重置密码</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div class="example-pagination-block">
            <el-pagination layout="prev, pager, next" :total="3" />
          </div>
        </el-card>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>
  </div>

  <el-dialog v-model="dialogVisible" title="编辑" width="30%">
    <el-form label-width="120px">
      <el-form-item label="用户ID" :data="types" v-if="false">
        <el-input v-model="Edit.userId" />
      </el-form-item>
      <el-form-item label="用户名" :data="types">
        <el-input v-model="Edit.userName" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="Edit.telephone" />
      </el-form-item>
      <el-form-item label="真实姓名">
        <el-input v-model="Edit.realName" />
      </el-form-item>
      <el-form-item label="用户类型">
        <el-input v-model="Edit.userRole" />
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
</template>

<script>
import { get } from '@/utils/request'
import { ElMessage } from 'element-plus'
export default {
  name: 'infoIndex',
  data() {
    return {
      types: [],
      Edit: [],
      adg: [],
      flag: false,
      dialogVisible: false
    }
  },
  setup() {},
  mounted() {
    get('/getUsers').then((res) => {
      this.types = res.data.data
      console.log(this.types)
    })
  },
  methods: {
    handleDiaClick(row) {
      this.dialogVisible = !this.dialogVisible
      console.log(row)
      this.Edit = row
    },
    edit() {
      this.dialogVisible = !this.dialogVisible
      console.log(this.Edit)
      get('/updateUser', {
        userId: this.Edit.userId,
        userName: this.Edit.userName,
        telephone: this.Edit.telephone,
        realName: this.Edit.realName,
        userRole: this.Edit.userRole
      }).then((res) => {
        console.log(res),
          ElMessage({
            message: '修改成功！',
            type: 'success'
          })
      })
    },
    reset(row) {
      this.adg = row
      get('/updatepd', {
        userId: this.adg.userId,
        password: 123456
      })
      ElMessage({
        message: '重置密码成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="scss" scope>
.hz {
  margin-top: 25px;
  margin-left: 225px;
}
.abc {
  display: tr;
}
.biao {
  margin-top: 35px;
}
.biao1 {
  margin-top: 35px;
  margin-left: 55px;
}
</style>
