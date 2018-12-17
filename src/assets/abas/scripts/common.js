(function (angular) {
    'use strict';
    var portal = angular.module('portalApp', []);
})(window.angular);

$(function () {

    getWeather(); //获取天气

    getParkInfo(); //获取园区信息

    getBaseData(); //获取首页图表数据
    //用户管理下拉
    $(".login_user").on("click", function () {
        if ($(this).hasClass("showDown")) {
            $(this).removeClass("showDown").addClass("hideUp");
        } else {
            $(this).removeClass("hideUp").addClass("showDown");
        }
        $(".login_user_box").slideToggle("slow");
    });


    //二级菜单切换
    $(".js_subnav ul li").click(function () {
        $(this).siblings().removeClass("js_subnav_current");
        $(this).addClass("js_subnav_current");
        $(".js_tab_content").hide().eq($(".js_subnav ul li").index(this)).show();
    });

    //变配电系统结构图鼠标移入相应的参数回高亮显示
//    $(".pmt .tooltipMark").hover(function(){
//        $(".js_syselec_con li").eq($(".pmt .tooltipMark").index(this)).addClass("highlight");
//    },function(){
//        $(".js_syselec_con li").eq($(".pmt .tooltipMark").index(this)).removeClass("highlight");
//    });
    //表格鼠标移入高亮显示
    $(".tablist>tbody>tr").hover(function () {
        $(this).addClass("tabLight");
    }, function () {
        $(this).removeClass("tabLight");
    });

    //能源管理一宫格左侧菜单
    $(".Echart_sidebar_subcon a").click(function () {
        $(this).siblings().removeClass("selecton");
        $(this).addClass("selecton");
        return false;
    });
    var energyMenutop = 0;
    $(".js_energy_container").on('scroll', function () {
        var energyMenu1 = $(this).find(".js_energy_content").find("h3");
        energyMenutop = $(this).prev().offset().top;
        var mlength = energyMenu1.length;
        for (var j = 0; j < mlength; j++) {
            if ($(energyMenu1[j]).offset().top < energyMenutop + 5 && j + 1 != mlength && $(energyMenu1[j + 1]).offset().top > energyMenutop) {
                $(this).prev().html($(energyMenu1[j]).html());
            } else if ($(energyMenu1[0]).offset().top > energyMenutop) {
                $(this).prev().html("<i class='flag flag_green mr15 mt20'></i>建筑总体能耗");
                //$(this).prev().html("能源总体能耗");
            } else if ($(energyMenu1[mlength - 1]).offset().top < energyMenutop + 30) {
                $(this).prev().html($(energyMenu1[mlength - 1]).html());
            }
        }
    });

    //设备管理预防性维护 左侧菜单切换
//    $(".device_sidebar_subcon ul li").click(function(){
//        $(this).siblings().removeClass("selecton").find("span").children(".usertab_toolBox").hide();
//        $(this).addClass("selecton").find("span").children(".usertab_toolBox").show();
//        $(".device_main").hide().eq($(".device_sidebar_subcon ul li").index(this)).show();
//    });
    //下拉列表
    try {
        $('.selectpicker').selectpicker({
            "width": "130px"
        });
        $('.selectpicker_w150').selectpicker({
            "width": "150px"
        });
        $('.selectpicker_w197').selectpicker({
            "width": "197px"
        });
        $('.selectpicker_w218').selectpicker({
            "width": "218px"
        });
        $('.selectpicker_w154').selectpicker({
            "width": "154px"
        });
    } catch (e) {
    }

    //运行监测二级页面左侧菜单
    $(".main_menu>ul>li").on("click", function () {
        $(this).siblings().removeClass("main_menu_current");
        $(this).addClass("main_menu_current");
    });

    $(".second_menu li").click(function () {
        var sendMenu = $(this).find("h2").text();
        if (sendMenu == '组合式空调箱') {

            $(".js_system_viewBar ul li:eq(0)").addClass('js_system_viewBar_on').find("a").removeClass("icon_plan_disable");
            $(".js_system_viewBar ul li:gt(0)").removeClass('js_system_viewBar_on');
            $(".js_system_viewBar ul li:eq(1)").find("a").addClass('icon_structure_disable');
            //$(".js_system_viewBar ul li:eq(0)").find("a").removeClass("icon_plan_disable");
            $(".js_system_content:eq(0)").show();
            $(".js_system_content:eq(1)").hide();
            $(".js_system_content:eq(2)").hide();
        }
        if (sendMenu == '冷机群控') {
            $(".js_system_viewBar ul li:eq(0)").removeClass('js_system_viewBar_on').find("a").addClass("icon_plan_disable");
            $(".js_system_viewBar ul li:eq(1)").addClass('js_system_viewBar_on');
            $(".js_system_viewBar ul li:eq(2)").removeClass('js_system_viewBar_on');
            //$(".js_system_viewBar ul li:eq(0)").find("a").addClass("icon_plan_disable");
            $(".js_system_content:eq(1)").show();
            $(".js_system_content:eq(0)").hide();
            $(".js_system_content:eq(2)").hide();
        }

//        var subCon=$(this);
//        if(subCon.hasClass('on')){
//            subCon.find('.all_floor').slideUp('fast',function(){
//                subCon.removeClass('on');
//            });
//        }else{
//            subCon.find('.all_floor').slideDown('fast',function(){
//                subCon.addClass('on');
//            });
//            subCon.siblings().removeClass('on').find('.all_floor').slideUp('fast');
//        }
        var subCon = $(this);
        subCon.toggleClass("on").siblings(subCon).removeClass("on");
        subCon.children(".all_floor").slideToggle("fast");
        subCon.siblings().find(".all_floor").slideUp("fast")
    });
    $(".second_menu>ul>li").on("click", function () {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
    });

    // li标签下增加点击事件
    $(".second_menu a").click(function () {
        var subCon = $(this).addClass("focus");
        $(this).siblings().removeClass('focus');
        return false;
    });

    // 运行监测左侧滚动条滚到相应位置
    var floortop = 0;
    $(".js_floor_container").on('scroll', function () {
        var floor1 = $(this).find(".js_floor_content").find("h3");
        floortop = $(this).prev().offset().top;
        var flength = floor1.length;
        for (var j = 0; j < flength; j++) {
            if ($(floor1[j]).offset().top < floortop + 5 && j + 1 != flength && $(floor1[j + 1]).offset().top > floortop) {
                $(this).prev().html($(floor1[j]).html());
            } else if ($(floor1[0]).offset().top > floortop) {
                $(this).prev().html("地下室");
            } else if ($(floor1[flength - 1]).offset().top < floortop + 30) {
                $(this).prev().html($(floor1[flength - 1]).html());
            }
        }
    });
    //暖通空调结构图点击弹框事件
    $(".tooltipBox:has('.tooltip_showBox')").click(function () {
        $(this).children(".tooltip_showBox").stop(true, true).show();
    });
    $(".tooltip_closeBtn").click(function () {
        $(".tooltip_showBox").hide();
        return false;
    });
    //日周月年视图的点击事件
    $(".viewList>li:not(.compare)").click(function () {
        $(this).siblings().removeClass("changeColor");
        $(this).addClass("changeColor");

        dtype = $(this).attr("dtype"); // 获取li标签的dtype属性
        var format = "yyyy-MM-dd";
        if (dtype == "day") {
            format = "yyyy-MM-dd";  //日视图日历格式为yyyy-MM-dd显示
        } else if (dtype == "week") {
            format = "yyyy-MM-dd";  //周视图日历格式为yyyy-MM-dd显示
        } else if (dtype == "month") {
            format = "yyyy-MM";     //年视图日历格式为yyyy-MM显示
        } else if (dtype == "year") {
            format = "yyyy";        //年视图日历格式为yyyy显示
        } else if (dtype == "all") {
            format = "yyyy-MM-dd";
        } else if (dtype == "self") {
            return;
        }

        //不处理能耗报表的日历插件点击事件
        if ($(this).parent().attr("func") == "selfReport") {
            return;
        }
        //不处理用能费用报表
        if ($(this).parent().attr("func") == "costReport") {
            return;
        }
        //不处理系统首页能源消耗模块的内容
        if ($(this).parent().attr("func") == "dashboard") {
            return;
        }
        chooseReportTime(format, dtype, $(this).parent().attr("func"));
    });

    //设备管理点击编辑/删除前边出现编辑/删除按钮
    $(".btn_edit").on("click", function () {
        if ($(this).hasClass("btn_green")) {
            $(this).removeClass("btn_green").addClass("btn_grey");
            $(".tableList .edit").hide();
            $(".tableList .delete").hide();
        } else {
            $(this).removeClass("btn_grey").addClass("btn_green");
            $(this).siblings(".btn_delete").removeClass("btn_green").addClass("btn_grey");
            $(".tableList .edit").show();
            $(".tableList .delete").hide();
        }
    });
    $(".btn_delete").on("click", function () {
        if ($(this).hasClass("btn_green")) {
            $(this).removeClass("btn_green").addClass("btn_grey");
            $(".tableList .delete").hide();
            $(".tableList .edit").hide();
        } else {
            $(this).removeClass("btn_grey").addClass("btn_green");
            $(this).siblings(".btn_edit").removeClass("btn_green").addClass("btn_grey");
            $(".tableList .delete").show();
            $(".tableList .edit").hide();
        }
    });

    //运行监测二级页面三种视图切换
    $(".js_system_viewBar>ul>li").click(function () {
        if ($(this).hasClass("icon_disable")) {
            return false;
        }
        if ($(this).attr("showid") == 'PLAN') {

            $("#switchBtnDiv").show();
        } else {
            $("#switchBtnDiv").hide();
        }
        //修改自定义组件的显示/隐藏的BUG，保证在该显示的视图显示
        var bindViewsDom = $("[bindViews]");
        for (var i = 0; i < bindViewsDom.length; i++) {
            if (bindViewsDom[i].attributes['bindViews'].value.indexOf($(this).attr("showid")) >= 0) {
                bindViewsDom[i].hidden = false;
            } else {
                bindViewsDom[i].hidden = true;
            }
        }
        $(this).siblings().removeClass("js_system_viewBar_on");
        $(this).addClass("js_system_viewBar_on");
        $(".tab-pane").hide();
        $("#" + $(this).attr("showid")).show();
    });

    // 报表内容展开收起

    //$(".triangle_show").on("click", function() {
    //    if($(this).hasClass("triangle_hide")) {
    //        $(this).removeClass("triangle_hide").addClass("triangle_show");
    //        $(".tableBox table").css("height","560px");
    //        $(".tableBox .reporF_noCon").css("height","440px");
    //        var titleHeight = $(".reportForm_category").height();
    //        $("#reportdiv").animate({height:(660-titleHeight)+"px"});
    //        //$("#reportdiv").height();
    //    } else {
    //        $(this).removeClass("triangle_show").addClass("triangle_hide");
    //        $(".tableBox table").css("height","726px");
    //        $(".tableBox .reporF_noCon").css("height","566px");
    //        var titleHeight = $(".reportForm_category").height();
    //        $("#reportdiv").animate({height:"720px"});
    //        //$("#reportdiv").height(700);
    //    }
    //    $(".reportForm_category").slideToggle("slow");
    //});

    //定额管理的配置定额 历史数据展开收起
    $(".export_showBtn").on("click", function () {
        if ($(this).hasClass("export_hideBtn")) {
            $(this).removeClass("export_hideBtn").addClass("export_showBtn");
            //console.log("has");
        } else {
            //console.log("nohas");
            $(this).removeClass("export_showBtn").addClass("export_hideBtn");
        }
        $(".history_showhide").slideToggle("slow");
        //console.log(event);
    });

    setInterval(GetTime, 1000); // 动态设置时间和星期

});

