<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span @click="select(2, $event)" class="block positive" :class="{'active': selectType === 2}">{{ desc.all }}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0, $event)" class="block positive" :class="{'active': selectType === 0}">{{ desc.positive }}<span class="count">{{positive.length}}</span></span>
      <span @click="select(1, $event)" class="block negative" :class="{'active': selectType === 1}">{{ desc.negative }}<span class="count">{{negative.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{'on': onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>

</template>

<script type="ecmascript-6">
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: '全部',
          positive:  '满意',
          negative: '不满意'
        }
      }

    }
  },
  computed: {
    positive() {
      return this.ratings.filter((rating) => {   // 过滤，拿到所有是positive的数组
        return rating.rateType === POSITIVE
      })
    },
    negative() {
      return this.ratings.filter((rating) => {   // 过滤，拿到所有是positive的数组
        return rating.rateType === NEGATIVE
      })
    },

  },
  methods: {
    select(type, event) {
      if(!event._constructed) {
        return
      }
      //不可以在子组件内，随意改变父组件传过来的值，通过 $emit 将子组件需要改变的值，发送给父组件，然后父组件在通过 props 传给 子组件，然后 view 就会发生相应的改变
      this.$emit('ratingTypeChange', type)
    },
    toggleContent(event) {
      if(!event._constructed) {
        return
      }
      //向父组件 发送数据，通过 $emit ('xxx',arguments);  父组件： @xxx = '父组件自己的方法aaa'  在 父组件  methods 里调用 aaa(arguments) 接受参数后父组件在通过 props 传给 子组件，然后 view 就会发生相应的改变
      this.$emit('contentToggle', this.onlyContent)
    }
  },

}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .rating-type
      padding: 18px 0
      margin: 0 18px
      border-1px(rgba(7, 17, 27, 0.1)) //1像素边框的mixin
      font-size: 0 //去除行内元素间隙
      .block
        display: inline-block
        padding 8px 12px
        margin-right: 8px
        border-radius: 1px
        line-height: 16px
        font-size: 12px
        color: rgb(77, 85, 93)
        &.active //被选中的按钮的class(由:class控制)
          color: #ffffff
        .count
          margin-left: 2px
          font-size: 8px
        &.positive //设置支持的按钮的样式
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
        &.negative
          background: rgba(77, 85, 93, 0.2)
          &.active
            background: rgb(77, 85, 93)
    .switch
      padding: 12px 18px
      line-height: 24px
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      color: rgb(147, 153, 159)
      font-size: 0
      &.on //on的class样式
        .icon-check_circle
          color: #00c850
      .icon-check_circle
        display: inline-block
        vertical-align: top
        margin-right: 4px
        font-size: 24px
      .text
        // vertical-align: top
        font-size: 12px
</style>
