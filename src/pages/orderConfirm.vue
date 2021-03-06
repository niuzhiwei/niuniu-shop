<template>
  <div class="order-confirm">
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearfix">
              <div
                v-for="address of list"
                :key="address.id"
                class="addr-info"
                :class="{'checked':address.id ===checkId}"
                @click="checkId =address.id"
              >
                <h2>{{address.receiverName}}</h2>
                <div class="phone">{{address.receiverMobile}}</div>
                <div class="street">
                  {{address.receiverProvince +' '+address.receiverCity +' '+address.receiverDistrict}}
                  <br>{{address.receiverAddress}}
                </div>
                <div class="action">
                  <a
                    href="javascript:;"
                    class="fl"
                    @click="delAddress(address)"
                  >
                    <i class="icon el-icon-delete"></i>
                  </a>
                  <a
                    href="javascript:;"
                    class="fr"
                    @click="editAddressModal(address)"
                  >
                    <i class="icon el-icon-edit-outline"></i>
                  </a>
                </div>
              </div>
              <div
                class="addr-add"
                @click="openAddressModal"
              >
                <div class="icon-add"></div>
                <div>添加新地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li
                v-for="item in cartList"
                :key="item.productId"
              >
                <div class="good-name">
                  <img :src="item.productMainImage">
                  <span>{{item.productName}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascript:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a
              href="/#/cart"
              class="btn btn-default btn-large"
              @click="goCart"
            >返回购物车</a>
            <a
              href="javascript:;"
              class="btn btn-large"
              @click="orderSubmit"
            >去结算</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除模态框 -->
    <modal
      title='删除确认'
      :btnType='3'
      :showModal='showDelModal'
      @cancel='showDelModal=false'
      @submit="submitAddress"
    >
      <template v-slot:body>
        <p>您确认要删除此地址吗？</p>
      </template>
    </modal>

    <!-- 新增模态框 -->
    <modal
      title='确认新增'
      :btnType='3'
      :showModal='showEditModal'
      @cancel='showEditModal=false'
      @submit="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input
              type="text"
              class="input"
              placeholder="姓名"
              v-model="checkedItem.receiverName"
            >
            <input
              type="text"
              class="input"
              placeholder="手机号"
              v-model="checkedItem.receiverMobile"
            >
          </div>
          <div class="item">
            <select
              name="province"
              v-model="checkedItem.receiverProvince"
            >
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select
              name="city"
              v-model="checkedItem.receiverCity"
            >
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="石家庄">石家庄</option>
            </select>
            <select
              name="district"
              v-model="checkedItem.receiverDistrict"
            >
              <option value="昌平区">昌平区</option>
              <option value="海淀区">海淀区</option>
              <option value="东城区">东城区</option>
              <option value="西城区">西城区</option>
              <option value="顺义区">顺义区</option>
              <option value="房山区">房山区</option>
            </select>
          </div>
          <div class="item">
            <textarea
              name="street"
              v-model="checkedItem.receiverAddress"
            ></textarea>
          </div>
          <div class="item">
            <input
              type="text"
              class="input"
              placeholder="邮编"
              v-model="checkedItem.receiverZip"
            >
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>
<script>
import Modal from "./../components/Modal";
export default {
  name: "order-confirm",
  data() {
    return {
      list: [], //收货地址列表
      cartList: [], //购物车中需要结算的商品列表
      showEditModal: false, //是否显示新增或者编辑弹框
      cartTotalPrice: 0,
      count: 0,
      checkedItem: {}, //选中商品对象
      userAction: "", //用户行为0:新增 1：编辑 2：删除,
      showDelModal: false, //删除地址确认弹框
      checkId: "", //选中地址
    };
  },
  components: {
    Modal,
  },
  mounted() {
    this.getAddressList();
    this.getCartList();
  },
  methods: {
    getAddressList() {
      this.axios.get("/shippings").then((res) => {
        this.list = res.list;
      });
    },
    delAddress(item) {
      this.checkedItem = item;
      this.userAction = 2;
      this.showDelModal = true;
    },
    // 打开编辑地址弹框
    editAddressModal(item) {
      this.checkedItem = item;
      this.userAction = 1;
      this.showEditModal = true;
    },
    // 打开新增地址弹框
    openAddressModal() {
      this.checkedItem = {};
      this.userAction = 0;
      this.showEditModal = true;
    },
    //地址删除、编辑、新增功能
    submitAddress() {
      const { checkedItem, userAction } = this;
      let method,
        url,
        params = {};
      if (userAction === 0 || userAction === 1) {
        const {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        } = checkedItem;
        let errMsg = "";
        if (!receiverName) {
          errMsg = "请输入收货人名称！";
        } else if (!receiverMobile || !/\d{11}/.test(receiverMobile)) {
          errMsg = "请输入正确格式的手机号码！";
        } else if (!receiverProvince) {
          errMsg = "请选择对应的省份！";
        } else if (!receiverCity) {
          errMsg = "请选择对应的城市！";
        } else if (!receiverDistrict || !receiverAddress) {
          errMsg = "请输入收货地址！";
        } else if (!receiverZip || !/\d{6}/.test(receiverZip)) {
          errMsg = "请输入6位邮编！";
        }
        if (errMsg) {
          this.$message.error(errMsg);
          return;
        }
        params = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip,
        };
      }

      switch (userAction) {
        case 0:
          method = "post";
          url = "/shippings";
          break;
        case 1:
          method = "put";
          url = `/shippings/${checkedItem.id}`;
          break;
        case 2:
          method = "delete";
          url = `/shippings/${checkedItem.id}`;
          break;
        default:
          break;
      }
      this.axios[method](url, params).then(() => {
        this.closeModal();
        this.getAddressList();
        this.$message.success("操作成功！");
      });
    },
    getCartList() {
      this.axios.get("/carts").then((res) => {
        this.cartList = res.cartProductVoList.filter(
          (item) => item.productSelected
        );
        this.cartTotalPrice = res.cartTotalPrice;
        this.count = this.cartList.reduce((acc, re) => {
          return (acc += re.quantity);
        }, 0);
      });
    },
    closeModal() {
      this.checkedItem = {};
      this.userAction = "";
      this.showDelModal = false;
      this.showEditModal = false;
    },
    //返回购物车
    goCart() {
      this.$router.push("/cart");
    },
    // 订单提交
    orderSubmit() {
      const item = this.list.some((item) => item.id === this.checkId);
      if (!item) {
        this.$message.error("请选择一个收货地址！");
        return;
      }
      this.axios
        .post("/orders", {
          shippingId: this.checkId,
        })
        .then((res) => {
          this.$router.push({
            path: "/order/pay",
            query: {
              orderNo: res.orderNo,
            },
          });
        });
    },
  },
};
</script>
<style lang="scss">
.order-confirm {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 84px;
    .order-box {
      background-color: #ffffff;
      padding-left: 40px;
      padding-bottom: 40px;
      .addr-title {
        font-size: 20px;
        color: #333333;
        font-weight: 200;
        margin-bottom: 21px;
      }
      .item-address {
        padding-top: 38px;
        .addr-list {
          .addr-info,
          .addr-add {
            box-sizing: border-box;
            float: left;
            width: 271px;
            height: 180px;
            border: 1px solid #e5e5e5;
            margin-right: 15px;
            padding: 15px 24px;
            font-size: 14px;
            color: #757575;
          }
          .addr-info {
            cursor: pointer;
            h2 {
              height: 27px;
              font-size: 18px;
              font-weight: 300;
              color: #333;
              margin-bottom: 10px;
            }
            .street {
              height: 50px;
            }
            .action {
              height: 50px;
              line-height: 50px;
              .icon {
                font-size: 24px;
                color: #666666;
                vertical-align: middle;
                &:hover {
                  color: #ff6700;
                }
              }
            }
            &.checked {
              border: 1px solid #ff6700;
            }
          }
          .addr-add {
            text-align: center;
            color: #999999;
            cursor: pointer;
            .icon-add {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              background: url("/imgs/icon-add.png") #e0e0e0 no-repeat center;
              background-size: 14px;
              margin: 0 auto;
              margin-top: 45px;
              margin-bottom: 10px;
            }
          }
        }
      }
      .item-good {
        margin-top: 34px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 12px;
        h2 {
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 5px;
        }
        li {
          display: flex;
          align-items: center;
          height: 40px;
          line-height: 40px;
          margin-top: 10px;
          font-size: 16px;
          color: #333333;
          .good-name {
            flex: 5;
            img {
              width: 30px;
              height: 30px;
              vertical-align: middle;
            }
          }
          .good-price {
            flex: 2;
          }
          .good-total {
            padding-right: 44px;
            color: #ff6600;
          }
        }
      }
      .item-shipping,
      .item-invoice {
        margin-top: 31px;
        line-height: 20px;
        h2 {
          display: inline-block;
          margin-right: 71px;
          font-size: 20px;
          width: 80px;
        }
        span,
        a {
          font-size: 16px;
          color: #ff6700;
          margin-right: 23px;
        }
      }
      .detail {
        padding: 50px 44px 33px 0;
        border-bottom: 1px solid #f5f5f5;
        text-align: right;
        font-size: 16px;
        color: #666666;
        .item-val {
          color: #ff6700;
        }
        .item {
          line-height: 15px;
          margin-bottom: 12px;
        }
        .item-val {
          display: inline-block;
          width: 100px;
        }
        .item-total {
          .item-val {
            font-size: 28px;
          }
        }
      }
      .btn-group {
        margin-top: 37px;
        text-align: right;
      }
    }
  }
  .edit-wrap {
    font-size: 14px;
    .item {
      margin-bottom: 15px;
      .input {
        display: inline-block;
        width: 283px;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        border: 1px solid #e5e5e5;
        & + .input {
          margin-left: 14px;
        }
      }
      select {
        height: 40px;
        line-height: 40px;
        border: 1px solid #e5e5e5;
        margin-right: 15px;
      }
      textarea {
        height: 62px;
        width: 100%;
        padding: 13px 15px;
        box-sizing: border-box;
        border: 1px solid #e5e5e5;
      }
    }
  }
}
</style>