<template>
  <div class="body">
    <div class="navbar">

      <div class="yt_logo"></div>

      <div class="topnav">
        <ul>
          <li>
            <a href="#" class="icon_top icon_stop" title="停车管理"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_cold_hot" title="冷热源管理"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_bgm" title="背景音乐"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_build" title="楼宇管理"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_elevator" title="电梯管理"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_fire" title="消防管理"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_group_control" title="操作群控"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_light" title="照明管理"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_monitor" title="监控管理"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_energy" title="能耗查询"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_cold_hot_system" title="冷热源系统"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_voltage" title="变电站"></a>
          </li>

          <li>
            <a href="#" class="icon_top icon_device" title="资源管理"></a>
          </li>

          <li>
            <a href="/" class="icon_top icon_system" title="系统管理"></a>
          </li>
          <!-- 方便进入系统后，查询权限信息 -->

          <li></li>
        </ul>
      </div>
      <div class="login_user"><a href="javascript: void(0);" class="ft20">smartpark</a><i class="icon_small hideUp"></i>
        <ul class="login_user_box">


          <li><a href="/portal/logout" class="last">退出管理</a></li>
        </ul>
      </div>
      <div class="datebox">
        <span class="weather_pic"></span>
        <!-- <div class="weather_detail">
            <a href="javascript:void(0);" class="weatherbar curText">

                <p class="weather_info ft18"></p>

                <p class="weather_temp ft_robotoB ft15"></p>
            </a>
        </div> -->
        <div class="date">
          <span class="time ft50" id="global_time">14:38</span>

          <div class="date_info">

            <p class="ft18" id="global_week">星期日</p>

            <p class="ft_robotoB ft15" id="global_date">2018-12-09</p>

          </div>
        </div>
      </div>

    </div>
    <div class="span12 main  ng-scope" style="margin: 0px;">
      <!--container start-->
      <div class="container">
        <div class="span12 wrapper">
          <!--left content-->
          <div class="span3 w400 mt20 ml20">
            <div class="pubCon h930">
              <div class="allSummary_box">
                <div class="s_b_one">
                  <!--<div class="s_b_one" onclick="showBasicInfoWindow()">-->
                </div>
                <div class="s_b_two pubCon_black">
                  <h2 class="ft30 mb10 colfff" style="cursor: pointer"
                      id="buildingName">中国电信湖南信息园</h2>

                  <p id="buildingAddress">湖南省长沙市雨花区万家丽中路200号</p>

                  <p>
                                <span class="mr10">建筑面积：
                                <em id="buildingArea">
                                    160,000
                                </em>
                                <span class="unit">㎡</span>
                                </span>
                  </p>
                  <p>
                                <span class="mr10">建造日期：
                                    <em id="buildingTime">
                                        2018-11-24
                                    </em>
                                </span>
                  </p>
                </div>
                <div class="s_b_three pubCon_black">
                  <div class="day_weather">
                    <div class="day_w_t left">
                      <p class="mb10"><strong class="ft50 colfff" id="current_t_ra">17</strong>
                        <em><span class="ml5">℃</span></em>
                        <span class="ml10 colfff">
                                    <i id="cuurent_weather_img" class="w_c_pic mr5"></i>
                                    <span class="weather_info"></span>
                                </span></p>

                      <p class="w_s_range">
                                <span class="ff"><i class="icon_small_eno arrow_up_y_eno"></i><em
                                  class="ml10 mr5" id="arrow_up_y">19</em>
                                    <span class="unit">℃</span>
                                </span>
                        <span class="ff ml20"><i class="icon_small_eno arrow_down_y_eno"></i><em
                          class="ml10 mr5" id="arrow_down_y">8</em>
                                            <span class="unit">℃</span>
                                </span>
                      </p>
                    </div>
                    <span class="icon_small_eno icon_config setPos"
                          onclick="setLeftIndoorParam()"></span>

                    <div class="day_w_q right">
                      <p class="mt10">湿度： <em id="current_rh_ra">36.5</em></p>


                    </div>
                  </div>
                  <div id="indoorParam">
                    <dl class="day_weather_detail">
                      <dt>
                        <h3>调度大楼</h3>
                      </dt>
                      <dd>
                        <p>
                            <span>
                                <i class="icon_small_eno mr5 icon_w_t"></i>
                                <em class="ft20 colfff">24.3</em>
                                <em>℃</em>
                            </span>
                          <span class="ml5">
                                <i class="icon_small_eno icon_w_h"></i>
                                <em class="ft20 colfff">35.1</em>
                                <em>%</em>
                            </span>
                        </p>

                        <p>
                            <span>
                                <i class="icon_small_eno mr5 icon_w_c"></i>
                                <em class="ft20 colfff">717</em>
                                <em>ppm</em>
                            </span>
                        </p>
                      </dd>
                    </dl>
                    <dl class="day_weather_detail">
                      <dt>
                        <h3>附属楼</h3>
                      </dt>
                      <dd>
                        <p>
                            <span>
                                <i class="icon_small_eno mr5 icon_w_t"></i>
                                <em class="ft20 colfff">25.1</em>
                                <em>℃</em>
                            </span>
                          <span class="ml5">
                                <i class="icon_small_eno icon_w_h"></i>
                                <em class="ft20 colfff">14.3</em>
                                <em>%</em>
                            </span>
                        </p>

                        <p>
                            <span>
                                <i class="icon_small_eno mr5 icon_w_c"></i>
                                <em class="ft20 colfff">170</em>
                                <em>ppm</em>
                            </span>
                        </p>
                      </dd>
                    </dl>
                    <dl class="day_weather_detail">
                      <dt>
                        <h3 style="font-size: 18px">通信机楼</h3>
                      </dt>
                      <dd>
                        <p>
                            <span>
                                <i class="icon_small_eno mr5 icon_w_t"></i>
                                <em class="ft20 colfff">5.1</em>
                                <em>℃</em>
                            </span>
                          <span class="ml5">
                                <i class="icon_small_eno icon_w_h"></i>
                                <em class="ft20 colfff">44.9</em>
                                <em>%</em>
                            </span>
                        </p>

                        <p>
                            <span>
                                <i class="icon_small_eno mr5 icon_w_c"></i>
                                <em class="ft20 colfff">1250</em>
                                <em>ppm</em>
                            </span>
                        </p>
                      </dd>
                    </dl>
                  </div>
                  <!-- <div class="park_detail">园区概况</div> -->
                </div>
              </div>
            </div>
          </div>
          <!--center content-->
          <div class="span9 w1060 mt20 ml10">
            <div id="myCarousel" class="carousel slide">
              <!-- 轮播（Carousel）指标 -->
              <ol class="carousel-indicators" style="right: 500px;">
                <!--<li data-target="#myCarousel" data-slide-to="0" class="active"></li>-->
                <!--<li data-target="#myCarousel" data-slide-to="1"></li>-->
                <!--<li data-target="#myCarousel" data-slide-to="2"></li>-->
              </ol>
              <!-- 轮播（Carousel）项目 -->
              <div class="carousel-inner">
                <div class="item active">
                  <div class="pubCon h480 ">
                    <div class="pubCon_black con_indexT">
                      <div class="con_i_l">
                        <!-- <div class="chartBbox"> -->
                        <div id="container" style="height: 100%"></div>
                        <!-- </div> -->
                      </div>
                      <div class="con_i_r">
                        <dl>
                          <dt id="c_totalEnergy_param_key1_name">昨日用电</dt>
                          <dd><span class="unit right pt5"
                                    id="c_totalEnergy_param_key1_unit">kWh</span><strong
                            class="ft40 left ml20 colfff" id="lastDayElec">850</strong></dd>
                        </dl>
                        <dl>
                          <dt id="c_totalEnergy_param_key2_name">本月累计用电</dt>
                          <dd><span class="unit right pt5"
                                    id="c_totalEnergy_param_key2_unit">kWh</span><strong
                            class="ft40 left ml20 colfff" id="currMonthElec">46,344</strong>
                          </dd>
                        </dl>
                        <dl class="last">
                          <dt id="c_totalEnergy_param_key3_name">上月用电</dt>
                          <dd><span class="unit right pt5"
                                    id="c_totalEnergy_param_key3_unit">kWh</span><strong
                            class="ft40 left ml20 colfff">50,978</strong></dd>
                        </dl>
                      </div>
                    </div>
                    <div class="pubCon_black con_indexB">
                      <ul class="energy_use_status">
                        <li>
                          <div id="scaPieChart" class="chartPic_energy_havc"
                               style="height: 100%"></div>

                          <p id="c_chart1_text">通信机楼&nbsp;&nbsp;&nbsp;</p>

                          <p><em class="ft22 colfff mr20">22,530</em>kWh</p>
                        </li>
                        <li>
                          <div id="bohPieChart" class="chartPic_energy_light"
                               style="height: 100%"></div>

                          <p id="c_chart2_text">调度大楼</p>

                          <p><em class="ft22 colfff mr20">31,780</em>kWh</p>
                        </li>
                        <li>
                          <div id="parkPieChart" class="chartPic_energy_device"
                               style="height: 100%"></div>

                          <p id="c_chart3_text">停车场</p>

                          <p><em class="ft22 colfff mr20">24,442</em>kWh</p>
                        </li>
                        <li>
                          <div id="coldPieChart" class="chartPic_energy_other"
                               style="height: 100%"></div>

                          <p id="c_chart4_text" class="ft22">冷站</p>

                          <p><em class="ft22 colfff mr20">38,119</em>kWh</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="item">
                  <!--  tab2  -->
                </div>
                <div class="item">
                  <!--  tab3  -->
                </div>
              </div>
              <!-- 轮播（Carousel）导航 -->
              <!--<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">-->
              <!--<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>-->
              <!--<span class="sr-only">Previous</span>-->
              <!--</a>-->
              <!--<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">-->
              <!--<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>-->
              <!--<span class="sr-only">Next</span>-->
              <!--</a>-->
            </div>
            <!-- 子系统运行状况 -->
            <div class="pubCon pubCon_black h420 mt30">
              <div class="index_tit">
                <h2>智能系统运行情况</h2>

                <div class="legend">
                  <ul>
                    <li><i class="icon_small_eno alarm_green mr10"></i>正常</li>

                    <li><i class="icon_small_eno alarm_grey mr10"></i>未连接</li>
                  </ul>
                </div>
              </div>
              <div class="subSystem_run">
                <ul>
                  <li>
                    <a href="#"><i class="icon_big_eno group_control"></i></a>

                    <p class="colfff">冷机群控<span class=" icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_HVAC">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno light"></i>

                    <p class="colfff">室外照明<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_LSPUB">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno cold_hot_system"></i>

                    <p class="colfff">热源系统<span class="icon_small_eno alarm_grey"></span></p>

                    <p class="colfff" id="dashboard_LSN">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno voltage"></i>

                    <p class="colfff">变配电<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_ETD">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno build"></i>

                    <p class="colfff">楼宇自控<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_WSDS">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno monitor"></i>

                    <p class="colfff">视频监控<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_MSVDO">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno energy"></i>

                    <p class="colfff">能耗计量<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_SASSA">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno entrance"></i>

                    <p class="colfff">门禁管理<span class="icon_small_eno alarm_grey"></span></p>

                    <p class="colfff" id="dashboard_SASAC">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno go_around"></i>

                    <p class="colfff">巡更管理<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" style="color:yellow;" id="dashboard_EP">报警信息 (3)</p>
                  </li>
                  <li>
                    <i class="icon_big_eno elevator"></i>

                    <p class="colfff">电梯运行<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_MSEM">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno fire"></i>

                    <p class="colfff">消防监控<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_FAS">暂无报警</p>
                  </li>
                  <li>
                    <i class="icon_big_eno stop_car"></i>

                    <p class="colfff">停车管理<span class="icon_small_eno alarm_green"></span></p>

                    <p class="colfff" id="dashboard_PARKM">暂无报警</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!--right content-->
          <div class="span3 w400 mt20 ml10" style="padding-right:10px">
            <div class="pubCon h300">
              <div class="pubCon_black con_indexT280">
                <div class="index_tit"><h2 id="energyModuleName">园区资源统计</h2></div>
                <div class="chartBbox">
                  <ul>
                    <li>
                      <h3>监控</h3>
                      <div class="box">
                        <i class="icon_monitor_available"></i>
                        <i class="icon_monitor_available"></i>
                        <i class="icon_monitor_available"></i>
                        <i class="icon_monitor_unavailable"></i>
                        <i class="icon_monitor_unavailable"></i>
                      </div>
                      <span>180</span>
                    </li>
                    <li>
                      <h3>门禁</h3>
                      <div class="box">
                        <i class="icon_gate_available"></i>
                        <i class="icon_gate_available"></i>
                        <i class="icon_gate_available"></i>
                        <i class="icon_gate_available"></i>
                        <i class="icon_gate_unavailable"></i>
                      </div>
                      <span>10</span>
                    </li>
                    <li>
                      <h3>电梯</h3>
                      <div class="box">
                        <i class="icon_elevator_available"></i>
                        <i class="icon_elevator_available"></i>
                        <i class="icon_elevator_available"></i>
                        <i class="icon_elevator_available"></i>
                        <i class="icon_elevator_unavailable"></i>
                      </div>
                      <span>5</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="pubCon h300 mt30">
              <div class="pubCon_black con_indexT280">
                <div class="index_tit"><h2>实时停车车辆</h2></div>
                <div class="chartBbox">
                  <ul>
                    <li>
                      <h3>总停车</h3>
                      <div class="box">
                        <i class="icon_car_available"></i>
                        <i class="icon_car_available"></i>
                        <i class="icon_car_available"></i>
                        <i class="icon_car_unavailable"></i>
                        <i class="icon_car_unavailable"></i>
                      </div>
                      <span>180</span>
                    </li>
                    <li>
                      <h3>预约车</h3>
                      <div class="box">
                        <i class="icon_car_available"></i>
                        <i class="icon_car_available"></i>
                        <i class="icon_car_available"></i>
                        <i class="icon_car_unavailable"></i>
                        <i class="icon_car_unavailable"></i>
                      </div>
                      <span>10</span>
                    </li>
                    <li>
                      <h3>车位数</h3>
                      <div class="box">
                        <i class="icon_stop_car_available"></i>
                        <i class="icon_stop_car_available"></i>
                        <i class="icon_stop_car_available"></i>
                        <i class="icon_stop_car_unavailable"></i>
                        <i class="icon_stop_car_unavailable"></i>
                      </div>
                      <span>5</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="pubCon h300 mt30">
              <div class="pubCon_black con_indexT280">
                <div id="lineChart" style="width:100%; height: 100%"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  @import "../../assets/eno/css/base.css";
  @import "../../assets/eno/css/common.css";
  @import "../../assets/eno/css/icon.css";
  @import "../../assets/eno/css/monitor.css";
  @import "../../assets/eno/css/index.css";
  @import "../../assets/abas/css/base.css";
</style>

<script>
  import {
    drawBarChart,
    drawLineChart,
    drawScaPieChart,
    drawBohPieChart,
    drawParkPieChart,
    drawColdPieChart
  } from '../../assets/eno/scripts/common.js'

  export default {
    name: 'hello',
    data () {
      return {}
    },
    mounted () {
      this.drawBarChart()
      this.drawLineChart()
      this.drawScaPieChart()
      this.drawBohPieChart()
      this.drawParkPieChart()
      this.drawColdPieChart()
    },
    methods: {
      drawBarChart () {
        drawBarChart()
      },
      drawLineChart: function () {
        drawLineChart()
      },
      drawScaPieChart: function () {
        drawScaPieChart()
      },
      drawBohPieChart: function () {
        drawBohPieChart()
      },
      drawParkPieChart: function () {
        drawParkPieChart()
      },
      drawColdPieChart: function () {
        drawColdPieChart()
      }
    }
  }
</script>
