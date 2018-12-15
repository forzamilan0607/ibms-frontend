import echarts from 'echarts'
/**
 * 动态设置日期时间和星期
 */
function GetTime () {
  var mon, day, now, hour, min, sec
  mon = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
  day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  now = new Date()
  hour = now.getHours()
  min = now.getMinutes()
  sec = now.getSeconds()
  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  if (sec < 10) {
    sec = '0' + sec
  }

  var time = hour + ':' + min
  var date = now.getFullYear() + '-' + mon[now.getMonth()] + '-' + (((now.getDate() + '').length === 1) ? '0' + now.getDate() : now.getDate())
  var week = day[now.getDay()]

  //  if ($('#global_time').length) {
  //    $('#global_time').html(time)
  //  }
  //  if ($('#global_date').length) {
  //    $('#global_date').html(date)
  //  }
  //  if ($('#global_week').length) {
  //    $('#global_week').html(week)
  //  }
}

//  获取当前时间，格式为：2013-10-09
function getCurrentTime () {
  var Nowdate = new Date()
  var day = (Nowdate.getDate() + '')
  day = day.length === 1 ? ('0' + day) : day
  var month = ((Nowdate.getMonth() + 1) + '')
  month = month.length === 1 ? ('0' + month) : month
  var t = [Nowdate.getFullYear(), month, day]
  return t.join('-')
}

//  获取当前月份的最后一天，格式为：2013-10-31
function getCurrentMonthLastDay () {
  var currentTime = getCurrentTime()
  var year = currentTime.substring(0, 4)
  var month = currentTime.substring(5, 7)
  var day = new Date(year, month, 0)
  var lastdate = year + '-' + month + '-' + day.getDate()
  return lastdate
}

//  转换日期的格式：把2013-10-09转换为10/09
function transformDateFormat (dateString) {
  var arr = dateString.split('-')
  return arr[1] + '/' + arr[2]
}

//  转换日期格式 :把2013-10-09转换为20131009
function transformDateFormatSecond (dateString) {
  var arr = dateString.split('-')
  return arr[0] + '' + arr[1] + '' + arr[2]
}

//  获取给定的日期对应是周几
function getWeekByDay (dataString) {
  var date = new Date(dataString)
  var week = date.getDay()
  if (week === 1) {
    return '周一'
  }
  if (week === 2) {
    return '周二'
  }
  if (week === 3) {
    return '周三'
  }
  if (week === 4) {
    return '周四'
  }
  if (week === 5) {
    return '周五'
  }
  if (week === 6) {
    return '周六'
  }
  if (week === 0) {
    return '周日'
  }
}

//  根据给出的时间s往后推d天，例如：s=2013-10-13，d=2，则返回2013-10-15
function getTimeByDays (s, d) {
  var Nowdate = new Date(Date.parse(s.replace(/-/g, '/')))
  //  var WeekFirstDay=new Date(Nowdate-((Nowdate.getDay() === 0 ? 7 :
  //  Nowdate.getDay())-d)*86400000)
  var WeekFirstDay = new Date(Nowdate.getTime() + (d * 86400000))
  var day = (WeekFirstDay.getDate() + '')
  day = day.length === 1 ? ('0' + day) : day
  var month = ((WeekFirstDay.getMonth() + 1) + '')
  month = month.length === 1 ? ('0' + month) : month
  var t = [WeekFirstDay.getFullYear(), month, day]
  return t.join('-')
}

//  显示当前日期对应的周的第一天
function showWeekFirstDay (s) {
  var Nowdate = new Date(Date.parse(s.replace(/-/g, '/')))
  var WeekFirstDay = new Date(Nowdate - ((Nowdate.getDay() === 0 ? 7 : Nowdate.getDay()) - 1) * 86400000)
  var day = (WeekFirstDay.getDate() + '')
  day = day.length === 1 ? ('0' + day) : day
  var month = ((WeekFirstDay.getMonth() + 1) + '')
  month = month.length === 1 ? ('0' + month) : month
  var t = [WeekFirstDay.getFullYear(), month, day]
  return t.join('-')
}

