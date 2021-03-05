<template>
  <div class='header'>
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javacript:;">小米商城</a>
          <a href="javacript:;">MUI</a>
          <a href="javacript:;">云服务</a>
          <a href="javacript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a
            href="javacript:;"
            v-if="username"
          >{{username}}</a>
          <a
            href="javacript:;"
            v-if="username"
            @click="logout"
          >退出</a>
          <a
            href="javacript:;"
            v-if="!username"
            @click="goToLogin"
          >登录</a>
          <a
            href="javacript:;"
            v-if="username"
          >我的订单</a>
          <a
            @click="goToCart"
            href="javacript:;"
            class='my-cart'
          >
            <span class="icon-cart"></span>
            购物车({{cartCount}})
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li
                  class='product'
                  v-for="phone in phoneList"
                  :key='phone.id'
                >
                  <a
                    :href="`/#/product/${phone.id}`"
                    target='_blank'
                  >
                    <div class="pro-img">
                      <img v-lazy="phone.mainImage">
                    </div>
                    <div class="pro-name">{{phone.name}}</div>
                    <div class="pro-price">{{phone.price | currency}}</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children"></div>
          </div>

          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class='product'>
                  <a
                    href=""
                    target='_blank'
                  >
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/8c87fdc4bcfd081ac240f7af1417ce60.png?thumb=1&w=200&h=138&f=webp&q=90">
                    </div>
                    <div class="pro-name">Redmi MAX 86″ 超大屏电视</div>
                    <div class="pro-price">7999元</div>
                  </a>
                </li>
                <li class='product'>
                  <a
                    href=""
                    target='_blank'
                  >
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/8c87fdc4bcfd081ac240f7af1417ce60.png?thumb=1&w=200&h=138&f=webp&q=90">
                    </div>
                    <div class="pro-name">Redmi MAX 86″ 超大屏电视</div>
                    <div class="pro-price">7999元</div>
                  </a>
                </li>
                <li class='product'>
                  <a
                    href=""
                    target='_blank'
                  >
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/8c87fdc4bcfd081ac240f7af1417ce60.png?thumb=1&w=200&h=138&f=webp&q=90">
                    </div>
                    <div class="pro-name">Redmi MAX 86″ 超大屏电视</div>
                    <div class="pro-price">7999元</div>
                  </a>
                </li>
                <li class='product'>
                  <a
                    href=""
                    target='_blank'
                  >
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/8c87fdc4bcfd081ac240f7af1417ce60.png?thumb=1&w=200&h=138&f=webp&q=90">
                    </div>
                    <div class="pro-name">Redmi MAX 86″ 超大屏电视</div>
                    <div class="pro-price">7999元</div>
                  </a>
                </li>
                <li class='product'>
                  <a
                    href=""
                    target='_blank'
                  >
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/8c87fdc4bcfd081ac240f7af1417ce60.png?thumb=1&w=200&h=138&f=webp&q=90">
                    </div>
                    <div class="pro-name">Redmi MAX 86″ 超大屏电视</div>
                    <div class="pro-price">7999元</div>
                  </a>
                </li>
                <li class='product'>
                  <a
                    href=""
                    target='_blank'
                  >
                    <div class="pro-img">
                      <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/8c87fdc4bcfd081ac240f7af1417ce60.png?thumb=1&w=200&h=138&f=webp&q=90">
                    </div>
                    <div class="pro-name">Redmi MAX 86″ 超大屏电视</div>
                    <div class="pro-price">7999元</div>
                  </a>
                </li>

              </ul>
            </div>
          </div>

        </div>
        <div class="header-search">
          <div class="wrapper">
            <input
              type="text"
              name='keyword'
            >
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: [],
    };
  },
  computed: {
    ...mapState(["username", "cartCount"]),
  },
  filters: {
    currency(val) {
      if (!val) return "0.00";
      return `￥${val.toFixed(2)}元`;
    },
  },
  mounted() {
    this.getProductList();
    const params = this.$route.params;
    if (params && params.from === "login") {
      this.getCartCount();
    }
  },
  methods: {
    ...mapActions(["saveUserName", "saveCartCount"]),
    getProductList() {
      this.axios
        .get("/products", {
          params: { categoryId: "100012", pageSize: 6 },
        })
        .then((res) => {
          this.phoneList =
            res.list.length > 6 ? res.list.slice(0, 6) : res.list;
        });
    },
    logout() {
      this.axios.post("/user/logout").then(() => {
        this.$message.success("退出登录成功!");
        this.$cookie.set("userId", "", { expires: "-1" });
        this.saveUserName("");
        this.saveCartCount(0);
      });
    },
    goToLogin() {
      this.$router.push("/login");
    },
    goToCart() {
      this.$router.push("/cart");
    },
    getCartCount() {
      this.axios.get("/carts/products/sum").then((res = 0) => {
        this.saveCartCount(res);
      });
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #fff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
  }
  .nav-header {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            background-color: #fff;
            z-index: 10;
            transition: all 0.5s;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              font-size: 12px;
              line-height: 12px;
              text-align: center;
              a {
                display: inline-block;
              }
              img {
                height: 111px;
                width: auto;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
              &:before {
                content: "";
                position: absolute;
                top: 28px;
                right: 0;
                border-left: 1px solid $colorF;
                height: 100px;
                width: 1px;
              }
              &:last-child::before {
                display: none;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          height: 50px;
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            border: none;
            box-sizing: border-box;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png");
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>