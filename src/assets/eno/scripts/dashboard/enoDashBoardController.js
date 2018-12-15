/**
 * All rights Reserved, Designed By ZCLF
 * Copyright:    Copyright(C) 2013-2015
 * Company   ZCLF Energy Technologies Inc.
 * @author 邹智祥
 * @date  2015/03/10 16:10
 * @version 1.0
 * @Description 实时报警处理
 */
(function (angular) {
    'use strict';

    var portalModule = angular.module('portalApp', ['AngularStomp']);

    portalModule.controller('dashBoardConfigController', function ($scope, $sce, $http) {

        $scope.totalEnergy = new TotalEnergy();
        // 根据模块的标识，查找对应的配置信息
        $scope.findTotalEnergyConfigInfo = function () {
            $http({
                method: 'POST',
                params: {
                    modulename: DASHBOARD_TOTALENERGY
                },
                url: CONTEXT_PATH + '/dataConfig/findByModulename'
            }).success(
                function (data) {
                    if (data) {
                        // 今日总用能_id
                        $scope.c_totalEnergy_id = data.id;
                        var obj = JSON.parse(data.content);
                        // 生成今日用能图表信息
                        $scope.buildEnergyTotalChart(obj);
                    } else {
                        // 今日总用能_id
                        $scope.c_totalEnergy_id = '';
                        // 移除存放的缓存信息
                        window.localStorage.removeItem("c_totalEnergy_unit");
                        window.localStorage.removeItem("c_totalEnergy_chartType");
                        window.localStorage.removeItem("c_totalEnergy_desc");
                        // 生成今日用能图表信息
                        $scope.buildEnergyTotalChart();
                    }
                });
        }
        $scope.findTotalEnergyConfigInfo();

        // 保存总能耗配置信息
        $scope.saveTotalEnergyConfig = function () {
            if ($scope.totalEnergy) {
                $scope.totalEnergy.c_totalEnergy_chartType = $('#c_totalEnergy_chartType').selectpicker('val');
                $http({
                    method: 'POST',
                    data: {
                        id: !$scope.c_totalEnergy_id ? null : $scope.c_totalEnergy_id,
                        configname: $scope.totalEnergy.c_totalEnergy_module,
                        modulename: DASHBOARD_TOTALENERGY,
                        content: JSON.stringify($scope.totalEnergy)
                    },
                    url: CONTEXT_PATH + '/back/dataConfig/saveDataConfig'
                }).success(
                    function (data) {
                        $('#setModule_wrap').modal('hide');
                        // 生成今日用能图表信息
                        $scope.buildEnergyTotalChart($scope.totalEnergy);
                    });
            }
        }

        // 生成今日用能图表信息
        $scope.buildEnergyTotalChart = function (obj) {
            var dataSource = '';
            try {
                //console.debug(obj);
                $("#todayEnergyText").text(obj.c_totalEnergy_module);
                $("#energyTotalChartText").text(obj.c_totalEnergy_desc);
                // 设置单位
                window.localStorage.setItem("c_totalEnergy_unit", obj.c_totalEnergy_unit);
                // 设置图表类型
                window.localStorage.setItem("c_totalEnergy_chartType", obj.c_totalEnergy_chartType);
                // 设置图表描述
                window.localStorage.setItem("c_totalEnergy_desc", obj.c_totalEnergy_desc);
                // 设置图表数据源
                dataSource = obj.c_totalEnergy_source ? obj.c_totalEnergy_source : oneEnergyTotalName;

                $scope.totalEnergy.c_totalEnergky_module = obj.c_totalEnergy_module; // 今日总用能_模块名称
                $scope.totalEnergy.c_totalEnergy_desc = obj.c_totalEnergy_desc; // 今日总用能_模块名称
                //$scope.totalEnergy.c_totalEnergy_chartType = obj.c_totalEnergy_chartType; // 今日总用能_图形类型
                $("#c_totalEnergy_chartType").val(obj.c_totalEnergy_chartType); // 今日总用能_图形类型
                $scope.totalEnergy.c_totalEnergy_source = obj.c_totalEnergy_source; // 今日总用能_数据源，默认显示建筑总用电量
                //$("#c_totalEnergy_source").val(obj.c_totalEnergy_source); // 今日总用能_数据源
                $scope.totalEnergy.c_totalEnergy_unit = obj.c_totalEnergy_unit; // 今日总用能_显示单位

                // 设置配置项中的下拉列表的值
                $('#c_totalEnergy_chartType').selectpicker('val', obj.c_totalEnergy_chartType);

                //关键参数赋值
                $scope.totalEnergy.c_totalEnergy_param_key1_name = obj.c_totalEnergy_param_key1_name
                $scope.totalEnergy.c_totalEnergy_param_key1_source = obj.c_totalEnergy_param_key1_source ? obj.c_totalEnergy_param_key1_source : "PTD#AH2#p,PTD#AH17#p";
                $scope.totalEnergy.c_totalEnergy_param_key1_unit = obj.c_totalEnergy_param_key1_unit;
                $scope.totalEnergy.c_totalEnergy_param_key2_name = obj.c_totalEnergy_param_key2_name;
                $scope.totalEnergy.c_totalEnergy_param_key2_source = obj.c_totalEnergy_param_key2_source ? obj.c_totalEnergy_param_key2_source : _electotal;
                $scope.totalEnergy.c_totalEnergy_param_key2_unit = obj.c_totalEnergy_param_key2_unit;
                $scope.totalEnergy.c_totalEnergy_param_key3_name = obj.c_totalEnergy_param_key3_name;
                $scope.totalEnergy.c_totalEnergy_param_key3_source = obj.c_totalEnergy_param_key3_source;
                $scope.totalEnergy.c_totalEnergy_param_key3_unit = obj.c_totalEnergy_param_key3_unit;


                // 为下方的图表赋值
                $scope.totalEnergy.c_chart1_name = obj.c_chart1_name; // 图表1的名称
                $scope.totalEnergy.c_chart1_source = obj.c_chart1_source; // 图表1的数据源
                $scope.totalEnergy.c_chart2_name = obj.c_chart2_name; // 图表2的名称
                $scope.totalEnergy.c_chart2_source = obj.c_chart2_source; // 图表2的数据源
                $scope.totalEnergy.c_chart3_name = obj.c_chart3_name; // 图表3的名称
                $scope.totalEnergy.c_chart3_source = obj.c_chart3_source; // 图表3的数据源
                $scope.totalEnergy.c_chart4_name = obj.c_chart4_name; // 图表4的名称
                $scope.totalEnergy.c_chart4_source = obj.c_chart4_source; // 图表4的数据源

                //设置实时功率
                dashboard.findTodayPower($scope.totalEnergy.c_totalEnergy_param_key1_source);
                //今日累计用能和实际费用
                renderMoreCharts(setTotalEnergyAndCost, $scope.totalEnergy.c_totalEnergy_param_key2_source, _start, _start, _end, "day", "4");

                //设置单位
                $("#c_totalEnergy_param_key1_name").text($scope.totalEnergy.c_totalEnergy_param_key1_name);
                $("#c_totalEnergy_param_key1_unit").text($scope.totalEnergy.c_totalEnergy_param_key1_unit);
                $("#c_totalEnergy_param_key2_name").text($scope.totalEnergy.c_totalEnergy_param_key2_name);
                $("#c_totalEnergy_param_key2_unit").text($scope.totalEnergy.c_totalEnergy_param_key2_unit);
                $("#c_totalEnergy_param_key3_name").text($scope.totalEnergy.c_totalEnergy_param_key3_name);
                $("#c_totalEnergy_param_key3_unit").text($scope.totalEnergy.c_totalEnergy_param_key3_unit);

            } catch (e) {
                dataSource = oneEnergyTotalName;
                console.debug("---报错了---");
            }
            // 生成今日用能图表
            //renderMoreCharts(dashboard.buildTodayEnergyChart, dataSource, _start, _start, _end, "hour", "4");
            var source = getUrlParam('source');
            if (source == 'hotel') {
                renderMoreCharts(dashboard.buildTodayEnergyChart, dataSource, _start, getTimeByDays(_start, -1), _end, "hour", "4");
                renderCircleCharts(dashboard.buildCircleChart, dataSource, obj.c_chart1_source, "msem_chart", _start, _end, "day", "yyyy-MM-dd");
                renderCircleCharts(dashboard.buildCircleChart, dataSource, obj.c_chart2_source, "hvac_chart", _start, _end, "day", "yyyy-MM-dd");
                renderCircleCharts(dashboard.buildCircleChart, dataSource, obj.c_chart4_source, "other_chart", _start, _end, "day", "yyyy-MM-dd");
                renderCircleCharts(dashboard.buildCircleChart, dataSource, obj.c_chart3_source, "wsds_chart", _start, _end, "day", "yyyy-MM-dd");

            } else {
                renderMoreCharts(dashboard.buildTodayEnergyChart, dataSource, getCurrentTime().substring(0, 7), showLastMonthLastDay().substring(0, 8) + "01", getCurrentMonthLastDay(), "day", "4", null, "yyyy-MM-dd");
                dashboard.buildCircleChart('msem_chart', 10)
                dashboard.buildCircleChart('hvac_chart', 5)
                dashboard.buildCircleChart('wsds_chart', 13)
                dashboard.buildCircleChart('other_chart', 16)
            }
            // 设置电梯系统用电量和电梯用电比例
            $("#c_chart1_text").html(obj.c_chart1_name + "&nbsp;&nbsp;&nbsp;");
            //dashboard.findValueAndPercentValue("msem", obj.c_chart1_source ? obj.c_chart1_source : _elevator, "sum");
            $("#msem_elec").text(1000);
            // 设置暖通空调用电量和暖通空调用电比例
            $("#c_chart2_text").text(obj.c_chart2_name);
            //dashboard.findFieldValueByMoreTableAndType("hvac", obj.c_chart2_source ? obj.c_chart2_source : "elec#hvac_chiller,elec#hvac_boilerroom,elec#hvac_HES", "sum");
            $("#hvac_elec").text(1150);
            // 设置给排水用电量和给排水用电比例
            $("#c_chart3_text").text(obj.c_chart3_name);
            //dashboard.findFieldValueByMoreTableAndType("wsds", obj.c_chart3_source ? obj.c_chart3_source : "elec#drainage,elec#rwp", "sum");
            $("#wsds_elec").text(1500);
            // 设置其它用电量和其它用电比例
            $("#c_chart4_text").text(obj.c_chart4_name);
            //dashboard.findValueAndPercentValue("other", obj.c_chart4_source ? obj.c_chart4_source : _lighting_fcu, "sum");
            $("#other_elec").text(1350);

        }

    });

    //左侧室内参数的弹出框控制器-----------------------------------------------------------------------------
    portalModule.controller('LefFirstIndoorParamController', function ($scope, $sce, $http) {
        $scope.indoorParams = new Array();          //数组用于储存室内参数的配置数据

        //查找对应的数据用于初始化页面信息
        $scope.findIndoorParamInfo = function () {
            $http({
                method: 'POST',
                params: {
                    modulename: DASHBOARD_INDOOR_PARAM
                },
                url: CONTEXT_PATH + '/dataConfig/findByModulename'
            }).success(
                function (data) {
                    if (data) {
                        $scope.indoorParam_id = data.id;
                        $scope.indoorParams = new Array();
                        //解析获取的数据
                        var obj = JSON.parse(data.content);

                        for (var i = 0; i < obj.length; i++) {
                            var leftIndoorParam = new LeftIndoorParam();
                            leftIndoorParam.moduleName = obj[i].moduleName;
                            //重新定义属性
                            leftIndoorParam.param1_type = obj[i].param1_type;         //参数的类型,储存对应类型的图标对应的class和单位
                            leftIndoorParam.param1_source = obj[i].param1_source;       //对应参数的数据源
                            leftIndoorParam.param1_show = false;                      //对应的参数是否显示
                            leftIndoorParam.param2_type = obj[i].param2_type;
                            leftIndoorParam.param2_source = obj[i].param2_source;
                            leftIndoorParam.param2_show = false;
                            leftIndoorParam.param3_type = obj[i].param3_type;
                            leftIndoorParam.param3_source = obj[i].param3_source;
                            leftIndoorParam.param3_show = false;
                            leftIndoorParam.param4_type = obj[i].param4_type;
                            leftIndoorParam.param4_source = obj[i].param4_source;
                            leftIndoorParam.param4_show = false;
                            $scope.indoorParams.push(leftIndoorParam);
                        }
                        $scope.buildIndoorParam();
                    } else {
                    }
                });
        }
        //初始化
        $scope.findIndoorParamInfo();

        //保存数据
        $scope.saveIndoorParam = function () {
            $http({
                method: 'POST',
                data: {
                    id: !$scope.indoorParam_id ? null : $scope.indoorParam_id,
                    configname: 'indoorParams',
                    modulename: DASHBOARD_INDOOR_PARAM,
                    content: JSON.stringify($scope.indoorParams),
                },
                url: CONTEXT_PATH + '/back/dataConfig/saveDataConfig'
            }).success(function (data) {
                $('#setModule_lfip').modal('hide');
                $scope.buildIndoorParam($scope.indoorParams);
            });
        }

        //初始DashBoard页面室内参数模块的配置信息
        $scope.buildIndoorParam = function () {
            //重新设置DashBoard页面的数据
            //$("#indoorParam").empty();
            //for(var i = 0 ; i < $scope.indoorParams.length ; i++) {
            //    if($scope.indoorParams[i].moduleName != ""){
            //        //在页面生成室内参数的节点元素
            //        $("#indoorParam").append('' +
            //                            '<dl class="day_weather_detail">'+
            //                                    '<dt>'+
            //                                        '<h3  id="'+"indoorParam_param1_title"+i+'">'+$scope.indoorParams[i].moduleName+'</h3>' +
            //                                    '</dt>'+
            //                                    '<dd>'+
            //                                        '<p>' +
            //                                            '<span id="'+"indoorParam_param1"+i+'">' +
            //                                                '<i class="icon_small mr5" id="'+"indoorParam_param1_class"+i+'"></i>' +
            //                                                '<em class="ft20 colfff" id="'+"indoorParam_param1_source"+i+'">--</em>' +
            //                                                '<em id="'+"indoorParam_param1_unit"+i+'"></em>' +
            //                                            '</span>'+
            //                                            '<span class="ml5" id="'+"indoorParam_param2"+i+'">' +
            //                                                '<i class="icon_small " id="'+"indoorParam_param2_class"+i+'"></i>' +
            //                                                '<em class="ft20 colfff" id="'+"indoorParam_param2_source"+i+'"></em>' +
            //                                                '<em id="'+"indoorParam_param2_unit"+i+'"></em>' +
            //                                            '</span>' +
            //                                        '</p>'+
            //                                        '<p>' +
            //                                            '<span id="'+"indoorParam_param3"+i+'">' +
            //                                                '<i class="icon_small  mr5" id="'+"indoorParam_param3_class"+i+'"></i>' +
            //                                                '<em class="ft20 colfff" id="'+"indoorParam_param3_source"+i+'">' +
            //                                                '</em><em id="'+"indoorParam_param3_unit"+i+'"></em>' +
            //                                            '</span>'+
            //                                            '<span id="'+"indoorParam_param4"+i+'">' +
            //                                                '<i class="icon_small  mr5" id="'+"indoorParam_param4_class"+i+'"></i>' +
            //                                                '<em class="ft20 colfff" id="'+"indoorParam_param4_source"+i+'"></em>' +
            //                                                '<em id="'+"indoorParam_param4_unit"+i+'"></em>' +
            //                                            '</span> ' +
            //                                        '</p>' +
            //                                    '</dd>' +
            //                            '</dl>');
            //        $scope.setIndoorData(i);
            //    }
            //}
        }

        //设置生成的室内参数的节点元素数据信息
        $scope.setIndoorData = function (index) {
            var obj = $scope.indoorParams[index];
            var moduleName = obj.moduleName;

            if (obj.param1_source.length > 0) {
                //是否显示
                $scope.indoorParams[index].param1_show = true;
                //从数据源获取数据
                dashboard.findFieldValueByTableAndType("indoorParam_param1_source" + index, obj.param1_source, "AVG", _field, _start);
                //删除原来的class
                $scope.removeIconClass("indoorParam_param1_class" + index);
                //添加图标
                $("#indoorParam_param1_class" + index).addClass(obj.param1_type.split(",")[0]);
                //添加单位
                $("#indoorParam_param1_unit" + index).text(obj.param1_type.split(",")[1]);
            }

            if (obj.param2_source.length > 0) {
                $scope.indoorParams[index].param2_show = true;
                dashboard.findFieldValueByTableAndType("indoorParam_param2_source" + index, obj.param2_source, "AVG", _field, _start);
                $scope.removeIconClass("indoorParam_param2_class" + index);
                $("#indoorParam_param2_class" + index).addClass(obj.param2_type.split(",")[0]);
                $("#indoorParam_param2_unit" + index).text(obj.param2_type.split(",")[1]);
            }

            if (obj.param3_source.length > 0) {
                $scope.indoorParams[index].param3_show = true;
                // 2016-02-24，为了应付现场检查(质疑我们的CO2浓度与BA不一致)，将CO2浓度的获取方式从oracle中换成直接从redis中获取
                //dashboard.findFieldValueByTableAndType("indoorParam_param3_source"+index, obj.param3_source, "AVG", _field, _start);
                dashboard.findValueByTagnameFromRedis("indoorParam_param3_source" + index, obj.param3_source);
                $scope.removeIconClass("indoorParam_param3_class" + index);
                $("#indoorParam_param3_class" + index).addClass(obj.param3_type.split(",")[0]);
                $("#indoorParam_param3_unit" + index).text(obj.param3_type.split(",")[1]);
            }

            if (obj.param4_source.length > 0) {
                $scope.indoorParams[index].param4_show = true;
                dashboard.findFieldValueByTableAndType("indoorParam_param4_source" + index, obj.param4_source, "AVG", _field, _start);
                $scope.removeIconClass("indoorParam_param4_class" + index);
                $("#indoorParam_param4_class" + index).addClass(obj.param4_type.split(",")[0]);
                $("#indoorParam_param4_unit" + index).text(obj.param4_type.split(",")[1]);
            }
        }


        //删除室内参数的图标class,解决改变参数类型的时候图标不会改变的问题
        $scope.removeIconClass = function (id) {
            if ($("#" + id).hasClass("icon_w_c")) {
                $("#" + id).removeClass("icon_w_c");
            }

            if ($("#" + id).hasClass("icon_w_h")) {
                $("#" + id).removeClass("icon_w_h");
            }

            if ($("#" + id).hasClass("icon_w_t")) {
                $("#" + id).removeClass("icon_w_t");
            }
        }


        //增加一个室内参数模块
        $scope.addIndoorParamModule = function () {
            $scope.indoorParams.push(new LeftIndoorParam());
        }

        //删除一个室内参数模块
        $scope.deleteIndoorParamModule = function (index) {
            $scope.indoorParams.splice(index, 1);
        }
    });


    //---------------建筑信息控制器------------------------------------------------------
    portalModule.controller('BuildingInfoController', function ($scope, $sce, $http) {
        $scope.buildInfo = new BulidingInfo();

        $scope.findBuildingInfoParam = function () {
            //根据moduleName查找对应的配置信息
            $http({
                method: 'POST',
                params: {
                    modulename: DASHBOARD_BUILD_INFO
                },
                url: CONTEXT_PATH + '/dataConfig/findByModulename'
            }).success(
                function (data) {
                    if (data) {
                        //模块配置信息的id
                        $scope.buildInfo_id = data.id;
                        var obj = JSON.parse(data.content);
                        $scope.buildBuildingInfoParam(obj);
                    } else {
                        //从页面获取模块的名字
                        //$scope.thirdIndoorParam.moduleName = $("#tgm_mn_ra").text();
                    }
                });
        }
        $scope.findBuildingInfoParam();

        //初始化页面信息
        $scope.buildBuildingInfoParam = function (obj) {

            $scope.buildInfo.name = obj.name;
            $scope.buildInfo.area = obj.area;
            $scope.buildInfo.storey = obj.storey;
            $scope.buildInfo.address = obj.address;

            //重置页面信息
            $("#buildingName").text($scope.buildInfo.name);
            $("#buildingArea").text($scope.buildInfo.area);
            $("#buildingStorey").text($scope.buildInfo.storey);
            $("#buildingAddress").text($scope.buildInfo.address);
        }
    });


    //--------------用能定额配置-------------------------------------------------------------------------------开始
    portalModule.controller('EnergyQuotaController', function ($scope, $sce, $http) {
        $scope.energyQuota = new EnergyQuota();

        $scope.findBuildingInfoParam = function () {
            //根据moduleName查找对应的配置信息
            $http({
                method: 'POST',
                params: {
                    modulename: DASHBOARD_ENERGY_QUOTA
                },
                url: CONTEXT_PATH + '/dataConfig/findByModulename'
            }).success(
                function (data) {
                    if (data) {
                        //模块配置信息的id
                        $scope.energyQuota_id = data.id;
                        var obj = JSON.parse(data.content);
                        $scope.buildEnergyQuotaParam(obj);
                    } else {
                        //没有编辑过模块信息
                        $scope.energyQuota.moduleName = $('#energyModuleName').text();
                    }
                });
        }
        $scope.findBuildingInfoParam();


        //保存配置信息到数据库
        $scope.saveEnergyQuotaParam = function () {
            $http({
                method: 'POST',
                data: {
                    id: !$scope.energyQuota_id ? null : $scope.energyQuota_id,
                    configname: $scope.energyQuota.moduleName,
                    modulename: DASHBOARD_ENERGY_QUOTA,
                    //获取选中的数据源
                    content: JSON.stringify($scope.energyQuota),
                },
                url: CONTEXT_PATH + '/back/dataConfig/saveDataConfig'
            }).success(function (data) {
                $('#setModule_energyquota').modal('hide');
                $scope.buildEnergyQuotaParam($scope.energyQuota);
            });
        }

        //初始化页面信息
        $scope.buildEnergyQuotaParam = function (obj) {
            $scope.energyQuota.moduleName = obj.moduleName;
            $scope.energyQuota.todayEnergySource = obj.todayEnergySource;

            $scope.energyQuota.moduleName1 = obj.moduleName1;
            $scope.energyQuota.leadQuotaSource1 = obj.leadQuotaSource1 ? obj.leadQuotaSource1 : _electotal;
            $scope.energyQuota.leadQuotaUnit1 = obj.leadQuotaUnit1;

            $scope.energyQuota.moduleName2 = obj.moduleName2;
            $scope.energyQuota.leadQuotaSource2 = obj.leadQuotaSource2;
            $scope.energyQuota.leadQuotaUnit2 = obj.leadQuotaUnit2;

            //设置页面信息
            $('#energyModuleName').text($scope.energyQuota.moduleName);
            $('#todayEnergytitle').text($scope.energyQuota.moduleName1);
            $('#leadQuotaUnit1').text($scope.energyQuota.leadQuotaUnit1);

            $('#curMonthQuotaTitle').text($scope.energyQuota.moduleName2);
            $('#leadQuotaUnit2').text($scope.energyQuota.leadQuotaUnit2);
            //根据数据源查找对应的数据
            renderMoreCharts(setEnergyAuotaData, $scope.energyQuota.todayEnergySource, _start, _start, _end, "day", "4");
            //第二个模块的第一个子模块setTotalEnergy
            renderMoreCharts(setTotalEnergy, $scope.energyQuota.leadQuotaSource1, _start, _start, _end, "day", "4");
            //第二个模块的第二个子模块
            renderMoreCharts(setCurMonthQuota, $scope.energyQuota.leadQuotaSource1, _start, _start, _end, "day", "4");
        }

    });
    //-------------------------用能定额配置--------------------------------------------------------------------------结束


    //-------------------------碳足迹配置----------------------------------------------------------------------------开始
    portalModule.controller('CarbonFootController', function ($scope, $sce, $http) {
        $scope.datasourceList = [];
        $scope.carbonFoot = new CarbonFoot();           //碳足迹页面配置信息

        $scope.getDataSource = function () {
            return [
                {text: 'carbon#total'},
                {text: 'carbon#tgm'},
                {text: 'carbon#office'},
                {text: 'carbon#nuo'}
            ];
        };


        $scope.findCarbonFootParam = function () {
            //根据moduleName查找对应的配置信息
            $http({
                method: 'POST',
                params: {
                    modulename: DASHBOARD_CARBON_FOOT
                },
                url: CONTEXT_PATH + '/dataConfig/findByModulename'
            }).success(
                function (data) {
                    if (data) {
                        //模块配置信息的id
                        $scope.carbonFoot_id = data.id;
                        var obj = JSON.parse(data.content);
                        $scope.buildCarbonFootParam(obj);
                    } else {
                        //没有编辑过模块信息
                        $scope.carbonFoot.module1Name = $('#carbonFootCurve').text();
                        $scope.carbonFoot.module2Name = $("#today_total_carbonCurve").text();
                        $scope.carbonFoot.module2Util = $("#today_total_carbonUtil").text();
                        $scope.carbonFoot.module2Name2 = $("#today_total_carbonCurve1").text();
                        $scope.carbonFoot.module2Util2 = $("#today_total_carbonUtil1").text();
                    }
                });
        }
        $scope.findCarbonFootParam();

        //保存配置信息到数据库
        $scope.saveCarbonFootParam = function () {
            $http({
                method: 'POST',
                data: {
                    id: !$scope.carbonFoot_id ? null : $scope.carbonFoot_id,
                    configname: $scope.carbonFoot.module1Name,
                    modulename: DASHBOARD_CARBON_FOOT,
                    content: JSON.stringify($scope.carbonFoot),
                },
                url: CONTEXT_PATH + '/back/dataConfig/saveDataConfig'
            }).success(function (data) {
                $('#setModule_carbonFoot').modal('hide');
                $scope.buildCarbonFootParam($scope.carbonFoot);
            });
        }


        //初始化页面信息
        $scope.buildCarbonFootParam = function (obj) {

            $scope.carbonFoot.module1Name = obj.module1Name;
            $scope.carbonFoot.module1DataSource = obj.module1DataSource;

            $scope.carbonFoot.module2Name = obj.module2Name;
            $scope.carbonFoot.module2DataSource = obj.module2DataSource;
            $scope.carbonFoot.module2Util = obj.module2Util;

            $scope.carbonFoot.module2Name2 = obj.module2Name2;
            $scope.carbonFoot.module2DataSource2 = obj.module2DataSource2;
            $scope.carbonFoot.module2Util2 = obj.module2Util2;
            //设置页面信息
            $("#carbonFootCurve").text($scope.carbonFoot.module1Name);
            $("#today_total_carbonCurve").text($scope.carbonFoot.module2Name);
            $("#today_total_carbonUtil").text($scope.carbonFoot.module2Util);
            $("#today_total_carbonCurve2").text($scope.carbonFoot.module2Name2);
            $("#today_total_carbonUtil2").text($scope.carbonFoot.module2Util2);

            //模块一曲线
            renderMoreCharts(dashboard.buildCartonChart, $scope.carbonFoot.module1DataSource, $scope.carbonFoot.module1Name, _start, _end, "hour", "4");
            //模块二数据
            dashboard.findTodayCarbon($scope.carbonFoot.module2DataSource);
            //模块三数据
            //dashboard.findTodayCarbon2($scope.carbonFoot.module2DataSource2);
        }
    });
    //-------------------------碳足迹配置----------------------------------------------------------------------------结束


})(window.angular);


