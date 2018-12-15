$(function () {

    /**
     * 用户管理用户新建确定
     */
    $("#saveUsers").on("click", function () {
        saveUsers();
    });

    /**
     * 用户管理用户密码修改
     */
    $("#updatePassword").on("click", function () {
        updateUsersPassword();
    });

    /**
     * 用户管理用户信息查询
     */
//	findUsersList("save");

    $("#finddepartment").change(function () {
        var finddepartment = $(this).val();
        if ("所有用户" == finddepartment) {
            findUsersList("save");
        } else {
            findDepartment(finddepartment);
        }
    });
});

/**
 * 用户管理用户部门查询
 */
function findDepartment(finddepartment) {
    var url = CONTEXT_PATH + "/okcsys/finddepartmentList?department=" + finddepartment;
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            try {
                if (data != null) {
                    //加载列表数据
                    $("#tbodyQz").html(findUserListHtml(data));
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}

/**
 * 用户管理用户修改查询
 */
function updateUsers(userid) {
    var url = CONTEXT_PATH + "/okcsys/findUserid?userid=" + userid;
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            try {
                if (data != null) {
                    console.log(data);
                    $("#useruid").val(data.userid);
                    $("#firstname").val(data.firstname);
                    $("#loginid").val(data.loginid);
                    $("#password").val(data.password);
                    $("#birthday").val(getSmpFormatDateByLong(data.birthday, false));
                    $("#workdate").val(getSmpFormatDateByLong(data.workdate, false));
                    $("#phone").val(data.phone);
                    $("#department").val(data.department);
                }
            } catch (e) {
                console.log(e);
            }

        }
    });
}

/**
 * 用户管理用户新建
 */
function updateUsersPassword() {
    // 确定事件代码
    var url = CONTEXT_PATH + "/okcsys/updateUsersPassword?" + $("#updatepw").serialize();
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            try {
                if (data != null) {
                    $("#changePwd").modal('hide');
                }
            } catch (e) {
                console.log(e);
            }

        }
    });
}

/**
 * 用户管理用户新建
 */
function saveUsers() {
    var sex;
    if ($("#sex-male").attr("checked") == "checked") {
        sex = "man";
    }
    if ($("#sex-female").attr("checked") == "checked") {
        sex = "woman";
    }
    // 确定事件代码
    var url = CONTEXT_PATH + "/okcsys/saveUser?sex=" + sex + "&" + $("#userform").serialize();
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            try {
                if (data != null) {
                    $("#new_user").modal('hide');
                    findUsersList(data);
                }
            } catch (e) {
                console.log(e);
            }

        }
    });
}

/**
 * 用户管理用户信息查询
 */
function findUsersList(dataflg) {
    var url = CONTEXT_PATH + "/okcsys/findUserList";
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            try {
                if (data != null) {
                    //加载列表数据
                    $("#tbodyQz").html(findUserListHtml(data, dataflg));
                }
            } catch (e) {
                console.log(e);
            }
        }
    });
}


/**
 * 用户管理用户删除
 */
function delUsers(userid) {
    var url = CONTEXT_PATH + "/okcsys/delUsers?userid=" + userid;
    console.log(url);
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            try {
                if (data != null) {
                    findUsersList(data);
                }
            } catch (e) {
                console.log(e);
            }

        }
    });
}

/**
 * @param obj 数据列表
 * return 返回用户信息列表html
 */
