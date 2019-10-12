<template>
    <div @click="clickHandle" class="main-page">
        <!--        <img src="http://127.0.0.1:5000/image/da635b76-ebfb-11e9-9cf0-4ccc6a382b99" alt="">-->
        <div v-for="(goods, index) in allGoods" :key="index" class="goods-div" @click="go_to_detail(goods.goodsId)">
            <img :src="goods.url" alt="" class="goods-pic">
        </div>
    </div>
</template>

<script>
  import card from '@/components/card'
  import {get, host} from '../../utils'

  export default {
    onShow () {

    },
    mounted () {
      this.getData()
    },
    data () {
      return {
        allGoods: [],
        motto: 'Hello miniprograme',
        userInfo: {
          nickName: 'mpvue',
          avatarUrl: 'http://mpvue.com/assets/logo.png'
        }
      }
    },

    components: {
      card
    },

    methods: {
      async getData () {
        const data = await get('/')
        for (const good of data) {
          const url = host + '/image/' + good.images[0].uuid
          const goodsId = good.uuid
          this.allGoods.push({url: url, goodsId: goodsId})
        }
      },
      bindViewTap () {
        const url = '../logs/main'
        if (mpvuePlatform === 'wx') {
          mpvue.switchTab({url})
        } else {
          mpvue.navigateTo({url})
        }
      },
      clickHandle (ev) {
        console.log('clickHandle:', ev)
        // throw {message: 'custom test'}
      },
      go_to_detail (goodsId) {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + goodsId
        })
      }
    },
    created () {
      // let app = getApp()
    }

  }
</script>

<style scoped>
    .main-page {
        width: 100%;
        padding: 0 10rpx;
        display: flex;
        flex-wrap: wrap;
    }

    .goods-div {
        width: 50%;
        justify-content: center;
        display: flex;
    }

    .goods-pic {
        max-width: 100%;
        max-height: 100%;
        width: 300rpx;
        height: 300rpx;;

    }
</style>
