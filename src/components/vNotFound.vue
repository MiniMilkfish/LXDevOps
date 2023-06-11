<!-- 404 组件 -->
<template>
  <a-result
    status="404"
    title="404"
    sub-title="将要预览的功能开发中, 如果紧急就去催一下开发大大吧~."
  >
    <template #extra>
      <a-button type="primary" @click="backToHome">返回主页</a-button>
    </template>
  </a-result>
</template>
<script>
  import { defineComponent } from "vue";
  import ACTION_TYPES from "../store/constantActionTypes";

  export default defineComponent({
    methods: {
      backToHome() {
        this.$store.commit(ACTION_TYPES.MASTER_GO_BACK_HOME);
      },
    },
  });
</script>
<style></style>