// 建筑总能耗对象
function TotalEnergy() {
    this.c_totalEnergy_module = "今日用能概况"; // 今日总用能_模块名称
    this.c_totalEnergy_desc = "今日建筑总用电"; // 今日总用能_模块名称
    this.c_totalEnergy_chartType = "column"; // 今日总用能_图形类型
    this.c_totalEnergy_source = _electotal; // 今日总用能_数据源，默认显示建筑总用电量
    this.c_totalEnergy_unit = "kWh"; // 今日总用能_显示单位
    //储存关键参数信息
    this.c_totalEnergy_param_key1_name = "实时功率";
    this.c_totalEnergy_param_key1_source = "";
    this.c_totalEnergy_param_key1_unit = "kWh";
    this.c_totalEnergy_param_key2_name = "今日累计用电";
    this.c_totalEnergy_param_key2_source = _electotal;
    this.c_totalEnergy_param_key2_unit = "kWh";
    this.c_totalEnergy_param_key3_name = "昨日用电";
    this.c_totalEnergy_param_key3_source = "";
    this.c_totalEnergy_param_key3_unit = "kWh";
}

//左侧室内参数对象
function LeftIndoorParam() {
    this.moduleName = "";
    //重新定义属性
    this.param1_type = "";         //参数的类型,储存对应类型的图标对应的class和单位
    this.param1_source = "";       //对应参数的数据源
    this.param1_show = false;      //对应的参数是否显示
    this.param2_type = "";
    this.param2_source = "";
    this.param2_show = false;
    this.param3_type = "";
    this.param3_source = "";
    this.param3_show = false;
    this.param4_type = "";
    this.param4_source = "";
    this.param4_show = false;
}