/**
 * 动态设置日期时间和星期
 */
function GetTime() {
    var mon, day, now, hour, min, sec;
    mon = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    now = new Date();
    hour = now.getHours();
    min = now.getMinutes();
    sec = now.getSeconds();
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (min < 10) {
        min = "0" + min;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }

    var time = hour + ":" + min;
    var date = now.getFullYear() + "-" + mon[now.getMonth()] + "-" + (((now.getDate() + "").length == 1) ? "0" + now.getDate() : now.getDate());
    var week = day[now.getDay()];

    if ($("#global_time").length) {
        $("#global_time").html(time);
    }
    if ($("#global_date").length) {
        $("#global_date").html(date);
    }
    if ($("#global_week").length) {
        $("#global_week").html(week);
    }
}

// 获取当前时间，格式为：2013-10-09
function getCurrentTime() {
    var Nowdate = new Date();
    var day = (Nowdate.getDate() + "");
    day = day.length == 1 ? ("0" + day) : day;
    var month = ((Nowdate.getMonth() + 1) + "");
    month = month.length == 1 ? ("0" + month) : month;
    t = [Nowdate.getFullYear(), month, day];
    return t.join('-');
}

// 获取当前月份的最后一天，格式为：2013-10-31
function getCurrentMonthLastDay() {
    var currentTime = getCurrentTime();
    var year = currentTime.substring(0, 4)
    var month = currentTime.substring(5, 7)
    var day = new Date(year, month, 0);
    var lastdate = year + '-' + month + '-' + day.getDate();
    return lastdate;
}

