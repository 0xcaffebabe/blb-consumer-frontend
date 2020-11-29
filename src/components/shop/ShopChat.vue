<template>
  <div class="shop-chat">
    <el-dialog
    :visible="$store.state.shopChatShow"
    width="570px"
    @close="closeDialog"
    >
    <JwChat-index
          :taleList='list'
          @enter='handleEnter'
          v-model='msg'
          :toolConfig='config'
          :config="config"
          scrollType="scroll"
          >
          <div slot="header" style="margin-left:460px">
            <el-button type="primary" size="small" icon="el-icon-close" @click="closeDialog"></el-button>
          </div>
            <JwChat-rightbox :config="rightConfig"/>
    </JwChat-index>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '',
      list: [
        {
          date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
          text: { text: '您好, 欢迎光临黄焖鸡米饭' },
          mine: false,
          name: '黄焖鸡米饭',
          img: '/imgs/shop_logos/kafei.jpg'
        }
      ],
      config: {
        img: '/imgs/shop_logos/kafei.jpg',
        name: '黄焖鸡米饭',
        dept: '为生活增添点快乐',
        callback: this.headerEvent
      },
      rightConfig: {
        listTip: '当前在线客服',
        tip: '店铺公告',
        list: [
          {
            name: '黄焖鸡米饭①号客服',
            img: '/imgs/shop_logos/kafei.jpg'
          },
          {
            name: '黄焖鸡米饭②号客服',
            img: '/imgs/shop_logos/kafei.jpg'
          },
          {
            name: '黄焖鸡米饭③号客服',
            img: '/imgs/shop_logos/kafei.jpg'
          }
        ]
      }
    }
  },
  methods: {
    closeDialog () {
      if (this.$store.state.shopChatShow) {
        this.$store.commit('toggleShopChatShow')
      }
    },
    handleEnter () {
      this.list.push({
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        img: this.$store.state.user.info.avatar,
        name: this.$store.state.user.info.username,
        mine: true,
        text: { text: this.msg }
      })
    }
  }
}
</script>

<style lang="less">
  .shop-chat .el-dialog {
    margin: 0 auto;
  }
  .shop-chat .el-dialog__header, .shop-chat  .el-dialog__title {
    display: none;
  }
  .shop-chat .el-dialog__body {
    padding: 0;
  }
</style>
