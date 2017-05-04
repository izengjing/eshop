/**
 * Created by ZJing on 2017/4/19.
 */


require(['jquery.min'],function(){
    var $table = $("#table");
    var $showLi = $("#nav li");
    $showLi.hover(function(){
        $table.show();
    },function(){
        $table.hover(function(){
            $(this).show();
        },function () {
            $(this).hide();
        });
        $table.hide();
    });
});