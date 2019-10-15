<template>
    <div class="detail_page">
        <div class="details-images" :style="{height: pagesDivHeight + 'px'}">
            <div class="pic_div" v-for="(image, index) in images" :key="index">
                <img alt="" :src="image" class="detail_pic">
            </div>
        </div>
        <div class="bottom-btn">
            <!--            <button class="btn-cart" @click="">cart</button>-->
            <!--            <button class="btn-favorite" @click="">favorite</button>-->
            <button class="btn-buy" @click="buyNow(goodsId)">立即购买</button>
            <button class="btn-cart" @click="goToCart(goodsId)">加入购物车</button>
        </div>
    </div>
</template>

<script>
  import {get, host, post} from '../../utils'

  export default {
    created () {
    },
    onShow () {
    },
    onLoad () {
    },
    name: 'detail',
    mounted () {
      this.goodsId = this.$root.$mp.query.id
      this.getDetail()
      this.pagesDivHeight = wx.getSystemInfoSync().windowHeight - 48
    },
    data () {
      return {
        openid: '',
        pagesDivHeight: 600,
        systemInfo: {},
        goodsId: '',
        image: '',
        images: []
      }
    },
    components: {},
    methods: {
      async getDetail () {
        this.images = []
        const data = await get('/goods/' + this.goodsId)
        for (const image of data) {
          const url = host + '/image/' + image
          this.images.push(url)
        }
      },
      buyNow (goodsId) {
        // todo
      },
      async goToCart (goodsId) {
        const data = await post('/cart/', {
          'addedGoods': goodsId,
          'openid': wx.getStorageSync('openid')
        })
        console.log('post return ', data)
      }
    },
    computed: {},
    onShareAppMessage () {
      return {
        title: 'test',
        desc: 'test',
        path: '/pages/detail/main?id=' + this.goodsId
      }
    }
  }
</script>

<style scoped>
    .detail_page {
        height: 100%;
    }

    .pic_div {
        display: flex;
        justify-content: center;
    }

    .bottom-btn {
        height: 48px;
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    .btn-cart {
        background-color: #FF7CA7D2;
        border-radius: 0;
        width: 50%;
    }

    .btn-buy {
        background-color: #21ffa88b;
        border-radius: 0;
        width: 50%
    }

    .details-images {
        overflow: auto;
    }

</style>
