<template>
  <div class="buy-page" :style="{height: windowHeight+'px'}">
    <div class="address">
      <textarea v-model="userAddress" :style="{backgroundColor: color2,color:color4}"></textarea>
    </div>
    <div class="goods-list" :style="{height: (windowHeight - 150) + 'px'}">
      <div class="goods-div" v-for="(goods, index) in all_goods">
        <img :src="goods.image">
        <div class="goods-detail">
          <div class="title_price">
            <div class="goods-title">{{goods.title}}</div>
            <div class="goods-price">{{'单价: '+goods.price}}</div>
          </div>
          <div class="goods-count">{{'x '+goods.count}}</div>
        </div>
      </div>

    </div>
    <div class="price-buy" :style="{backgroundColor: color2,color:color4}">
      <div class="price-div">
        <div class="total-price">{{totalPrice}}</div>
        <div class="postage">{{'运费：'+ postage}}</div>
      </div>
      <div class="btn-pay">支付</div>
    </div>
  </div>
</template>

<script>
  import {color1, color2, color3, color4, get, post} from '../../utils'

  export default {
    name: 'index',
    onLoad () {
      wx.setNavigationBarTitle({
        title: '填写订单'
      })
    },
    data () {
      return {
        totalPrice: 0,
        postage: 10,
        color1: color1,
        color2: color2,
        color3: color3,
        color4: color4,
        openid: '',
        userAddress: '',
        all_goods: [],
        windowHeight: 600
      }
    },
    mounted () {
      this.windowHeight = wx.getSystemInfoSync().windowHeight
      this.openid = this.$root.$mp.query.openid
      this.getUserAddress()
      this.all_goods = wx.getStorageSync('buy')
      this.getTotalPrice()
    },
    methods: {
      async getUserAddress () {
        const addressList = await get('/address/', {'openid': this.openid})
        if (addressList.length > 0) {
          this.userAddress = addressList[addressList.length - 1]
        }
        if (this.userAddress.length < 10) {
          this.userAddress = '收件人：\n收货电话：\n收货地址：\n'
        }
      },
      async setUserAddress (address) {
        await post('/address/', {'openid': this.openid, 'address': address.toString()})
      },
      getTotalPrice () {
        this.totalPrice = 0
        this.totalPrice += this.postage
        for (const goods of this.all_goods) {
          this.totalPrice += goods.price * goods.count
        }
      }
    }
  }
</script>

<style scoped>
  .buy-page {
    overflow: hidden;
  }

  .address {
    height: 100px;
    width: 100%;
  }

  .goods-list {
    overflow: auto;
    width: 100%;
  }

  .goods-div {
    height: 80px;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .goods-div img {
    width: 80px;
    height: 80px;
  }

  .goods-detail {
    width: calc(100% - 88px);
    display: flex;
    flex-direction: row;
  }

  .title_price {
    width: 80%;
  }

  .goods-title, .goods-price {
    width: 100%;
    height: 50%;
    text-align: center;
  }

  .goods-count {
    width: 20%;
    text-align: center;
    line-height: 88px;
  }

  .postage {

  }

  .address textarea {
    width: 100%;
    height: 100%;
  }

  .price-buy {
    height: 48px;
    width: 100%;
  }
</style>
