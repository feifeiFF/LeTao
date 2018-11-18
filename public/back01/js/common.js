//利用 ajax 的global 事件，可以做进度条
// ajax 有6个全局事件 ， 会被页面中所有的 ajax 请求触发，在不同的时间点会触发不同的全局事件

// ajax 的全局事件需=需要给 document 注册，固定写法
 $(document).ajaxStart(function () {
     NProgress.start();
 });


$(document).ajaxSend(function () {
     // 为了模拟远程效果，加上延时
      setTimeout(function () {
          NProgress.done();
      },500);
})

//ajax 有六个全局事件
   //1   ajaxStart  在开始第一个ajax 请求的时候触发
   //2   ajaxSend  在beforeSend 回调函数之后触发
   //3   ajaxSuccess  在success回调函数之后触发
   //4   ajaxError  在Error回调函数之后触发
   //5   ajaxComplete  在complete  回调函数之后触发
   //6   ajaxStop  在最后一个 ajax 请求结束的时候触发


$(function () {

//    1---切换分类管理导航
    $(".cate").click(function () {
         console.log(123);
         $(this).next().stop().slideToggle();
    })
})

// 隐藏侧边栏
  $(".lt_main .icon_menu").click(function () {
      $(".lt_aside").toggleClass("current");
      $(".lt_main  .topBar").toggleClass("current");
      $(".lt_main").toggleClass("current");
  })

 //登出
 $(".icon_logOut").click(function () {
      $("#logOut_modal").modal("show");


  });

$(".btn-logOut").click(function () {
    $.ajax({
         url:"/employee/employeeLogout",
         type:"get",
         success:function (info) {
             if(info.success){
                  location.href="login.html";
             }
         }
    })
})