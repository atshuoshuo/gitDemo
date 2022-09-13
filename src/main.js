import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'//样式文件
import * as ElIconModules from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
 


const app = createApp(App)
for(let iconName in ElIconModules){
    app.component(iconName,ElIconModules[iconName])
}

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (sessionStorage.getItem("token")) {
    config.headers.common['Authorization'] = sessionStorage.getItem("token");
  }
  return config
}, function (error) {
  router.push('/login')
  return Promise.reject(error)
})


app.use(ElementPlus, {
    locale: zhCn,
  })
app.use(store)
app.use(router)
app.use(ElIconModules)

app.mount('#app')


