import { createApp } from 'vue';
import 'ant-design-vue/dist/antd.css';
import './assets/fonts/font.css';
import './assets/css/mine.css';

import {
  Layout,
  Menu,
  Breadcrumb,
  Input,
  Form,
  Checkbox,
  Button,
  Spin,
  Dropdown,
  Avatar,
  Badge,
  Result,
  Row,
  Col,
  PageHeader,
  Descriptions,
  Table,
  Space,
  ConfigProvider,
  Modal,
  Textarea,
  Radio,
  RangePicker,
  DatePicker,
  Select,
  Upload,
  UploadDragger,
  InputNumber,
  InputSearch,
  Collapse,
  CollapsePanel,
  InputGroup,
  Image,
  Popconfirm,
  Tooltip,
  Divider
} from 'ant-design-vue';
import App from './App.vue';
import router from './route/index';
import store from './store/index';

/**
 * 引入自定义组件
 */
import vMasterDashboard from "./components/vMasterDashboard.vue";
import vNotFound from "./components/vNotFound.vue";
import vInternalError from "./components/vInternalError.vue";

/**
 * Avoid async-validator global warning
 */
import Schema from 'async-validator';
Schema.warning = function(){};

const app = createApp(App);

/**
 * 路由引用
 */
app.use(router);

/**
 * 状态管理引用
 */
app.use(store);

/**
 * ant-design-vue 组件引用
 */
app.use(Layout)
  .use(Menu)
  .use(Breadcrumb)
  .use(Input)
  .use(Form)
  .use(Checkbox)
  .use(Spin)
  .use(Dropdown)
  .use(Avatar)
  .use(Badge)
  .use(Result)
  .use(Row)
  .use(Col)
  .use(Button)
  .use(PageHeader)
  .use(Descriptions)
  .use(Table)
  .use(Space)
  .use(ConfigProvider)
  .use(Modal)
  .use(Textarea)
  .use(Radio)
  .use(RangePicker)
  .use(Select)
  .use(DatePicker)
  .use(Upload)
  .use(UploadDragger)
  .use(InputNumber)
  .use(InputSearch)
  .use(Collapse)
  .use(CollapsePanel)
  .use(InputGroup)
  .use(Image)
  .use(Popconfirm)
  .use(Tooltip)
  .use(Divider);

/**
 * 注册自定义组件
 */
app.component('vMasterDashboard', vMasterDashboard);
app.component('vNotFound', vNotFound);
app.component('vInternalError', vInternalError);

/**
 * 应用挂载
 */
app.mount('#app');