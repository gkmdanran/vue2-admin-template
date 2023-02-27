<template>
  <el-menu
    class="ez-menu"
    ref="ezMenu"
    v-bind="$attrs"
    v-on="$listeners"
    :default-active="active"
  >
    <menu-tree
      parentPath=""
      v-for="(item, index) in menuJson.menus"
      :tree-props="menuJson.treeProps"
      :key="index"
      :menu="item"
      @clickMenuItem="$emit('clickMenuItem', $event)"
    ></menu-tree>
  </el-menu>
</template>

<script>
import menuTree from "./menuTree.vue";
export default {
  name: "ezMenu",
  props: {
    menuJson: {
      type: Object,
      required: true,
    },
  },
  components: {
    menuTree,
  },
  data() {
    return {};
  },
  computed: {
    active() {
      return this.$route.path;
    },
  },
  methods: {
    open(index) {
      this.$refs.ezMenu.open(index);
    },
    close(index) {
      this.$refs.ezMenu.close(index);
    },
  },
};
</script>
<style scoped>
.ez-menu {
  overflow-x: hidden;
}
.el-menu {
  border-right: none;
}
</style>