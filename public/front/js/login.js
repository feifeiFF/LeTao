$(function () {

    // 登录思路:
    // 1. 给登陆添加点击事件
    // 2. 获取用户名和密码
    // 3. 发送 ajax 进行登录验证
    //    登录成功, (1) 如果传了地址过来, 跳转到传过来的地址页面
    //              (2) 如果没有传地址, 直接跳转个人中心
    //    登录失败, 提示用户登陆失败
   //    1--  发送请求 判端用户状态
   $("#loginBtn").click(function () {
        var username= $("#username").val();
        var password= $("#password").val();

        if(username.trim() == "" || password.trim()==""){
             mui.toast("用户名或密码为空");
             return;
        }
        $.ajax({
            url:"/user/login",
            type:'post',
            dataType:"json",
            data:{
                username:username,
                password:password
            },
            success:function (info) {
                console.log(info);

                if(info.error){
                     mui.toast("用户名或密码错误");
                     return;
                }
                if(info.success){
                //  用户登录成功，如果传了地址，跳到地址处，如果没跳到个人中心页
                 if(location.search.indexOf("retUrl")>-1){
                      var retUrl=location.search.replace("?retUrl=","");
                      location.href=retUrl;
                 }else{
                      location.href="user.html";
                 }

                }
            }

        })
   })


})