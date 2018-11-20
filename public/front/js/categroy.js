$(function () {
   //  1 -- 请求数据，渲染一级分类菜单
    $.ajax({
        url:"/category/queryTopCategory",
        type:"get",
        dataType:"json",
        success:function (info) {
            $("#firstCateBox").html(template("firstTmp",info));
            // 始终默认渲染第一个数据
            secondRender(info.rows[0].id);
        }
    });


    // 2-- 注册点击事件，获取相应的 id
     $("#firstCateBox").on('click',"a",function () {
        var id = $(this).data('id');
        $(this).addClass("current").parent().siblings().find("a").removeClass("current");

         //  发送的数据是id ，封装二级渲染
         secondRender(id);

     });




    // 3-- 事件委托给左边的 a 注册点击事件，获取对应的 id 值，发送 ajax 请求
    function  secondRender(id) {
        $.ajax({
            data:{
                id:id
            },
            dataType:"json",
            type: "get",
            url:"/category/querySecondCategory",
            success: function (info) {
                $("#secondCateBox").html(template("secondCate",info));

            }

        })

    }

})