//转换日期的格式：把2013-10-09转换为10/09
function transformDateFormat(dateString) {
    var arr = dateString.split("-");
    return arr[1] + '/' + arr[2];
}

//转换日期格式 :把2013-10-09转换为20131009
function transformDateFormatSecond(dateString) {
    var arr = dateString.split("-");
    return arr[0] + "" + arr[1] + '' + arr[2];
}

//获取给定的日期对应是周几
function getWeekByDay(dataString) {
    var date = new Date(dataString);
    var week = date.getDay();
    if (week == 1) {
        return "周一"
    }
    if (week == 2) {
        return "周二"
    }
    if (week == 3) {
        return "周三"
    }
    if (week == 4) {
        return "周四"
    }
    if (week == 5) {
        return "周五"
    }
    if (week == 6) {
        return "周六"
    }
    if (week == 0) {
        return "周日"
    }
}


// 根据给出的时间s往后推d天，例如：s=2013-10-13，d=2，则返回2013-10-15
function getTimeByDays(s, d) {
    var Nowdate = new Date(Date.parse(s.replace(/-/g, '/')));
    // var WeekFirstDay=new Date(Nowdate-((Nowdate.getDay() == 0 ? 7 :
    // Nowdate.getDay())-d)*86400000);
    var WeekFirstDay = new Date(Nowdate.getTime() + (d * 86400000));
    var day = (WeekFirstDay.getDate() + "");
    day = day.length == 1 ? ("0" + day) : day;
    var month = ((WeekFirstDay.getMonth() + 1) + "");
    month = month.length == 1 ? ("0" + month) : month;
    t = [WeekFirstDay.getFullYear(), month, day];
    return t.join('-');
}

