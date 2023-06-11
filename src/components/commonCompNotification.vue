<!-- 全局通知组件 -->
<template>
  <div></div>
</template>
<script>
  import { defineComponent } from "vue";
  import { notification } from "ant-design-vue";
  import CONSTANT_DATA from "../utils/constantData";

  export default defineComponent({
    name: "commonCompNotification",
    props: {
      message: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      type: {
        validator(value) {
          return Object.values(CONSTANT_DATA.NOTIFICATION_TYPES).includes(
            value
          );
        },
      },
      duration: { type: Number },
      tick: { required: true },
    },
    data() {
      return {
        triger: this.$props.tick || Math.random(),
      };
    },
    beforeUpdate() {
      if (
        this.$props.tick &&
        this.$props.tick !== void 0 &&
        this.triger !== this.$props.tick
      ) {
        notification[this.type || CONSTANT_DATA.NOTIFICATION_TYPES.INFO]({
          message: this.message || CONSTANT_DATA.NOTIFICATION_TYPES.INFO,
          description: this.description || "This is the default explanation",
          duration: this.duration | 3,
        });
      }
      return true;
    },
  });
</script>