function findUserListHtml(obj, dataflg) {
    var html = "";
    if (dataflg == "del") {
        html += " <tr><th class='edit'>&nbsp;</th><th class='delete' style='display: table-cell;' >&nbsp;</th><th>姓名</th><th>部门</th><th>性别</th><th>生日</th><th>入职日期</th><th>手机号码</th></tr>";
    } else if (dataflg == "update") {
        html += " <tr><th class='edit' style='display: table-cell;' >&nbsp;</th><th class='delete'>&nbsp;</th><th>姓名</th><th>部门</th><th>性别</th><th>生日</th><th>入职日期</th><th>手机号码</th></tr>";
    } else {
        html += " <tr><th class='edit'>&nbsp;</th><th class='delete'>&nbsp;</th><th>姓名</th><th>部门</th><th>性别</th><th>生日</th><th>入职日期</th><th>手机号码</th></tr>";
    }
    var sex;
    if (obj != null) {
        for (var k = 0; k < obj.length; k++) {
            var userList = obj[k];
            if (userList.sex == "woman") {
                sex = "女";
            } else {
                sex = "男";
            }
            if (dataflg == "del") {
                html += '<tr>' + '<td class="edit"><a href="#new_user" data-toggle="modal" class="icon_small tab_edit" onclick="updateUsers(\'' + userList.userid + '\');"></a></td>'
                    + '<td class="delete" style="display: table-cell;"><a href="#" class="icon_small tab_delete" onclick="delUsers(\'' + userList.userid + '\');"></a></td>'
            } else if (dataflg == "update") {
                html += '<tr>' + '<td class="edit" style="display: table-cell;" ><a href="#new_user" data-toggle="modal" class="icon_small tab_edit" onclick="updateUsers(\'' + userList.userid + '\');"></a></td>'
                    + '<td class="delete"><a href="#" class="icon_small tab_delete" onclick="delUsers(\'' + userList.userid + '\');"></a></td>'
            } else {
                html += '<tr>' + '<td class="edit"><a href="#new_user" data-toggle="modal" class="icon_small tab_edit" onclick="updateUsers(\'' + userList.userid + '\');"></a></td>'
                    + '<td class="delete"><a href="#" class="icon_small tab_delete" onclick="delUsers(\'' + userList.userid + '\');"></a></td>'
            }
            html += '<td>' + userList.firstname + '</td>'
                + '<td>' + userList.department + '</td>'
                + '<td>' + sex + '</td>'
                + '<td> ' + getSmpFormatDateByLong(userList.birthday, false) + '</td>'
                + '<td>' + getSmpFormatDateByLong(userList.workdate, false) + '</td>'
                + '<td>' + dealNullValue(userList.phone) + '</td></tr>';
        }
    }
    return html;
}

/**
 * 处理值为null或者undefined的数据
 * @param {} value
 */
function dealNullValue(value) {
    if (value == undefined || value == null || value == "null") {
        return "";
    }
    return value;
}
//获取请求中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}
/**
 * 获取顶部动态菜单链接地址
 */
