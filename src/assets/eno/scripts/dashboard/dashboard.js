$(function () {

    // 使下拉列表生成bootstrap的select的效果
    $('.selectpicker_w162').selectpicker({
        "width": "162px"
    });
    // 模块配置弹框tab选项卡
    $('#setModule_tabNav li').click(function () {
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
        $("#setModule_tabCon").find('.setModule_tabInfo').hide().eq($("#setModule_tabNav li").index(this)).show();
    });

    // 碳足迹配置弹框tab选项卡
    $('#setModule_tabNavCarBonFoot li').click(function () {
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
        $("#setModule_tabConCarBonFoot").find('.setModule_tabInfo').hide().eq($("#setModule_tabNavCarBonFoot li").index(this)).show();
    });

    //用能配置
    $('#setModule_tabNavEnergyQuota li').click(function () {
        $(this).siblings().removeClass("cur");
        $(this).addClass("cur");
        $("#setModule_tabConEnergyQuota").find('.setModule_tabInfo').hide().eq($("#setModule_tabNavEnergyQuota li").index(this)).show();
    });

    // 设置当前月的定额信息
    $("#curMonthQuota").text(addCommas(parseFloat(curMonthQuota)));

    //// 生成今日用能图表
    //renderMoreCharts(dashboard.buildTodayEnergyChart, _electotal, _start, _start, _end, "hour", "4");
    //// 设置电梯系统用电量和电梯用电比例
    //dashboard.findValueAndPercentValue("msem", "elec#elevator", "sum");
    //// 设置暖通空调用电量和暖通空调用电比例
    //dashboard.findFieldValueByMoreTableAndType("hvac", "elec#hvac_chiller,elec#hvac_boilerroom,elec#hvac_HES", "sum");
    //// 设置给排水用电量和给排水用电比例
    //dashboard.findFieldValueByMoreTableAndType("wsds", "elec#drainage,elec#rwp", "sum");
    //// 设置其它用电量和其它用电比例
    //dashboard.setOtherElec("other", "elec#drainage,elec#rwp,elec#hvac_chiller,elec#hvac_boilerroom,elec#hvac_HES,elec#elevator", "sum");

    // 今日累计用能
    //renderMoreCharts(dashboard.setSumTotalEnergy, _electotal, _start, _start, _end, "day", "4"); // 今日累计用能

    // 获取今日实时功率
    dashboard.findTodayPower("PTD#AH2#p,PTD#AH17#p");

    // 获取当前酒店大堂信息
    //findOneRecordByTagName("current_t_ra", "HVC#N_FAU_R_W_11#t_oa");
    //findOneRecordByTagName("current_rh_ra", "HVC#N_FAU_R_W_11#rh_oa");

    // 获取【诺金大堂温度】
    dashboard.findFieldValueByTableAndType("hotel_t_ra", "HVC#B_AHU_BJ_1#t_ra", "AVG", _field, _start);
    // 获取【诺金大堂湿度】
    dashboard.findFieldValueByTableAndType("hotel_rh_ra", "HVC#B_AHU_BJ_1#rh_ra", "AVG", _field, _start);
    // 获取【诺金大堂二氧化碳浓度】
    dashboard.findFieldValueByTableAndType("hotel_co2_ra", "HVC#B_AHU_BJ_1#co2_ra", "AVG", _field, _start);

    // 获取【大宴会厅温度】
    dashboard.findFieldValueByTableAndType("ballroom_t_ra", "HVC#N_AHU_3_1#t_ra", "AVG", _field, _start);
    // 获取【大宴会厅湿度】
    dashboard.findFieldValueByTableAndType("ballroom_rh_ra", "HVC#N_AHU_3_1#rh_ra", "AVG", _field, _start);
    // 获取【大宴会厅二氧化碳浓度】
    dashboard.findFieldValueByTableAndType("ballroom_co2_ra", "HVC#N_AHU_3_1#co2_ra", "AVG", _field, _start);

    // 获取【谭阁美大堂温度】
    dashboard.findFieldValueByTableAndType("tgm_t_ra", "HVC#S_AHU_2_2#t_ra", "AVG", _field, _start);
    // 获取【谭阁美大堂湿度】
    dashboard.findFieldValueByTableAndType("tgm_rh_ra", "HVC#S_AHU_2_2#rh_ra", "AVG", _field, _start);
    // 获取【谭阁美大堂二氧化碳浓度】
    dashboard.findFieldValueByTableAndType("tgm_co2_ra", "HVC#S_AHU_2_2#co2_ra", "AVG", _field, _start);

    // 获取dashboard各个子系统当天的报警数量
    dashboard.findAlarmNum();

    // 生成碳足迹曲线
    renderMoreCharts(dashboard.buildCartonChart, _lowTotalCarbonTag, _start, _start, _end, "hour", "8");

    // 获取今日累计碳足迹
    //dashboard.findTodayCarbon("PTD#AH2#w,PTD#AH17#w");
    // findSumValueByTagName("today_total_carbon", _lowTotalCarbonTag);

});

