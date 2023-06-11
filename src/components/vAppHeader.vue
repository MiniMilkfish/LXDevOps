<!-- 头部组件 -->
<template>
  <div class="logo"><s></s>上海龙象环保扬尘监测平台</div>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    theme="dark"
    mode="horizontal"
    :style="{ lineHeight: '64px', flex: 'auto' }"
    @click="headerTabClick"
  >
    <a-menu-item v-for="item in menuItems" :key="item.join('_')">{{
      item[0]
    }}</a-menu-item>
  </a-menu>
  <div class="heder_control">
    <div class="control_message">
      <MailOutlined
        style="font-size: 24px; margin-right: 24px; color: #ffffff"
      />
    </div>
    <div class="control_avatar">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          <a-avatar
            style="background-color: #87d068; margin-right: 5px"
            size="small"
          >
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <span style="margin: auto 10px;">{{ userName }}</span>
          <CaretDownOutlined />
        </a>
        <template #overlay>
          <a-menu style="width: 150px; margin-top: 15px">
            <a-menu-item key="0"><UserOutlined/> &nbsp;用户中心</a-menu-item>
            <a-menu-item key="1"><SettingOutlined/> &nbsp;系统设置</a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" @click="goBackLogin"><LogoutOutlined/> &nbsp;退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
<script>
  import { defineComponent } from "vue";
  import FAKE_DATE from "../utils/fakeDate";
  import ACTION_TYPES from "../store/constantActionTypes";
  import {
    CaretDownOutlined,
    UserOutlined,
    MailOutlined,
    LogoutOutlined,
    SettingOutlined,
  } from "@ant-design/icons-vue";

  export default defineComponent({
    data() {
      return {
        selectedKeys: [
          `${this.$store.state.moduleMasterHeader.currentHeaderTabTag}_${this.$store.state.moduleMasterHeader.currentHeaderTabDashboardPageUrl}`,
        ],
        userName: this.$store.state.moduleLogin.AuthInfo.authName,
      };
    },
    components: {
      CaretDownOutlined,
      UserOutlined,
      MailOutlined,
      LogoutOutlined,
      SettingOutlined,
    },
    computed: {
      menuItems() {
        return Object.values(FAKE_DATE.routeList).map(function (item) {
          return [item.title, item.url];
        });
      },
      getCurrentHeaderTabTag() {
        return [
          `${this.$store.state.moduleMasterHeader.currentHeaderTabTag}_${this.$store.state.moduleMasterHeader.currentHeaderTabDashboardPageUrl}`,
        ];
      },
    },
    watch: {
      getCurrentHeaderTabTag(newValue) {
        this.selectedKeys = newValue;
      },
    },
    methods: {
      headerTabClick({ key }) {
        let splitWords = key.split("_");
        this.$store.commit(ACTION_TYPES.MASTER_HEADER_TAB_ON_CLICK, {
          key: splitWords[0],
          url: splitWords[1] || "",
        });

        if (splitWords[1] && splitWords[1].length > 0) {
          this.$store.commit(ACTION_TYPES.CLEAR_CURRENT_MENU_PAGE_URL);
        }
      },
      goBackLogin() {
        this.$store.commit(ACTION_TYPES.MASTER_EXIST_PLATFORM);
        sessionStorage.removeItem("store");
      },
    },
  });
</script>
<style>
  #components_container .logo {
    line-height: 64px;
    float: left;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    padding: 0;
    margin: 0 50px 0 0;
    display: flex;
  }

  #components_container .logo s {
    display: block;
    background: url(../assets/img/logo.png) center center no-repeat;
    background-position: top left;
    background-size: cover;
    width: 54px;
    height: 54px;
    margin: auto 10px auto 0;
  }

  .heder_control {
    display: flex;
  }

  .control_message {
    line-height: 75px;
  }

  .control_avatar {
    padding: 0 10px;
  }
</style>
