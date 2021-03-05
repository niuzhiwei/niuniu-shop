<template>
  <div
    ref='bar'
    class="nav-bar"
    :class="{'is_fiexed':isFixed}"
  >
    <div class="container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评论</a>
        <slot name='buy'></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-param",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isFixed: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.initHeight);
  },
  methods: {
    initHeight() {
      //滚动偏移量
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const offsetTop = this.$refs.bar.offsetTop;
      this.isFixed = scrollTop > offsetTop ? true : false;
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.initHeight, false);
  },
};
</script>
<style lang='scss' scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background: $colorG;
  z-index: 10;
  &.is_fiexed {
    position: fixed;
    top: 0;
    width: 100%;
    box-shadow: 0 5px 5px $colorE;
  }
  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      span {
        margin: 0 10px;
      }
      a {
        color: $colorC;
      }
    }
  }
}
</style>