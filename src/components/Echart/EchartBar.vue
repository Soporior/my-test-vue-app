
<template>
  <div id="main">

  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { onMounted } from 'vue';
import testData from "../../../public/getAllGeojsonData.js"

let option;

const dataCount = 5e5;
// const data = generateData(dataCount);
let valueData=[]
let labeldata=[]
testData.data.geojson.forEach(element => {
    labeldata.push(element.properties.cnty)
    valueData.push(element.properties.nums)

});
option = {
  title: {
    text: echarts.format.addCommas(dataCount) + ' Data',
    left: 10
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: false
      },
      saveAsImage: {
        pixelRatio: 2
      }
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    bottom: 90
  },
  dataZoom: [
    {
      type: 'inside',
      orient:"vertical"
    },
    {
      type: 'slider',
      orient:"vertical"

    }
  ],
  xAxis: {
    silent: false,
    splitLine: {
      show: false
    },
    splitArea: {
      show: false
    }
  },
  yAxis: {
    data:labeldata,
    type: 'category',
    splitArea: {
      show: false
    }
  },
  series: [
    {
      type: 'bar',
      data:valueData,
      name:'X',
      // Set `large` for large data amount
      large: true
    }
  ]
};
function generateData(count) {
  let baseValue = Math.random() * 1000;
  let time = +new Date(2011, 0, 1);
  let smallBaseValue;
  function next(idx) {
    smallBaseValue =
      idx % 30 === 0
        ? Math.random() * 700
        : smallBaseValue + Math.random() * 500 - 250;
    baseValue += Math.random() * 20 - 10;
    return Math.max(0, Math.round(baseValue + smallBaseValue) + 3000);
  }
  const categorlabeldata = [];
  const valueData = [];
  for (let i = 0; i < count; i++) {
    categorlabeldata.push(
      echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', time, false)
    );
    valueData.push(next(i).toFixed(2));
    time += 1000;
  }
  return {
    categorlabeldata: categorlabeldata,
    valueData: valueData
  };
}
onMounted(()=>{
  let chartDom = document.getElementById('main');

  let myChart = echarts.init(chartDom);
  option && myChart.setOption(option);

})

</script>
<style>
#main{
  width: 800px;
  height: 800px;
}
</style>