setTimeout(function () {
    var USER_SITEID = window.localStorage.getItem("USER_SITEID");
    var hotel_siteid = "40288ae45846cbf70158482bca550000";
    if (!$("#monitorHref").parent().hasClass("current") || USER_SITEID == hotel_siteid) {
        getMonitorHref();
    }
    var source = getQueryString("source");
    if (source != "hotel") {
        if (!$("#runPlanHref").parent().hasClass("current")) {
            getRunPlanHref();
        }
    } else {
        if (!$("#hotelRunPlanHref").parent().hasClass("current")) {
            getHotelRunPlanHref();
        }
    }
}, 1000);
function getMonitorHref() {
    // $.post(CONTEXT_PATH + '/okcsys/okcmenu/findModuleMenuByMenuType?menuType=MODULE', {},
    //     function (data) {
    //         //将菜单数据放入缓存中，展示首页子系统链接时使用
    //         window.localStorage.removeItem("menuJson");
    //         window.localStorage.setItem("menuJson", JSON.stringify(data));
    //         var menuJson = data;
    //         //左侧一级菜单
    //         var rootMenu = menuJson['ROOT'][0];
    //         var href = "";
    //         var secondMenus = menuJson[rootMenu.okcmenuid];
    //         if (secondMenus && secondMenus.length > 0) {
    //             var hasLink = false;
    //             for (var i = 0; i < secondMenus.length; i++) {
    //                 var secondMenu = secondMenus[i];
    //                 //if (USER_AUTHORISE.indexOf(secondMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {//有二级菜单权限
    //                 if (secondMenu.url && secondMenu.url != "") {
    //                     href = secondMenu.url;
    //                     return;
    //                 } else {
    //                     var thirdMenus = menuJson[secondMenu.okcmenuid];
    //                     if (thirdMenus && thirdMenus.length > 0) {
    //                         for (var j = 0; j < thirdMenus.length; j++) {
    //                             var thirdMenu = thirdMenus[j];
    //                             //if (USER_AUTHORISE.indexOf(thirdMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
    //                             if ((rootMenu.defaultMenu == thirdMenu.okcmenuid || rootMenu.defaultMenu == secondMenu.okcmenuid) && thirdMenu.okcmenuid == thirdMenu.defaultMenu) {//当前三级菜单为默认菜单
    //                                 href = CONTEXT_PATH + "/monitor/" + thirdMenu.elementvalue + "/" + thirdMenu.elementvalue + "/" + thirdMenu.okcmenuid;
    //                                 return;
    //                             } else {
    //                                 var fourthMenus = menuJson[thirdMenu.okcmenuid];
    //                                 if (!hasLink && !fourthMenus) {//无下级菜单取当前菜单链接
    //                                     if (thirdMenu.url && thirdMenu.url != "") {
    //                                         href = thirdMenu.url;
    //                                     } else {
    //                                         href = CONTEXT_PATH + "/monitor/" + thirdMenu.elementvalue + "/" + thirdMenu.elementvalue + "/" + thirdMenu.okcmenuid;
    //                                     }
    //                                     hasLink = true;
    //                                 } else {
    //                                     if (fourthMenus) { //非第一个菜单，继续循环
    //                                         for (var k = 0; k < fourthMenus.length; k++) {
    //                                             var fourthMenu = fourthMenus[k];
    //                                             //if (USER_AUTHORISE.indexOf(fourthMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
    //                                             var fifthMenus = menuJson[fourthMenu.okcmenuid];
    //                                             if (rootMenu.defaultMenu == fourthMenu.okcmenuid && fourthMenu.okcmenuid == fourthMenu.defaultMenu) {//当前四级菜单为默认菜单
    //                                                 href = CONTEXT_PATH + "/monitor/" + thirdMenu.elementvalue + "/" + fourthMenu.elementvalue + "/" + fourthMenu.okcmenuid;
    //                                                 return;
    //                                             } else if (!hasLink && (!fifthMenus || fifthMenus.length == 0)) {//无下级菜单取当前菜单
    //                                                 if (fourthMenu.url && fourthMenu.url != "") {
    //                                                     href = fourthMenu.url;
    //                                                 } else {
    //                                                     href = CONTEXT_PATH + "/monitor/" + thirdMenu.elementvalue + "/" + fourthMenu.elementvalue + "/" + fourthMenu.okcmenuid;
    //                                                 }
    //                                                 hasLink = true;
    //                                             } else {
    //                                                 if (fifthMenus) { //非第一个菜单，继续循环。没有子菜单
    //                                                     for (var l = 0; l < fifthMenus.length; l++) {
    //                                                         var fifthMenu = fifthMenus[l];
    //                                                         if (rootMenu.defaultMenu == fifthMenu.okcmenuid && fifthMenu.okcmenuid == fifthMenu.defaultMenu) {//当前wuji菜单为默认菜单
    //                                                             href = CONTEXT_PATH + "/monitor/" + thirdMenu.elementvalue + "/" + fourthMenu.elementvalue + "/" + fifthMenu.okcmenuid;
    //                                                             return;
    //                                                         } else if (!hasLink) {//无下级菜单取当前菜单
    //                                                             if (fifthMenu.url && fifthMenu.url != "") {
    //                                                                 href = fifthMenu.url;
    //                                                             } else {
    //                                                                 href = CONTEXT_PATH + "/monitor/" + thirdMenu.elementvalue + "/" + fourthMenu.elementvalue + "/" + fifthMenu.okcmenuid;
    //                                                             }
    //                                                             hasLink = true;
    //                                                         }
    //                                                     }
    //
    //                                                 }
    //                                             }
    //                                             //}
    //                                         }
    //                                     }
    //                                 }
    //                             }
    //                             //}
    //                         }
    //                     }
    //                 }
    //                 //} else {
    //                 //    href = "javascript:void(0);";
    //                 //}
    //             }
    //         }
    //         $("#monitorHref").attr("href", href + "?source=hotel");
    //         //console.log("--set monitor href--", href);
    //     });
}
//获取运行计划链接地址
function getRunPlanHref() {
    // $.get(CONTEXT_PATH + '/patternMenu/findByCriteria', {isRoot: false, isActive: true},
    //     function (result) {
    //         if (result && result.success) {
    //             var runPlanMenus = result.data;
    //             //将菜单数据放入缓存中
    //             window.localStorage.removeItem("runPlanMenus");
    //             window.localStorage.setItem("runPlanMenus", JSON.stringify(runPlanMenus));
    //             for (var i = 0; i < runPlanMenus.length; i++) {
    //                 var obj = runPlanMenus[i];
    //                 //if (USER_AUTHORISE.indexOf(obj.patternCode + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
    //                 $("#runPlanHref").attr("href", CONTEXT_PATH + "/runPlan/standardPlan/" + obj.deviceType + "/" + obj.patternCode);
    //                 return;
    //                 //}
    //             }
    //         }
    //         console.log("--findByCriteria--", result);
    //     }
    // );
}