// 显示当前日期对应的周的第一天
function showWeekFirstDay(s) {
    var Nowdate = new Date(Date.parse(s.replace(/-/g, '/')));
    var WeekFirstDay = new Date(Nowdate
        - ((Nowdate.getDay() == 0 ? 7 : Nowdate.getDay()) - 1) * 86400000);
    var day = (WeekFirstDay.getDate() + "");
    day = day.length == 1 ? ("0" + day) : day;
    var month = ((WeekFirstDay.getMonth() + 1) + "");
    month = month.length == 1 ? ("0" + month) : month;
    t = [WeekFirstDay.getFullYear(), month, day];
    return t.join('-');
}

// 显示传递日期对应的下个月的第一天
function showNextMonthFirstDay(s) {
    if (s.indexOf('/') > 0) {
        s = s.replace(/-/g, '/')
    }
    var Nowdate = new Date(Date.parse(s));
    Nowdate.setMonth(Nowdate.getMonth() + 1); // 当前月份往后推一个月
    var month = ((Nowdate.getMonth() + 1) + "");
    //alert(month, Nowdate);
    month = month.length == 1 ? ("0" + month) : month;
    t = [Nowdate.getFullYear(), month, "01"];
    return t.join('-');
}

//获取上个月的最后一天
function showLastMonthLastDay() {
    var nowdays = new Date();
    var year = nowdays.getFullYear();
    var month = nowdays.getMonth();
    if (month == 0) {
        month = 12;
        year = year - 1;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var firstDay = year + "-" + month + "-" + "01";//上个月的第一天
    var myDate = new Date(year, month, 0);
    var lastDay = year + "-" + month + "-" + myDate.getDate();//上个月的最后一天
    return lastDay;
}

// 显示当前日期对应的周的最后一天
function showWeekLastDay(s) {
    if (s.indexOf('/') > 0) {
        s = s.replace(/-/g, '/')
    }
    var Nowdate = new Date(Date.parse(s));
    var WeekFirstDay = new Date(Nowdate
        - ((Nowdate.getDay() == 0 ? 7 : Nowdate.getDay()) - 1) * 86400000);
    var WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000);
    var day = (WeekLastDay.getDate() + "");
    day = day.length == 1 ? ("0" + day) : day;
    var month = ((WeekLastDay.getMonth() + 1) + "");
    month = month.length == 1 ? ("0" + month) : month;
    t = [WeekLastDay.getFullYear(), month, day];
    return t.join('-');
}


