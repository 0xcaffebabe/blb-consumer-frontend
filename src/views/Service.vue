<template>
  <div>
    <div style="margin-bottom:20px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/my' }">我的</el-breadcrumb-item>
        <el-breadcrumb-item>客服中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="16">
        <JwChat-index
        :taleList='list'
        @enter='handleEnter'
        v-model='msg'
        :toolConfig='config'
        :config="config"
        scrollType="scroll"
        >
          <JwChat-rightbox :config="rightConfig"/>
        </JwChat-index>
      </el-col>
      <el-col :span="8">
        <el-card>
          <div slot="header">
            投诉列表
            <el-button type="primary" size="mini" style="float:right" @click="$store.commit('toggleSubmitComplaintPane')">发起投诉</el-button>
          </div>
          <ul>
            <li>
              <el-button effect="dark" type="info" size="mini" style="float:right" @click="showComplaintPane">未处理</el-button>
              <h4>关于店铺 黄焖鸡米饭 的投诉</h4>
              <el-divider/>
            </li>
            <li>
              <el-button effect="dark" type="success" size="mini" style="float:right" @click="showComplaintPane">处理中</el-button>
              <h4>关于店铺 阿牛很芒 的投诉</h4>
              <el-divider/>
            </li>
            <li>
              <el-button effect="dark" type="primary" size="mini" style="float:right" @click="showComplaintPane">已处理</el-button>
              <h4>关于店铺 网红奶茶店 的投诉</h4>
              <el-divider/>
            </li>
            <li>
              <el-button effect="dark" type="danger" size="mini" style="float:right" @click="showComplaintPane">被驳回</el-button>
              <h4>关于店铺 黄焖鸡米饭 的投诉</h4>
            </li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <complaint-pane/>
    <submit-complaint-pane/>
  </div>
</template>

<script>
import ComplaintPane from '../components/service/ComplaintPane'
import SubmitComplaintPane from '../components/service/SubmitComplaintPane'
export default {
  data () {
    return {
      msg: '',
      list: [
        {
          date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
          text: { text: '您好, 请问有什么可以帮助您' },
          mine: false,
          name: '饱了吧智能客服',
          img: 'https://zbq.ismy.wang/img/helper.jpg'
        },
        {
          date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
          text: { text: '人工客服繁忙, 您的前面仍有 <span style="color:skyblue">208</span> 位用户' },
          mine: false,
          name: '饱了吧智能客服',
          img: 'https://zbq.ismy.wang/img/helper.jpg'
        },
        {
          date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
          text: { text: '您可以选择自助服务： <ul><li><a href="#" style="color:skyblue">会员充值没有到账?</a></li><li><a href="#" style="color:skyblue">如何进行投诉?</a></li></ul>或者继续等待' },
          mine: false,
          name: '饱了吧智能客服',
          img: 'https://zbq.ismy.wang/img/helper.jpg'
        }
      ],
      config: {
        img: 'https://zbq.ismy.wang/img/helper.jpg',
        name: '饱了吧智能客服',
        dept: '人工智能客服为您服务',
        callback: this.headerEvent
      },
      rightConfig: {
        listTip: '当前在线客服',
        tip: '系统公告',
        list: [
          {
            name: '盼盼',
            img: 'https://zbq.ismy.wang/img/helper.jpg'
          },
          {
            name: '坤坤',
            img: 'https://zbq.ismy.wang/img/helper.jpg'
          },
          {
            name: '丽丽',
            img: 'https://zbq.ismy.wang/img/helper.jpg'
          }
        ]
      }
    }
  },
  methods: {
    handleEnter () {
      this.list.push({
        date: new Date().toLocaleDateString() + new Date().toLocaleTimeString(),
        img: this.$store.state.user.info.avatar,
        name: this.$store.state.user.info.username,
        mine: true,
        text: { text: this.msg }
      })
    },
    showComplaintPane () {
      this.$store.commit('toggleComplaintPane')
    }
  },
  components: {
    ComplaintPane, SubmitComplaintPane
  }
}
</script>

<style lang='less' scoped>
  .ChatPage {
    margin-left: 0;
  }
</style>
