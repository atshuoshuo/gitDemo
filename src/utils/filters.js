const dayjs = require('dayjs')

const filetrTimes = (val,fromat='YYYY-MM-DD')=>{
    if(!isNull(val)){
        val
    }
}
export const isNull = (data)=>{
   if(!data) return true
   if(JSON.stringify(data)==='{}') return true
   if(JSON.stringify(data)==='[]') return true
}