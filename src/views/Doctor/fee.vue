<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column prop="feeName" label="收费类型" width="180" />
    <el-table-column prop="money" label="价格（元）" width="180" />
    <el-table-column prop="updateTime" label="修改日期" width="180" :formatter="formatDate"/>
    <el-table-column prop="status"  label="状态"  width="180">
        <template #default="scope">
          <span v-if="scope.row.status == 1">正常</span>   
          <span v-if="scope.row.status != 1">停用</span>
        </template> 
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="success" size="small" @click="handleDiaClick(row)">
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { get } from '@/utils/request'
export default {
  data() {
    return {
      data: []
    }
  },
  mounted() {
    get('/getDoctorFees').then((res) => {
      this.data = res.data.data
    })
  },
  methods: {
    handleDiaClick() {},
    formatDate(row, column) {
          // 获取单元格数据
          let data = row.updateTime;
          if(data == null) {
              return null
          }
          let dt = new Date(data)
          return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate()
        }
  }
}
</script>

<style lang="scss" scoped>
</style>
