<template>
  <div>
    <order-header :title="title">
      <template v-slot:tips>
        <span>{{tip}}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from "../components/OrderHeader";
import NavFooter from "../components/NavFooter";
import ServiceBar from "./../components/ServiceBar";
export default {
  components: { OrderHeader, NavFooter, ServiceBar },
  data() {
    return {
      title: "",
      tip: "",
    };
  },
  mounted() {
    const path = this.$route.path;
    switch (path) {
      case "/order/confirm":
        this.title = "订单确认";
        break;
      case "/order/list":
        this.title = "订单列表";
        this.tip = "请谨防钓鱼链接或诈骗电话";
        break;
      case ("/order/pay", "/order/alipay"):
        this.title = "订单支付";
        this.tip = "请谨防钓鱼链接或诈骗电话";
        break;
      default:
        break;
    }
  },
};
</script>
<style scoped>
</style>