//  显示传递日期对应的下个月的第一天
function showNextMonthFirstDay (s) {
  if (s.indexOf('/') > 0) {
    s = s.replace(/-/g, '/')
  }
  var Nowdate = new Date(Date.parse(s))
  Nowdate.setMonth(Nowdate.getMonth() + 1)   //  当前月份往后推一个月
  var month = ((Nowdate.getMonth() + 1) + '')
  //  alert(month, Nowdate)
  month = month.length === 1 ? ('0' + month) : month
  var t = [Nowdate.getFullYear(), month, '01']
  return t.join('-')
}

//  获取上个月的最后一天
function showLastMonthLastDay () {
  var nowdays = new Date()
  var year = nowdays.getFullYear()
  var month = nowdays.getMonth()
  if (month === 0) {
    month = 12
    year = year - 1
  }
  if (month < 10) {
    month = '0' + month
  }
  var firstDay = year + '-' + month + '-' + '01'//  上个月的第一天
  var myDate = new Date(year, month, 0)
  var lastDay = year + '-' + month + '-' + myDate.getDate()  //  上个月的最后一天
  return lastDay
}

//  显示当前日期对应的周的最后一天
function showWeekLastDay (s) {
  if (s.indexOf('/') > 0) {
    s = s.replace(/-/g, '/')
  }
  var Nowdate = new Date(Date.parse(s))
  var WeekFirstDay = new Date(Nowdate - ((Nowdate.getDay() === 0 ? 7 : Nowdate.getDay()) - 1) * 86400000)
  var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000)
  var day = (WeekLastDay.getDate() + '')
  day = day.length === 1 ? ('0' + day) : day
  var month = ((WeekLastDay.getMonth() + 1) + '')
  month = month.length === 1 ? ('0' + month) : month
  var t = [WeekLastDay.getFullYear(), month, day]
  return t.join('-')
}

//  获取天气信息
var humidity = 0

function getWeather () {
  //  var url = 'http:// 47.99.125.173:3000/mock/11/app/ibms/weather/getWeatherInfo'
  //  $.ajax({
  //    url: url, type: 'GET', dataType: 'json', success: function (data) {
  //      console.log(data)
  //      if (data != null) {
  //        var minTemp = data.data.minTemperature
  //        if (minTemp === null || minTemp === '' || minTemp === undefined) {
  //          minTemp = '--'
  //        }
  //        var maxTemp = data.data.maxTemperature
  //        if (maxTemp === null || maxTemp === '' || maxTemp === undefined) {
  //          maxTemp = '--'
  //        }
  //        $('#arrow_up_y').html(maxTemp)   //  左侧最高温度
  //        $('#arrow_down_y').html(minTemp)   //  左侧最低气温
  //        $('.weather_temp').html(data.data.minTemperature + '/' + data.data.maxTemperature)
  //        $('.weather_pic').attr('style', 'background:url(' + data.data.img2 + ') no-repeat  ')
  //        $('.weather_info').html(data.data.weather)
        //    var temperature = data.weather.temperature
        //    temperature = temperature === null ? '-' : temperature
        //    $('#current_t_ra').html(temperature)   //  当前温度
        //    var humidity = data.weather.humidity
        //    if (humidity === null || humidity === '' || humidity === undefined) {
        //      humidity = '--'
        //    }
        //    $('#current_rh_ra').html(humidity + '%')  //  湿度
        // 
        //    //  todo 银泰项目，现场没有温湿度传感器，使用互联网上取到的数据
        //    try {
        //      $('#runmonitor_temperature').html(temperature)  //  室外干球温度
        //      $('#runmonitor_humidity').html(humidity)  //  室外相对湿度
        //    } catch (e) {
        //      console.warn('室外温湿度获取失败')
        //    }
        //    //  todo 清华项目，Dashboard上的室外干球温度和湿度，使用互联网上取到的数据
        //    try {
        //      $('#outdoor_temp_temperature').html(temperature)  //  室外干球温度
        //      $('#outdoor_temp_humidity').html(humidity)  //  室外相对湿度
        //    } catch (e) {
        //      console.warn('清华项目，室外温湿度获取失败')
        //    }
  //      }
  //    }
  //  })
}

