
//判断用户是否登录了
$.ajax({
    url: "/employee/checkRootLogin",
    dataType: "json",
    type: "get",
    success: function (info) {
        if (info.success) {
            console.log("用户成功登录");
        }
        if (info.error === 400) {
            location.href = "login.html";

        }
    }
});