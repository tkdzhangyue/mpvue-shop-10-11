<template>
    <div @click="clickHandle" class="main-page">
      <img :src="'https://s2.ax1x.com/2019/10/18/KZTWbn.jpg'">
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
      this.doLogin()
    },
    data () {
      return {
        openid: '',
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
          const url = host + '/image/' + good.main_img[2].uuid
          const goodsId = good.goods_id
          this.allGoods.push({
            url: url,
            goodsId: goodsId,
            goods_id: goodsId,
            price: good.price,
            title: good.title,
            stock_num: good.stock_num
          })
        }
        wx.setStorageSync('allGoods', this.allGoods)
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
      },
      doLogin () {
        wx.login({
          success (res) {
            if (res.code) {
              console.log(res)
              wx.request({
                url: host + '/login/' + res.code,
                success: (res) => {
                  const openid = res.data.openid
                  const sessionKey = res.data.session_key
                  wx.setStorageSync('openid', openid)
                  wx.setStorageSync('sessionKey', sessionKey)
                  console.log('openid = ', openid)
                }
              })
            } else {
              console.log('login error' + res.errMsg)
            }
          }
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
        padding: 0 10 rpx;
        display: flex;
        flex-wrap: wrap;
    }

    .goods-div {
        width: 50%;
        height: 150px;
        justify-content: center;
        display: flex;
    }

    .goods-pic {
        max-width: 100%;
        max-height: 100%;
        width: 150px;
        height: 150px;

    }
</style>
