<template>
  <div>
    <shop-header :info="shopInfo"/>
    <!-- 菜单选项栏 -->
    <el-card style="margin-top:50px">
        <el-tabs v-model="activeName">
          <el-tab-pane label="点餐" name="product">
            <shop-product :shopId="shopId"/>
          </el-tab-pane>
          <el-tab-pane label="评价" name="eval">
            <shop-eval :shopId="shopId"/>
          </el-tab-pane>
          <el-tab-pane label="商家" name="seller">
            <el-card>
              <div slot="header">
                <el-tag>食无忧</el-tag> 该商户已经购买食品安全责任险，食品安全有保障
                <el-button type="danger" size="medium" style="float:right">举报商家</el-button>
              </div>
              <p>商家品类：黄焖鸡 / 盖浇饭</p>
              <p>营业时间：周一至周日 10:00 - 22:00</p>
              <p>店主：{{shopInfo.sellerName}}</p>
              <ul class="shop-inner-list">
                <li>
                  <el-image src="/imgs/shop_inner/1.jpg" :preview-src-list="['/imgs/shop_inner/1.jpg']" fit="cover" style="height:144px;width:144px"></el-image>
                </li>
                <li>
                  <el-image src="/imgs/shop_inner/2.png" :preview-src-list="['/imgs/shop_inner/2.png']" fit="cover" style="height:144px;width:144px"></el-image>
                </li>
              </ul>
            </el-card>
          </el-tab-pane>
        </el-tabs>
    </el-card>
    <!-- 购物车 -->
    <shop-cart :cartShow="cartShow" :shopId="shopId" ref="shopCart" @loadComplete="handleCartLoadComplete" @handle-settlement="handleSettlementClick"></shop-cart>
    <shop-chat/>
    <!-- 侧边电梯 -->
    <div class="cart-bar">
      <el-badge :value="cartTotal">
        <el-button icon="el-icon-shopping-cart-2" circle class="cart-button" @click="$store.commit('toggleCart')"></el-button>
      </el-badge>
      <el-badge :value="28" class="chat-badge">
        <el-button icon="el-icon-headset" circle class="chat-button" @click="$store.commit('toggleShopChatShow')"></el-button>
      </el-badge>
      <el-button type="success" class="pay-button" @click="handleSettlementClick">结算</el-button>
    </div>
  </div>
</template>

<script>
import ShopHeader from '../components/shop/ShopHeader'
import ShopProduct from '../components/shop/ShopProduct'
import ShopChat from '../components/shop/ShopChat'
import ShopCart from '../components/shop/ShopCart'
import ShopEval from '../components/shop/ShopEval'

import shopService from '../service/ShopService'
export default {
  data () {
    return {
      activeName: 'product',
      cartShow: true,
      shopId: this.$route.params.shopId,
      shopInfo: {},
      // 购物车商品总数
      cartTotal: 0
    }
  },
  components: {
    ShopHeader, ShopProduct, ShopCart, ShopEval, ShopChat
  },
  computed: {
    lastProductAddTime () {
      return this.$store.state.lastProductAddTime
    }
  },
  watch: {
    lastProductAddTime () {
      this.cartTotal = this.$refs.shopCart.getCartTotal()
    }
  },
  methods: {
    async getShopInfo () {
      try {
        const shopInfo = await shopService.getShopInfo(this.shopId)
        this.shopInfo = shopInfo
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    handleCartLoadComplete () {
      this.cartTotal = this.$refs.shopCart.getCartTotal()
    },
    handleSettlementClick () {
      this.$store.commit('setConfirmOrderData', {
        shopInfo: this.shopInfo,
        productList: this.$refs.shopCart.getProductListLocal()
      })
      this.$router.push({
        name: 'confirmOrder'
      })
    }
  },
  created () {
    this.getShopInfo()
  }
}
</script>

<style lang="less" scoped>
  .cart-bar {
    z-index: 1;
    float: left;
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    height: 210px;
    width: 40px;
    background-color: #3d3d3f;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    .cart-button {
      font-size: 24px;
      margin-top: -5px;
      position: absolute;
      left: -30px;
      border: 4px solid #3d3d3f;
      background-color: #3190e8;
      color: white;
    }
    .chat-badge {
      position: relative;
      top: 80px;
    }
    .chat-button {
      font-size: 24px;
      position: absolute;
      left: -30px;
      border: 4px solid #3d3d3f;
      background-color: #E6A23C;
      color: white;
    }
    .pay-button {
      padding: 0;
      height: 50px;
      position: absolute;
      font-weight: 600;
      width: 100%;
      bottom: 0;
      margin-left: 0;
      border-radius: 0;
      border-bottom-left-radius: 5px;
    }
  }
  .shop-inner-list {
    li {
      display: inline;
      margin-right: 10px;
    }
  }
</style>
