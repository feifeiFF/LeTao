$(function () {

    var currentPage=1;
    var pageSize=5;

    render();
   function  render() {
       $.ajax({
           url:"/user/queryUser",
           type:"get",
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           dataType:"json",
           success:function (info) {
               $("tbody").html(template("user_tmp",info));
               currentPage=info.page;
               pageSize=info.size;
               total=info.total;

               $("#pagenatior").bootstrapPaginator({
                   bootstrapMajorVersion:3,
                   currentPage:currentPage,
                   totalPages:Math.ceil(total/pageSize),
                   onPageClicked:function(event, originalEvent, type,page){
                       //为按钮绑定点击事件 page:当前点击的按钮值
                       currentPage=page;
                       render();
                   }

               })

           }
       })
   }


})