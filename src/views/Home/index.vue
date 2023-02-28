<template>
  <el-container class="outside">
    <el-header v-if="withHeader" style="height: 40px">
      <div class="header_right" @click="$router.push('/home')">
        <img src="@/assets/img/logo.png" />
        <div class="title">管理后台</div>
      </div>
      <UserProfile></UserProfile>
    </el-header>
    <el-container
      :style="{ height: withHeader ? 'calc(100% - 40px)' : '100%' }"
    >
      <el-aside v-if="withSidebar" style="width: 200px">
        <Sidebar style="height: 100%" />
      </el-aside>
      <el-main style="padding: 0" v-if="$route.meta.paddingPanel === false">
        <div class="pannel">
          <router-view></router-view>
        </div>
      </el-main>

      <el-main v-else>
        <div class="pannel padding-panel">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from "@/components/Sidebar/index.vue";
import UserProfile from "@/components/UserProfile/index.vue";
export default {
  name: "Home",
  components: { Sidebar, UserProfile },
  data() {
    return {};
  },
  computed: {
    withHeader() {
      return this.$route.meta.withHeader === false ? false : true;
    },
    withSidebar() {
      return this.$route.meta.withSidebar === false ? false : true;
    },
  },
  methods: {},
};
</script>
<style scoped lang="less">
.outside {
  height: 100%;

  .el-header {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header_right {
      cursor: pointer;
      display: flex;
      align-items: center;
      height: 100%;

      img {
        width: 180px;
        height: 100%;
      }

      .title {
        margin-left: 10px;
        font-weight: 700;
        font-size: 18px;
      }
    }
  }

  .el-main {
    background-color: #f7fafc;
  }

  .el-aside {
    height: 100%;
  }

  .pannel {
    height: 100%;
  }

  .padding-panel {
    padding: 15px;
    background-color: #fff;
  }
}
</style>
  
  
  