<!-- 500 组件 -->
<template>
  <a-result status="500" title="500" sub-title="当前页面出现重大错误，赶紧联系开发大大修复一下吧 orz">
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
