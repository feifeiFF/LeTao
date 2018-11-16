//判断用户有没有等登录，若没有登录，不能直接去其他页面，跳转到登录页
//若登录过不作处理，继续浏览页面

$.ajax({
     type:"get",
     dataType:"json",
      url:"/employee/checkRootLogin",
      success:function (info) {
        if(info.success){
             console.log("用户成功登录");
        }
        if(info.error===400){
             //用户登录不成功的时候继续在登录页，不能去其他页面
             location.href="login.html";
        }
    }

})