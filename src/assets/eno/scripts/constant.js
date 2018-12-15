// 全局的查询起止时间
var date = new Date();
var currYear = date.getFullYear();
var currMonth = date.getMonth() + 1;
var currDay = date.getDate();
if (currDay < 10) {
    currDay = "0" + currDay;
}
if (currMonth < 10) {
    currMonth = "0" + currMonth;
}
var _start = currYear + "-" + currMonth + "-" + currDay, _end = getTimeByDays(_start, 1);
//var _start = getCurrentTime(), _end = getTimeByDays(_start, 1);

// 默认查询字段
var _field = "rvalue";

// 定义的定额标准内容
//var quotaList = [24784.5, 34698.3, 39655.2, 49569.0, 57004.3, 66918.2, 71875.1, 74353.5, 61961.3, 57836.2, 37176.7, 27262.9];
var quotaList = [57836, 57836, 57836, 57836, 57836, 57836, 57836, 57836, 57836, 57836, 57836, 57836];
var curMonthQuota = quotaList[new Date().getMonth()];

// dashboard上用到的变量列表
var _electotal = "elec#total";
var _elevator = "elec#elevator";
var _lighting_fcu = "elec#lighting_fcu";
//var _elevator = "elec#elevator";
//var _elevator = "elec#elevator";
//var _elevator = "elec#elevator";
//var _elevator = "elec#elevator";
//var _elevator = "elec#elevator";

// 默认显示视图（day表示日视图）
var dtype = "day";

// 能源管理-一宫格
var oneEnergyTotalName = 'elec#total'; // 一宫格-1.建筑总用电量
// 能源管理-六宫格
var sexEnergyTotalName = 'elec#total'; // 六宫格-1.建筑总用电量
var sexEnergySubentry = 'elec#fire'; // 六宫格-2.消防系统用电量
var sexElectricityTotalName = 'elec#IDC'; // 六宫格-3.数据中心用电量
var sexHvacSubentry = 'elec#drainage'; // 生成六宫格-4.给排水系统用电
var sexDataCenterName = 'elec#rwp'; // 六宫格-5.中水系统用电量
var sexDeviceEnergyName = 'elec#nightscape'; // 六宫格-6.夜景照明系统用电
// 能源管理-九宫格
var nineEnergyTotalName = 'elec#total'; // 九宫格-1.建筑总用电量
var nineEnergyTotal = 'elec#fire'; // 九宫格-2.消防系统用电量
var nineElectricityTotalName = 'elec#IDC'; // 九宫格-3.数据中心用电量
var nineWaterTotalName = 'elec#drainage'; // 九宫格-4.给排水系统用电
var nineGasTotalName = 'elec#rwp'; // 九宫格-5.中水系统用电量
var nineBuildSubentry = 'elec#nightscape'; // 九宫格-6.夜景照明系统用电
var nineHvacSubentry = 'elec#elevator'; // 九宫格-7.电梯系统用电量
var nineDataCenterName = 'elec#hvac'; // 九宫格-8.暖通空调系统用电
var nineDeviceEnergyName = 'elec#hvac_cwp'; // 九宫格-9.冷却水泵用电量

// 低碳管理
var _lowTotalCarbonTag = "carbon#total"; // 总碳足迹
var _officeCarbonTag = "carbon#office"; // 办公室层碳足迹
var _hotelCarbonTag = "carbon#nuo"; // 诺金酒店碳足迹
var _tgmCarbonTag = "carbon#tgm"; // 谭阁美碳足迹

// 电子巡更 数据源常量
var access_type1 = "access1"; // 使用一号楼数据源
var access_type2 = "access2"; // 使用二号楼数据源


var DASHBOARD_TOTALENERGY = 'DASHBOARD_TOTALENERGY';    //用能概况
var DASHBOARD_INDOOR_PARAM = 'DASHBOARD_INDOOR_PARAM';  //室内参数
var DASHBOARD_BUILD_INFO = 'DASHBOARD_BUILD_INFO';      //建筑信息
var DASHBOARD_ENERGY_QUOTA = 'DASHBOARD_ENERGY_QUOTA';  //用能定额
var DASHBOARD_CARBON_FOOT = 'DASHBOARD_CARBON_FOOT';    //碳足迹

var ENERGY_MANAGE = 'ENERGY_MANAGE';                    //能源管理


var RUN_MONITOR = 'RUN_MONITOR';                 //运行监测
var RUN_MONITOR_TWO = 'RUN_MONITOR_TWO';             //运行监测第二个模块
var RUN_MONITOR_THREE = 'RUN_MONITOR_THREE';           //运行监测第三个模块
var RUN_MONITOR_FOUR = 'RUN_MONITOR_FOUR';            //运行监测第四个模块
var RUN_MONITOR_BOTTOM = 'RUN_MONITOR_BOTTOM';          //运行监测底部五个模块的配置信息

//定义用于在图表上显示的颜色数组
var color = ['#42BE99', '#F6D632', '#F2A733', '#CCFFFF', '#FFFFCC', '#FFCCCC', '#FFFF99', '#CCCCFF', '#FF9966', '#FF6666', '#CCFF99', '#CCFFCC', '#FFFFFF'];
