<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="">牛牛主页</a><span>|</span>
      <a href="">牛牛博客</a><span>|</span>
      <a href="">Github</a>
    </div>
    <div class="copyright">Copyright © mi.com All Rights</div>
  </div>
</template>

<script>
export default {
  name: "nav-footer",
  data() {
    return {};
  },
};
</script>
<style lang='scss' scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.footer {
  height: 234px;
  border-top: 1px solid $colorA;
  background-color: #333;
  color: #999;
  font-size: $fontI;
  text-align: center;
  .footer-logo {
    margin-top: 46px;
    margin-bottom: 31px;
    img {
      width: 53px;
      height: 36px;
      margin-bottom: 13px;
    }
  }
  .footer-link {
    a {
      color: #999;
      display: inline-block;
    }
    span {
      margin: 0 10px;
    }
    margin-bottom: 13px
  }
  .copyright{
    font-size: 12px;
  }
}
</style>