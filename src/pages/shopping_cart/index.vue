<template>
    <div class="cart_page">
        <div class="goods_in_cart" v-for="(goods, index) in cartInfo"
             :style="{backgroundColor: index%2===0? color1: color2}">
            <div class="goods_pic">
                <img alt="" :src="goods.image">
            </div>
            <div class="goods-count">
                <p>{{goods.count}}</p>
            </div>
        </div>
    </div>

</template>

<script>
  import {color1, color2, get, host} from '../../utils'

  export default {
    name: 'shopping_cart',
    created () {
    },
    onLoad () {
      wx.setNavigationBarTitle({
        title: '购物车',
        success: function (res) {
          // success
        }
      })
    },
    data () {
      return {
        color1: color1,
        color2: color2,
        openid: '',
        cartInfo: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.cartInfo = []
        const that = this
        try {
          const openid = wx.getStorageSync('openid')
          if (openid) {
            that.getCart(openid)
          }
        } catch (e) {
          console.log('getStorageSync openid error')
        }
      },
      async getCart (openid) {
        const cart = await get('/cart/', {'openid': openid})
        for (const goods of cart) {
          this.cartInfo.push({image: host + '/image/' + goods.image, count: goods.count})
        }
      }
    }
  }
</script>

<style scoped>
    .cart_page {
        width: 100%;
    }

    .goods_in_cart {
        height: 100px;
        width: 100%;
        padding: 10px;
    }

    .goods_pic {
        width: 80px;
        height: 80px;

    }
</style>