/**
 * 格式化数据，中间加逗号分隔
 * @param nStr 要格式化的数字
 * @returns {*}
 */
function addCommas (nStr) {
  nStr += ''
  let x = nStr.split('.')
  let x1 = x[0]
  let x2 = x.length > 1 ? '.' + x[1] : ''
  var rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  return x1 + x2
}

/**
 * 根据子系统名称获取子系统编号
 * @param sytemname 子系统名称
 */
function getChildSystemCode (sytemname) {
  var systemcode = ''
  switch (sytemname) {
    case '暖通空调':
      systemcode = 'HVAC'
      break
    case '夜景照明':
      systemcode = 'LSN'
      break
    case '公共照明':
      systemcode = 'LSPUB'
      break
    case '给水排水':
      systemcode = 'WSDS'
      break
    case '电梯运行':
      systemcode = 'MSEM'
      break
    case '消防系统':
      systemcode = 'FAS'
      break
    case '门禁管理':
      systemcode = 'SASAC'
      break
    case '变配电':
      systemcode = 'ETD'
      break
    case '电子巡更':
      systemcode = 'EP'
      break
    case '停车管理':
      systemcode = 'PARKM'
      break
    case '能源管理':
      systemcode = 'ENVMS'
      break
    default:
      systemcode = ''
      break
  }
  return systemcode
}

/**
 * 将浮点数四舍五入，取小数点后指定位
 * @param x 要取舍的数值
 * @param pos 要取舍的位数（1表示取整、10表示保留一位小数、100表示保留两位小数）
 * @returns {*}
 */
function toDecimalAndPos (x, pos) {
  if (!pos) {
    pos = 10
  }
  var f = parseFloat(x)
  if (isNaN(f)) return 0
  f = Math.round(f * pos) / pos
  return f
}

//  搜索设备信息
function searchAsset () {
  //  var searchInp = $('#search_inp')
  //  searchInp.bind('keydown', function (e) {
  //    if ($('#search_inp').val() != '' && e.keyCode === 13) {// Enter的键值=13
  //      // e.preventDefault()

  //      $('#searchResults_dialog').modal('show')
  //    }
  //  })
}

function getBaseData () {
  //  var action = 'http:// 47.99.125.173:3000/mock/11/ibms/detail.notoken'
  //  var params = {}
  //  $.post(action, params, function (data) {
  //    // console.log(data)
  //    var electricList = data.data.electricList || []
  //    var electricXData = []
  //    var electricYData = []
  //    for (var i = 0; i < electricList.length; i++) {
  //      electricXData.push(electricList[i].date)
  //      electricYData.push(electricList[i].electricity)
  //    }
  //    console.log(electricXData)
  //    drawBarChart(electricXData, electricYData)
  //  })
}

//  获取园区信息
function getParkInfo () {
  //  var action = 'http:// 47.99.125.173:3000/mock/11/basepark/info.notoken'
  //  var params = {
  //    id: 1
  //  }
  //  $.post(action, params, function (data) {
  //    console.log(data)
  //    $('#buildingName').text(data.data.name)
  //    $('#buildingAddress').text(data.data.detailAddress)
  //    $('#buildingArea').text(data.data.buildingArea)
  //    $('#buildingTime').text(data.data.buildingTime)
  //  })
}

