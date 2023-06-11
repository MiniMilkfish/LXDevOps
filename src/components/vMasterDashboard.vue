<!-- 首页组件 -->
<template>
  <div id="dashboard_container">
    <div class="left_panel">
      <div id="components-grid-demo-playground">
        <a-row :gutter="[32, 32]">
          <a-col class="col_part" :span="6"
            ><div><h1>库存汇总</h1></div></a-col
          >
          <a-col class="col_part" :span="6"
            ><div><h1>销售计划</h1></div></a-col
          >
          <a-col class="col_part" :span="6"
            ><div><h1>商务</h1></div></a-col
          >
        </a-row>

        <a-row :gutter="[32, 32]">
          <a-col class="col_part" :span="6"
            ><div><h1>生产部</h1></div></a-col
          >
          <a-col class="col_part" :span="6"
            ><div><h1>运维部</h1></div></a-col
          >
        </a-row>
      </div>
    </div>
    <div class="right_panel">消息公示</div>
  </div>
</template>

<script>
  import { defineComponent } from "vue";
  export default defineComponent({
    name: "vMasterDashboard",
  });
</script>

<style scoped>
  #dashboard_container {
    display: flex;
    flex-flow: row;
  }
  #components-grid-demo-playground :deep(.ant-col) {
    background: transparent;
    border: 0;
  }
  #components-grid-demo-playground :deep(.ant-col) > div {
    background: #c2c2c2;
    height: 320px;
    width: 300px;
    line-height: 120px;
    font-size: 13px;
    margin: 20px 80px;
    text-align: center;
  }

  .right_panel {
    background: #c2c2c2;
    width: 200px;
    text-align: center;
    padding: 60px 0;
  }
</style>
