<template>
  <div class="cart_page">
    <div class="goods_in_cart" v-for="(goods, index) in cartInfo"
         :style="{backgroundColor: index%2===0? color1: color2}">
      <div class="goods_pic">
        <img alt="" :src="goods.image">
      </div>
      <div class="goods-title">
        <div class="title">
          {{goods.title}}
        </div>
        <div class="price_count">
          <div class="price">{{'¥'+goods.price}}</div>
          <div class="count-btn">
            <div class="btn-border">
              <div class="btn-1">-</div>
              <div class="btn-2" :style="{color: index%2===0? color2: color1}">{{goods.count}}</div>
              <div class="btn-3">+</div>
            </div>
          </div>
        </div>
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
          this.cartInfo.push({
            image: host + '/image/' + goods.image,
            count: goods.count,
            title: '懒人常备小白鞋清洁增白剂',
            price: 14.9
          })
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
    display: flex;
    flex-direction: row;
  }

  .goods_pic {
    width: 80px;
    height: 80px;
    align-self: center;
    margin-left: 10px;
  }

  .goods_pic img {
    width: 100%;
    height: 100%;
  }

  .goods-title {
    width: calc(100% - 90px)
  }

  .title {
    height: 50%;
    width: 100%;
    text-align: center;
    line-height: 50px;
  }

  .price_count {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .price {
    width: 40%;
    height: 100%;
    text-align: center;
    line-height: 50px;
  }

  .count-btn {
    width: 60%;
    height: 100%;
    text-align: center;
  }

  .btn-border {
    width: 90px;
    height: 30px;
    border: solid 1px white;
    display: flex;
    flex-direction: row;
    margin: 0 auto;
  }

  .btn-border div {
    width: 30px;
    height: 30px;
    border: solid 1px white;
    line-height: 30px;
  }
</style>