//获取酒店运行计划链接地址
function getHotelRunPlanHref() {
    $.get(CONTEXT_PATH + '/patternMenu/findByCriteria', {isRoot: false, isActive: true},
        function (result) {
            if (result && result.success) {
                var runPlanMenus = result.data;
                //将菜单数据放入缓存中
                window.localStorage.removeItem("runPlanMenus");
                window.localStorage.setItem("runPlanMenus", JSON.stringify(runPlanMenus));
                for (var i = 0; i < runPlanMenus.length; i++) {
                    var obj = runPlanMenus[i];
                    //if (USER_AUTHORISE.indexOf(obj.patternCode + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
                    $("#hotelRunPlanHref").attr("href", CONTEXT_PATH + "/runPlan/standardPlan/" + obj.deviceType + "/" + obj.patternCode + "?source=hotel");
                    return;
                    //}
                }
            }
            console.log("--findByCriteria--", result);
        }
    );
}
//获取顶级菜单链接地址，无默认菜单时默认打开第一个子系统
function getRootMenuHref(rootMenu, menuJson) {
    var href = "javascript:void(0);";
    //if (USER_AUTHORISE.indexOf(rootMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
    var secondMenus = menuJson[rootMenu.okcmenuid];
    if (rootMenu.url && rootMenu.url != "") {
        href = rootMenu.url;
        return href;
    } else if (!secondMenus || secondMenus.length == 0) {
        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + rootMenu.elementvalue + "/" + rootMenu.okcmenuid;
        return href;
    } else {
        var hasLink = false;
        for (var i = 0; i < secondMenus.length; i++) {
            var secondMenu = secondMenus[i];
            //if (USER_AUTHORISE.indexOf(secondMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {//有二级菜单权限
            if (secondMenu.url && secondMenu.url != "") {
                href = secondMenu.url;
                return href;
            } else {
                var thirdMenus = menuJson[secondMenu.okcmenuid];

                if (!thirdMenus || thirdMenus.length == 0) {//无子菜单，取上一级的菜单链接
                    if (rootMenu.defaultMenu == secondMenu.okcmenuid && secondMenu.okcmenuid == secondMenu.defaultMenu) {//当前二级菜单为默认菜单
                        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + secondMenu.okcmenuid;
                        return href;
                    } else if (rootMenu.defaultMenu == secondMenu.okcmenuid && secondMenu.okcmenuid == secondMenu.defaultMenu) {//当前二级菜单为默认菜单
                        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + secondMenu.okcmenuid;
                        return href;
                    } else if (!hasLink) {//无默认菜单，取第一个链接
                        if (secondMenu.url && secondMenu.url != "") {
                            href = url;
                        } else {
                            href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + secondMenu.okcmenuid;
                        }
                        hasLink = true;
                    }
                } else {
                    for (var j = 0; j < thirdMenus.length; j++) {
                        var thirdMenu = thirdMenus[j];
                        //if (USER_AUTHORISE.indexOf(thirdMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
                        if ((rootMenu.defaultMenu == thirdMenu.okcmenuid || rootMenu.defaultMenu == secondMenu.okcmenuid) && thirdMenu.okcmenuid == thirdMenu.defaultMenu) {//当前三级菜单为默认菜单
                            href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + thirdMenu.okcmenuid;
                            return href;
                        } else {
                            var fourthMenus = menuJson[thirdMenu.okcmenuid];
                            if (!hasLink && !fourthMenus) {//无下级菜单取当前菜单链接
                                if (thirdMenu.url && thirdMenu.url != "") {
                                    href = thirdMenu.url;
                                } else {
                                    href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + thirdMenu.okcmenuid;
                                }
                                hasLink = true;
                            } else {
                                if (fourthMenus) { //非第一个菜单，继续循环。没有子菜单
                                    for (var k = 0; k < fourthMenus.length; k++) {
                                        var fourthMenu = fourthMenus[k];
                                        //if (USER_AUTHORISE.indexOf(fourthMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
                                        var fifthMenus = menuJson[fourthMenu.okcmenuid];
                                        if (rootMenu.defaultMenu == fourthMenu.okcmenuid && fourthMenu.okcmenuid == fourthMenu.defaultMenu) {//当前四级菜单为默认菜单
                                            href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + fourthMenu.okcmenuid;
                                            return href;
                                        } else if (!hasLink && (!fifthMenus || fifthMenus.length == 0)) {//无下级菜单取当前菜单
                                            if (fourthMenu.url && fourthMenu.url != "") {
                                                href = fourthMenu.url;
                                            } else {
                                                href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + fourthMenu.okcmenuid;
                                            }
                                            hasLink = true;
                                        }
                                        //}
                                    }
                                }
                            }
                        }
                        //}
                    }
                }
            }
            //} else {
            //    href = "javascript:void(0);";
            //}
        }
    }
    //}
    return href;
}
/**
 *
 * @param rootMenu 需要展示的顶级菜单
 * @param secondMenu 需要展示的第二级菜单
 * @param currMenu 需要获取链接的菜单
 * @param menuJson 包含所有菜单的json对象
 * @returns {string}
 */
