/**
 * All rights Reserved, Designed By 翼虎能源
 * Copyright:    Copyright(C) 2015-2015
 * Company       北京翼虎能源科技有限公司
 * @author       sunfeilong
 * @date         2015/11/23 10:57
 * @version      1.0
 * @Description  energicube-portal
 *
 */
//关闭弹窗
//function closeSearchWindow() {
//    $('#searchResults_dialog').modal('hide');
//};
//
//// 关闭搜索设备弹框
//function closeAssetWindow() {
//    $('#searchResults_dialog').modal('hide');
//}

//页面上方设备查询------------------------------------------------------------------------------------------------开始
var searchModule = angular.module("searchModule", ["kendo.directives"]);

angular.element(document).ready(function () {
    try {
        angular.bootstrap(searchModuleId, ['searchModule']);
    } catch (e) {
        console.log(e);
    }
});

searchModule.controller("searchController", function ($scope, $http, $timeout, $filter) {
    //关闭结果集窗口
    $scope.closeSearchWindow = function () {
        $scope.showSearchResult = false;
    }
    //是否展示搜索结果
    $scope.showSearchResult = false;
    $scope.likeAssertName = '';
    //监听键盘事件
    $scope.searchAsset = function (event) {
        if ($('#search_inp').val() != '' && event.keyCode == 13) {//Enter的键值=13
            //$('#searchResults_dialog').modal('show');
            //未展示过搜索结果，加载查询条件
            if (!$scope.showSearchResult) {
                $scope.initSearchCondition();
            }
            $scope.showSearchResult = true;
            $scope.likeAssertName = $('#search_inp').val();
            $('.k-i-refresh').click();
        }
    }

    $scope.specclassDesCodeToStr = function (code) {
        var name = '';
        switch (code) {
            case "BAS":
                name = "楼宇自控";
                break;
            case "HVC":
                name = "暖通空调";
                break;
            case "WSD":
                name = "给水排水";
                break;
            case "LAS":
                name = "夜景照明";
                break;
            case "PLS":
                name = "公共照明";
                break;
            case "EMS":
                name = "电梯运行";
                break;
            case "FAS":
                name = "消防系统";
                break;
            case "IRS":
                name = "信息发布";
                break;
            case "BMB":
                name = "背景音乐";
                break;
            case "BPA":
                name = "防盗报警";
                break;
            case "ACS":
                name = "门禁管理";
                break;
            case "PTD":
                name = "变配电";
                break;
            case "GTS":
                name = "电子巡更";
                break;
            case "PFS":
                name = "客流统计";
                break;
            case "CTV":
                name = "视频监控";
                break;
            case "PMS":
                name = "停车管理";
                break;
            case "EAS":
                name = "能源管理";
                break;
            case "CPA":
                name = "冷机群控";
                break;
            case "ESA":
                name = "能源分析";
                break;
            default:
                name = code;
        }
        return name;
    };
    $scope.specclassDesNameToStr = function (name) {
        var code = '';
        switch (name) {
            case "楼宇自控":
                code = "BAS";
                break;
            case "暖通空调":
                code = "HVC";
                break;
            case "给水排水":
                code = "WSD";
                break;
            case "夜景照明":
                code = "LAS";
                break;
            case "公共照明":
                code = "PLS";
                break;
            case "电梯运行":
                code = "EMS";
                break;
            case "消防系统":
                code = "FAS";
                break;
            case "信息发布":
                code = "IRS";
                break;
            case "背景音乐":
                code = "BMB";
                break;
            case "防盗报警":
                code = "BPA";
                break;
            case "门禁管理":
                code = "ACS";
                break;
            case "变配电":
                code = "PTD";
                break;
            case "电子巡更":
                code = "GTS";
                break;
            case "客流统计":
                code = "PFS";
                break;
            case "视频监控":
                code = "CTV";
                break;
            case "停车管理":
                code = "PMS";
                break;
            case "能源管理":
                code = "EAS";
                break;
            case "冷机群控":
                code = "CPA";
                break;
            case "能源分析":
                code = "ESA";
                break;
            default:
                code = name;
        }
        return code;
    };

    $scope.assetConditions = {
        specclass: [],
        category: [],
        type: []
    };
    $scope.specclassDropDownList = null;
    $scope.categoryDropDownList = null;

    // 条件筛选
    $scope.initSearchCondition = function () {
        $http({method: 'GET', async: false, url: CONTEXT_PATH + '/asset/common/subSystem'}).success(
            function (data) {
                $scope.specclass = [];
                $timeout(function () {
                    $scope.assetConditions.specclass = data.data;

                    if ($scope.specclassDropDownList != null) {
                        specclassFilter($scope.specclassDropDownList);
                    }
                }, 200);

                var specclassIds = [];
                for (var i = 0, len = $scope.assetConditions.specclass.length; i < len; i++) {
                    specclassIds.push(data.data[i].classificationid);
                }
                $http({
                    method: 'GET',
                    async: false,
                    url: CONTEXT_PATH + '/asset/common/subClasses',
                    param: specclassIds.join(',')
                }).success(
                    function (data) {
                        $timeout(function () {
                            $scope.assetConditions.category = data.data;

                            if ($scope.categoryDropDownList != null) {
                                categoryFilter($scope.categoryDropDownList);
                            }
                        }, 200);
                    });
            });
    }

    $scope.dataSource = new kendo.data.DataSource({
        type: "odata",
        pageSize: 12,
        scrollable: {virtual: true},//支持分页刷新
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        transport: {
            read: function (options) {
                $scope.getAssetList(options);
            },
        },
        schema: {
            data: function (response) {
                var list = [];
                if (response != null) {
                    list = response.pageItems;
                }
                return list;
            },
            total: function (response) {
                if (response != null) {
                    return response.pageDataSize;
                } else {
                    return 0;
                }
            }
        }
    });
    $scope.options = {
        height: 707,
        dataSource: $scope.dataSource,
        //toolbar: [{name: "excel", text: "导出到Excel"}],
        //excel: {
        //    allPages: true,
        //    fileName: "asset"+(new Date()).toLocaleString()+".xlsx",
        //    filterable: false
        //},
        reorderable: true,
        resizable: true,
        sortable: false,
        editable: "popup",
        pageable: {
            refresh: true,
            buttonCount: 5,
            pageSizes: [30, 50, 100, 500],
            input: true,
            messages: {
                page: "转至"
            }
        },
        //filterable: false,
        filterable: {
            extra: false,
            operators: {
                string: {
                    eq: "等于"
                }
            }
        },
        columns: [{
            field: "name",
            title: "设备名称",
            width: "120px",
            filterable: false,
            headerAttributes: {
                style: "text-align: center; font-size: 16px; background-image:none"
            }
        }, {
            field: "specclassDes",
            title: "所属子系统",
            width: "80px",
            filterable: {
                ui: specclassFilter
            },
            headerAttributes: {
                style: "text-align: center; font-size: 16px;; background-image:none"
            }
        }, {
            field: "category",
            title: "设备类别",
            width: "80px",
            filterable: {
                ui: categoryFilter
            },
            headerAttributes: {
                style: "text-align: center; font-size: 16px;background-image:none"
            }
        }, {
            field: "building",
            title: "所在建筑",
            width: "80px",
            filterable: false,
            //filterable: {
            //    ui: buildingFilter
            //},
            headerAttributes: {
                style: "text-align: center; font-size: 16px; background-image:none"
            }
        },
            {
                field: "location",
                title: "所在位置",
                width: "80px",
                filterable: false,
                //filterable: {
                //    ui: floorFilter
                //},
                headerAttributes: {
                    style: "text-align: center; font-size: 16px; background-image:none"
                }
                //},{ command: [{
                //    name: "deleteRole", text: "查看", iconClass: "k-icon k-delete",
                //    click: function (e) {
                //        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                //        $scope.editAssetSpec(dataItem);
                //    }
                //}], title: "技术规范", width: "50px"
            },
            //{
            //    field: "assetnum",
            //    title: "操作",
            //    width: "50px",
            //    filterable: false,
            //    headerAttributes: {
            //        style: "text-align: center; font-size: 16px; background-image:none"
            //    },
            //    template: '<a href="javascript:void(0)" ng-click="gotoPosition(\'#=assetnum#\')" >#=gotoAssert#</a>'
            //}
        ]
    };

    $scope.getAssetList = function (options) {
        if($scope.showSearchResult) {
            //console.log(options);
            var data = options.data;
            var pageSize = data.pageSize;
            if (pageSize == undefined) {
                pageSize = 30;
            }
            var pageNo = data.page;
            if (pageNo == undefined) {
                pageNo = 1;
            }
            var specclass = [];
            var category = [];
            var type = [];
            var building = [];
            var floor = [];
            var area = [];
            //debugger;
            if (data.filter != undefined) {
                var array = data.filter.filters;
                for (var i = 0; i < array.length; i++) {
                    var field = array[i].field;
                    switch (field) {
                        case 'specclassDes':
                            specclass.push(array[i].value);
                            break;
                        case 'category':
                            category.push(array[i].value);
                            break;
                        case 'type':
                            type.push(array[i].value);
                            break;
                        case 'building':
                            building.push(array[i].value);
                            break;
                        case 'floor':
                            floor.push(array[i].value);
                            break;
                        case 'area':
                            area.push(array[i].value);
                            break;
                    }
                }
            }
            var params = {
                likeAssertName: $scope.likeAssertName,        //设备名模糊搜索
                specclass: specclass,
                category: category,
                type: type,
                building: building,
                floor: floor,
                area: area
            }
            $http({
                method: "POST",
                url: CONTEXT_PATH + "/asset/getAssets/" + pageSize + "/" + pageNo,
                data: params
            }).success(
                function (data) {
                    var _result = {
                        pageDataSize: data.totalElements ? data.totalElements : 0,
                        pageItems: data.content ? data.content : [],
                        pageNumber: data.number ? data.number : 0,
                        pagesAvailable: data.totalPages ? data.totalPages : 0
                    };

                    for (var i = 0, len = _result.pageItems.length; i < len; i++) {
                        _result.pageItems[i].name = _result.pageItems[i].assetname;
                        _result.pageItems[i].specclassDes = $scope.specclassDesCodeToStr(_result.pageItems[i].subsystem);
                        _result.pageItems[i].building = _result.pageItems[i].site.siteName;
                        var _categoryArray = $filter('filter')($scope.assetConditions.category, {'classificationid': _result.pageItems[i].classificationid});
                        _result.pageItems[i].category = _categoryArray.length > 0 ? _categoryArray[0].description : '';
                        _result.pageItems[i].gotoAssert = '查看设备';
                    }
                    options.success(_result);
                }
            )
        }else{
            options.success({pageItems:[]});
        }
    }
    /**
     *  所属专业
     * @param element
     */
    function specclassFilter(element) {
        $scope.specclassDropDownList = element.kendoDropDownList({
            dataSource: $scope.assetConditions.specclass,
            //optionLabel: "--Select Value--",
            dataTextField: "description",
            dataValueField: "code",
            valuePrimitive: true
        });
    }

    /**
     * 设备类别
     * @param elemetn
     */
    function categoryFilter(element) {
        $scope.categoryDropDownList = element.kendoDropDownList({
            dataSource: $scope.assetConditions.category,
            //optionLabel: "--Select Value--",
            dataTextField: "description",
            dataValueField: "classificationid",
            valuePrimitive: true
        });
    }

    /**
     * 设备类型
     * @param elemetn
     */
    function typeFilter(element) {
        element.kendoDropDownList({
            dataSource: $scope.assetConditions.type,
            //optionLabel: "--Select Value--",
            dataTextField: "description",
            dataValueField: "classid",
            valuePrimitive: true
        });
    }

    /**
     * 所在建筑
     * @param elemetn
     */
    function buildingFilter(element) {
        element.kendoDropDownList({
            dataSource: $scope.assetConditions.building,
            //optionLabel: "--Select Value--",
            dataTextField: "description",
            dataValueField: "description",
            valuePrimitive: true
        });
    }

    /**
     * 所在楼层
     * @param elemetn
     */
    function floorFilter(element) {
        element.kendoDropDownList({
            dataSource: $scope.assetConditions.floor,
            //optionLabel: "--Select Value--",
            dataTextField: "description",
            dataValueField: "description",
            valuePrimitive: true
        });
    }

    /**
     * 所在区域
     * @param elemetn
     */
    function areaFilter(element) {
        element.kendoDropDownList({
            dataSource: $scope.assetConditions.area,
            //optionLabel: "--Select Value--",
            dataTextField: "description",
            dataValueField: "description",
            valuePrimitive: true
        });
    }


    //// 条件筛选
    //$http({method: 'GET', async: false, url: CONTEXT_PATH + '/asset/common/subSystem'}).success(function (data) {
    //    $scope.assetConditions = data;
    //    $scope.specclass = [];
    //});
    //
    ////
    //$scope.dataSource = new kendo.data.DataSource({
    //    type: "odata",
    //    pageSize: 12,
    //    scrollable: {virtual: true},//支持分页刷新
    //    serverPaging: true,
    //    serverSorting: true,
    //    serverFiltering: true,
    //    transport: {
    //        read: function (options) {
    //            if ($('#search_inp').val() != null && $('#search_inp').val() != "") {
    //                $scope.getAssetList(options, $('#search_inp').val());
    //            } else {
    //                $scope.getAssetList(options, "");
    //            }
    //        }
    //    },
    //    schema: {
    //        data: function (response) {
    //            var list = [];
    //            if (response != null) {
    //                list = response.pageItems;
    //            }
    //            return list;
    //        },
    //        total: function (response) {
    //            if (response != null) {
    //                return response.pageDataSize;
    //            } else {
    //                return 0;
    //            }
    //        }
    //    }
    //});
    //
    //$scope.options = {
    //    height: 707,
    //    dataSource: $scope.dataSource,
    //    //toolbar: [{name: "excel", text: "导出到Excel"}],
    //    //excel: {
    //    //    allPages: true,
    //    //    fileName: "asset"+(new Date()).toLocaleString()+".xlsx",
    //    //    filterable: false
    //    //},
    //    reorderable: true,
    //    resizable: true,
    //    sortable: false,
    //    change: $scope.onChange,
    //    //editable: "popup",
    //    pageable: {
    //        refresh: true,
    //        buttonCount: 5,
    //        pageSizes: [30, 50, 100, 500],
    //        input: true,
    //        messages: {
    //            page: "转至"
    //        }
    //    },
    //    //filterable: false,
    //    filterable: {
    //        extra: false,
    //        operators: {
    //            string: {
    //                eq: "等于"
    //            }
    //        }
    //    },
    //    columns: [{
    //        field: "name",
    //        title: "设备名称",
    //        width: "120px",
    //        filterable: false,
    //        headerAttributes: {
    //            style: "text-align: center; font-size: 16px; background-image:none"
    //        }
    //    }, {
    //        field: "specclassDes",
    //        title: "所属专业",
    //        width: "80px",
    //        filterable: {
    //            ui: specclassFilter
    //        },
    //        headerAttributes: {
    //            style: "text-align: center; font-size: 16px;; background-image:none"
    //        }
    //    }, {
    //        field: "category",
    //        title: "设备类别",
    //        width: "80px",
    //        filterable: {
    //            ui: categoryFilter
    //        },
    //        headerAttributes: {
    //            style: "text-align: center; font-size: 16px;background-image:none"
    //        }
    //    }, {
    //        field: "type",
    //        title: "设备类型",
    //        width: "80px",
    //        filterable: {
    //            ui: typeFilter
    //        },
    //        headerAttributes: {
    //            style: "text-align: center; font-size: 16px; background-image:none"
    //        }
    //    }, {
    //        field: "building",
    //        title: "所在建筑",
    //        width: "50px",
    //        filterable: {
    //            ui: buildingFilter
    //        },
    //        headerAttributes: {
    //            style: "text-align: center; font-size: 16px; background-image:none"
    //        }
    //    }, {
    //        field: "floor",
    //        title: "所在楼层",
    //        width: "50px",
    //        filterable: false,
    //        //filterable: {
    //        //    ui: floorFilter
    //        //},
    //        headerAttributes: {
    //            style: "text-align: center; font-size: 16px; background-image:none"
    //        }
    //    }, {
    //        field: "assetnum",
    //        title: "操作",
    //        width: "50px",
    //        filterable: false,
    //        headerAttributes: {
    //            style: "text-align: center; font-size: 16px; background-image:none"
    //        },
    //        template: '<a href="javascript:void(0)" ng-click="gotoPosition(\'#=assetnum#\')" >#=location#</a>'
    //    }
    //    ]
    //};
    //
    //
    //$scope.getAssetList = function (options, param) {
    //    var data = options.data;
    //    var pageSize = data.pageSize;
    //    if (pageSize == undefined) {
    //        pageSize = 30;
    //    }
    //    var pageNo = data.page;
    //    if (pageNo == undefined) {
    //        pageNo = 1;
    //    }
    //    var specclass = [];
    //    var category = [];
    //    var type = [];
    //    var building = [];
    //    var floor = [];
    //    var area = [];
    //    //debugger;
    //    if (data.filter != undefined) {
    //        var array = data.filter.filters;
    //        for (var i = 0; i < array.length; i++) {
    //            var field = array[i].field;
    //            switch (field) {
    //                case 'specclassDes':
    //                    specclass.push(array[i].value);
    //                    break;
    //                case 'category':
    //                    category.push(array[i].value);
    //                    break;
    //                case 'type':
    //                    type.push(array[i].value);
    //                    break;
    //                case 'building':
    //                    building.push(array[i].value);
    //                    break;
    //                case 'floor':
    //                    floor.push(array[i].value);
    //                    break;
    //                case 'area':
    //                    area.push(array[i].value);
    //                    break;
    //            }
    //        }
    //    }
    //    var params = {
    //        searchParam: param,
    //        specclass: specclass,
    //        category: category,
    //        type: type,
    //        building: building,
    //        floor: floor,
    //        area: area
    //    }
    //    $http({
    //        method: "POST",
    //        url: CONTEXT_PATH + "/back/asset/getAssets/" + pageSize + "/" + pageNo,
    //        data: params
    //    }).success(
    //        function (data) {
    //            if (data.pageItems) {
    //                for (var i = 0; i < data.pageItems.length; i++) {
    //                    data.pageItems[i].location = "查看位置";
    //                }
    //                options.success(data);
    //            }
    //        }
    //    )
    //}
    ///**
    // *  所属专业
    // * @param element
    // */
    //function specclassFilter(element) {
    //    element.kendoDropDownList({
    //        dataSource: $scope.assetConditions.specclass,
    //        //optionLabel: "--Select Value--",
    //        dataTextField: "description",
    //        dataValueField: "code",
    //        valuePrimitive: true
    //    });
    //}
    //
    ///**
    // * 设备类别
    // * @param elemetn
    // */
    //function categoryFilter(element) {
    //    element.kendoDropDownList({
    //        dataSource: $scope.assetConditions.category,
    //        //optionLabel: "--Select Value--",
    //        dataTextField: "description",
    //        dataValueField: "description",
    //        valuePrimitive: true
    //    });
    //}
    //
    ///**
    // * 设备类型
    // * @param elemetn
    // */
    //function typeFilter(element) {
    //    element.kendoDropDownList({
    //        dataSource: $scope.assetConditions.type,
    //        //optionLabel: "--Select Value--",
    //        dataTextField: "description",
    //        dataValueField: "classid",
    //        valuePrimitive: true
    //    });
    //}
    //
    ///**
    // * 所在建筑
    // * @param elemetn
    // */
    //function buildingFilter(element) {
    //    element.kendoDropDownList({
    //        dataSource: $scope.assetConditions.building,
    //        //optionLabel: "--Select Value--",
    //        dataTextField: "description",
    //        dataValueField: "description",
    //        valuePrimitive: true
    //    });
    //}
    //
    ///**
    // * 所在楼层
    // * @param elemetn
    // */
    //function floorFilter(element) {
    //    element.kendoDropDownList({
    //        dataSource: $scope.assetConditions.floor,
    //        //optionLabel: "--Select Value--",
    //        dataTextField: "description",
    //        dataValueField: "description",
    //        valuePrimitive: true
    //    });
    //}
    //
    ///**
    // * 所在区域
    // * @param elemetn
    // */
    //function areaFilter(element) {
    //    element.kendoDropDownList({
    //        dataSource: $scope.assetConditions.area,
    //        //optionLabel: "--Select Value--",
    //        dataTextField: "description",
    //        dataValueField: "description",
    //        valuePrimitive: true
    //    });
    //}
    //
    ///**
    // * 操作
    // * @param elemetn
    // */
    //function areaFilter(element) {
    //    element.kendoDropDownList({
    //        dataSource: $scope.assetConditions.location,
    //        //optionLabel: "--Select Value--",
    //        dataTextField: "description",
    //        dataValueField: "description",
    //        valuePrimitive: true
    //    });
    //}

    /**
     * Abas定位到设备在图片中的位置
     * @param position
     */
    $scope.gotoPosition = function (assetNum) {
        $http({method: 'POST', params: {assetNum: assetNum}, url: CONTEXT_PATH + '/abas/findPagetagPosition'}).success(
            function (data) {
                if (data == null || data == "") {
                    alert("没有找到对应的点位！");
                    return;
                }
                var menu = data.menu[0];
                var position = data.position;
                var left = 0, top = 0;
                for (var i = 0; i < position.length; i++) {
                    top = position[i].top;
                    left = position[i].left;
                }
                if (top != null && left != null && top != 0 && left != 0) {
                    var url = window.location.href;
                    window.open(url.substring(0, url.indexOf(CONTEXT_PATH)) + CONTEXT_PATH + "/monitor/" + menu + "?top=" + top + "&left=" + left);
                } else {
                    alert("点位对应的菜单有问题");
                }
            }
        );
    }

});
//页面上方设备查询------------------------------------------------------------------------------------------------结束


