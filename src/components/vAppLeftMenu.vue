<!-- 左侧菜单栏组件 -->
<template #icon>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    :open-keys="openKeys"
    @click="onRootItemClick"
  >
    <a-sub-menu v-for="menuItem in matchedMenulist" :key="menuItem.title">
      <template #icon><SettingOutlined /></template>
      <!-- 第一层 -->
      <template #title>{{ menuItem.title }}</template>
      <div
        v-for="subMenuItem in menuItem.sub"
        :key="subMenuItem.title + '_' + subMenuItem.url"
      >
        <div v-if="subMenuItem.sub.length > 0">
          <a-sub-menu :key="subMenuItem.title" :title="subMenuItem.title">
            <a-menu-item
              v-for="sItem in subMenuItem.sub"
              :key="sItem.title + '_' + sItem.url"
            >
              <!-- 第三层 -->
              {{ sItem.title }}
            </a-menu-item>
          </a-sub-menu>
        </div>
        <div v-else>
          <a-menu-item :key="subMenuItem.title + '_' + subMenuItem.url">
            <!-- 第二层 -->
            {{ subMenuItem.title }}
          </a-menu-item>
        </div>
      </div>
    </a-sub-menu>
  </a-menu>
</template>
<script>
  import { defineComponent } from "vue";
  import { SettingOutlined } from "@ant-design/icons-vue";
  import FAKE_DATE from "../utils/fakeDate";
  import ACTION_TYPES from "../store/constantActionTypes";

  export default defineComponent({
    data() {
      let rootSubmenuKeys = [],
        openKeys = [],
        selectedKeys = [];

      if (
        this.$store.state.moduleMasterLeftMenu.menuRootPath &&
        this.$store.state.moduleMasterLeftMenu.menuRootPath.length > 0
      ) {
        openKeys = [].concat(
          this.$store.state.moduleMasterLeftMenu.menuRootPath.slice(-1)
        );

        selectedKeys = [].concat(
          `${this.$store.state.moduleMasterLeftMenu.menuRootPath.slice(-1)}_${
            this.$store.state.moduleMasterLeftMenu.currentMenuPageUrl
          }`
        );
      }

      return {
        rootSubmenuKeys,
        openKeys, // 当前展开的 SubMenu 菜单项 key 数组
        selectedKeys, // 当前选中的菜单项 key 数组
      };
    },
    created() {
      let rootSubmenuKeys = this.handleRootSubmenuKeys(
        FAKE_DATE.routeList.slice(1),
        []
      );
      this.rootSubmenuKeys = rootSubmenuKeys;
    },
    components: {
      SettingOutlined,
    },
    watch: {
      getCurrentMenuRootPath(e) {
        this.openKeys = e.openKeys;
        this.selectedKeys = e.selectedKeys;
      },
    },
    methods: {
      onRootItemClick(e) {
        this.$store.commit(ACTION_TYPES.MASTER_LEFT_MENU_ITEM_ON_CLICK, {
          key: e.key,
          keyPath: e.keyPath,
          rootKey: [this.$store.state.moduleMasterHeader.currentHeaderTabTag],
        });

        this.$store.commit(ACTION_TYPES.CLEAR_CURRENT_HEADER_TAB_PAGE_URL);
      },
      handleRootSubmenuKeys(items, keys) {
        if (!items.sub) {
          for (let index = 0; index < items.length; index++) {
            const menuItem = items[index];
            this.handleRootSubmenuKeys(menuItem, keys);
          }
        } else {
          if (items.sub && items.sub.length > 0) {
            keys.push(items.title);
            this.handleRootSubmenuKeys(items.sub, keys);
          } else {
            keys.push(items.title);
          }
        }
        return keys;
      },
    },
    computed: {
      matchedMenulist() {
        let currentHeaderTabTag =
          this.$store.state.moduleMasterHeader.currentHeaderTabTag;

        let matchedMenu = FAKE_DATE.routeList.slice(1).filter(function (item) {
          return currentHeaderTabTag === item.title;
        });

        if (matchedMenu && matchedMenu.length > 0) {
          return matchedMenu[0].sub;
        } else {
          return [];
        }
      },
      getCurrentMenuRootPath() {
        let openKeys = [],
          selectedKeys = [];

        if (
          this.$store.state.moduleMasterLeftMenu.menuRootPath &&
          this.$store.state.moduleMasterLeftMenu.menuRootPath.length > 0
        ) {
          openKeys = [].concat(
            this.$store.state.moduleMasterLeftMenu.menuRootPath
          );

          selectedKeys = [].concat(
            `${this.$store.state.moduleMasterLeftMenu.menuRootPath.slice(-1)}_${
              this.$store.state.moduleMasterLeftMenu.currentMenuPageUrl
            }`
          );
        }

        return {
          openKeys,
          selectedKeys,
        };
      },
    },
  });
</script>
