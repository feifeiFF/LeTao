$(function () {

    //  实例化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false, //是否显示滚动条
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });


    //获得slider插件对象  轮播图
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
    });

    //返回上一浏览页面
    $(".btn_back").click(function () {
        window.history.back();
    })

    // 获取地址栏中 传递过去的 值
    function   getSearch(key) {
        var url=window.location.search;
        url=decodeURI(url);
        var str=url.slice(1);   //截取字符串  从start开始，到索引为 end 的地方，包含start 不包含end
        var arr=str.split("&");

        var obj={};
        arr.forEach(function (v,i) {
            obj[v.split("=")[0]]=v.split("=")[1];
        })
        return obj[key];

    }
    getSearch("key");
    console.log(getSearch("key"));
})