// 获取天气信息
var humidity = 0;

function getWeather() {
    var url = "http://47.99.125.173:3000/mock/11/app/ibms/weather/getWeatherInfo";
    $.ajax({
        url: url, type: 'GET', dataType: 'json', success: function (data) {
            console.log(data);
            if (data != null) {
                var minTemp = data.data.minTemperature;
                if (minTemp == null || minTemp == "" || minTemp == undefined) {
                    minTemp = "--";
                }
                var maxTemp = data.data.maxTemperature;
                if (maxTemp == null || maxTemp == "" || maxTemp == undefined) {
                    maxTemp = "--";
                }
                $("#arrow_up_y").html(maxTemp); // 左侧最高温度
                $("#arrow_down_y").html(minTemp); // 左侧最低气温
                $(".weather_temp").html(data.data.minTemperature + "/" + data.data.maxTemperature);
                $(".weather_pic").attr("style", "background:url(" + data.data.img2 + ") no-repeat;");
                $(".weather_info").html(data.data.weather);
                //         var temperature = data.weather.temperature;
                //         temperature = temperature == null ? '-' : temperature;
                //         $("#current_t_ra").html(temperature); // 当前温度
                //         var humidity = data.weather.humidity;
                //         if (humidity == null || humidity == "" || humidity == undefined) {
                //             humidity = "--";
                //         }
                //         $("#current_rh_ra").html(humidity + "%");// 湿度
                //
                //         // todo 银泰项目，现场没有温湿度传感器，使用互联网上取到的数据
                //         try {
                //             $("#runmonitor_temperature").html(temperature);// 室外干球温度
                //             $("#runmonitor_humidity").html(humidity);// 室外相对湿度
                //         } catch (e) {
                //             console.warn("室外温湿度获取失败");
                //         }
                //         // todo 清华项目，Dashboard上的室外干球温度和湿度，使用互联网上取到的数据
                //         try {
                //             $("#outdoor_temp_temperature").html(temperature);// 室外干球温度
                //             $("#outdoor_temp_humidity").html(humidity);// 室外相对湿度
                //         } catch (e) {
                //             console.warn("清华项目，室外温湿度获取失败");
                //         }
            }
        }
    });
}

/**
 * 生成一个或多个曲线
 *
 * @param {} callback 回调函数
 * @param {} pointname 数据库的表名
 * @param {} title 图表的标题
 * @param {} start 查询的开始时间，格式2015-07-16
 * @param {} end 查询的结束时间，格式2015-07-17
 * @param {} timescales hour,day,week,month,year
 * @param {} step 图表的间隔
 * @param {} clist
 * @param {} timeformat yyyy、MM、dd、HH、mm、ss
 */
function renderMoreCharts(callback, pointname, title, start, end, timescales, step, clist, timeformat, chatrTitle) {
    // var starts = [], ends = [], timescaleses = [], aggregatefunctions = [];
    // for (var i = 0; i < pointname.split(",").length; i++) {
    //     starts.push(start);
    //     ends.push(end);
    //     timescaleses.push(timescales);
    //     aggregatefunctions.push("sum");
    // }
    // var action = CONTEXT_PATH + "/queryEngine/getChartDataAndCataList";
    // var params = {
    //     pointname: pointname,
    //     aggregatefunction: aggregatefunctions.join(),
    //     timeend: ends.join(),
    //     timescales: timescaleses.join(),
    //     timestart: starts.join(),
    //     timeformat: timeformat ? timeformat : "HH:mm"
    // };
    // $.post(action, params, function (data) {
    //     var datalist = data.data, ca = [];
    //     try {
    //         if (data.cata) {
    //             ca = data.cata[0];
    //             if (clist != "" && clist.length > 0) {
    //                 ca = clist;
    //             }
    //         }
    //     } catch (e) {
    //         console.log("pointname:[" + pointname + "]", e);
    //     }
    //     callback(title, ca, datalist, step, chatrTitle);
    // });
}