function getSubMenuHref(rootMenu, secondMenu, currMenu, menuJson) {
    var href = "javascript:void(0);";
    //if (USER_AUTHORISE.indexOf(currMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
    var thirdMenus = menuJson[currMenu.okcmenuid];
    if (currMenu.url && currMenu.url != "") {
        href = currMenu.url;
        return href;
    } else if (!thirdMenus || thirdMenus.length == 0) {
        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + currMenu.okcmenuid;
        return href;
    } else {
        if (thirdMenus && thirdMenus.length > 0) {
            var hasLink = false;
            for (var i = 0; i < thirdMenus.length; i++) {
                var thirdMenu = thirdMenus[i];
                //if (USER_AUTHORISE.indexOf(thirdMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
                if (rootMenu.defaultMenu == thirdMenu.okcmenuid && thirdMenu.okcmenuid == thirdMenu.defaultMenu) {//当前菜单为根菜单的默认菜单
                    if (thirdMenu.url && thirdMenu.url != "") {
                        href = thirdMenu.url;
                    } else {
                        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + thirdMenu.okcmenuid;
                    }
                    return href;
                } else if (thirdMenu.okcmenuid == thirdMenu.defaultMenu) {//菜单为当前菜单的默认菜单
                    if (thirdMenu.url && thirdMenu.url != "") {
                        href = thirdMenu.url;
                    } else {
                        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + thirdMenu.okcmenuid;
                    }
                    hasLink = true;
                } else {
                    var fourthMenus = menuJson[thirdMenu.okcmenuid];
                    if (!hasLink && (!fourthMenus || fourthMenus.length == 0)) {//无默认菜单取第一个菜单
                        if (thirdMenu.url && thirdMenu.url != "") {
                            href = thirdMenu.url;
                        } else {
                            href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + thirdMenu.okcmenuid;
                        }
                        hasLink = true;
                    } else {
                        if (fourthMenus) { //非第一个菜单，继续循环。没有子菜单
                            for (var j = 0; j < fourthMenus.length; j++) {
                                var fourthMenu = fourthMenus[j];
                                //if (USER_AUTHORISE.indexOf(fourthMenu.okcmenuid + ":control") >= 0 || USER_AUTHORISE.indexOf("*:control") >= 0) {
                                if (rootMenu.defaultMenu == fourthMenu.okcmenuid && fourthMenu.okcmenuid == fourthMenu.defaultMenu) {//当前四级菜单为默认菜单
                                    if (fourthMenu.url && fourthMenu.url != "") {
                                        href = fourthMenu.url;
                                    } else {
                                        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + fourthMenu.okcmenuid;
                                    }
                                    return href;
                                } else if (fourthMenu.okcmenuid == fourthMenu.defaultMenu) {//当前四级菜单为默认菜单
                                    if (fourthMenu.url && fourthMenu.url != "") {
                                        href = fourthMenu.url;
                                    } else {
                                        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + fourthMenu.okcmenuid;
                                    }
                                    hasLink = true;
                                } else if (!hasLink && (fourthMenus || fourthMenus.length == 0)) {//无默认菜单取第一个菜单
                                    if (fourthMenu.url && fourthMenu.url != "") {
                                        href = fourthMenu.url;
                                    } else {
                                        href = CONTEXT_PATH + "/monitor/" + rootMenu.elementvalue + "/" + secondMenu.elementvalue + "/" + fourthMenu.okcmenuid;
                                    }
                                    hasLink = true;
                                }
                                //}
                            }
                        }
                    }
                }
                //}
            }
        }
    }

    //}
    return href;
}
