<!--
  页面类型:
  文件名:home
  菜单路径:
  功能描述:
  创建时间:2025-01-15 14:28:02
-->
<template>
  <view>
    <view class="charts-box">
      <qiun-data-charts type="map" :opts="opts" :chartData="chartData" />
    </view>
  </view>
</template>

<script setup>
  import { ref } from 'vue'
  import CHINA from './CHINA.json'
  const chartData = ref({})
  const opts = ref({
    color: [
      '#1890FF',
      '#91CB74',
      '#FAC858',
      '#EE6666',
      '#73C0DE',
      '#3CA272',
      '#FC8452',
      '#9A60B4',
      '#ea7ccc'
    ],
    padding: [0, 0, 0, 0],
    dataLabel: true,
    enableScroll: false,
    extra: {
      map: {
        border: true,
        borderWidth: 1,
        borderColor: '#666666',
        fillOpacity: 0.6,
        activeBorderColor: '#F04864',
        activeFillColor: '#FACC14',
        activeFillOpacity: 1
      }
    }
  })

  function getServerData() {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      let res = {
        series: CHINA.features
      }
      console.log('res--->', res)
      // nextTick(() => {
      chartData.value = JSON.parse(JSON.stringify(res))
      // })
    }, 500)
  }
  getServerData()
</script>

<style scoped>
  .charts-box {
    width: 100%;
    height: 600px;
  }
</style>
