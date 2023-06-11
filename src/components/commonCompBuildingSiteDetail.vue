<!-- 通用组件 工地详情 -->
<template>
  <div class="building_site_detail">
    <a-form
      ref="formRef"
      :model="formState"
      layout="horizontal"
      name="form_in_modal"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item name="a" label="工地">
        <a-input-group compact>
          <a-input
            v-model:value="formState.a"
            style="width: 20%"
            placeholder="工地编号"
          />
          <a-input
            addon-before="-"
            v-model:value="formState.b"
            style="width: 50%"
            placeholder="工地名称"
          />
        </a-input-group>
      </a-form-item>
      <a-form-item name="c" label="工作内容" style="width: 100%">
        <a-select
          ref="select"
          v-model:value="formState.c"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option :value="1">安装</a-select-option>
          <a-select-option :value="2">拆除</a-select-option>
          <a-select-option :value="2">移机</a-select-option>
          <a-select-option :value="2">巡检</a-select-option>
          <a-select-option :value="2">升级</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="d" label="运维状态" style="width: 100%">
        <a-select
          ref="select"
          v-model:value="formState.d"
          @focus="focus"
          @change="handleChange"
        >
          <a-select-option :value="1">已完成</a-select-option>
          <a-select-option :value="2">未完成</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item name="e" label="备注">
        <a-textarea
          v-model:value="formState.e"
          placeholder="请填写备注说明"
          auto-size
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item name="f" label="文件上传">
        <a-upload
          v-model:file-list="fileList"
          name="file"
          list-type="picture-card"
          class="avatar-uploader"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :headers="headers"
          @change="handleChange"
        >
          <div>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  import { defineComponent, reactive, ref } from "vue";
  import { PlusOutlined, LoadingOutlined } from "@ant-design/icons-vue";
  // import { notification } from "ant-design-vue";
  // import CONSTANT_DATA from "../utils/contantData";

  export default defineComponent({
    name: "commonCompBuildingSiteDetail",
    props: {
      title: {
        type: String,
        required: true,
      },
    },
    components: {
      PlusOutlined,
      LoadingOutlined,
    },
    data() {
      return {};
    },
    setup() {
      const formRef = ref();
      const fileList = ref([]);
      const formState = reactive({
        a: [],
        b: "",
        c: "安装",
        d: "已完成",
        e: "",
        f: "",
        g: "",
        h: "",
        i: "",
        modifier: "public",
      });

      const handleChange = value => {
        console.log(`selected ${value}`);
      };

      const focus = () => {
        console.log("focus");
      };

      return {
        formState,
        formRef,
        fileList,
        labelCol: { style: { width: "120px" } },
        wrapperCol: { span: 24 },
        headers: {
          authorization: "authorization-text",
        },
        handleChange,
        focus,
      };
    },
  });
</script>
<style>
  .building_site_detail {
    background: #fafafa;
    padding: 10px;
  }
</style>