function drawBarChart () {
  var dom = document.getElementById('container')
  var myChart = echarts.init(dom)
  var app = {}
  let option = null
  app.title = '信息园本月用电概况'
  option = {
    title: {
      text: app.title,
      left: 'center',
      y: '10',
      textStyle: {
        //  文字颜色
        color: '#ccc',
        //  字体风格,'normal','italic','oblique'
        fontStyle: 'normal',
        //  字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight: 'bold',
        //  字体系列
        fontFamily: 'sans-serif',
        //  字体大小
        fontSize: 24
      }
    },
    backgroundColor: '#080f15',
    xAxis: [{
      type: 'category',
      data: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07', '12-08', '12-09', '12-10', '12-11', '12-12', '12-13', '12-14', '12-15', '12-16', '12-17', '12-18', '12-19', '12-20', '12-21', '12-22', '12-23', '12-24', '12-25', '12-26', '12-27', '12-28', '12-29', '12-30'],
      axisTick: {
        alignWithLabel: true
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }
      },
      splitLine: {
        show: false,
        //   改变轴线颜色
        lineStyle: {
          //  使用深浅的间隔色
          color: ['red']
        }
      },
      //  x轴的颜色和宽度
      axisLine: {
        lineStyle: {
          color: '#fff',
          width: 2  //  这里是坐标轴的宽度,可以去掉
        }
      }
    }],
    yAxis: {
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      splitArea: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#9faeb5',
          fontSize: 16
        }
      },
      axisLine: {
        lineStyle: {
          color: '#4d4d4d'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
      formatter: function (params) {
        return '日期：' + params[0].name + '<br/>' + '用电量：' + params[0].value + ' KWh'
      },
      textStyle: {
        fontSize: 12
      }
    },
    series: {
      type: 'bar',
      itemStyle: {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0,
              color: 'rgba(255,37,117,0.7)'
            },
            {
              offset: 0.5,
              color: 'rgba(0,133,245,0.7)'
            },
            {
              offset: 1,
              color: 'rgba(0,133,245,0.3)'
            }
            ],
            globalCoord: false
          }
        }
      },
      //  barWidth: 7,
      data: [10, 52, 200, 334, 390, 330, 220]
    }
  }
  if (option && typeof option === 'object') {
    myChart.setOption(option, true)
  }
}

function drawPieChart () {
  var dom = document.getElementById('pieChart')
  var myChart = echarts.init(dom)
  var app = {}
  let option = null
  app.title = '信息园资源管理信息统计'
  option = {
    title: {
      text: app.title,
      left: 'center',
      textStyle: {
        // 文字颜色
        color: '#ccc',
        // 字体风格,'normal','italic','oblique'
        fontStyle: 'normal',
        // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight: 'bold',
        // 字体系列
        fontFamily: 'sans-serif',
        // 字体大小
        fontSize: 24
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b} : {c} (占比 {d}%)'
    },
    color: ['#f6da22', '#bbe2e8', '#6cacde'],
    legend: {
      //  orient: 'vertical',
      //  top: 'middle',
      bottom: 10,
      left: 'center',
      data: ['设备总数', '在用总数', '维修总数'],
      backgroundColor: '#fff',
      //  borderColor: 'rgba(178,34,34,0.8)',
      //  borderWidth: 4,
      textStyle: {
        //  文字颜色
        //  color: '#ccc',
        //  字体风格,'normal','italic','oblique'
        fontStyle: 'normal',
        //  字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight: 'bold',
        //  字体系列
        fontFamily: 'sans-serif',
        //  字体大小
        fontSize: 18
      }
    },
    series: [
      {
        type: 'pie',
        radius: '40%',
        center: ['50%', '50%'],
        selectedMode: 'single',
        label: {
          normal: {
            textStyle: {
              fontSize: 18,
              color: '#1adfea'
            }
          }
        },
        data: [
          { value: 2500, name: '设备总数' },
          { value: 2300, name: '在用总数' },
          { value: 200, name: '维修总数' }
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
  }
  if (option && typeof option === 'object') {
    myChart.setOption(option, true)
  }
}

function drawLineChart () {
  let myChart = echarts.init(document.getElementById('lineChart'))
  var app = {}
  let option = null
  app.title = '信息园资源管理信息统计'
  option = {
    tooltip: {
      trigger: 'axis',
      position: function (pt) {
        return [pt[0], '10%']
      }
    },
    title: {
      left: 'center',
      text: '信息园实时人流',
      textStyle: {
        //  文字颜色
        color: '#ccc',
        //  字体风格,'normal','italic','oblique'
        fontStyle: 'normal',
        // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
        fontWeight: 'bold',
        // 字体系列
        fontFamily: 'sans-serif',
        // 字体大小
        fontSize: 24
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00',
        '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00',
        '20:00', '21:00', '22:00', '23:00'],
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff',
          fontSize: '16'
        }
      }
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '100%'],
      axisLabel: {
        textStyle: {
          color: '#9faeb5',
          fontSize: 16
        }
      },
      axisLine: {
        lineStyle: {
          color: '#4d4d4d'
        }
      }
    },
    series: [
      {
        name: '模拟数据',
        type: 'line',
        smooth: true,
        symbol: 'none',
        sampling: 'average',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgb(255, 158, 68)'
          }, {
            offset: 1,
            color: 'rgb(255, 70, 131)'
          }])
        },
        data: [0, 0, 0, 0, 0, 0, 0, 2, 5, 10, 2, 2, 0, 0, 2, 20, 16, 5, 6, 4, 2, 0, 0, 0]
      }
    ]
  }
  myChart.setOption(option)
}

