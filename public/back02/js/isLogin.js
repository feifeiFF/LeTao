// 判断用户是否登录过，如果么有，只能在登录页，如果登录过，进入相应页面

$.ajax({
    url:"/employee/checkRootLogin",
    type:"get",
    dataType:"json",
    success: function (info) {
        if(info.true){
             console.log("登录");
        }
        if(info.error===400){
        //   没有登录过，去登
            location.href="login.html";
        }

    }
});