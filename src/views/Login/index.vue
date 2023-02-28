<template>
  <div class="login-page">
    <div class="contents">
      <div class="left">
        <div class="title">后台管理系统</div>
      </div>
      <div class="right">
        <div class="login_infos">
          <div class="welcome">欢迎登录</div>
          <div class="names">后台管理系统</div>
          <div class="form-item">
            <i class="el-icon-user-solid icon"></i>
            <el-input
              v-model.trim="loginForm.username"
              placeholder="请输入用户名"
            ></el-input>
          </div>
          <div class="form-item">
            <i class="el-icon-lock icon"></i>
            <el-input
              type="password"
              show-password
              v-model.trim="loginForm.password"
              placeholder="请输入密码"
              @keyup.enter="loginSystem()"
            ></el-input>
          </div>
          <el-button style="width: 100%" type="primary" @click="loginSystem()"
            >登 录</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import Cookies from "js-cookie";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    loginSystem() {
      if (!this.loginForm.username || !this.loginForm.password) return;
      console.log(this.loginForm);
      const inFifteenMinutes = new Date(
        new Date().getTime() + 6 * 60 * 60 * 1000
      );
      Cookies.set("TOKEN", "testtoken", {
        expires: inFifteenMinutes,
      });
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: relative;
  background-image: url(../../assets/img/bgc.jpg);

  .contents {
    position: absolute;
    width: 900px;
    height: 350px;
    overflow: hidden;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 12px 6px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    display: flex;

    .left {
      flex: 6;
      height: 100%;
      background: rgba(0, 0, 0, 0.1);
      padding: 30px;

      .title {
        font-size: 28px;
        font-weight: 700;
        letter-spacing: 1px;
        color: #ffffff;
        margin-bottom: 15px;
      }
    }

    .right {
      flex: 4;
      height: 100%;
      background: #ffffff;
      opacity: 0.9;
      padding: 40px 40px 0px 40px;

      .login_infos {
        .welcome {
          font-size: 18px;
          color: #28374f;
          height: 40px;
        }

        .names {
          font-size: 14px;
          color: #696969;
          height: 20px;
          margin-bottom: 20px;
        }

        .form-item {
          position: relative;
          margin-bottom: 20px;

          .icon {
            font-size: 18px;
            left: 10px;
            top: 11px;
            position: absolute;
            z-index: 2;
          }

          /deep/.el-input__inner {
            padding-left: 38px;
          }
        }
      }
    }
  }
}
</style>