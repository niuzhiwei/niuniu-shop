<template>
  <div class="login">
    <div class="login-banner">
      <router-link to='/index'>
        <div class="login-logo"></div>
      </router-link>
    </div>
    <div class="login-body">
      <div class="container">
        <div class="form-panel">
          <h4>
            <span class="checked">账号登录</span><span class="line">|</span><span>扫码登录</span>
          </h4>
          <div class="input">
            <input
              type="text"
              placeholder="邮箱/手机号码/小米ID"
              v-model="username"
            >
          </div>
          <div class="input">
            <input
              type="password"
              placeholder="密码"
              v-model="password"
            >
          </div>
          <div class="btn-box">
            <a
              href="javacript:;"
              class="btn"
              @click="login"
            >
              登录</a>
          </div>
          <div class="login-tip">
            <a href="javascript:;">手机短信登录/注册</a>
          </div>
          <div class="register">
            <span class="tips">立即注册</span><span class="spr-line">|</span><span class="tips">忘记密码?</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      userId: "",
    };
  },
  methods: {
    ...mapActions(["saveUserName"]),
    login() {
      let { username, password } = this;
      this.axios.post("/user/login", { username, password }).then((res) => {
        const { id } = res;
        this.userId = id;
        this.$cookie.set("userId", this.userId, { expires: "1M" });
        this.saveUserName(res.username);
        this.$router.push({
          name: "index",
          params: {
            from: "login",
          },
        });
      });
    },
    register() {
      this.axios
        .post("/user/register", {
          username: "niuniu",
          password: "niuniu",
          email: "123",
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.login {
  .login-banner {
    width: 1226px;
    margin: 0 auto;
    .login-logo {
      width: 200px;
      height: 98px;
      @include bgImg(200px, 98px, "/imgs/login-logo.png");
    }
  }
  .login-body {
    @include bgImg(100%, 100%, "/imgs/login-bg.jpg", auto);
    width: 100%;
    height: 588px;
    .container {
      padding-top: 32px;
      position: relative;
      .form-panel {
        background: #fff;
        width: 410px;
        min-height: 556px;
        position: absolute;
        right: 0;
        h4 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          color: #666;
          font-weight: 400;
          .checked {
            color: $colorA;
          }
          .line {
            margin: 0 24px;
          }
        }
        .input {
          display: block;
          margin: 0 auto;
          margin-bottom: 24px;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding-left: 12px;
            box-sizing: border-box;
          }
        }
        .btn-box {
          margin: 32px auto;
          text-align: center;
          width: 348px;
          height: 50px;
          .btn {
            width: 100%;
            height: 100%;
            line-height: 50px;
          }
        }
        .login-tip {
          text-align: center;
          a {
            color: $colorA;
            font-size: 14px;
          }
        }
        .register {
          text-align: center;
          margin-top: 24px;
          color: $colorD;
          font-size: 14px;
          .tips {
            cursor: pointer;
          }
          .spr-line {
            display: inline-block;
            margin: 0 8px;
          }
        }
      }
    }
  }
}
</style>