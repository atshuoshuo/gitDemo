<template>
  <div class="top">
    <el-row :gutter="20">
      <el-col :span="1"></el-col>
      <el-col :span="22">
        <el-card class="box-card">
          <el-table
            :data="types"
            style="width: 100%"
            height="700"
            accordion="true"
          >
            <el-table-column type="expand">
              <template #default="props">
                <el-row :gutter="20">
                  <el-col :span="2"></el-col>
                  <el-col :span="22">
                    <div class="biao1">
                      <el-row :gutter="20">
                        <el-col :span="7">
                          <el-input v-model="input" />
                        </el-col>
                        <el-button type="primary" @click="addks(props)"
                          >添加</el-button
                        >
                      </el-row>
                    </div>
                    <el-table
                      :data="props.row.children"
                      style="width: 100%"
                      v-show="props"
                    >
                      <el-table-column
                        prop="departmentName"
                        label="门诊"
                        width="450"
                      />
                      <el-table-column fixed="right" label="操作" width="220">
                        <template #default="row">
                          <el-button
                            type="success"
                            @click="handleDiaClick(row)"
                          >
                            编辑
                          </el-button>
                          <el-popconfirm
                            title="确定要删除吗?"
                            @confirm="deleks(row)"
                          >
                            <template #reference>
                              <el-button type="warning">删除</el-button>
                            </template>
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table></el-col
                  >
                </el-row>
              </template>
            </el-table-column>
            <el-table-column label="科室" prop="departmentName"
          /></el-table>
        </el-card>
      </el-col>
      <el-col :span="1"></el-col>
    </el-row>

    <el-dialog v-model="dialogVisible" title="编辑" width="30%">
      <el-form label-width="120px">
        <el-form-item label="门诊">
          <el-input v-model="abc.row.departmentName" />
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
  </div>
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
      abc: [],
      input: '',
      dialogVisible: false
    }
  },
  mounted() {
    get('/getAllDepartments').then((res) => {
      this.types = res.data.data
      console.log(this.types)
    })
  },
  methods: {
    addks(props) {
      console.log(props.row.departmentId)
      console.log(this.input)
      if (this.input != '') {
        get('/addDepartment', {
          departmentName: this.input,
          level: 2,
          parentId: props.row.departmentId
        })
        ElMessage({
          message: '添加成功请刷新',
          type: 'success'
        })
        window.location.reload()
      } else {
        ElMessage({
          message: '添加失败,请重新输入',
          type: 'warning'
        })
      }
    },
    deleks(row) {
      console.log(row.row.departmentId)

      get('/deleteDepartment', {
        departmentId: row.row.departmentId
      })
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      window.location.reload()
    },
    handleDiaClick(row) {
      this.abc = row
      this.dialogVisible = !this.dialogVisible
    },
    edit() {
      this.dialogVisible = !this.dialogVisible
      console.log(this.abc.row)
      get('/updateDepartment', {
        departmentId: this.abc.row.departmentId,
        departmentName: this.abc.row.departmentName,
        level: this.abc.row.level,
        parentId: this.abc.row.parentId
      }).then((res) => {
        console.log(res),
          ElMessage({
            message: '修改成功！',
            type: 'success'
          })
      })
    }
  }
}
</script>

<style lang="scss" scope>
.top {
  margin-top: 15px;
}
</style>
