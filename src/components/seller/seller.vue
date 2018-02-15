<template>
  <!--seller-contentdiv是能够扩大高度的,能够被内容增加而撑高,而sellerdiv是固定的高度的,从而形成滚动-->
  <div class="seller" ref="seller">
    <div class="seller-content">
      <!--overview部分-->
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">{{ seller.ratingCount }}</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <!--列表处理remark内容-->
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }} </span>元
            </div>
          </li>
           <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }} </span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }} </span>元
            </div>
          </li>
        </ul>
        <!--收藏按钮-->
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active': favorite}"></span>
          <span class="text">{{ favoriteText }}</span>
        </div>
      </div>
      <split></split>
      <!--bulltin部分-->
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{ seller.bulletin }}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item border-1px" v-for="(item, index) in seller.supports">
          <!--使用classMap做对应-->
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{ seller.supports[index].description }}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <!--pics部分-->
<!--ref获取picWrapper是为了滚动图片需要,父DOM是picWrapper,子DOM是picList
ref获取picList是为了计算图片列表的总长度,用来设置图片列表的横向滚动,因为滚动的触发条件是子DOM比父DOM要"大"的时候才会触发,由于图片的数量是未知的,所以需要去计算,然后写入到picList -->
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <!--info-->
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>

    </div>
  </div>

</template>

<script type="ecmascript-6">
import BScroll from 'better-scroll'
import split from '@/components/split/split'
import star from '@/components/star/star'
import {saveToLocal, loadFromLocal} from '@/common/js/store'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  data() {
    return {
      favorite: (() => {
        // 利用localstorage读取这个属性
        return loadFromLocal(this.seller.id, 'favorite', false)
      })() //vue需要返回的data必须是函数,所以加上()
    }
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏': '收藏'
    }
  },
  watch: {  // 当seller变动的时候会触发
    'seller'() {
      this.$nextTick(() => {
        this._initScroll()
        this._initPics()
      })
    }
  },
  mounted() {   //在dom被渲染之后触发
    this.$nextTick(() => {
      this._initScroll()
      this._initPics()
    })
  },
  methods: {
    toggleFavorite() {
      if(!event._constructed) {
        return;
      }
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    },
    _initScroll () {
      if(!this.scroll) {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        })
      }else {
        this.scroll.refresh()
      }
    },
    _initPics() {
      if(this.seller.pics) {
        let picWidth = 120
        let margin = 6
        // 图片列表的总长度
        let width = (picWidth + margin) * this.seller.pics.length - margin
        // 设置图片列表的宽度等于列表的总长度
        this.$refs.picList.style.width = width + 'px'
        // 异步绑定滚动
        this.$nextTick(() => {
          if(!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,  // bscroll的横向滚动属性
              eventPassthrough: 'vertical'
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    }
  },
  components: {
    split,
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
@import "../../common/stylus/mixin.styl"
.seller
  position: absolute
  top: 174px
  bottom: 0
  left: 0
  width: 100%
  overflow: hidden
  .overview
    padding: 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
    .desc
      padding-bottom: 18px
      line-height: 18px
      border-1px(rgba(7, 17, 27, 0.1 ))
      font-size: 0
      .star
        display: inline-block
        margin-right: 8px
        vertical-align: top // 行内对齐
      .text
        display: inline-block
        margin-right: 12px
        line-height: 18px
        vertical-align: top
        font-size: 10px
        color: rgb(77, 85, 93)
    .remark
      display: flex
      padding-top: 18px
      .block
        flex: 1
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.2)
        &:last-child
          border: none
        h2
          margin-bottom: 4px
          line-height: 10px
          font-size: 10px
          color: rgb(147, 153, 159)
        .content
          line-height: 24px
          font-size: 10px
          color: rgb(7, 17, 27)
          .stress
            font-size: 24px
    .favorite
      position: absolute
      width: 50px
      right: 11px
      top: 18px
      text-align: center
      .icon-favorite
        display: block
        margin-bottom: 4px
        line-height: 24px
        font-size: 24px
        color: #d4d6d9
        &.active
          color: rgb(240, 20, 20)
      .text
        line-height: 10px
        font-size: 10px
        color: rgb(77, 85, 93)
  .bulletin
    padding: 18px 18px 0 18px
    .title
      margin-bottom: 8px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .content-wrapper
      padding: 0 12px 16px 12px
      border-1px(rgba(7, 17, 27, 0.1))
      .content
        line-height: 24px
        font-size: 12px
        color: rgb(240, 20, 20)
    .supports
      .support-item
        padding: 16px 12px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        &:last-child
          border-none() //需要引入一个mixin,处理没边框的问题
        .icon
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
          margin-right: 6px
          background-size: 16px 16px
          background-repeat: no-repeat
          &.decrease //使用设计要求的大小的图标
            bg-image('decrease_4') //使用mixin处理这些图标
          &.discount
            bg-image('discount_4')
          &.guarantee
            bg-image('guarantee_4')
          &.invoice
            bg-image('invoice_4')
          &.special
            bg-image('special_4')
        .text
          line-height: 16px
          font-size: 12px
          color: rgb(7, 17, 27)
  .pics
    padding: 18px
    .title
      margin-bottom: 12px
      line-height: 14px
      color: rgb(7, 17, 27)
      font-size: 14px
    .pic-wrapper
      width: 100%
      overflow: hidden
      white-space: nowrap
      .pic-list
        font-size: 0
        .pic-item
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
          &:last-child  // 最后一个图片没有外边距
            margin: 0
  .info
    padding: 18px 18px 0 18px
    color: rgb(7, 17, 27)
    .title
      padding-bottom: 12px
      line-height: 14px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 14px
    .info-item
      padding: 16px 12px
      line-height: 16px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size: 12px
      &:last-child
        border-none()




</style>
