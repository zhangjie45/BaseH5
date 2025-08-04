<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <button type="primary" @click="useCountStore.count++"> 点击 {{ count }} </button>
      <button @click="testReq">测试</button>
    </view>
    <button @click="testSetToken">测试</button>
    <uv-button type="primary" @click="jumpUrl" text="确定"></uv-button>
  </view>
</template>

<script setup>
  import { reqDictData } from '@/api/test'
  import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
  const title = 'Hello Vue 3.0 + Vite'
  import { useOutsideCountStore } from '@/store/count'
  const useCountStore = useOutsideCountStore()
  const count = computed(() => useCountStore.count)

  function testReq() {
    reqDictData().then((res) => {
      console.log(res)
    })
  }
  function testSetToken() {
    SET_TOKEN('123')
    console.log(GET_TOKEN())
  }
  function jumpUrl() {
    uni.navigateTo({
      url: '/pages/home'
    })
  }
</script>

<style>
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .logo {
    height: 200rpx;
    width: 200rpx;
    margin-top: 200rpx;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50rpx;
  }

  .text-area {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 36rpx;
    color: #8f8f94;
  }
</style>
