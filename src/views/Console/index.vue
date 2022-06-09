<template>
  <el-card>
    <el-button type="success" @click="add()">添加公告</el-button>
    <el-table :data="types" stripe style="width: 100%">
      <el-table-column label="所有公告">
        <el-table-column prop="title" label="标题" width="420" />
        <el-table-column prop="content" label="内容" width="200">
          <template #default="row">
            <el-button type="primary" @click="view(row.row.content)"
              >查看内容</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="是否推荐" width="150">
        <template #default="row">
          <el-switch v-model="row.row.recommend" class="mt-2"  @click="tuijina(row)"/>
        </template>
      </el-table-column>
        <el-table-column prop="day" label="发布日期" width="150" />
        <el-table-column fixed="right" label="操作" width="520">
          <template #default="row">
            <el-button type="success" @click="handleDiaClick(row)">
              更多编辑
            </el-button>
            <!-- 删除确认框 -->
            <el-popconfirm title="确定要删除吗?" @confirm="deleks(row)">
              <template #reference>
                <el-button type="danger">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <!-- 添加 -->
    <el-dialog v-model="dialogVisible" title="添加公告" width="60%">
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="内容">
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 500px; overflow-y: hidden"
              v-model="valueHtml"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save" v-model="dialogVisible1"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog v-model="dialogVisible2" title="公告编辑" width="60%">
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="Edit.title" />
        </el-form-item>
        <el-form-item label="内容">
          <div style="border: 1px solid #ccc">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 500px; overflow-y: hidden"
              v-model="Edit.content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2=false">取消</el-button>
          <el-button
            type="primary"
            @click="update()"
            v-model="dialogVisible2"
            >确认</el-button
          >
        </span>
      </template>
    </el-dialog>
  </el-card>

  <el-dialog v-model="dialogVisible1" title="添加公告" width="60%">
    <el-card>
      <div v-html="content"></div>
    </el-card>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { get } from '@/utils/request'
export default {
  inject: ['reload'],
  data() {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      form: [],
      types: [],
      content: '',
      Edit: []
    }
  },
  components: { Editor, Toolbar },
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('')

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = ''
      }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    }
  },
  methods: {
    add() {
      this.dialogVisible = true
    },
    save() {
      this.dialogVisible = false
      this.form.content = this.valueHtml
      console.log(this.form)
      get('/addNotice', {
        content: this.form.content,
        title: this.form.name
      })
        .then(() => {
          ElMessage({
            message: '修改成功！',
            type: 'success'
          })
        })
        .catch(() => {
          ElMessage.error('请勿提交空白表单！')
        })
    },
    view(content) {
      this.content = content
      this.dialogVisible1 = true
    },
    deleks(row) {
      console.log(row.row.docId)

      get('/deleteNotice', {
        id: row.row.id
      })
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      window.location.reload()
    },
    handleDiaClick(row) {
      this.dialogVisible2 = !this.dialogVisible2
      this.Edit = row.row
      console.log(this.Edit)
    },
    update() {
      this.dialogVisible2 = !this.dialogVisible2
      //修改医生
      get('/updateNotice', {
        id: this.Edit.id,
        content: this.Edit.content,
        day: this.Edit.day,
        title: this.Edit.title,
      })
      ElMessage({
        message: '修改成功',
        type: 'success'
      })
    }
  },
  mounted() {
    get('/getNotice').then((res) => {
      this.types = res.data.data
      console.log(this.types)
    })
  }
}
</script>

<style lang="scss" scoped></style>
