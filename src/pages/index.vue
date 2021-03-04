<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <!-- 轮播图左侧菜单 -->
        <div class="nav-menu">
          <div class="menu-wrap">
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >手机 电话卡</a>
              <div class="children">
                <ul
                  v-for="(item,index) in menuList"
                  :key='index'
                >
                  <li
                    v-for="(phone,j) in item"
                    :key='j'
                  >
                    <a :href="`/#/product/${phone.id?phone.id :''}`">
                      <img v-lazy="phone?phone.img :'/imgs/item-box-1.png'">
                      {{phone.name || '小米9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >电视 盒子</a>
              <!-- <div class="children"></div> -->
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >笔记本 显示器</a>
              <!-- <div class="children"></div> -->
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >家电 插线板</a>
              <!-- <div class="children"></div> -->
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >出行 穿戴</a>
              <!-- <div class="children"></div> -->
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >智能 路由器</a>
              <!-- <div class="children"></div> -->
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >电源 配件</a>
              <!-- <div class="children"></div> -->
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >健康 儿童</a>
              <!-- <div class="children"></div> -->
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >耳机 音箱</a>
              <!-- <div class="children"></div> -->
            </li>
            <li class="menu-item">
              <a
                class="title"
                href="javacriipt:;"
              >生活 箱包</a>
              <!-- <div class="children"></div> -->
            </li>
          </div>
        </div>
        <!-- 轮播图 -->
        <swiper
          ref="mySwiper"
          :options="swiperOptions"
        >
          <swiper-slide
            v-for="(item,index) in slideList"
            :key='index'
          >
            <a :href="`/#/product/${item.id}`">
              <img v-lazy="item.img">
            </a>
          </swiper-slide>
          <div
            class="swiper-button-prev"
            slot="button-prev"
          ></div>
          <div
            class="swiper-button-next"
            slot="button-next"
          ></div>
          <div
            class="swiper-pagination"
            slot="pagination"
          ></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a
          :href="`/#/product/${item.id}`"
          v-for="item in adsList"
          :key='item.id'
        >
          <img v-lazy="item.img">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img src="/imgs/banner-1.png">
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="wrapper">
          <div class="banner-left">
            <a href="/#/product/35"><img src="/imgs/mix-alpha.jpg"></a>
          </div>
          <div class="list-box">
            <div
              v-for="(arr,index) in phoneList"
              :key='index'
              class="list"
            >
              <div
                v-for='(item,j) in arr'
                :key='j'
                class="item"
              >
                <span :class="{'new-pro':j%2===0,'kill-pro':j%2===1}">新品</span>
                <div class="item-img">
                  <img v-lazy="item.mainImage">
                </div>
                <div class="item-info">
                  <h3>{{item.name}}</h3>
                  <p>{{item.subtitle}}</p>
                  <p
                    @click="addCart(item.id)"
                    class="price"
                  >￥{{item.price}}元</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <service-bar></service-bar>
    <modal
      title="提示"
      sureText="查看购物车"
      :btnType="1"
      modalType="middle"
      :showModal="showModal"
      @submit="goToCart()"
      @cancel='showModal= false'
    >
      <template v-slot:body>
        <p>商品添加成功！</p>
      </template>
    </modal>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar.vue";
import Modal from "../components/Modal.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    ServiceBar,
    Modal,
    swiper,
    swiperSlide,
  },
  name: "index",
  data() {
    return {
      swiperOptions: {
        autoplay: true,
        loop: true,
        effect: "cube",
        cube: {
          shadowOffset: 100,
          shadowScale: 0.6,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      slideList: [
        { id: "42", img: "/imgs/slider/slide-1.jpg" },
        { id: "45", img: "/imgs/slider/slide-2.jpg" },
        { id: "46", img: "/imgs/slider/slide-3.jpg" },
        { id: "", img: "/imgs/slider/slide-4.jpg" },
        { id: "", img: "/imgs/slider/slide-5.jpg" },
      ],
      menuList: [
        [
          { id: 30, img: "/imgs/item-box-1.png", name: "小米CC9" },
          { id: 31, img: "/imgs/item-box-2.png", name: "小米8青春版" },
          { id: 32, img: "/imgs/item-box-3.jpg", name: "RedMi K20 Pro" },
          { id: 33, img: "/imgs/item-box-4.jpg", name: "移动4G专区" },
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      adsList: [
        { id: 33, img: "/imgs/ads/ads-1.png" },
        { id: 48, img: "/imgs/ads/ads-2.jpg" },
        { id: 45, img: "/imgs/ads/ads-3.png" },
        { id: 47, img: "/imgs/ads/ads-4.jpg" },
      ],
      phoneList: [],
      showModal: false,
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    getProductList() {
      this.axios
        .get("/products", { params: { categoryId: 100012, pageSize: 14 } })
        .then((res) => {
          this.phoneList = [res.list.slice(6, 10), res.list.slice(10, 14)];
        });
    },
    addCart() {
      this.showModal = true;
      // this.axios
      //   .post("/carts", { productId: id, selected: true })
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch(() => {
      //     this.showModal = true;
      //   });
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.index {
  position: relative;
  .swiper-box {
    .nav-menu {
      box-sizing: border-box;
      position: absolute;
      width: 264px;
      height: 452px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      .menu-wrap {
        .menu-item {
          height: 42px;
          line-height: 42px;
          .title {
            position: relative;
            display: block;
            font-size: 16px;
            color: #fff;
            padding-left: 30px;
            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: "";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            position: absolute;
            width: 962px;
            height: 452px;
            background-color: #fff;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin: 14px 0 31px 0;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px 0;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: #fff;
            text-align: center;
            span {
              display: inline-block;
              font-size: 14px;
              width: 67px;
              height: 24px;
              line-height: 24px;
              color: #fff;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                height: 195px;
                width: 100%;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: $fontJ;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px 0 13px 0;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  content: "";
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>