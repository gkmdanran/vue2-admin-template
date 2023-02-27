<template>
  <div class="home">
    <ez-menu
      :menu-json="{ menus: menu, treeProps: { name: 'description' } }"
      active-text-color="#fff"
      background-color="#13113a"
      text-color="#fff"
      @clickMenuItem="clickMenuItem"
    >
    </ez-menu>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      menu: [
        {
          icon: "el-icon-delete-solid",
          description: "测试页面",
          path: "/demo",
          id: 1,
          children: [
            {
              icon: "el-icon-delete-solid",
              description: "测试页面",
              path: "/demo",
              id: 1,
            },
          ],
        },
      ],
    };
  },
  methods: {
    clickMenuItem(a) {
      console.log(a);
    },
  },
};
</script>
