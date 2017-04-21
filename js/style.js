/**
 * Created by ZJing on 2017/4/19.
 */


require(['jquery'],function(){
    var $table = $("#table");
    var $showLi = $("#nav li");
    $showLi.hover(function(){
        // console.log(111);
        $table.show();
    },function(){
        // console.log(222);
        $table.hide();
    });
});