function renderCircleCharts(callback, tagName, pointname, id, start, end, timescales, timeformat) {
    // var starts = [], ends = [], timescaleses = [], aggregatefunctions = [];
    // for (var i = 0; i < pointname.split(",").length; i++) {
    //     starts.push(start);
    //     ends.push(end);
    //     timescaleses.push(timescales);
    //     aggregatefunctions.push("sum");
    // }
    // var action = CONTEXT_PATH + "/queryEngine/getChartDataAndCataList";
    // var params = {
    //     pointname: tagName,
    //     aggregatefunction: aggregatefunctions.join(),
    //     timeend: ends.join(),
    //     timescales: timescaleses.join(),
    //     timestart: starts.join(),
    //     timeformat: timeformat ? timeformat : "HH:mm"
    // };
    // $.post(action, params, function (data) {
    //     var datalist = data.data;
    //     var params2 = {
    //         pointname: pointname,
    //         aggregatefunction: aggregatefunctions.join(),
    //         timeend: ends.join(),
    //         timescales: timescaleses.join(),
    //         timestart: starts.join(),
    //         timeformat: timeformat ? timeformat : "HH:mm"
    //     };
    //     $.post(action, params2, function (data) {
    //         var datalist2 = data.data;
    //         if (datalist2[0][0]) {
    //             $('#hotel' + id.substring(0, id.length - 6) + '_elec').text(datalist2[0][0][0])
    //             var percent = (datalist2[0][0][0] / datalist[0][0][0]) * 100
    //             if (percent == NaN) {
    //                 callback(id, 0);
    //             } else {
    //                 percent = percent.toFixed(0);
    //                 callback(id, parseInt(percent));
    //             }
    //         } else {
    //             $('#hotel' + id.substring(0, id.length - 6) + '_elec').text(0)
    //             callback(id, 0);
    //         }
    //
    //     });
    // });
}

/**
 * 获取白天用电（日出日落时间）数据
 * @param tagname   要查询的表名
 * @param id        要把查询结果赋值的id
 * @param start     开始时间
 * @param end       结束时间
 */

function findDayTimeElec(tagname, start, end, id) {
    // var action = CONTEXT_PATH + "/queryEngine/findDayTimeElec";
    // var params = {
    //     start: start,
    //     end: end,
    //     tagname: tagname,
    //     field: _field
    // };
    // $.post(action, params, function (data) {
    //     if (data.valueList[0]) {
    //         $("#" + id).text(addCommas(toDecimalAndPos(data.valueList[0][0])));
    //         $("#" + id + "Scale").text("占日累计用电的 " + data.valueList[0][1] + " %");
    //     } else {
    //         $("#" + id).text("-- (kwh)");
    //         $("#" + id + "Scale").text("占日累计用电的 -- %");
    //     }
    // });
}

/**
 * 格式化数据，中间加逗号分隔
 * @param nStr 要格式化的数字
 * @returns {*}
 */
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

/**
 * 根据子系统名称获取子系统编号
 * @param sytemname 子系统名称
 */
function getChildSystemCode(sytemname) {
    var systemcode = '';
    switch (sytemname) {
        case '暖通空调':
            systemcode = "HVAC";
            break;
        case '夜景照明':
            systemcode = "LSN";
            break;
        case '公共照明':
            systemcode = "LSPUB";
            break;
        case '给水排水':
            systemcode = "WSDS";
            break;
        case '电梯运行':
            systemcode = "MSEM";
            break;
        case '消防系统':
            systemcode = "FAS";
            break;
        case '门禁管理':
            systemcode = "SASAC";
            break;
        case '变配电':
            systemcode = "ETD";
            break;
        case '电子巡更':
            systemcode = "EP";
            break;
        case '停车管理':
            systemcode = "PARKM";
            break;
        case '能源管理':
            systemcode = "ENVMS";
            break;
        default :
            systemcode = "";
            break;
    }
    return systemcode;
}

