//  1 -- 利用 ajax 的全局事件加载进度条
        //每个页面都有 进度条 所以应该注册给全局，就是 document
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function () {
        setTimeout(function () {
          NProgress.done();
        },1000);
    });

// 2 ---  导航部分切换 分类管理
$(function () {

    $(".cateM").click(function () {
        $(this).next().slideToggle();
    })



//  3-- 关闭侧边栏
$(".icon_menu").click(function () {
    $(".lt_aside").toggleClass("now");
    $(".top_bar").toggleClass("now");
    $(".bog_content").toggleClass("now");
})



//  4 --  登出
$('.icon_logOut').click(function () {
   // 1.弹出模态框
    $("#logOut_modal").modal("show");

})





});