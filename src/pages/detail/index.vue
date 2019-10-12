<template>
    <div class="detail_page">
        <div class="pic_div" v-for="(image, index) in images" :key="index">
            <img alt="" :src="image" class="detail_pic">
        </div>
    </div>
</template>

<script>
  import {get, host} from '../../utils'

  export default {
    name: 'detail',
    mounted () {
      this.goodsId = this.$root.$mp.query.id
      this.getDetail()
    },
    data () {
      return {
        goodsId: '',
        image: '',
        images: []
      }
    },
    components: {},
    methods: {
      async getDetail () {
        const data = await get('/goods/' + this.goodsId)
        for (const image of data) {
          const url = host + '/image/' + image
          this.images.push(url)
        }
      }
    }
  }
</script>

<style scoped>

</style>
