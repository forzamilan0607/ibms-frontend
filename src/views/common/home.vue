<template>
  <!-- <div class="mod-home">
    <div class="main_bg"></div>
  </div> -->
  <div class="body">
  <div class="navbar">


    <h1 class="logo"></h1>

    <div class="yt_logo"></div>


    <div class="topnav">
        <ul>
            <li>
                <a href="#" class="icon_top my_stopCarManage" title="停车管理"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_coldHotManage" title="冷热源管理"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_bgmManage" title="背景音乐"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_buildManage" title="楼宇管理"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_elevatorManage" title="电梯管理"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_fireManage" title="消防管理"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_groupCtrlManage" title="操作群控"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_lightManage" title="照明管理"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_monitorManage" title="监控管理"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_energyManage" title="能耗查询"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_coldHotSystemManage" title="冷热源系统"></a>
            </li>

            <li>
                <a href="#" class="icon_top my_voltageManage" title="变电站"></a>
            </li>
            <!-- 方便进入系统后，查询权限信息 -->

            <li></li>


        </ul>
    </div>
    <div class="datebox">
        <span class="weather_pic"></span>
        <div class="weather_detail">
            <a href="javascript:void(0);" class="weatherbar curText">

                <p class="weather_info ft18"></p>

                <p class="weather_temp ft_robotoB ft12"></p>
            </a>
        </div>
        <div class="date">
            <span class="time ft50" id="global_time">14:38</span>

            <div class="date_info">

                <p class="ft18" id="global_week">星期日</p>

                <p class="ft_robotoB ft12" id="global_date">2018-12-09</p>

            </div>
        </div>
    </div>
    <!-- <div class="login_user"><a href="javascript: void(0);" class="ft20">smartpark</a><i class="icon_small hideUp"></i>
        <ul class="login_user_box">


            <li><a href="/portal/logout" class="last">退出管理</a></li>
        </ul>
    </div> -->

    <!-- 引入用户管理的导航 -->

    <div class="span12 main  ng-scope" style="margin: 0px;" ng-app="portalApp">


        <!--container start-->
        <div class="container">
            <div class="wrapper">
                <!--left content-->
                <div class="span3 w20 mt20 ml20">
                    <div class="pubCon h930">
                        <div class="allSummary_box">
                            <div class="s_b_one">
                                <!--<div class="s_b_one" onclick="showBasicInfoWindow()">-->
                            </div>
                            <div class="s_b_two pubCon_black">
                                <h2 class="ft20 mb10 colfff" style="cursor: pointer" id="buildingName">
                                    中国电信湖南信息园
                                </h2>

                                <p id="buildingAddress">
                                    长沙市万家丽中路
                                </p>

                                <p>
                                    <span class="mr10">建筑面积：
                                        <em id="buildingArea">
                                            160000
                                        </em>
                                        <span class="unit">㎡</span>
                                    </span>
                                    </p>
                                <p>
                                    <span class="mr10">建造日期：
                                        <em id="buildingTime">
                                            <!--9-->
                                        </em>
                                    </span>
                                </p>
                            </div>
                            <div class="s_b_three pubCon_black">
                                <div class="day_weather">
                                    <div class="day_w_t left">
                                        <p class="mb10"><strong class="ft50 colfff" id="current_t_ra">--</strong><span
                                                class="ml5">℃</span><span class="ml10 colfff">
                                    
                                    <i id="cuurent_weather_img" class="w_c_pic mr5"></i>
                                    <span class="weather_info"></span></span></p>

                                        <p class="w_s_range">
                                            <span class="ff"><i class="icon_small_eno arrow_up_y_eno"></i><em
                                                    class="ml10 mr5" id="arrow_up_y">--</em>
                                                <!--<span class="unit">℃</span>-->
                                            </span>
                                            <span class="ff ml20"><i class="icon_small_eno arrow_down_y_eno"></i><em
                                                    class="ml10 mr5" id="arrow_down_y">--</em>
                                            <!--<span class="unit">℃</span>-->
                                            </span>
                                        </p>
                                    </div>
                                    <span class="icon_small_eno icon_config setPos"
                                          onclick="setLeftIndoorParam()"></span>

                                    <div class="day_w_q right">
                                        <p class="mt10">湿度： <em id="current_rh_ra">--</em></p>


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
                                            <em class="ft12 colfff">24.3</em>
                                            <em>℃</em>
                                        </span>
                                                <span class="ml5">
                                            <i class="icon_small_eno icon_w_h"></i>
                                            <em class="ft12 colfff">35.1</em>
                                            <em>%</em>
                                        </span>
                                            </p>

                                            <p>
                                        <span>
                                            <i class="icon_small_eno mr5 icon_w_c"></i>
                                            <em class="ft12 colfff">717</em>
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
                                            <em class="ft12 colfff">25.1</em>
                                            <em>℃</em>
                                        </span>
                                                <span class="ml5">
                                            <i class="icon_small_eno icon_w_h"></i>
                                            <em class="ft12 colfff">14.3</em>
                                            <em>%</em>
                                        </span>
                                            </p>

                                            <p>
                                        <span>
                                            <i class="icon_small_eno mr5 icon_w_c"></i>
                                            <em class="ft12 colfff">170</em>
                                            <em>ppm</em>
                                        </span>
                                            </p>
                                        </dd>
                                    </dl>
                                    <dl class="day_weather_detail">
                                        <dt>
                                            <h3>通信机楼</h3>
                                        </dt>
                                        <dd>
                                            <p>
                                        <span>
                                            <i class="icon_small_eno mr5 icon_w_t"></i>
                                            <em class="ft12 colfff">5.1</em>
                                            <em>℃</em>
                                        </span>
                                                <span class="ml5">
                                            <i class="icon_small_eno icon_w_h"></i>
                                            <em class="ft12 colfff">44.9</em>
                                            <em>%</em>
                                        </span>
                                            </p>

                                            <p>
                                        <span>
                                            <i class="icon_small_eno mr5 icon_w_c"></i>
                                            <em class="ft12 colfff">1250</em>
                                            <em>ppm</em>
                                        </span>
                                            </p>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--center content-->
                <div class="span9 w56 mt20 ml10">
                    <div id="myCarousel" class="carousel slide">
                        <!-- 轮播（Carousel）指标 -->
                        <!-- <ol class="carousel-indicators" style="right: 500px;">
                            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                            <li data-target="#myCarousel" data-slide-to="1"></li>
                            <li data-target="#myCarousel" data-slide-to="2"></li>
                        </ol> -->
                        <!-- 轮播（Carousel）项目 -->
                        <div class="carousel-inner">
                            <div class="item active">
                                <div class="pubCon h300">
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
                                                        class="ft20 left ml20 colfff" id="lastDayElec">850</strong></dd>
                                            </dl>
                                            <dl>
                                                <dt id="c_totalEnergy_param_key2_name">本月累计用电</dt>
                                                <dd><span class="unit right pt5"
                                                          id="c_totalEnergy_param_key2_unit">kWh</span><strong
                                                        class="ft20 left ml20 colfff" id="currMonthElec">46,344</strong>
                                                </dd>
                                            </dl>
                                            <dl class="last">
                                                <dt id="c_totalEnergy_param_key3_name">上月用电</dt>
                                                <dd><span class="unit right pt5"
                                                          id="c_totalEnergy_param_key3_unit">kWh</span><strong
                                                        class="ft20 left ml20 colfff">50,978</strong></dd>
                                            </dl>
                                        </div>
                                    </div>
                                    <div class="pubCon_black con_indexB">
                                        <ul class="energy_use_status">
                                            <li>
                                                <div id="scaPieChart" class="chartPic_energy_havc"
                                                     style="height: 100%"></div>

                                                <p id="c_chart1_text">SCA&nbsp;&nbsp;&nbsp;</p>

                                                <p><em class="ft16 colfff mr20">2,253</em>kWh</p>
                                            </li>
                                            <li>
                                                <div id="bohPieChart" class="chartPic_energy_light"
                                                     style="height: 100%"></div>

                                                <p id="c_chart2_text">BOH</p>

                                                <p><em class="ft16 colfff mr20">31,780</em>kWh</p>
                                            </li>
                                            <li>
                                                <div id="parkPieChart" class="chartPic_energy_device"
                                                     style="height: 100%"></div>

                                                <p id="c_chart3_text">停车场</p>

                                                <p><em class="ft16 colfff mr20">24,442</em>kWh</p>
                                            </li>
                                            <li>
                                                <div id="coldPieChart" class="chartPic_energy_other"
                                                     style="height: 100%"></div>

                                                <p id="c_chart4_text" class="ft22">冷站</p>

                                                <p><em class="ft16 colfff mr20">38,119</em>kWh</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <!--<div class="pubCon h480 ">-->
                                <!--<div class="pubCon_black con_indexT">-->
                                <!--<div class="con_i_l">-->
                                <!--&lt;!&ndash;<div class="index_tit">&ndash;&gt;-->
                                <!--&lt;!&ndash;<h2 id="todayEnergyText">信息园本月用电概况</h2>&ndash;&gt;-->
                                <!--&lt;!&ndash;<span class="icon_small_eno icon_config" onclick="setTotalEnergyModule()"></span>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--<div class="chartBbox">-->
                                <!--<div id="container" style="height: 100%"></div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--<div class="con_i_r">-->
                                <!--<dl>-->
                                <!--<dt id="c_totalEnergy_param_key1_name">昨日用电</dt>-->
                                <!--<dd><span class="unit right pt5"-->
                                <!--id="c_totalEnergy_param_key1_unit">kWh</span><strong-->
                                <!--class="ft40 left ml20 colfff" id="lastDayElec">850</strong></dd>-->
                                <!--</dl>-->
                                <!--<dl>-->
                                <!--<dt id="c_totalEnergy_param_key2_name">本月累计用电</dt>-->
                                <!--<dd><span class="unit right pt5"-->
                                <!--id="c_totalEnergy_param_key2_unit">kWh</span><strong-->
                                <!--class="ft40 left ml20 colfff" id="currMonthElec">46,344</strong>-->
                                <!--</dd>-->
                                <!--</dl>-->
                                <!--<dl class="last">-->
                                <!--<dt id="c_totalEnergy_param_key3_name">上月用电</dt>-->
                                <!--<dd><span class="unit right pt5"-->
                                <!--id="c_totalEnergy_param_key3_unit">kWh</span><strong-->
                                <!--class="ft40 left ml20 colfff">50,978</strong></dd>-->
                                <!--</dl>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--<div class="pubCon_black con_indexB">-->
                                <!--<ul class="energy_use_status">-->
                                <!--<li>-->
                                <!--<div class="chartPic_energy_havc" id="msem_chart"-->
                                <!--data-highcharts-chart="0">-->
                                <!--</div>-->

                                <!--<p id="c_chart1_text">SCA&nbsp;&nbsp;&nbsp;</p>-->

                                <!--<p><em class="ft22 colfff mr20">2,253</em>kWh</p>-->
                                <!--</li>-->
                                <!--<li>-->
                                <!--<div class="chartPic_energy_light" id="hvac_chart"-->
                                <!--data-highcharts-chart="1">-->
                                <!--</div>-->

                                <!--<p id="c_chart2_text">BOH</p>-->

                                <!--<p><em class="ft22 colfff mr20">31,780</em>kWh</p>-->
                                <!--</li>-->
                                <!--<li>-->
                                <!--<div class="chartPic_energy_device" id="wsds_chart"-->
                                <!--data-highcharts-chart="2">-->

                                <!--</div>-->

                                <!--<p id="c_chart3_text">停车场</p>-->

                                <!--<p><em class="ft22 colfff mr20">24,442</em>kWh</p>-->
                                <!--</li>-->
                                <!--<li>-->
                                <!--<div class="chartPic_energy_other" id="other_chart"-->
                                <!--data-highcharts-chart="3">-->
                                <!--</div>-->

                                <!--<p id="c_chart4_text" class="ft22">冷站</p>-->

                                <!--<p><em class="ft22 colfff mr20">38,119</em>kWh</p>-->
                                <!--</li>-->
                                <!--</ul>-->
                                <!--</div>-->
                                <!--</div>-->
                            </div>
                            <div class="item">
                                <!--<div class="pubCon h480 ">-->
                                <!--<div class="pubCon_black con_indexT">-->
                                <!--<div class="con_i_l">-->
                                <!--&lt;!&ndash;<div class="index_tit">&ndash;&gt;-->
                                <!--&lt;!&ndash;<h2 id="todayEnergyText">信息园本月用电概况</h2>&ndash;&gt;-->
                                <!--&lt;!&ndash;<span class="icon_small_eno icon_config" onclick="setTotalEnergyModule()"></span>&ndash;&gt;-->
                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                <!--<div class="chartBbox">-->
                                <!--<div id="container" style="height: 100%"></div>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--<div class="con_i_r">-->
                                <!--<dl>-->
                                <!--<dt id="c_totalEnergy_param_key1_name">昨日用电</dt>-->
                                <!--<dd><span class="unit right pt5"-->
                                <!--id="c_totalEnergy_param_key1_unit">kWh</span><strong-->
                                <!--class="ft40 left ml20 colfff" id="lastDayElec">850</strong></dd>-->
                                <!--</dl>-->
                                <!--<dl>-->
                                <!--<dt id="c_totalEnergy_param_key2_name">本月累计用电</dt>-->
                                <!--<dd><span class="unit right pt5"-->
                                <!--id="c_totalEnergy_param_key2_unit">kWh</span><strong-->
                                <!--class="ft40 left ml20 colfff" id="currMonthElec">46,344</strong>-->
                                <!--</dd>-->
                                <!--</dl>-->
                                <!--<dl class="last">-->
                                <!--<dt id="c_totalEnergy_param_key3_name">上月用电</dt>-->
                                <!--<dd><span class="unit right pt5"-->
                                <!--id="c_totalEnergy_param_key3_unit">kWh</span><strong-->
                                <!--class="ft40 left ml20 colfff">50,978</strong></dd>-->
                                <!--</dl>-->
                                <!--</div>-->
                                <!--</div>-->
                                <!--<div class="pubCon_black con_indexB">-->
                                <!--<ul class="energy_use_status">-->
                                <!--<li>-->
                                <!--<div class="chartPic_energy_havc" id="msem_chart"-->
                                <!--data-highcharts-chart="0">-->
                                <!--</div>-->

                                <!--<p id="c_chart1_text">SCA&nbsp;&nbsp;&nbsp;</p>-->

                                <!--<p><em class="ft22 colfff mr20">2,253</em>kWh</p>-->
                                <!--</li>-->
                                <!--<li>-->
                                <!--<div class="chartPic_energy_light" id="hvac_chart"-->
                                <!--data-highcharts-chart="1">-->
                                <!--</div>-->

                                <!--<p id="c_chart2_text">BOH</p>-->

                                <!--<p><em class="ft22 colfff mr20">31,780</em>kWh</p>-->
                                <!--</li>-->
                                <!--<li>-->
                                <!--<div class="chartPic_energy_device" id="wsds_chart"-->
                                <!--data-highcharts-chart="2">-->
                                <!--</div>-->

                                <!--<p id="c_chart3_text">停车场</p>-->

                                <!--<p><em class="ft22 colfff mr20">24,442</em>kWh</p>-->
                                <!--</li>-->
                                <!--<li>-->
                                <!--<div class="chartPic_energy_other" id="other_chart"-->
                                <!--data-highcharts-chart="3">-->
                                <!--</div>-->

                                <!--<p id="c_chart4_text" class="ft22">冷站</p>-->

                                <!--<p><em class="ft22 colfff mr20">38,119</em>kWh</p>-->
                                <!--</li>-->
                                <!--</ul>-->
                                <!--</div>-->
                                <!--</div>-->
                            </div>
                        </div>
                        <!-- 轮播（Carousel）导航 -->
                        <!-- <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                        </a>
                        <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                        </a> -->
                    </div>
                    <!-- 子系统运行状况 -->
                    <div class="pubCon pubCon_black h420 mt20">
                        <div class="index_tit">
                            <h2>子系统运行情况</h2>

                            <div class="legend">
                                <ul>
                                    <li><i class="icon_index_on mr10"></i>正常</li>

                                    <li><i class="icon_index_off mr10"></i>未连接</li>
                                </ul>
                            </div>
                        </div>
                        <div class="subSystem_run">
                            <ul>
                                <li>
                                    <a href="#"><i class="icon_big_eno group_control"></i></a>

                                    <p class="mt5"><span class=" icon_small_eno alarm_green"></span>冷机群控</p>

                                    <p class="colfff" id="dashboard_HVAC">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno light"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>室外照明</p>

                                    <p class="colfff" id="dashboard_LSPUB">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno cold_hot_system"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_grey"></span>热源系统</p>

                                    <p class="colfff" id="dashboard_LSN">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno voltage"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>变配电</p>

                                    <p class="colfff" id="dashboard_ETD">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno build"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>楼宇自控</p>

                                    <p class="colfff" id="dashboard_WSDS">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno monitor"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>视频监控</p>

                                    <p class="colfff" id="dashboard_MSVDO">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno energy"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>能耗计量</p>

                                    <p class="colfff" id="dashboard_SASSA">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno entrance"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_grey"></span>门禁管理</p>

                                    <p class="colfff" id="dashboard_SASAC">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno go_around"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>巡更管理</p>

                                    <p class="colfff" id="dashboard_EP">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno elevator"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>电梯运行</p>

                                    <p class="colfff" id="dashboard_MSEM">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno fire"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>消防监控</p>

                                    <p class="colfff" id="dashboard_FAS">暂无报警</p>
                                </li>
                                <li>
                                    <i class="icon_big_eno stop_car"></i>

                                    <p class="mt5"><span class="icon_small_eno alarm_green"></span>停车管理</p>

                                    <p class="colfff" id="dashboard_PARKM">暂无报警</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!--right content-->
                <div class="span3 w20 mt20 ml10">
                    <div class="pubCon h300">
                        <div class="pubCon_black con_indexT260">
                            <!--<div class="index_tit"><h2 id="energyModuleName">信息园资源管理信息统计</h2></div>-->
                            <!-- <div class="chartBbox"> -->
                                <div id="pieChart" style="height: 100%"></div>
                            <!-- </div> -->
                        </div>
                    </div>
                    <div class="pubCon h300 mt20">
                        <div class="pubCon_black con_indexT260">
                            <div class="index_stop_car">停车场实时车辆</div>
                            <div class="chartBbox">
                                <div class="loading"></div>
                                <div class="stop_car_content">
                                    <span>停车场空位</span>
                                    <span>(总 159)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="pubCon h300 mt20">
                        <div class="pubCon_black con_indexT260">
                            <!-- <div class="chartBbox"> -->
                                <div id="lineChart" style="height: 100%"></div>
                            <!-- </div> -->
                        </div>
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
</style>

<script>
 import {drawBarChart,drawPieChart,drawLineChart,drawScaPieChart,drawBohPieChart,drawParkPieChart,drawColdPieChart} from '../../assets/eno/scripts/common.js'
  export default {
  name: 'hello',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.drawBarChart();
    this.drawPieChart();
    this.drawLineChart();
    this.drawScaPieChart(),
    this.drawBohPieChart(),
    this.drawParkPieChart(),
    this.drawColdPieChart()
  },
  methods: {
    drawBarChart(){
        drawBarChart();
    },
    drawLineChart:function(){
        drawLineChart();
    },
    drawPieChart:function(){
        drawPieChart();
    },
    drawScaPieChart:function(){
        drawScaPieChart();
    },
    drawBohPieChart:function(){
        drawBohPieChart();
    },
    drawParkPieChart:function(){
        drawParkPieChart();
    },
    drawColdPieChart:function(){
        drawColdPieChart();
    }
  }
}
</script>