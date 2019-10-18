<template>
  <div class="buy-page" :style="{height: windowHeight+'px'}">
    <div class="address" @click="goToAddress()" :style="{backgroundColor: color1, color: color3}">
      <!--      <textarea v-model="userAddress" :style="{backgroundColor: color2,color:color4}"></textarea>-->
      {{userAddress}}
    </div>
    <div class="goods-list" :style="{height: (windowHeight - 162) + 'px'}">
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
        <div class="total-price">{{'实付金额：'+totalPrice}}</div>
        <div class="postage">{{'运费：'+ postage}}</div>
      </div>
      <div class="btn-pay" :style="{backgroundColor: color1, color: color3}">支付</div>
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
        userAddressObject: {},
        userAddress: '',
        fromPage: 'cart',
        totalPrice: 0,
        postage: 10,
        color1: color1,
        color2: color2,
        color3: color3,
        color4: color4,
        openid: '',
        all_goods: [],
        windowHeight: 600
      }
    },
    mounted () {
      this.fromPage = this.$root.$mp.query.from
      this.windowHeight = wx.getSystemInfoSync().windowHeight
      this.openid = wx.getStorageSync('openid')
      this.getUserAddress()
      this.all_goods = wx.getStorageSync('buy')
      this.getTotalPrice()
    },
    methods: {
      async getUserAddress () {
        const address = await get('/address/', {openid: this.openid})
        this.userAddressObject = {
          name: address.name,
          tel: address.tel,
          address: address.address
        }
        wx.setStorageSync('address', this.userAddressObject)
        this.userAddress = '收件人：' + this.userAddressObject.name + '\n收货电话：' + this.userAddressObject.tel + '\n收货地址：' + this.userAddressObject.address + '\n'
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
      },
      goToAddress () {
        if (this.openid) {
          wx.navigateTo({
            url: '/pages/address/main?openid=' + this.openid
          })
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
    word-wrap: break-word;
    word-break: break-all;
    white-space: pre-line;
    padding-left: 20px;
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
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  .goods-detail div {
    text-align: center;
  }

  .title_price {
    width: 80%;
  }

  .goods-title, .goods-price {
    width: 100%;
    height: 50%;
    text-align: center;
    line-height: 40px;
  }

  .goods-count {
    width: 20%;
    text-align: center;
    line-height: 88px;
  }

  .address textarea {
    width: 100%;
    height: 100%;
  }

  .price-buy {
    height: 48px;
    width: 100%;
    display: flex;
    flex-direction: row;
  }

  .price-div {
    width: 50%;
  }

  .total-price {
    height: 60%;
    padding-left: 15px;
    vertical-align: middle;
    line-height: 30px;
    color: darkred;
  }

  .postage {
    height: 40%;
    padding-left: 15px;
    vertical-align: top;
    font-size: 90%;
    color: darkgray;
  }

  .btn-pay {
    width: 50%;
    line-height: 50px;
    text-align: center;
    font-size: 110%;
  }
</style>
