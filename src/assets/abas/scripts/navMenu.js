/**
 * Created by xlj on 2015/8/3.
 */
$(function () {
    //顶部搜索框 关闭按钮
    $('#search_close_btn').click(function () {
        if ($('#search_inp').val() != '') {
            $('#search_inp').val('');
        }
    })
});

function search() {
    var searchInp = $('#search_inp');

    searchInp.bind('keydown', function (e) {
        if ($('#search_inp').val() != '' && e.keyCode == 13) {//Enter的键值=13
            //e.preventDefault();
            $('#searchResults_dialog').modal('show');
        }
    });
};
function closeWindow() {
    $('#searchResults_dialog').modal('hide');
    //$('#search_inp').val('');
}