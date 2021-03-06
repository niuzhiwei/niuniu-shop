<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  mounted() {
    if (this.$cookie.get("userId")) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    ...mapActions(["saveUserName", "saveCartCount"]),
    getUser() {
      this.axios.get("/user").then((res = {}) => {
        this.saveUserName(res.username);
      });
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        this.saveCartCount(res);
      });
    },
  },
};
</script>

<style lang='scss'>
@import "./assets/scss/reset.scss";
@import "./assets/scss/base.scss";
@import "./assets/scss/button.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/modal.scss";
</style>
