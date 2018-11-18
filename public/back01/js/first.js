$(function () {

    var currentPage=1;
    var pageSize=5;

    render();
    function  render() {
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                $("tbody").html(template("first_tmp",info));
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


// 点击添加分类按钮，弹出添加一级分类模态框
$(".btn-add-first").click(function () {
    $("#add_first_modal").modal("show");
});

//校验一级分类名不能为空
$("#firstForm").bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
    },
    //校验的字段
    fields:{
        categoryName:{
            validators:{
                 notEmpty:{
                     message:"请输入一级分类名称"
                 }
            }
        }
    }
});

// 验证成功，发送 ajax 请求
    $("#firstForm").on('success.form.bv',function(e){
         e.preventDefault();
         $.ajax({
              url:"/category/addTopCategory",
              type:"post",
              data:$("#firstForm").serialize(),
              dataType:"json",
              success:function (info) {
                 if(info.success){
                      render();
                     $("#add_first_modal").modal("hide");
                 }
              }
         })

    })

})