/**
 * 将浮点数四舍五入，取小数点后指定位
 * @param x 要取舍的数值
 * @param pos 要取舍的位数（1表示取整、10表示保留一位小数、100表示保留两位小数）
 * @returns {*}
 */
function toDecimalAndPos(x, pos) {
    if (!pos) {
        pos = 10;
    }
    var f = parseFloat(x);
    if (isNaN(f)) return 0;
    f = Math.round(f * pos) / pos;
    return f;
}


// 找到指定表中最新的一条记录的数据，并赋予指定id
function findOneRecordByTagName(id, tagname) {
    // var action = CONTEXT_PATH + "/queryEngine/findOneRecordByTagName";
    // var params = {
    //     queryDate: _start,
    //     tagname: tagname,
    //     field: _field
    // };
    // $.post(action, params, function (data) {
    //     try {
    //         if (data.valueList[0] == null || data.valueList[0] == "") {
    //             $("#" + id).text("--");
    //         } else {
    //             $("#" + id).text(data.valueList[0]);
    //         }
    //     } catch (e) {
    //         $("#" + id).text('');
    //         console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
    //     }
    // });
}

// 找到指定表中最新的一条记录的数据，并赋予指定id
function findSumValueByTagName(id, tagname) {
    var action = CONTEXT_PATH + "/queryEngine/findSumValueByTagName";
    var params = {
        queryDate: _start,
        tagname: tagname,
        field: _field
    };
    $.post(action, params, function (data) {
        //console.debug(data);
        try {
            $("#" + id).text(data.valueList[0]);
        } catch (e) {
            $("#" + id).text('');
            console.debug("此处错误可能是转换出问题了，可以忽略！tagname为【" + tagname + "】", data, e);
        }
    });
}

// 本地控制/ENO控制切换按钮
function localControl() {
    var oldValue = $("#LocalBtn").attr("title");
    var title = oldValue;
    if (title == 'BA控制') {
        title = "ENO控制";
    } else {
        title = "BA控制";
    }
    $("#LocalBtn").attr("title", title);
    $("#LocalBtn").text(title);

    $.post(CONTEXT_PATH + "/back/testtools/insertSwitchLog", {
        oldValue: oldValue,
        newValue: title
    }, function (data) {
        console.debug(data);
    });
}

// 点击左上角的项目名称，跳转到选择项目页面
function selectProject() {
    window.location.href = CONTEXT_PATH + "/abas/location/index.html";
}

// 搜索设备信息
function searchAsset() {
    var searchInp = $('#search_inp');
    searchInp.bind('keydown', function (e) {
        if ($('#search_inp').val() != '' && e.keyCode == 13) {//Enter的键值=13
            //e.preventDefault();

            $('#searchResults_dialog').modal('show');
        }
    });
}

function getBaseData(){
    var action = "http://47.99.125.173:3000/mock/11/ibms/detail.notoken";
    var params = {};
    $.post(action, params, function (data) {
        //console.log(data);
        var electricList = data.data.electricList || [];
        var electricXData = [];
        var electricYData = [];
        for (var i = 0 ; i < electricList.length; i++){
            electricXData.push(electricList[i].date);
            electricYData.push(electricList[i].electricity);
        }
        console.log(electricXData);
        drawBarChart(electricXData,electricYData);
    });
}

//获取园区信息
function getParkInfo() {
    var action = "http://47.99.125.173:3000/mock/11/basepark/info.notoken";
    var params = {
        id: 1
    };
    $.post(action, params, function (data) {
        console.log(data);
        $("#buildingName").text(data.data.name);
        $("#buildingAddress").text(data.data.detailAddress);
        $("#buildingArea").text(data.data.buildingArea);
        $("#buildingTime").text(data.data.buildingTime);
    });
}

