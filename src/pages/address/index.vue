<template>
  <div class="address-main">
    <div class="address-edit" :style="{height: (windowHeight - 52)+ 'px'}">
      <div class="name" :style="{borderColor: color2}">
        <input v-model="name" :style="{color: color4}" placeholder="姓名：张全蛋">
      </div>
      <div class="tel" :style="{borderColor: color2}">
        <input v-model="tel" :style="{color: color4}" placeholder="小仙女的手机号：156xxx66606">
      </div>
      <div class="address1" :style="{borderColor: color2}">
        <input v-model="address1" :style="{color: color4}" placeholder="收货地址：辽宁省大连市xxxx街道李大妈代收">
      </div>
    </div>

    <div class="btn-ok" @click="btnOkOnClick()" :style="{backgroundColor: color1,color: color3}">
      保存
    </div>
  </div>
</template>

<script>
  import {color1, color2, color3, color4, post} from '../../utils'

  export default {
    name: 'address',
    onLoad () {
      wx.setNavigationBarTitle({
        title: '填写地址'
      })
    },
    data () {
      return {
        name: '',
        tel: null,
        address1: '',
        address2: '',
        color1: color1,
        color2: color2,
        color3: color3,
        color4: color4,
        openid: '',
        userAddress: '',
        windowHeight: 600
      }
    },
    mounted () {
      this.openid = wx.getStorageSync('openid')
      this.windowHeight = wx.getSystemInfoSync().windowHeight
    },
    methods: {
      btnOkOnClick () {
        if (this.name.length < 2 || this.tel.length < 6 || this.address1.length < 6) {
          wx.showToast({
            title: '小仙女的地址不全',
            duration: 2000
          })
        } else {
          this.updateUserAddress()
          wx.navigateTo({
            url: '/pages/buy/main?from=' + 'address'
          })
        }
      },
      async updateUserAddress () {
        await post('/address/', {
          'name': this.name,
          'tel': this.tel,
          'address': this.address1
        })
      }

    }
  }
</script>
<style scoped>
  .address-edit {
    padding-left: 15px;
    padding-right: 15px;
  }

  .address-edit div {
    width: calc(100% - 30px);
    height: 60px;
    border-bottom: 1px solid;
    display: flex;
    flex-direction: column-reverse;
  }

  .address-edit div > input {
    line-height: 40px;
    height: 40px;
  }

  .btn-ok {
    width: 100%;
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-size: 120%;
  }

</style>
