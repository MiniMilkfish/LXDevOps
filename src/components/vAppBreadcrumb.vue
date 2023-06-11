<!-- 路径 面包屑组件 -->
<template>
  <a-breadcrumb v-if="breadShow" style="margin-bottom: 20px">
    <a-breadcrumb-item v-for="(title, index) in breadCrumbs" :key="index">{{
      title
    }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script>
  import { defineComponent } from "vue";
  import FAKE_DATE from "../utils/fakeDate";

  export default defineComponent({
    computed: {
      breadCrumbs: function () {
        let keyPaths = this.$store.state.moduleMasterLeftMenu;
        return keyPaths.menuRoot.concat(keyPaths.menuRootPath);
      },
      breadShow() {
        /**
         * 面包屑显/隐逻辑
         * 1、当前Tab 存在默认显示页时，关闭显示；
         * 2、当前Tab 不存在默认显示页，但是不存在子集时, 关闭显示；
         */
        let _this = this,
          tabPageUrl =
            this.$store.state.moduleMasterHeader
              .currentHeaderTabDashboardPageUrl;

        if (tabPageUrl && tabPageUrl.length > 0) {
          return false;
        } else {
          return FAKE_DATE.routeList.filter(
            item =>
              item.title ===
                _this.$store.state.moduleMasterHeader.currentHeaderTabTag &&
              item.sub.length > 0
          )[0];
        }
      },
    },
  });
</script>
<style></style>