function drawBarChart(xAxisData,barData) {
    var dom = document.getElementById("container");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '信息园本月用电概况';
    option = {
        title: {
            text: app.title,
            left: "center",
            y: "10",
            textStyle: {
                //文字颜色
                color: '#ccc',
                //字体风格,'normal','italic','oblique'
                fontStyle: 'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight: 'bold',
                //字体系列
                fontFamily: 'sans-serif',
                //字体大小
                fontSize: 24
            }
        },
        backgroundColor: "#080f15",
        xAxis: [{
            type: 'category',
            data: xAxisData,
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
                //  改变轴线颜色
                lineStyle: {
                    // 使用深浅的间隔色
                    color: ['red']
                }
            },
            // x轴的颜色和宽度
            axisLine: {
                lineStyle: {
                    color: '#fff',
                    width: 2,   //这里是坐标轴的宽度,可以去掉
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
                    fontSize: 16,
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
            formatter: function(params) {
                return '日期：'+ params[0].name + "<br/>" + '用电量：' + params[0].value + ' KWh';
            },
            textStyle: {
                fontSize: 12
            }
        },
        series: {
            type: "bar",
            itemStyle: {
                normal: {
                    color: {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: "rgba(255,37,117,0.7)"
                        },
                            {
                                offset: 0.5,
                                color: "rgba(0,133,245,0.7)"
                            },
                            {
                                offset: 1,
                                color: "rgba(0,133,245,0.3)"
                            }
                        ],
                        globalCoord: false
                    }
                }
            },
            // barWidth: 7,
            data: barData
        }
    };
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
};

function drawPieChart() {
    var dom = document.getElementById("pieChart");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '信息园资源管理信息统计';
    option = {
        title: {
            text: app.title,
            left: 'center',
            textStyle: {
                //文字颜色
                color: '#ccc',
                //字体风格,'normal','italic','oblique'
                fontStyle: 'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight: 'bold',
                //字体系列
                fontFamily: 'sans-serif',
                //字体大小
                fontSize: 24
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} (占比 {d}%)"
        },
        color: ['#f6da22', '#bbe2e8', '#6cacde'],
        legend: {
            // orient: 'vertical',
            // top: 'middle',
            bottom: 10,
            left: 'center',
            data: ['设备总数', '在用总数', '维修总数'],
            backgroundColor: '#fff',
            // borderColor: 'rgba(178,34,34,0.8)',
            // borderWidth: 4,
            textStyle: {
                //文字颜色
                // color: '#ccc',
                //字体风格,'normal','italic','oblique'
                fontStyle: 'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight: 'bold',
                //字体系列
                fontFamily: 'sans-serif',
                //字体大小
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
                    {value: 2500, name: '设备总数'},
                    {value: 2300, name: '在用总数'},
                    {value: 200, name: '维修总数'}
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
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function drawLineChart() {
    var dom = document.getElementById("lineChart");
    var myChart = echarts.init(dom);
    var app = {};
    option = null;
    app.title = '信息园资源管理信息统计';
    option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        title: {
            left: 'center',
            text: '信息园实时人流',
            textStyle: {
                //文字颜色
                color: '#ccc',
                //字体风格,'normal','italic','oblique'
                fontStyle: 'normal',
                //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                fontWeight: 'bold',
                //字体系列
                fontFamily: 'sans-serif',
                //字体大小
                fontSize: 24
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00",
                "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
                "20:00", "21:00", "22:00", "23:00"],
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
                    fontSize: 16,
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
    };

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function drawScaPieChart() {
    var dom = document.getElementById("scaPieChart");
    var myChart = echarts.init(dom);
    option = null;
    option = {
        title: {
            text: '10%',
            x: 'center',
            y: 'center',
            textStyle: {
                fontWeight: 'normal',
                color: '#0580f2',
                fontSize: '16'
            }

        },
        color: '#536882',
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
                        color: '#EB5D8E',// 100% 处的颜色,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }, {
                value: 90
            }]
        }]
    }

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function drawBohPieChart() {
    var dom = document.getElementById("bohPieChart");
    var myChart = echarts.init(dom);
    option = null;
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
        color: '#536882',
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
                        color: '#48B3F9',// 100% 处的颜色,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }, {
                value: 95
            }]
        }]
    }

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function drawParkPieChart() {
    var dom = document.getElementById("parkPieChart");
    var myChart = echarts.init(dom);
    option = null;
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
        color: '#536882',
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
                        color: '#EAC120',// 100% 处的颜色,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }, {
                value: 87
            }]
        }]
    }

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}

function drawColdPieChart() {
    var dom = document.getElementById("coldPieChart");
    var myChart = echarts.init(dom);
    option = null;
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
        color: '#536882',
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
                        color: '#3AF22C',// 100% 处的颜色,
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                }
            }, {
                value: 84
            }]
        }]
    }

    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
}