/**
 * Created by 16037 on 2017/7/11.
 */
//获取地址栏的参数   并把它 转换成对象
define(function(){
    var search=window.location.search

    var query=search.split('?')[1]||'';
    var arr=query.split('&')||'';
    var obj={};
    arr.forEach(function(item){
        var key=item.split('=')[0];
        var value=item.split('=')[1];
        obj[key]=value
    })
    return obj;
})