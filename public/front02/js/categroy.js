$(function () {
// 1 --请求数据，渲染一级分类
 $.ajax({
      url:"/category/queryTopCategory",
     type:"get",
     dataType:"json",
     success:function (info) {
         $(".first_cate").html(template("firstCate",info));

         renderById(info.rows[0].id);
       //   首屏默认 渲染第一条
     }
 });


// 2 -- 根据一级分类的 id  渲染二级分类
    function renderById(id){
        $.ajax({
            url:"/category/querySecondCategory",
            data:{
                id:id
            },
            dataType:"json",
            type:"get",
            success:function (info) {
                $(".second_cate").html(template("secondCate",info));
            }
        })
    }


    // 3 -- 给左侧的每一个 a 注册点击事件 ，根据 id 渲染二级分类
    $(".cate_left").on("click","a",function () {

         var id=$(this).data("id");
         $(this).addClass("current").parent().siblings().find("a").removeClass("current");
         renderById(id);
    })



})