var todayTotalEnergy = 0; // 今日总能耗
var dashboard = {

    // 查询指定tagname表中指定字段的指定类型的数据，并赋予指定id
    findValueByTagnameFromRedis: function (id, tagname) {
        var action = CONTEXT_PATH + "/redis/getValueFromRedis";
        var params = {
            tagname: tagname
        };
        $.post(action, params, function (data) {
            try {
                $("#" + id).text(toDecimalAndPos(parseFloat(data), 10));
            } catch (e) {
                $("#" + id).text('');
                console.debug("findValueByTagnameFromRedis获取数据失败！tagname为【" + tagname + "】", data, e);
            }
        });
    },

    // 获取峰谷电价
    findPeakValleyElecPrices: function (id) {
        var action = CONTEXT_PATH + "/report/findPeakValleyElecPrices";
        var params = {
            field: _field,
            queryDate: _start
        };
        $.post(action, params, function (data) {
            try {
                if (data.price) {
                    $("#" + id).text(addCommas(parseFloat(data.price)));
                } else {
                    $("#" + id).text('');
                }
            } catch (e) {
                $("#" + id).text('');
                console.debug("findPeakValleyElecPrices获取数据失败！id为【" + id + "】", data, e);
            }
        });
    },

    // 动态生成系统用电量比例图
    buildCircleChart: function (id, precent) {

        var p = 100 - precent;
        var color = '#FB7171';
        if (id == 'msem_chart') { // 电梯用电
            color = '#FB7171';
        } else if (id == 'hvac_chart') { // 暖通空调用电
            color = '#54B4E1';
        } else if (id == 'wsds_chart') { // 给排水用电
            color = '#FFBB00';
        } else if (id == 'other_chart') { // 其它用电
            color = '#68D100';
        }
        // Build the chart
        $('#' + id).highcharts({
            legend: {
                enabled: false   //去除图例
            },
            credits: {
                enabled: false   //去除版权信息
            },
            chart: {
                type: 'pie',
                width: 70,
                height: 70,
                backgroundColor: 'transparent',      //外图表区域的背景颜色
                borderRadius: 0,             //外图表区域边框圆角
                plotBackgroundColor: null,   //绘制图形区域的背景颜色
                plotBorderWidth: null,       //绘制图形区域边框宽度
                plotShadow: false,           //绘图区投影
                margin: [0, 0, 0, 0]             //距离上下左右的距离
            },
            title: {
                text: '<span style="font-family: RobotoRegular; font-weight:normal; font-size: 26px; color: #FFF;">' + precent + '</span><span style="font-size: 16px; color: #999;">%</span>',
                x: 1,
                y: 35
            },
            tooltip: {
                enabled: false,
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                valueSuffix: 'kWh'//鼠标滑过标记点时显示的数值单位
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: false,
                    innerSize: '7',    //饼形图内径，大于0变为环形图
                    borderWidth: 0     //去除环形线，默认是1
                }
            },
            colors: ['#777777', color],
            series: [
                {
                    type: 'pie',
                    name: '',
                    data: [
                        ['', p],
                        ['', precent]
                    ]
                }
            ]
        });

    },

    // 设置今日碳排放
    findTodayCarbon: function (tagname) {
        var action = CONTEXT_PATH + "/queryEngine/findSumValueByTagName";
        var params = {
            queryDate: _start,
            tagname: tagname,
            field: _field
        };
        $.post(action, params, function (data) {
            console.debug(data);
            try {
                $("#today_total_carbon").text(toDecimalAndPos(parseFloat(data.valueList[0]) / 1000, 10));
            } catch (e) {
                $("#today_total_carbon").text('');
                console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
            }
        });
    },
    findTodayCarbon2: function (tagname) {
        var action = CONTEXT_PATH + "/queryEngine/findSumValueByTagName";
        var params = {
            queryDate: _start,
            tagname: tagname,
            field: _field
        };
        $.post(action, params, function (data) {
            try {
                $("#today_total_carbon2").text(toDecimalAndPos(parseFloat(data.valueList[0]) / 1000, 10));
            } catch (e) {
                $("#today_total_carbon2").text('');
                console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
            }
        });
    },

    // 设置今日实时功率
    findTodayPower: function (tagname) {
        // var action = CONTEXT_PATH + "/queryEngine/findOneRecordByTagName";
        // var params = {
        //     queryDate: _start,
        //     tagname: tagname,
        //     field: _field
        // };
        // $.post(action, params, function (data) {
        //     try {
        //         $("#todayPower").text(addCommas(parseFloat(data.valueList[0])));
        //     } catch (e) {
        //         $("#todayPower").text('');
        //         console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
        //     }
        // });
    },

    // 设置其它用电量和其它用电比例
    setOtherElec: function (id, tagname, type) {
        var action = CONTEXT_PATH + "/queryEngine/findFieldValueByMoreTableAndType";
        var params = {
            queryDate: _start,
            tagname: tagname,
            type: type,
            field: _field
        };
        $.post(action, params, function (data) {
            try {

                var d = 0;
                for (var i = 0; i < data.valueList.length; i++) {
                    d += parseInt(data.valueList[i]);
                }

                // 计算percent值
                var per = toDecimalAndPos((todayTotalEnergy - d) / todayTotalEnergy * 100, 1);

                $("#" + id + "_elec").text(todayTotalEnergy - d);

                if (!per) {
                    per = 100;
                }
                // 生成动态饼图
                dashboard.buildCircleChart(id + "_chart", per);

                //$("#" + id + "_percent").text(per);
                //if (per < 10) { // 设置样式居中
                //    $("#" + id + "_percent").parent().css("left", "23px");
                //}
            } catch (e) {
                console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
            }
        });
    },

    // 设置给排水用电量和给排水用电比例
    findFieldValueByMoreTableAndType: function (id, tagname, type) {
        var action = CONTEXT_PATH + "/queryEngine/findFieldValueByMoreTableAndType";
        var params = {
            queryDate: _start,
            tagname: tagname,
            type: type,
            field: _field
        };
        $.post(action, params, function (data) {
            try {

                var d = 0;
                for (var i = 0; i < data.valueList.length; i++) {
                    d += parseInt(data.valueList[i]);
                }
                $("#" + id + "_elec").text(addCommas(d));

                // 计算percent值
                var per = 0;
                try {
                    per = toDecimalAndPos(d / todayTotalEnergy * 100, 1);

                    if (per == 'Infinity') {
                        dashboard.findFieldValueByMoreTableAndType(id, tagname, type);
                    } else {
                        if (!per) {
                            per = 100;
                        }
                        // 生成动态饼图
                        dashboard.buildCircleChart(id + "_chart", per);
                    }
                } catch (e1) {
                    per = 0;
                }
            } catch (e) {
                console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
            }
        });
    },

    // 查询指定tagname表中指定字段的指定类型的数据，并赋予指定id
    findValueAndPercentValue: function (id, tagname, type) {
        // var action = CONTEXT_PATH + "/queryEngine/findFieldValueByTableAndType";
        // var params = {
        //     queryDate: _start,
        //     tagname: tagname,
        //     type: type,
        //     field: _field
        // };
        // $.post(action, params, function (data) {
        //     try {
        //         var d = data.valueList[0];
        //         // 计算percent值
        //         var per = toDecimalAndPos(d / todayTotalEnergy * 100, 1);
        //         if (per == 'Infinity') {
        //             dashboard.findValueAndPercentValue(id, tagname, type);
        //         } else {
        //             if (!per) {
        //                 per = 100;
        //             }
        //             $("#" + id + "_elec").text(addCommas(d));
        //             // 生成动态饼图
        //             dashboard.buildCircleChart(id + "_chart", per);
        //         }
        //     } catch (e) {
        //         console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
        //     }
        // });
    },

    // 获取dashboard各个子系统当天的报警数量
    findAlarmNum: function () {
        // var action = CONTEXT_PATH + "/dashboard/findAlarmNum";
        // $.post(action, {
        //     today: _start
        // }, function (data) {
        //     try {
        //         var d = data.data;
        //         for (var i = 0; i < d.length; i++) {
        //             dashboard.setDashBoardAlarm(d[i][0], d[i][1]); // 分别是子系统个数和子系统名称
        //         }
        //     } catch (e) {
        //         console.debug("findAlarmNum此处错误可能是转换出问题了，可以忽略！", data, e);
        //     }
        // });
    },
    // 设置dashboard报警个数
    setDashBoardAlarm: function (num, system) {
        $("#dashboard_" + getChildSystemCode(system)).html("共 <em>" + num + "</em> 条报警");
    },
    // 查询指定tagname表中指定字段的指定类型的数据，并赋予指定id
    findFieldValueByTableAndType: function (id, tagname, type, field, queryDate) {
        // var action = CONTEXT_PATH + "/queryEngine/findFieldValueByTableAndType";
        // var params = {
        //     queryDate: queryDate,
        //     tagname: tagname,
        //     type: type,
        //     field: field
        // };
        // $.post(action, params, function (data) {
        //     try {
        //         if (id == 'tgm_co2_ra' || id == "ballroom_co2_ra" || id == "hotel_co2_ra") {
        //             if (id == 'tgm_co2_ra') {
        //                 $("#" + id).text(toDecimalAndPos(data.valueList[0] / 2, 1));
        //             } else {
        //                 $("#" + id).text(toDecimalAndPos(data.valueList[0], 1));
        //             }
        //         } else {
        //             // 防止超长，将布局挤开
        //             if (("" + data.valueList[0]).length > 4) {
        //                 $("#" + id).text(toDecimalAndPos(data.valueList[0], 1));
        //             } else {
        //                 $("#" + id).text(toDecimalAndPos(data.valueList[0], 10));
        //             }
        //         }
        //     } catch (e) {
        //         $("#" + id).text('');
        //         console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
        //     }
        // });
    },

    // 设置【今日累计用能】、【今日累计用能费用】和今日能耗(用能定额下方)
    setSumTotalEnergy: function (title, catalist, datalist, step) {
        try {
            todayTotalEnergy = datalist[0][0][0];
            $("#todaySumEnergy").text(addCommas(todayTotalEnergy)); // 今日累计用能
            $("#todayEnergyTotal").text(addCommas(todayTotalEnergy)); // 今日能耗(用能定额下方)
            $("#todaySumMoney").text(addCommas(toDecimalAndPos(todayTotalEnergy * 1.1, 1)));

            // 计算用能定额，然后给用能定额赋值，并生成图表
            var quato = toDecimalAndPos((todayTotalEnergy / curMonthQuota * 100), 10);
            $("#todayQuota").text(quato);
            $("#quotaChartPrecents").text(quato);
            dashboard.buildQuotaChart(quato); // 生成用能定额图表
        } catch (e) {
            console.debug("----此处报错可以忽略----", datalist);
        }
    },

    // 生成今日用能图表
    buildTodayEnergyChart: function (title, catalist, datalist, step) {
        //catalist = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
        datalist = [1578, 1535, 1444, 1406, 1426, 1509, 1711, 1896, 2058, 2172, 2275, 2289, 2283, 2296, 2265, 2177, 2160, 2283, 2276, 2203, 2068, 1942, 1735, 1574, 1578, 1505, 1444, 1406, 1426, 1509, 1711, 1896];
        /*var dataArr = new Array();
         var cataArr = new Array();
         var dataArrArr = datalist[0];
         var sumEnergy = 0;
         var sumLastMonthEnergy = 0;
         var day = showLastMonthLastDay().substring(8, 10);
         for (var i = day; i < dataArrArr.length; i++) {
         //var obj = catalist[i];
         sumEnergy += dataArrArr[i][0];
         dataArr.push(dataArrArr[i][0]);
         cataArr.push(catalist[i][0]);
         }
         for (var i = 0; i < day; i++) {
         sumLastMonthEnergy += dataArrArr[i][0];
         }*/
        //var catalist = [], data1 = [], data2 = [];
        //for (var i = 0; i < 24; i++) {
        //	catalist.push(i); // + ":00"
        //	data1.push(parseFloat((Math.random() * 50).toFixed(1)));
        //	data2.push(parseFloat((Math.random() * 15).toFixed(1)));
        //}
        //if(catalist == null ||datalist == null) {
        //    return;
        //}

        //只显示当前小时之前的数据
        var currDate = new Date();
        var day = currDate.getDate();
        var month = currDate.getMonth() + 1;
        var newCataList = [];
        var newData = [];

        var lastDay = new Date(currDate.getFullYear(), month, 0);
        for (var i = 1; i <= lastDay.getDate(); i++) {
            if (i <= day) {
                newData.push(datalist[i]);
            } else {
                newData.push(0);
            }
            newCataList.push(month + "/" + i);
        }
        // 获取单位
        var unit = window.localStorage.getItem("c_totalEnergy_unit");
        // 设置图表类型
        var charttype = window.localStorage.getItem("c_totalEnergy_chartType");
        // 设置图表描述
        var description = window.localStorage.getItem("c_totalEnergy_desc");
        if (!charttype) {
            charttype = "column";
        }
        if (!description) {
            description = "建筑总用电";
        }
        if (!unit) {
            unit = "kWh";
        }
        var columnColor = '#01C690', lineColor = '#FEC000';
        $('#todayenergy').highcharts({
            chart: {
                backgroundColor: '#000000',
                marginBottom: 50
            },
            legend: {
                x: 240,
                y: 10
            },
            xAxis: {
                categories: newCataList,
                labels: {
                    step: step,
                    style: {
                        color: '#F3F3F3',
                        fontSize: '12px',
                        fontFamily: 'RobotoRegular'
                    }
                }
            },
            yAxis: [{ // Primary yAxis
            }, { // Secondary yAxis
                opposite: true
            }],
            tooltip: {
                crosshairs: true,
                shared: true
            },
            series: [{
                type: charttype,
                borderColor: columnColor,
                name: description + '（' + unit + '）',
                color: columnColor,
                data: newData
                //}, {
                //	type : 'line',
                //	name : '室外温度（℃）',
                //	color : lineColor,
                //	data : data2,
                //	yAxis : 1,
                //	lineWidth : 2,
                //	marker : {
                //		radius : 3,
                //		lineColor : lineColor
                //	}
            }]
        });

    },
    // 生成碳足迹曲线
    buildCartonChart: function (title, catalist, datalist, step) {
        catalist = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];

        var data_give = [14.61, 14.64, 14.66, 14.69, 14.72, 14.74, 14.77, 15.01, 14.03, 13.52, 13.59, 13.35, 9.92, 8.49, 7.51, 7.65, 8.43, 9, 9.44, 9.66, 9.77, 9.83, 9.89, 9.95];
        //var data_back = [15.06,14.98,14.9,14.87,14.85,14.8,14.74,16,14.93,14.68,14.79,14.49,11.98,10.2,9.05,8.91,9.38,9.75,9.99,10.17,12.53,12.34,12.1,11.99];

        //只显示当前小时之前的数据
        var currDate = new Date();
        var hour = currDate.getHours();
        var newCataList = [];
        var newData_give = [];
        var newData_back = [];

        for (var i = 0; i <= hour; i++) {
            if (i < catalist.length && i < data_give.length) {
                newCataList.push(catalist[i]);
                newData_give.push(parseFloat(data_give[i].toFixed(1)));
                //newData_back.push(data_back[i]);
            }
        }

        //var curr_give = data_give[hour];
        //var curr_back = data_back[hour];
        //$("#curr_give").text(curr_give);
        //$("#curr_back").text(curr_back);

        $('#cartonchart').highcharts({
            chart: {
                type: 'areaspline',
                backgroundColor: '#000000'
            },
            legend: {
                enabled: false
            },
            xAxis: {
                tickColor: 'rgba(0, 0, 0, 0.5)',
                categories: newCataList,
                labels: {
                    step: step,
                    style: {
                        color: '#A2A2A2',
                        fontWeight: 'bold',
                        fontFamily: 'RobotoRegular'
                    }
                }
            },
            yAxis: {
                gridLineColor: '#5F5F5F',
                labels: {
                    style: {
                        fontSize: '14px'
                    }
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ''
            },
            plotOptions: {
                areaspline: {
                    fillOpacity: 0.5
                }
            },
            series: [
                {
                    name: "地下二层冷冻站供水温度（℃）",
                    lineWidth: 1.5,
                    marker: {
                        radius: 3
                    },
                    color: '#FFBA00',
                    data: newData_give
                }
                //,
                //{
                //    name: "C座回水温度",
                //    lineWidth: 1.5,
                //    marker: {
                //        radius: 3
                //    },
                //    color: '#68D100',
                //    data: newData_back
                //}
            ]
        });

    },
    // 生成用能定额图表
    buildQuotaChart: function (datalist) {
        var data = datalist[0];
        var sumToday = 0;
        var sumYesterday1 = 0;
        var sumYesterday2 = 0;
        for (var i = 24; i < data.length; i++) {
            sumToday += data[i][0];
        }
        for (var i = 0; i < data.length - 24; i++) {
            sumYesterday1 += data[i][0];
        }
        for (var i = data.length - 24; i < 24; i++) {
            sumYesterday2 += data[i][0];
        }
        var percent = 0;
        if (sumToday == 0 || sumYesterday1 == 0) {
            $('#HotelComparePercent').text('下降--')
        } else {
            if (sumYesterday1 > sumToday) {
                percent = (sumYesterday1 - sumToday) / sumYesterday1
                percent = percent * 100
                $('#HotelComparePercent').text('下降' + percent.toFixed(1))
            } else {
                percent = (sumToday - sumYesterday1) / sumYesterday1
                percent = percent * 100
                $('#HotelComparePercent').text('上升' + percent.toFixed(1))
            }
        }

        var source = getUrlParam('source')
        var myChart = echarts.init(document.getElementById('energyquota'));
        //var option = {
        //    tooltip: { // 提示信息
        //        formatter: "{a} <br/>{b} : {c}%"
        //    },
        //    toolbox: {
        //        show: false
        //    },
        //    series: [{
        //        startAngle: 180,
        //        endAngle: 0,
        //        center: ['50%', '90%'], // 默认全局居中
        //        radius: [0, '165%'],
        //        min: 0, // 最小值
        //        max: 100, // 最大值
        //        name: '业务指标',
        //        splitNumber: 4, // 间隔段，用MAX除以这个数字得出
        //        type: 'gauge',
        //        axisLine: { // 坐标轴线
        //            show: true, // 默认显示，属性show控制显示与否
        //            lineStyle: { // 属性lineStyle控制线条样式
        //                color: [[0.25, '#7CD000'], [0.75, '#FFBB00'],
        //                    [1, '#FE5F71']],
        //                width: 40
        //            }
        //        },
        //        axisTick: { // 坐标轴小标记
        //            show: true, // 属性show控制显示与否，默认不显示
        //            splitNumber: 5, // 每份split细分多少段
        //            length: -10, // 属性length控制线长
        //            inside: false,
        //            lineStyle: { // 属性lineStyle控制线条样式
        //                color: '#FFF',
        //                width: 1,
        //                type: 'solid'
        //            }
        //        },
        //        splitLine: { // 分隔线
        //            show: true, // 默认显示，属性show控制显示与否
        //            length: 35, // 属性length控制线长
        //            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
        //                color: 'rgba(0,0,0,0)',
        //                width: 1,
        //                type: 'solid'
        //            }
        //        },
        //        axisLabel: {
        //            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        //                color: '#FFF',
        //                fontSize: '16',
        //                fontFamily: '微软雅黑'
        //            },
        //            formatter: function (v) {
        //                switch (v + '') {
        //                    case '0' :
        //                        return '0%';
        //                    case '25' :
        //                        return '25%';
        //                    case '50' :
        //                        return '50%';
        //                    case '75' :
        //                        return '75%';
        //                    case '100' :
        //                        return '100%';
        //                    default :
        //                        return '';
        //                }
        //            }
        //        },
        //        title: {
        //            show: true,
        //            offsetCenter: [0, '-60%'], // x, y，单位px
        //            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        //                color: 'rgba(0,0,0,0)'
        //            }
        //        },
        //        data: [{
        //            value: num,
        //            name: '今日用能定额'
        //        }]
        //    }]
        //};
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            color: ["rgb(1, 198, 144)", "rgba(1, 198, 114,0.3)"],
            grid: {
                left: '3%',
                right: '3%',
                bottom: '1%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['今日累计', '昨日累计'],
                    axisLabel: { //坐标轴文本标签
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                        }
                    },
                    axisLine: { //x轴线的样式
                        lineStyle: {
                            color: '#ccc',
                        }
                    },
                }
            ],
            yAxis: [
                {
                    name: 'kWh',
                    type: 'value',
                    axisLabel: {
                        textStyle: {  //文本颜色
                            color: 'white',
                            fontSize: 14,
                        }
                    },
                    nameTextStyle: {//y轴 单位 文本的颜色
                        color: 'white',
                        fontSize: 16,
                    },
                    axisLine: {  //y轴线与背景色一样的颜色 去掉y轴线
                        lineStyle: {
                            color: 'rgb(26,28,31)'
                        }
                    },
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: 45,
                    stack: '广告',
                    data: [sumToday.toFixed(1), sumYesterday1.toFixed(1)]
                },
                {
                    name: '',
                    type: 'bar',
                    stack: '广告',
                    data: [0, sumYesterday2.toFixed(1)]
                },
            ]
        };
        myChart.setOption(option); // 为echarts对象加载数据
    }
};

// 点击今日用能弹出的配置框
function setTotalEnergyModule() {
    //今日用能情况模块 模块配置弹框
    $('#setModule_wrap').modal('show');
}
// 点击左侧室内参数，弹出对应的配置框
function setLeftIndoorParam() {
    $('#setModule_lfip').modal('show');
}

////点击第二个室内参数
//function setLeftSecondIndoorParam(){
//    $('#setModule_lsip').modal('show');
//}
//
////点击第三个室内参数
//function setLeftThirdIndoorParam(){
//    $('#setModule_ltip').modal('show');
//}

// //用能定额模块配置
// function setEnergyQuota() {
//     $('#setModule_energyquota').modal('show');
// }
//
// //碳足迹
// function setCarbonFoot() {
//     $('#setModule_carbonFoot').modal('show');
// }
