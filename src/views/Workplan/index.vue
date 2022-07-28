<template>
  <div class="big">
    <!-- 列表 -->
    <el-card class="box-card">
      <div class="search">
        <el-button type="primary" @click="lastweek">上一周</el-button>
        <el-button
          v-if="this.planstatus == null"
          type="success"
          @click="startplan"
          >开始排班</el-button
        >
        <el-button type="primary" @click="nextweek">下一周</el-button>
        <div class="title">
          <span>{{ nextMonday }}</span>
          <span>星期一</span>
          <span>~</span>
          <span>{{ lastsunday }}</span>
          <span>星期天</span>
        </div>
      </div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>

      <table
        border="0"
        cellspacing="1px"
        bordercolor="#254389"
        cellpadding="0"
        style="border-collapse: collapse"
      >
        <thead>
          <tr height="50">
            <td width="180">{{ monday1 }}</td>
            <td width="180">{{ tuesday1 }}</td>
            <td width="180">{{ wednesday1 }}</td>
            <td width="180">{{ thursday1 }}</td>
            <td width="180">{{ friday1 }}</td>
            <td width="180">{{ saturday1 }}</td>
            <td width="180">{{ sunday1 }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="planstatus != null && planstatus != {}">
            <td>
              <el-button
                v-if="planstatus.mondayStatus == 0"
                type="success"
                @click="addPlan(1)"
                >增加</el-button
              >
              <el-button
                v-if="planstatus.mondayStatus == 1"
                type="primary"
                @click="editPlan(1)"
                >查看</el-button
              >
            </td>
            <td>
              <el-button
                v-if="planstatus.tuesdayStatus == 0"
                type="success"
                @click="addPlan(2)"
                >增加</el-button
              >
              <el-button
                v-if="planstatus.tuesdayStatus == 1"
                type="primary"
                @click="editPlan(2)"
                >查看</el-button
              >
            </td>
            <td>
              <el-button
                v-if="planstatus.wednesdayStatus == 0"
                type="success"
                @click="addPlan(3)"
                >增加</el-button
              >
              <el-button
                v-if="planstatus.wednesdayStatus == 1"
                type="primary"
                @click="editPlan(3)"
                >查看</el-button
              >
            </td>
            <td>
              <el-button
                v-if="planstatus.thursdayStatus == 0"
                type="success"
                @click="addPlan(4)"
                >增加</el-button
              >
              <el-button
                v-if="planstatus.thursdayStatus == 1"
                type="primary"
                @click="editPlan(4)"
                >查看</el-button
              >
            </td>
            <td>
              <el-button
                v-if="planstatus.fridayStatus == 0"
                type="success"
                @click="addPlan(5)"
                >增加</el-button
              >
              <el-button
                v-if="planstatus.fridayStatus == 1"
                type="primary"
                @click="editPlan(5)"
                >查看</el-button
              >
            </td>
            <td>
              <el-button
                v-if="planstatus.saturdayStatus == 0"
                type="success"
                @click="addPlan(6)"
                >增加</el-button
              >
              <el-button
                v-if="planstatus.saturdayStatus == 1"
                type="primary"
                @click="editPlan(6)"
                >查看</el-button
              >
            </td>
            <td>
              <el-button
                v-if="planstatus.sundayStatus == 0"
                type="success"
                @click="addPlan(7)"
                >增加</el-button
              >
              <el-button
                v-if="planstatus.sundayStatus == 1"
                type="primary"
                @click="editPlan(7)"
                >查看</el-button
              >
            </td>
          </tr>
        </tbody>
      </table>
      <el-divider></el-divider>

      <div v-if="showAdd" class="el-card-define">
        <div align="center">
          <h2>{{ this.curplanday }}排班工作</h2>
          <el-switch
            v-model="finished"
            class="ml-2"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="完成"
            inactive-text="未完成"
            @click="submitStatus()"
          />
        </div>
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane
            v-for="d in departments"
            :key="d.departmentId"
            :label="d.departmentName"
            :name="d.departmentName"
          >
            <div v-if="d.departmentName == activeName">
              <table align="center">
                <thead>
                  <tr>
                    <td width="200">医生姓名</td>
                    <td width="200">医生职称</td>
                    <td width="200">出诊类型</td>
                    <td width="200">上午</td>
                    <td width="200">下午</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="doc in doctors" :key="doc.docId">
                    <td v-if="doc.departId1 == d.departmentId">
                      {{ doc.docName }}
                    </td>
                    <td v-if="doc.departId1 == d.departmentId">
                      {{ doc.docTitle }}
                    </td>
                    <td v-if="doc.departId1 == d.departmentId">
                     <el-select v-model="doc.feeId" placeholder="请选择出诊类型" value-key="feeId" @change="getLabel">
                        <el-option
                          v-for="(fee) in fees"
                          :key="fee.feeId"
                          :label="fee.feeName"
                          :value="fee.feeId"
                        >
                        </el-option>
                      </el-select>
                    </td>
                    <td v-if="doc.departId1 == d.departmentId">
                      <el-select v-model="doc.amwork" placeholder="请选择房间">
                        <el-option label="休息" value="0">休息</el-option>
                        <el-option
                          v-for="(room, index) in doc.rooms"
                          :key="index"
                          :label="room.roomName"
                          :value="room.roomName"
                        >
                        </el-option>
                      </el-select>
                    </td>
                    <td v-if="doc.departId1 == d.departmentId">
                      <el-select v-model="doc.pmwork" placeholder="请选择房间">
                       <el-option label="休息" value="0">休息</el-option>
                        <el-option
                          v-for="(room, index) in doc.rooms"
                          :key="index"
                          :label="room.roomName"
                          :value="room.roomName"
                        >
                        </el-option>
                      </el-select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div align="center" style="margin: 30px">
                <el-button
                  type="success"
                  plain
                  v-show="!finished"
                  @click="savePlan(d.departmentId)"
                  >保存</el-button
                >
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script>
import { get, post } from '@/utils/request'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      activeName: '内科',
      finished: false,
      showAdd: false,
      dayList: [],
      base: '',
      today: '',
      nextMonday: '',
      lastsunday: '',
      role: false,
      dialogVisible: false,
      planstatus: {},
      curplanday: '',
      departments: [],
      doctors: [],
      fees: []
    }
  },
  mounted() {
    this.getTime()
    this.getFees()
  },
  methods: {
    getLabel(value) {
    console.log(value);
      let obj = {};
      obj = this.options.find((item)=>{
          return item.value === value;
      });
      console.log(obj.label);
},
    getFees() {
      get('/getDoctorFees').then((res) => {
        this.fees = res.data.data
      })
    },
    check(doctorworks) {
      let amworks = []
      let pmworks = []
      for (var i = 0; i < doctorworks.length; i++) {
        amworks.push(doctorworks[i].amwork)
        pmworks.push(doctorworks[i].pmwork)
      }
      amworks = amworks.sort()
      pmworks = pmworks.sort()
      for (var i = 0; i < amworks.length - 1; i++) {
        if (amworks[i] == amworks[i + 1] && amworks[i] != '0') {
          alert('上午排班地点有冲突')
          return false
        }
      }
      for (var i = 0; i < pmworks.length - 1; i++) {
        if (pmworks[i] == pmworks[i + 1] && pmworks[i] != '0') {
          alert('下午排班地点有冲突')
          return false
        }
      }
      return true
    },
    savePlan(departmentId) {
      var formData = new FormData()
      formData.append('day', this.curplanday)
      formData.append('departmentId', departmentId)
      let doctorworks = []
      if (this.doctors.length > 0) {
        for (var i = 0; i < this.doctors.length; i++) {
          if (departmentId == this.doctors[i].departId1) {
            formData.append(
              'doctorworks[' + i + '].docId',
              this.doctors[i].docId
            )
            formData.append(
              'doctorworks[' + i + '].departId1',
              this.doctors[i].departId1
            )
            formData.append(
              'doctorworks[' + i + '].amwork',
              this.doctors[i].amwork
            )
            formData.append(
              'doctorworks[' + i + '].pmwork',
              this.doctors[i].pmwork
            )
            formData.append(
              'doctorworks[' + i + '].feeId',
              this.doctors[i].feeId
            )
            doctorworks.push(this.doctors[i])
          }
        }
      if (!this.check(doctorworks)) return
      post('/updateDoctorWorks', formData)
        .then((res) => {
          alert('更新成功')
          this.reload()
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },

    getDoctors(day) {
      get('/getDoctorWorks', { day: day })
        .then((res) => {
          this.doctors = res.data.data

          for (var i = 0; i < res.data.data.length + 1; i++) {
            this.doctors[i].rooms = res.data.data[i].rooms;
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },

    submitStatus() {
      get('/updatePlanStatus', {
        day: this.curplanday,
        status: this.finished ? 1 : 0
      })
        .then((res) => {
          ElMessage({
            message: '状态修改成功',
            type: 'success'
          })
          this.$router.go(0)
        })
        .catch((error) => {
          console.log(error)
        })
    },

    addPlan(index) {
      this.showAdd = true
      this.finished = false
      this.curplanday = this.dayList[index - 1]
      this.getDepartments()
      this.getDoctors(this.curplanday)
    },

    editPlan(index) {
      this.showAdd = true
      this.finished = true
      this.curplanday = this.dayList[index - 1]
      this.getDepartments()
      this.getDoctors(this.curplanday)
    },

    startplan() {
      get('/generatePlans', { startDay: this.nextMonday })
        .then((res) => {
          ElMessage({
            message: '生成排班成功',
            type: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDepartments() {
      get('/getDepartsLevel1')
        .then((res) => {
          console.log(res)
          this.departments = res.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    lastweek() {
      this.showAdd = false
      this.dayList = []
      this.getBeforNday(this.base, 7)
      this.getTableData(this.nextMonday)
    },
    nextweek() {
      this.showAdd = false
      this.dayList = []
      this.getBeforNday(this.base, -7)
      this.getTableData(this.nextMonday)
    },
    getTime() {
      var myDate = new Date()
      var str = myDate.getDay()
      console.log(str, 888)
      for (var i = 0; i < 7; i++)
        if (str == i) {
          this.getBeforNday(myDate, str)
        }
    },
    getBeforNday(date, n) {
      var todays = date.getTime()
      var today = new Date()
      this.today = today.setTime(todays)

      var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24
      var yesterday = new Date()

      yesterday.setTime(yesterday_milliseconds)

      var strYear = yesterday.getFullYear()
      var strDay = yesterday.getDate()
      var strMonth = yesterday.getMonth() + 1
      if (strMonth < 10) {
        strMonth = '0' + strMonth
      }
      let datastr = strYear + '年' + strMonth + '月' + strDay + '日'
      let md = strMonth + '-' + strDay
      this.sunday = md
      this.lastsunday = datastr
      this.dateFormat1 = strYear + '-' + strMonth + '-' + strDay
      this.base = yesterday
      for (var i = -1; i > -8; i--) this.getotherday(yesterday, i)
    },
    getotherday(date, n) {
      var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24
      var yesterday = new Date()
      yesterday.setTime(yesterday_milliseconds)

      var strYear = yesterday.getFullYear()
      var strDay = yesterday.getDate()
      var strMonth = yesterday.getMonth() + 1
      if (strMonth < 10) {
        strMonth = '0' + strMonth
      }
      if (strDay < 10) {
        strDay = '0' + strDay
      }
      if (n == -1) {
        this.monday = strMonth + '.' + strDay
        this.monday1 =
          '星期一' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.nextMonday = strYear + '-' + strMonth + '-' + strDay
        this.getTableData(this.nextMonday)
        this.dateFormat2 = strYear + '-' + strMonth + '-' + strDay
        this.dayList.push(this.dateFormat2)
      }
      if (n == -2) {
        this.tuesday = strMonth + '.' + strDay
        this.tuesday1 =
          '星期二' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dateFormat3 = strYear + '-' + strMonth + '-' + strDay
        this.dayList.push(this.dateFormat3)
      }
      if (n == -3) {
        this.wednesday = strMonth + '.' + strDay
        this.wednesday1 =
          '星期三' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dateFormat4 = strYear + '-' + strMonth + '-' + strDay
        this.dayList.push(this.dateFormat4)
      }
      if (n == -4) {
        this.thursday = strMonth + '.' + strDay
        this.thursday1 =
          '星期四' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dateFormat5 = strYear + '-' + strMonth + '-' + strDay
        this.dayList.push(this.dateFormat5)
      }
      if (n == -5) {
        this.friday = strMonth + '.' + strDay
        this.friday1 =
          '星期五' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dateFormat6 = strYear + '-' + strMonth + '-' + strDay
        this.dayList.push(this.dateFormat6)
      }
      if (n == -6) {
        this.saturday = strMonth + '.' + strDay
        this.saturday1 =
          '星期六' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dateFormat7 = strYear + '-' + strMonth + '-' + strDay
        this.dayList.push(this.dateFormat7)
      }
      if (n == -7) {
        this.sunday = strMonth + '.' + strDay
        this.sunday1 =
          '星期天' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.lastsunday = strYear + '年' + strMonth + '月' + strDay + '日'
        this.dateFormat8 = strYear + '-' + strMonth + '-' + strDay
        this.dayList.push(this.dateFormat8)
      }
    },

    getTableData(day) {
      get('/getPlansStatus2', { startDay: day })
        .then((res) => {
          this.planstatus = res.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleSelectionChange(val) {
      this.checkedList = val
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getTableList(this.nextMonday)
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  color: var(--el-text-color-regular);
  font-size: 24px;
  margin: 10px 0;
  text-align: center;
  color: #409eff;
}
.box-card {
}
.box-card1 {
  margin-top: 5px;
}
.el-card-define {
  height: 350px;
  overflow-y: auto;
}
.big {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.ml-2 {
  margin: 10px;
}
</style>