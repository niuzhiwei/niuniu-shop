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
                      <img :src="phone?phone.img :'/imgs/item-box-1.png'">
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
              <img :src="item.img">
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
        
      </div>
      <div class="banner"></div>
      <div class="product-list"></div>
    </div>

    <service-bar></service-bar>
  </div>
</template>

<script>
import ServiceBar from "../components/ServiceBar.vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  components: {
    ServiceBar,
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
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {},
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
      height: 459px;
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
            height: 459px;
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
}
</style>