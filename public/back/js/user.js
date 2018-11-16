$(function () {
    //发送 ajax 请求，请求每一页的数据
    $.ajax({
         data:{page:1,pageSize:5},
         url:"/user/queryUser",
         type:"get",
         dataType:"json",
         success:function (info) {
             var htmlChar=template("tmp",info);
             $("tbody").html(htmlChar);
              console.log(info);
        }
    })


})