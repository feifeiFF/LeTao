//触发ajax 的全局事件，第一个 ajax 发送的时候，进度条事件开始
$(document).ajaxStart(function(){
    NProgress.start();
});

//最后一个ajax结束的时候，进度条事件结束。
$(document).ajaxStop(function () {
    //设置延时是为了模拟访问服务器的效果，工作时不需要
    setTimeout(function () {
        NProgress.done();
    },500);
})


$(function () {
    // 1 ------ 分类管理的切换
    $(".nav .category").click(function () {
        $(this).next().stop().slideToggle();
    })



   // 2 ----- 点击topBar 部分的icon_left 隐藏左边的导航栏
    $(".icon_menu").click(function () {
         $(".lt_aside").toggleClass("current");
         $(".lt_main").toggleClass("current");
         $(".lt_topBar ").toggleClass("current");
    })


  // 3 ----- 点击登出按钮 ，弹出模态框 ，点击确认按钮退出登录
       //请求后台数据接口销毁当前用户的会话信息，跳转到登录页
    $(".modal .btn_logout").click(function () {
           $.ajax({
               dataType:"json",
               type:"get",
               url:"/employee/employeeLogout",
               success:function (info) {
                  if(info.success){
                       location.href="login.html";
                  }
               }
           })
      })


})

