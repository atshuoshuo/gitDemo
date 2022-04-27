<template>
  <div class="da">
    <el-card class="box-card">
      <div class="search">
        <div class="title">
          <span>{{ nextMonday }}</span>
          <span>星期一</span>
          <span>~</span>
          <span>{{ lastsunday }}</span>
          <span>星期天</span>
        </div>
        <el-button type="primary" @click="lastweek">上一周</el-button>
        <el-button type="primary" @click="nextweek">下一周</el-button>
      </div>
      </el-card>
      <el-card class="box-card1">
      <div v-for="(d, i) in departments" :key="i" v-show="d.departmentName">
        <el-divider>
          <el-icon><star-filled /></el-icon>
        </el-divider>
        <el-button type="info" plain>=={{ d.departmentName }}==</el-button>
        
        <table
          border="0"
          cellspacing="1px"
          bordercolor="#254389"
          cellpadding="0"
          style="border-collapse: collapse"
        >
          <thead>
            <tr height="50">
              <td width="100" rowspan="2">医生姓名</td>
              <td
                width="180"
                colspan="2"
                v-for="(day, index) in dayList"
                :key="index"
              >
                {{ day }}
              </td>
            </tr>
            
            <tr  height="30" class="hang" >
              <td v-for="(i, index) in 14" :key="index" >
                <span v-if="index % 2 == 0" >上午</span>
                <span v-if="index % 2 == 1">下午</span>
              </td>
            </tr>
            
          </thead>
          <tbody>
            <tr v-for="(p, index) in plans" :key="index">
              <td v-if="p.departId1 == d.departmentId">{{ p.docName }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[0] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[1] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[2] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[3] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[4] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[5] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[6] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[7] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[8] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[9] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[10] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[11] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[12] }}</td>
              <td v-if="p.departId1 == d.departmentId">{{ p.weekplan[13] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { get } from '@/utils/request'
import { ElMessage } from 'element-plus'
export default {
  data() {
    return {
      base: '',
      nextMonday: '',
      lastsunday: '',
      dayList: [], //存放当前周的信息
      weekList: [],
      plans: [], //存放所有排班计划
      departments: []
    }
  },
  mounted() {
    this.getTime()
    this.getDepartments()
    this.getDoctors()
  },
  methods: {
    getDepartments() {
      get('/getDepartsLevel1')
        .then((res) => {
          this.departments = res.data.data
          console.log(this.departments)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getDoctors() {
      get('/getDoctors', {})
        .then((res) => {
          this.plans = res.data.data
          this.getList(this.weekList)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getList(weekList) {
      var weeks = ''
      for (var w = 0; w < weekList.length; w++) {
        weeks += "'" + weekList[w] + "'"
        if (w != weekList.length - 1) weeks += ','
      }
      get('/getPlansByWeek', { week: weeks })
        .then((res) => {
          let result = res.data.data
          console.log(result)

          for (var j = 0; j < this.plans.length; j++) {
            let weekplan = []
            for (var i = 0; i < result.length; i++) {
              if (result[i].docId == this.plans[j].docId) {
                weekplan[2 * result[i].weekday - 2] = result[i].amwork
                weekplan[2 * result[i].weekday - 1] = result[i].pmwork
              }
            }
            this.plans[j].weekplan = weekplan
          }
          console.log(this.plans)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getTime() {
      var myDate = new Date()
      var str = myDate.getDay()
      for (var i = 0; i < 7; i++)
        if (str == i) {
          this.getBeforNday(myDate, str)
        }
    },
    lastweek() {
      this.dayList = []
      this.getBeforNday(this.base, 7)
      this.getDoctors()
    },
    nextweek() {
      this.dayList = []
      this.getBeforNday(this.base, -7)
      this.getDoctors()
    },
    getBeforNday(date, n) {
      var yesterday_milliseconds = date.getTime() - n * 1000 * 60 * 60 * 24
      var yesterday = new Date()
      yesterday.setTime(yesterday_milliseconds)
      var strYear = yesterday.getFullYear()
      var strDay = yesterday.getDate()
      var strMonth = yesterday.getMonth() + 1
      if (strMonth < 10) {
        strMonth = '0' + strMonth
      }
      this.lastsunday = strYear + '年' + strMonth + '月' + strDay + '日'
      this.base = yesterday
      this.weekList = []
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
        this.monday1 =
          '星期一' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.nextMonday = strYear + '-' + strMonth + '-' + strDay
        this.dayList.push(this.monday1)
      }
      if (n == -2) {
        this.tuesday1 =
          '星期二' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dayList.push(this.tuesday1)
      }
      if (n == -3) {
        this.wednesday1 =
          '星期三' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dayList.push(this.wednesday1)
      }
      if (n == -4) {
        this.thursday1 =
          '星期四' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dayList.push(this.thursday1)
      }
      if (n == -5) {
        this.friday1 =
          '星期五' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dayList.push(this.friday1)
      }
      if (n == -6) {
        this.saturday1 =
          '星期六' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.dayList.push(this.saturday1)
      }
      if (n == -7) {
        this.sunday1 =
          '星期天' + '(' + strYear + ' / ' + strMonth + ' / ' + strDay + ')'
        this.lastsunday = strYear + '年' + strMonth + '月' + strDay + '日'
        this.dayList.push(this.sunday1)
      }

      this.weekList.push(strYear + '-' + strMonth + '-' + strDay)
    }
  }
}
</script>

<style scoped>
.box-card1{
 height: 550px;
  overflow-y:auto
}
.title {
  color: var(--el-text-color-regular);
  font-size: 24px;
  margin: 10px 0;
  text-align: center;
  color: #409eff;
}
.da{
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
}
.hang{
  
}
</style>
