$(function () {
// 区域滚动
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 ,//flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        bounce: true //是否启用回弹
    });


//   图片自动轮播
    // 获得slider插件对象
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:2000//自动轮播周期，若为 0 则不自动播放，默认为0；
    });



//  点击回退按钮 回退
$(".icon_left").click(function () {
    window.history.back();
})


});


 // 通过传递参数，获取地址栏中的 value 值
 function  getSearch(key) {
     var url=window.location.search;     //"?key=%E5%8F%91%E9%80%81"
         url=decodeURI(url);              //将字符串解码为 中文
     var str= url.slice(1);              // 截取掉 ？
     var arr =  str.split("&");
     var obj={};
    for(var i=0;i<arr.length;i++){
         // 将数组中的每一项 用 = 分割 ，每一项下标为0 的作为 key ,下标为1的作为 value
        obj[arr[i].split("=")[0]] =  arr[i].split("=")[1];
    }
    return obj[key];
 }

 // getSearch("key");