function drawScaPieChart () {
  var dom = document.getElementById('scaPieChart')
  var myChart = echarts.init(dom)
  let option = null
  option = {
    title: {
      text: '10%',
      x: 'center',
      y: 'center',
      textStyle:
      {
        fontWeight: 'normal',
        color: '#0580f2',
        fontSize: '16'
      }
    },
    series: [{
      name: 'Line 1',
      type: 'pie',
      clockWise: false,
      radius: ['50%', '66%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      data: [{
        value: 10,
        itemStyle: {
          normal: {
            color: '#EB5D8E', //  100% 处的颜色,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }, {
        value: 90,
        itemStyle: {
          normal: {
            color: '#536882', //  100% 处的颜色,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }]
    }]
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option, true)
  }
}

function drawBohPieChart () {
  var dom = document.getElementById('bohPieChart')
  var myChart = echarts.init(dom)
  let option = null
  option = {
    title: {
      text: '5%',
      x: 'center',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: '#0580f2',
        fontSize: '16'
      }

    },
    series: [{
      name: 'Line 1',
      type: 'pie',
      clockWise: false,
      radius: ['50%', '66%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      data: [{
        value: 5,
        itemStyle: {
          normal: {
            color: '#48B3F9', //  100% 处的颜色,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }, {
        value: 95,
        itemStyle: {
          normal: {
            color: '#536882', //  100% 处的颜色,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }]
    }]
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option, true)
  }
}

function drawParkPieChart () {
  var dom = document.getElementById('parkPieChart')
  var myChart = echarts.init(dom)
  let option = null
  option = {
    title: {
      text: '13%',
      x: 'center',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: '#0580f2',
        fontSize: '16'
      }

    },
    series: [{
      name: 'Line 1',
      type: 'pie',
      clockWise: false,
      radius: ['50%', '66%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      data: [{
        value: 13,
        itemStyle: {
          normal: {
            color: '#EAC120', // 100% 处的颜色,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }, {
        value: 87,
        itemStyle: {
          normal: {
            color: '#536882', // 100% 处的颜色,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }]
    }]
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option, true)
  }
}

function drawColdPieChart () {
  var dom = document.getElementById('coldPieChart')
  var myChart = echarts.init(dom)
  let option = null
  option = {
    title: {
      text: '16%',
      x: 'center',
      y: 'center',
      textStyle: {
        fontWeight: 'normal',
        color: '#0580f2',
        fontSize: '16'
      }

    },
    series: [{
      name: 'Line 1',
      type: 'pie',
      clockWise: false,
      radius: ['50%', '66%'],
      itemStyle: {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      hoverAnimation: false,
      data: [{
        value: 16,
        itemStyle: {
          normal: {
            color: '#3AF22C', // 100% 处的颜色,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }, {
        value: 84,
        itemStyle: {
          normal: {
            color: '#536882', // 100% 处的颜色,
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          }
        }
      }]
    }]
  }

  if (option && typeof option === 'object') {
    myChart.setOption(option, true)
  }
}

export {
  drawBarChart,
  drawPieChart,
  drawLineChart,
  drawScaPieChart,
  drawBohPieChart,
  drawParkPieChart,
  drawColdPieChart
}
