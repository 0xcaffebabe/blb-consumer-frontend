<template>
  <div>
    <el-card class="shop-header" :body-style="{padding:0}">
      <el-row class="shop-detail" :gutter="20">
        <el-col :span="9">
          <el-image
            class="shop-logo"
            style="width: 400px; height: 200px"
            :src="info.shopLogo"
            :preview-src-list="imgList"
            fit="cover"/>
            <ul class="img-list">
              <li v-for="item in imgList.slice(1,5)" :key="item">
                <el-image
                class="shop-logo"
                :src="item"
                :preview-src-list="imgList"
                fit="cover"/>
              </li>
            </ul>
        </el-col>
        <el-col :span="15">
          <h2 class="shop-name">{{info.shopName}}</h2>
          <el-rate
            v-model="rate"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}分"
            class="shop-rate"
            >
          </el-rate>
          <el-divider/>
          <p class="shop-delivery">
            <el-tag effect="dark" type="primary" size="mini" style="vertical-align:top">蜂鸟专送</el-tag>
            / 35分钟送达
             / 配送费￥{{info.deliveryFee}} 起送价 ￥{{info.startingPrice}}
            </p>
          <p>地址：鲤城区媒人桥路2号 <span class="el-icon-location" style="color:#409EFF"></span> </p>
          <p>电话：17359801234</p>
          <p class="shop-slogan">{{info.shopSlogan}}</p>
          <el-divider/>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: ['info'],
  data () {
    return {
      rate: 3.7,
      imgActive: 0,
      imgList: [
        'imgs/foods/huangmenji.jpg',
        'imgs/foods/huangmenfuzhu.jpg',
        'imgs/foods/huangmenzhujiao.jpg',
        'imgs/foods/huangmenpaigu.jpg'
      ]
    }
  },
  methods: {
    handleImgClick (index, e) {
      this.imgActive = index
      e.preventDefault()
    }
  },
  created () {
    this.imgList.unshift(this.info.shopLogo)
  }
}
</script>

<style lang="less" scoped>
  .shop-header {
    padding: 20px;
  }
  .el-image {
    border-radius: 5px;
  }
  .shop-detail {
    .shop-delivery {
      color: #666;
    }
    .shop-slogan {
      color: #666;
    }
  }
  p {
    color: #666;
  }
  .shop-logo {
    margin-left: 10px;
    border-radius: 2px;
  }
  .shop-name {
    margin: 0;
    font-size: 28px;
    color: #666;
    font-weight: 500;
  }
  .shop-rate {
    margin-top: 10px;
  }
  .img-list {
    display: flex;
    width: 400px;
    li {
      flex: 0 0 25%;
    }
    .shop-logo {
      box-sizing: border-box;
      width: 90px;
      height: 50px;
      cursor:pointer
    }
  }
  .img-active {
    border: 2px solid rgb(49,144,232);
    transition: all 0.2s;
  }
</style>
