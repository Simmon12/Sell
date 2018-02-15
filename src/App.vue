<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods"> 商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <!--主要用于保留组件状态或避免重新渲染。-->
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>

  </div>
</template>

<script>
import vHeader from '@/components/header/header'
import {urlParse} from '@/common/js/util'
const ERR_OK = 0
export default {
  data() {
    return {
      seller: {
        id: (()=> {
          let queryParam = urlParse()
          console.log(queryParam)
          return queryParam.id
        })()
      }
    }
  },
  created() {
    this.$ajax.get('/api/seller?id=' + this.seller.id).then(res => {
        console.log(res)
        res = res.data
        if(res.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, res.data)
          console.log("skdjfkj ", this.seller.id)
        }
        console.log("seller",this.seller.name)
    }).catch(err=> {
      console.log(err)
    })
  },
  components: {
    vHeader
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
        .active
          color: rgb(240,20,20)

</style>
