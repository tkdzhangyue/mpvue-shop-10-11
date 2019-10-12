<template>
    <div class="detail_page">
        <div class="details-images" :style="{height: pagesDivHeight + 'px'}">
            <div class="pic_div" v-for="(image, index) in images" :key="index">
                <img alt="" :src="image" class="detail_pic">
            </div>
        </div>
        <button class="btn-buy" @click="buyNow(goodsId)">马上购买</button>
    </div>
</template>

<script>
  import {get, host} from '../../utils'

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

    .details-images {
        overflow: auto;
    }

</style>
