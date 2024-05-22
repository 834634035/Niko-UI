import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import Icon from "@niko/components/icon";
import "@niko/theme-chalk/src/index.scss";
import Tree from "@niko/components/tree/index";
import Checkbox from "@niko/components/checkbox/index";
import Button from "@niko/components/button/index";
import Input from "@niko/components/input/index";
import { FormItem, Form } from "@niko/components/form/index";
import Upload from "@niko/components/upload/index";
import Calemdar from "@niko/components/calendar/index";
import Modal from "@niko/components/modal/index";
import Row from "@niko/components/row/index";
import Col from "@niko/components/col/index";
import Link from "@niko/components/link/index";
import Scrollbar from "@niko/components/scrollbar/index";

const app = createApp(App);
const plugins = [
  Icon,
  Tree,
  Checkbox,
  Button,
  Input,
  FormItem,
  Form,
  Upload,
  Calemdar,
  Modal,
  Row,
  Col,
  Link,
  Scrollbar
];
plugins.forEach((plugin) => {
  app.use(plugin); // 把组件注册成全局组件，可以直接使用
});
app.mount("#app");
