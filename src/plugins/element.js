import { ElButton} from 'element-plus'
import { ElForm,ElFormItem} from 'element-plus'
import { ElInput} from 'element-plus'

export default (app)=>{
    app.user(ElButton)
    app.user(ElForm)
    app.user(ElFormItem)
    app.user(ElInput)
}