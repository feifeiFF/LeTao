$(function () {

    // 1 -- 发送请求渲染用户中心
    $.ajax({
         type:"get",
         url:"/user/queryUserMessage",
         dataType:"json",
         success:function (info) {
             if(info.error == 400 ){
                  location.href="login.html";
                  return ;  //终止请求
             }
                  // 已登录，跳转到 用户中心
                  $("#userInfo").html(template("infoTpl",info));

         }
    });



    // 2 -- 点击退出按钮退出
    $("#logout").click(function () {
        $.ajax({
            url:"/user/logout",
            type:"get",
            dataType:"json",
            success:function (info) {
                // console.log(info);
                if(info.success){
                    location.href="login.html";
                }
            }
        })
    })

})