$(function () {
//  渲染用户的购物车信息

render();
 function  render() {
     $.ajax({
         url:"/cart/queryCart",
         dataType:"json",
         type:"get",
         success:function (info) {
             console.log(info);
             //  如果没登录
             if(info.error == 400){
                 // 用户没登陆, 跳转到登录页, 在跳转时, 将页面地址拼接
                 location.href = "login.html?retUrl=" + location.href;
                 return;
             }
             //登录的话，渲染对应用户的购物车页面
             $(".lt_main .mui-scroll").html(template("cartTmp",{list:info}));
         }
     })

 }


 $(".lt_main .mui-scroll").on("click",".btn_delete",function () {
     //  获取需要的 id
     var id = $(this).data("id");
     console.log(id);
     //  发送删除请求
     $.ajax({
         url:"/cart/deleteCart",
         type:"get",
         data:{
             // 后台需要数组
             id:[id]
         },
         dataType:"json",
         success:function (info) {
            if(info.success){
                // 删除完成后重新渲染页面
                render();
            }
         }
     })
 })


})