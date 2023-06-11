<template>
  <a-spin :spinning="spinningShow" size="large" id="global-spin">
    <a-config-provider :locale="zhCN">
      <a-layout id="components_container" v-if="verified">
        <a-layout-header class="header">
          <vAppHeader />
        </a-layout-header>
        <a-layout>
          <a-layout-sider
            width="256"
            style="background: #ffffff"
            v-if="leftMenuShow"
          >
            <vAppLeftMenu />
          </a-layout-sider>
          <a-layout style="padding: 12px 24px">
            <vAppBreadCrumb />
            <a-layout-content
              :style="{
                margin: '12px 0 0',
                minHeight: '280px',
                height: contentHeight + 'px',
              }"
            >
              <router-view></router-view>
            </a-layout-content>
          </a-layout>
        </a-layout>
      </a-layout>
      <a-layout v-else>
        <vLogin />
      </a-layout>
      <commonCompNotification
        :message="notificationShow.message"
        :description="notificationShow.description"
        :type="notificationShow.type"
        :tick="notificationShow.tick"
      />
    </a-config-provider>
  </a-spin>
</template>

<script>
  import vLogin from "./components/vLogin.vue";
  import vAppHeader from "./components/vAppHeader.vue";
  import vAppLeftMenu from "./components/vAppLeftMenu.vue";
  import vAppBreadCrumb from "./components/vAppBreadcrumb.vue";
  import FAKE_DATE from "./utils/fakeDate";
  import ACTION_TYPES from "./store/constantActionTypes";
  import zhCN from "ant-design-vue/es/locale/zh_CN";
  import commonCompNotification from "../src/components/commonCompNotification.vue";

  export default {
    name: "App",
    data() {
      return {
        zhCN,
      };
    },
    components: {
      vLogin,
      vAppHeader,
      vAppLeftMenu,
      vAppBreadCrumb,
      commonCompNotification,
    },
    methods: {
      windowOnResize() {
        const w = window,
          d = document,
          documentElement = d.documentElement,
          body = d.getElementsByTagName("body")[0],
          width =
            w.innerWidth || documentElement.clientWidth || body.clientWidth,
          height =
            w.innerHeight || documentElement.clientHeight || body.clientHeight;

        this.$store.commit(ACTION_TYPES.WINDOWS_ON_RESIZE, {
          width,
          height,
          currentHeaderTabTag:
            this.$store.state.moduleMasterHeader.currentHeaderTabTag,
          menuRootPathL:
            this.$store.state.moduleMasterLeftMenu.menuRootPath.length,
        });
      },
    },
    computed: {
      verified() {
        return this.$store.state.moduleLogin.AuthInfo.validated;
      },
      contentHeight() {
        return this.$store.state.moduleLogin.LoginFormDimensions
          .pageContentHeight;
      },
      leftMenuShow() {
        return FAKE_DATE.routeList.filter(
          item =>
            item.title ===
              this.$store.state.moduleMasterHeader.currentHeaderTabTag &&
            item.sub.length > 0
        )[0];
      },
      notificationShow() {
        return this.$store.state.moduleGlobal.notification;
      },
      spinningShow() {
        return this.$store.state.moduleGlobal.spinning;
      },
    },
    mounted() {
      let _this = this;
      _this.windowOnResize();

      this.$nextTick(function () {
        window.onresize = function () {
          _this.windowOnResize();
        };
      });
    },
    created() {
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store,
            JSON.parse(sessionStorage.getItem("store"))
          )
        );
      }

      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state));
      });
    },
  };
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0px;
    padding: 0px;
    height: 100%;
    width: 100%;
    font-family: "pf";
  }

  #app > :first-child {
    height: 100%;
  }

  .header {
    display: flex;
  }

  #global-spin {
    max-height: none;
  }
</style>
