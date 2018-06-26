/**
 * Created by JHPC on 2018/6/26.
 */

$(function() {

  // 基于准备好的dom，初始化echarts实例
  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));

  // 指定图表的配置项和数据
  var option = {
    title: {
      text: '2017年宫殿人数'
    },
    tooltip: {},
    legend: {
      data:['人数']
    },
    xAxis: {
      data: ["1月","2月","3月","4月","5月","6月"]
    },
    yAxis: {},
    series: [{
      name: '人数',
      type: 'bar',
      data: [1000, 1500, 1800, 1200, 1000, 400]
    }]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_1.setOption(option);



  // 基于准备好的dom，初始化echarts实例
  var echarts_2 = echarts.init(document.querySelector('.echarts_2'));

  // 指定图表的配置项和数据
  var option1 = {
    title : {
      text: '热门宫殿人口',
      subtext: '2018年6月',
      x:'center'
    },
    tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['太极宫','大明宫','兴庆宫','未央宫','华清宫']
    },
    series : [
      {
        name: '宫殿',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data:[
          {value:335, name:'太极宫'},
          {value:310, name:'大明宫'},
          {value:234, name:'兴庆宫'},
          {value:135, name:'未央宫'},
          {value:1548, name:'华清宫'}
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  // 使用刚指定的配置项和数据显示图表。
  echarts_2.setOption(option1);

})
