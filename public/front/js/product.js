$(function () {
//  1--- 根据地址栏获取到的参数 id  ，发送请求,渲染详情页
    var id =getSearch("productId");
    $.ajax({
         url:"/product/queryProductDetail",
         data:{
             id:id
         },
         dataType:'json',
         type:"get",
         success:function (info) {
             console.log(info);
             $(".lt_main .mui-scroll").html(template("productTpm",info));

             //  动态渲染的轮播图 和 数字加减 需要手动初始化
             // 手动初始化轮播图
             // 获得slider插件对象
             var gallery = mui('.mui-slider');
             gallery.slider({
                 interval:5000//自动轮播周期，若为0则不自动播放，默认为0；
             });
             // 手动初始化 数字框
             mui('.mui-numbox').numbox();
         }
    })

//  2 -- 给尺码添加选中 功能
 $(".lt_main").on("click",".lt_size span",function () {
      $(this).addClass("current").siblings().removeClass("current");
 })

// 3 -- 加入购物车功能
   // （1） 给加入购物车按钮点击事件
   // （2）获取用户选中的尺码和数量
   // （3）发送 ajax 请求，进行加入购物车操作
   $("#addCart").click(function () {
        var productid=getSearch("productid");
        var size = $(".lt_size span.current").text();
        var num =  $(".mui-numbox-input").val();
       // size 没有选的时候是null     ！null == true
        if(!size){
             mui.toast(" 请选择尺码 ！");
             return;
        }
       $.ajax({
            url:"/cart/addCart",
            type:"post",
           data:{
                productId:productid,
                size:size,
                num:num
           },
           dataType:"json",
           success:function (info) {
                // 如果用户已经登录了 ，去购物车页面
                if(info.success){
                    mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function (e) {
                        if(e.index === 0){
                            location.href="cart.html"
                        }
                    })
                  
                }

                // 如果没有登录，登录页面
                // 后面的地址用于返回时候使用，登录成功，可直接链接处
                if(info.error == 400 ){
                     location.href="login.html?retUrl="+location.href;
                }

           }

       })

   })


})