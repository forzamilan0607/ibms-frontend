/**
 * All rights Reserved, Designed By 翼虎能源
 * Copyright:    Copyright(C) 2015-2015
 * Company       北京翼虎能源科技有限公司
 * @author       sunfeilong
 * @date         2015/10/9 15:51
 * @version      1.0
 * @Description  energicube-portal
 *
 */
//var _start = '2015-12-11';
var _start = getCurrentTime()
var _end   = getTimeByDays(_start, 1);                          // 全局的查询起止时间
var _field = "rvalue";                                          // 默认查询字段

// 默认显示视图（day表示日视图）
var dtype = "day";                                              //默认报表类型(日报)

// 能源管理-一宫格
var oneEnergyTotalName = 'elec#total';                          // 一宫格-1.建筑总用电量
var ENERGY_MANAGE = 'ENERGY_MANAGE';                            //能源管理
var ENERGY_MONITOR = 'ENERGY_MONITOR';                   //能源监测
var SYSTEM_TRACK = 'SYSTEM_TRACK';                      //系统跟踪

var DATA_STATISTICS='DATA_STATISTICS';                  //数据统计


var SAVE_ENERGY = 'SAVE_ENERGY';                      //节能管理

var DATA_ANALYSIS = 'DATA_ANALYSIS';                      //分析诊断
var DATA_ANALYSIS_SWITCH = 'DATA_ANALYSIS_SWITCH';        //分析诊断的启停对比