//$(function(){
//    //显示天气信息----------------------------------------------------------------------------------------------------开始
//    var today = getCurrentTime();
//    $("#6_1_date").text(transformDateFormat(getTimeByDays(today,-1)));
//    $("#6_2_date").text(transformDateFormat(today));
//    $("#6_3_date").text(transformDateFormat(getTimeByDays(today,1)));
//    $("#6_3_week").text(getWeekByDay(getTimeByDays(today,1)));
//    $("#6_4_date").text(transformDateFormat(getTimeByDays(today,2)));
//    $("#6_4_week").text(getWeekByDay(getTimeByDays(today,2)));
//    $("#6_5_date").text(transformDateFormat(getTimeByDays(today,3)));
//    $("#6_5_week").text(getWeekByDay(getTimeByDays(today,3)));
//    var dates = transformDateFormatSecond(getTimeByDays(today,-1))+","+transformDateFormatSecond(today)+","+transformDateFormatSecond(getTimeByDays(today,1))+","+transformDateFormatSecond(getTimeByDays(today,2))+","+transformDateFormatSecond(getTimeByDays(today,3));
//    //获取天气信息
//    var action = CONTEXT_PATH + "/abas/getFiveDayWeatherInfo";
//    var params = {
//        dateStrArr:dates
//    };
//
//    //下方五天的天气信息
//    $.post(action, params, function (data) {
//        //把五天的天气信息设置到页面上
//        for(var i = 1 ; i <= 5 ; i++){
//            //最后高最低温度
//            var maxTemperature = data.data[i-1].maxTemperature;
//            var minTemperature = data.data[i-1].minTemperature;
//
//            if(maxTemperature == "" || maxTemperature == null){
//                $("#6_"+i+"_maxTemperature").text("--");
//            } else {
//                $("#6_"+i+"_maxTemperature").text(data.data[i-1].maxTemperature);
//
//            }
//
//            if(minTemperature ==  "" || minTemperature == null) {
//                $("#6_"+i+"_minTemperature").text("--");
//            } else {
//                $("#6_"+i+"_minTemperature").text(data.data[i-1].minTemperature);
//            }
//
//            $("#6_"+i+"_icon").addClass(getCssFromWeatherIcon(data.data[i-1].weatherIcon));
//            if(i == 2) {
//                //今天的实时天气
//                if(data.data[i-1].maxTemperature ==""||data.data[i-1].maxTemperature ==null){
//                    $("#6_maxTemperature").text("--");
//                } else {
//                    $("#6_maxTemperature").text(data.data[i-1].maxTemperature);
//                }
//                if(data.data[i-1].minTemperature == "" || data.data[i-1].minTemperature == null) {
//                    $("#6_minTemperature").text(data.data[i-1].minTemperature);
//                } else {
//                    $("#6_minTemperature").text(data.data[i-1].minTemperature);
//                }
//                var temperature = data.data[i-1].temperature;
//                if(temperature == "" || temperature == null) {
//                    temperature = "--"
//                }
//                $("#6_temperature").text(temperature+"°");
//                if(data.data[i-1].weatherDescription == "" || data.data[i-1].weatherDescription == null) {
//                    $("#6_description").text("--");
//                }else{
//                    $("#6_description").text(data.data[i-1].weatherDescription);
//                }
//                $("#6_icon").addClass(getCssFromWeatherIcon(data.data[i-1].weatherIcon));
//            }
//        }
//    });
//    //显示天气信息---------------------------------------------------------------------------------------------------结束
//});


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