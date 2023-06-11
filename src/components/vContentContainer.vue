<!-- 路由容器组件 -->
<script>
  import { defineComponent, h, resolveDynamicComponent } from "vue";

  export default defineComponent({
    render() {
      let fPath =
          this.$store.state.moduleMasterHeader.currentHeaderTabDashboardPageUrl,
        sPath = this.$store.state.moduleMasterLeftMenu.currentMenuPageUrl;

      let path =
        fPath && fPath.length > 0
          ? fPath
          : sPath && sPath.length > 0
          ? sPath
          : "vNotFound";

      try {
        require(`../components/${path}.vue`);
        return h(resolveDynamicComponent(path));
      } catch (error) {
        console.info("vContentContainer 捕获异常: ", String(error));
        return h(resolveDynamicComponent("vNotFound"));
      }
    },
    beforeUpdate() {
      this.$router.replace("/");
    },
  });
</script>
