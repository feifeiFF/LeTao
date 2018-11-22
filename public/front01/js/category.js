$(function () {
    //   请求一级分类数据，渲染一级分类
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        dataType:"json",
        success:function (info) {
            console.log(info);
            $(".first_cate").html(template("firstCate",info));
            secondRender(info.rows[0].id);
        }
    });

  //  给左侧一级分类注册点击事件
    $(".first_cate").on("click","a",function () {
         var id=$(this).data("id");
         secondRender(id);
         $(this).addClass("current").parent().siblings().find("a").removeClass("current");
    });


  // 请求二级分类数据  渲染二级分类
 function  secondRender(id) {
     $.ajax({
         url:"/category/querySecondCategory",
         type:"get",
         data:{
             id:id
         },
         dataType:"json",
         success:function (info) {
             // console.log(info);
             $(".second_cate").html(template("secondCate",info));
         }
     });
 }


});