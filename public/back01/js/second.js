$(function () {
    var currentPage=1;
    var pageSize=5;

    render();
    function  render() {
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            dataType:"json",
            success:function (info) {
                console.log(info);
                $("tbody").html(template("second_tmp",info));
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
    };


 // 点击添加分类按钮，弹出添加二级分类模态框
    $(".btn-add-second").click(function () {
        $("#add_second_modal").modal("show");
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success:function (info) {
                    //渲染一级分类下拉框
                    $(".dropdown-menu").html(template("first-cate",info));
            }
        })
    });


//  给每一个 a 注册点击事件
$(".dropdown-menu").on("click","a",function () {
     var txt=$(this).text();
     $(".btn-first-cate").html(txt);
     var cateId=$(this).data("id");
     $("[name='categoryId']").val(cateId);
     $("[name='categoryId']").trigger("input");
})


//  上传图片文件
 $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
            var picAddr=data.result.picAddr;
            console.log(picAddr);
            $(".imgBox img" ).attr("src",picAddr);

            // 把图片地址给准备好的隐藏域，用于提交
            $('[name="brandLogo"]').val(picAddr);
            $('[name="brandLogo"]').trigger("input");

        }
    });


//  验证表单不能为空
    $("#secondForm").bootstrapValidator({
        //指定不校验的类型，默认为":disabled",":hidden",":not(visible)"
        excluded:[],
        // 指定校验时的图标显示，默认是 bootstrap 风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //指定校验字段
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:"请选择一级分类"
                    }
                }
            },

            brandName:{
                validators:{
                    notEmpty: {
                        message:"请输入二级分类名称"
                    }
                }
            },

            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择图片"
                    }
                }
            }
        }
    });

    //  表单校验成功之后触发
    $("#secondForm").on('success.form.bv', function (e) {
        // 阻止表单默认的事件
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
             data:$("#secondForm").serialize(),
             dataType:"json",
             url:"/category/addSecondCategory",
             type:"post",
             success:function (info) {
                if(info.success){
                     render();
                     $("#add_second_modal").modal("hide");
                }
            }
        })
    });

});