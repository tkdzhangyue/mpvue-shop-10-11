<template>
    <div class="cart_page">
        <div class="goods_in_cart" v-for="(goods, index) in data.cartInfo">

        </div>
    </div>

</template>

<script>
  import {get} from '../../utils'

  export default {
    name: 'shopping_cart',
    created () {
      this.data = {openid: '', cartInfo: []}
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
        openid: '',
        cartInfo: []
      }
    },
    mounted () {
      this.init()
    },
    methods: {
      init () {
        this.data.cartInfo = []
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
        this.data.cartInfo = await get('/cart/', {'openid': openid})
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
        color: aqua;
    }
</style>
