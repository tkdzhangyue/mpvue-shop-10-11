function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime
}

const host = 'http://127.0.0.1:5000'
export const color1 = '#FF7CA7D2'
export const color2 = '#21ffa88b'
export const color3 = 'white'
export const color4 = 'darkred'

export {
  host
}

// 请求封装
function request (url, method, data, header = {}) {
  wx.showLoading({
    title: '加载中' // 数据请求前loading
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: host + url, // 仅为示例，并非真实的接口地址
      method: method,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        resolve(res.data)
      },
      // fail: function (error) {
      //   wx.hideLoading()
      //   reject(false)
      // },
      complete: function () {
        wx.hideLoading()
      }
    })
  })
}

export function toLogin () {
  const userInfo = wx.getStorageSync('userInfo')
  return userInfo
}

export function get (url, data) {
  return request(url, 'GET', data)
}

export function post (url, data) {
  return request(url, 'POST', data)
}