//建筑信息对象
function BulidingInfo() {
    this.name = "诺金中心";
    this.address = "北京市 朝阳区 将台路 甲2号";
    this.area = "166293.2";
    this.storey = "26";
}

//用能定额模块配置
function EnergyQuota() {
    this.moduleName = "用能定额";
    this.todayEnergySource = "HVC#N_AHU_3_1#co2_ra";            //今日能耗数据源
    this.leadQuotaSource = "HVC#N_AHU_3_1#co2_ra";              //引导定额数据源
    this.leadQuotaUnit = "kWh";                                 //下方数据单位
}

//碳足迹模块配置对象
function CarbonFoot() {
    this.module1Name = "碳足迹曲线";
    this.module1DataSource = "carbon#total"
    this.module2Name = "累计碳排放量";
    this.module2DataSource = "carbon#total";
    this.module2Util = "Ton";
}

//设置用能定额的数据
function setEnergyAuotaData(title, catalist, datalist, step) {
    //设置定额
    //$("#curMonthQuota").text(addCommas(parseFloat(curMonthQuota)));
    //var todayTotalEnergy = datalist[0][0][0];
    //$("#todayEnergyTotal").text(addCommas(todayTotalEnergy));

    //var quato = toDecimalAndPos((todayTotalEnergy / curMonthQuota * 100), 10);
    //$("#todayQuota").text(quato);
    //$("#quotaChartPrecents").text(quato);
    var source = getUrlParam('source')
    var tagName = '';
    if (source == 'hotel') {
        tagName = 'YTZX#BJGM#ESA#YTZX_hotel_total#elec';
    } else {
        tagName = 'YTZX#BJGM#ESA#YTZX_hotel_total#elec';
    }
    var action = CONTEXT_PATH + "/queryEngine/getChartDataAndCataList";
    var params = {
        pointname: tagName,
        aggregatefunction: 'sum',
        timeend: _end,
        timescales: 'hour',
        timestart: getTimeByDays(_start, -1),
        timeformat: 'HH:mm'
    };
    $.post(action, params, function (data) {
        dashboard.buildQuotaChart(data.data);
    });

}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
//设置用能定额，第二个模块的第一个模块的数据
function setTotalEnergy(title, catalist, datalist, step) {
    try {
        todayTotalEnergy = datalist[0][0][0];
        $("#todayEnergyTotal").text(addCommas(todayTotalEnergy));
    } catch (e) {
        console.log("获取的数据为空", e);
    }
}

//设置用能定额，第二个模块的第二个模块的数据
function setCurMonthQuota(title, catalist, datalist, step) {
    $("#curMonthQuota").text(addCommas(parseFloat(curMonthQuota)));
}


//设置累计用能和实际费用
function setTotalEnergyAndCost(title, catalist, datalist, step) {
    //todayTotalEnergy = datalist[0][0][0];
    //$("#todaySumEnergy").text(addCommas(todayTotalEnergy)); // 今日累计用能
    //$("#todayEnergyTotal").text(addCommas(todayTotalEnergy)); // 今日能耗(用能定额下方)
    //$("#todaySumMoney").text(addCommas(toDecimalAndPos(todayTotalEnergy * 1.1, 1)));
    // 设置今日累计用能参考费用
    //$("#todaySumMoney").text(140,313);
    //dashboard.findPeakValleyElecPrices("todaySumMoney");
}

//根据id删除元素上的图标Class
function deleteImgClassById(id) {
    if ($("#" + id).hasClass("icon_w_h")) {
        $("#" + id).removeClass("icon_w_h");
    }
}