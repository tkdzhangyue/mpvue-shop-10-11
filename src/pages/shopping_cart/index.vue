<template>
  <div>
    <div class="cart_page" :style="{height: pagesDivHeight + 'px'}">
      <div class="goods_in_cart" v-for="(goods, index) in cartInfo"
           :style="{backgroundColor: index%2===0? color1: color2}">
        <div class="goods_pic">
          <img alt="" :src="goods.image">
        </div>
        <div class="goods-title">
          <div class="title" :style="{color: index%2===0? color3: color4}">
            {{goods.title}}
          </div>
          <div class="price_count">
            <div class="price" :style="{color: index%2===0? color3: color4}">{{'¥'+goods.price}}</div>
            <div class="count-btn">
              <div class="btn-border" :style="{borderColor:index%2===0? color3: color4}">
                <div class="btn-1" @click="btn_1_onclick"
                     :style="{borderColor:index%2===0? color3: color4}">-
                </div>
                <div class="btn-2" @click="btn_2_onclick"
                     :style="{color: index%2===0? color2: color1, borderColor:index%2===0? color3: color4}">
                  {{goods.count}}
                </div>
                <div class="btn-3" @click="btn_3_onclick"
                     :style="{borderColor:index%2===0? color3: color4}">+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buy_now">
      <div class="total_price" :style="{backgroundColor: color1, color: color3}">{{'¥'+ total_price}}</div>
      <div class="btn-buy" @click="buyAll"
           :style="{backgroundColor: color2, color: color4}">去结算
      </div>
    </div>
  </div>

</template>

<script>
  import {color1, color2, color3, color4, get, host} from '../../utils'

  export default {
    name: 'shopping_cart',
    created () {
    },
    onShow () {
      this.cartList = wx.getStorageSync('cartList')
      this.openid = wx.getStorageSync('openid')
      this.allGoods = wx.getStorageSync('allGoods')
      this.getCart()
    },
    onLoad () {
      wx.setNavigationBarTitle({
        title: '购物车'
      })
    },
    data () {
      return {
        total_price: 0,
        color1: color1,
        color2: color2,
        color3: color3,
        color4: color4,
        openid: '',
        cartInfo: [],
        cartList: [],
        allGoods: [],
        pagesDivHeight: 400
      }
    },
    mounted () {
      this.pagesDivHeight = wx.getSystemInfoSync().windowHeight - 53
    },
    methods: {
      async getCart () {
        if (this.cartList.length === 0) {
          this.cartList = await get('/cart/', {'openid': this.openid})
        }
        this.total_price = 0
        this.cartInfo = []
        for (const goods of this.cartList) {
          for (const item of this.allGoods) {
            if (goods.goods_id === item.goodsId) {
              goods.price = item.price
              goods.stock_num = item.stock_num
              goods.title = item.title
            }
          }
          this.cartInfo.push({
            image: host + '/image/' + goods.image,
            count: goods.count,
            title: goods.title,
            price: goods.price,
            stock_num: goods.stock_num,
            goods_id: goods.goods_id
          })
          this.total_price += goods.price * goods.count
        }
      },
      btn_1_onclick () {

      },
      btn_2_onclick () {

      },
      btn_3_onclick () {

      },
      buyAll () {
        const buy = []
        for (const goods of this.cartInfo) {
          buy.push({
            'goods_id': goods.goods_id,
            'count': goods.count,
            'price': goods.price,
            'image': goods.image,
            'title': goods.title
          })
        }
        wx.setStorageSync('buy', buy)
        wx.navigateTo({
          url: '/pages/buy/main?openid=' + this.openid
        })
      }
    }
  }
</script>

<style scoped>
  .cart_page {
    width: 100%;
    overflow: auto;
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
    display: flex;
    flex-direction: row;
    margin: 0 auto;
  }

  .btn-border div {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }

  .btn-1, .btn-3 {
    border: solid 1px white;
  }

  .btn-2 {
    border-top: solid 1px white;
    border-bottom: solid 1px white;
  }

  .buy_now {
    height: 48px;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .total_price {
    text-align: center;
    line-height: 48px;
    width: 50%;
  }

  .btn-buy {
    width: 50%;
    text-align: center;
    line-height: 48px;
  }
</style>
