<template>
  <div class="user-info">
    <i class="el-icon-user-solid"></i>
    <div class="realname">admin</div>
    <el-button type="text" @click="logout">退 出</el-button>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  name: "UserProfile",
  methods: {
    logout() {
      Cookies.remove("TOKEN");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  align-items: center;

  .realname {
    font-size: 16px;
    color: #797979;
    margin: 0 15px 0 8px;
  }

  .el-button {
    font-size: 15px;
  }
}
</style>