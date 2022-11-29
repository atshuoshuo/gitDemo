<template>
  <div>{{data}}</div>
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
      data:[]
    }
  },
  mounted() {
    get('/getPatientDoctorByDoctorId', { docId: this.doctor.docId }).then((res) => {
      this.data = res.data.data
      console.log(this.data)
    })
  }
}
</script>

<style>

</style>