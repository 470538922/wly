import {
    Button, Select, Message, Row, Col, Form, FormItem, Upload, Input, InputNumber, Tooltip, Dialog, Table, TableColumn, Option
} from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
export default Vue => {
    Vue.component(Button.name, Button)
    Vue.component(Select.name, Select)
    Vue.component(Message.name, Message)
    Vue.component(Row.name, Row)
    Vue.component(Col.name, Col)
    Vue.component(Form.name, Form)
    Vue.component(FormItem.name, FormItem)
    Vue.component(Upload.name, Upload)
    Vue.component(Input.name, Input)
    Vue.component(InputNumber.name, InputNumber)
    Vue.component(Tooltip.name, Tooltip)
    Vue.component(Dialog.name, Dialog)
    Vue.component(Table.name, Table)
    Vue.component(TableColumn.name, TableColumn)
    Vue.component(Option.name, Option)
}