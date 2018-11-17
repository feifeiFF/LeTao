$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var total=0;

//   渲染首屏数据
    render();

//   封装渲染数据的函数，每次操作都可复用
    function render(){
        //  发送 ajax 请求，请求首屏的数据
        $.ajax({
            dataType: "json",
            url: "/category/querySecondCategoryPaging",
            type: "get",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success:function (info) {
                $("tbody").html(template("second_tmp",info));
                currentPage=info.page;
                pageSize=info.size;
                total=info.total;

               // 设置分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,  //bootstrap  版本号
                    currentPage:currentPage,  //当前页
                    totalPages:Math.ceil(total/pageSize),  //总页数
                    onPageClicked:function (event, originalEvent, type,page) {
                        currentPage=page;   //page 中存储了当前页
                        render();

                    }
                })
            }
        });
    }




//  点击添加分类按钮，弹出模态框
    $(".btn_second_addCate").click(function () {
        $("#add_secondCate").modal("show");

        $.ajax({
            type:"get",
            dataType:"json",
            url:"/category/queryTopCategoryPaging",
            data:{
                 page:1,
                 pageSize:100,
            },
            success:function (info) {
                // console.log(info);
                $(".dropdown-menu").html(template("dropDowm",info));
            }
        })
    })


// 给下拉菜单的所有 a  注册点击事件。
    $(".dropdown-menu").on("click","a",function () {
         // 获取  a 中的文本，放在按钮上显示
         var  txt=$(this).text();
         $(".firstName").html(txt);

        //将id 存储到准备好的隐藏域中
        var id = $(this).data("id");
        $('[name="categoryId"]').val(id);

      // 此表单校验监听的是input 事件，当提示不能为空，用户选择了之后，隐藏域中修改的仅仅是val值，所以表单校验的状态没有发生改变
        //解决方法1；手动触发input事件
        // $("[name='categoryId']").trigger("input");
        //解决方法2：手动改变校验的状态
       $("#form_addSecondCate").data("bootstrapValidator").updateStatus("categoryId","VALID");


    })

// 上传图片
    $("#uploadFile").fileupload({
        dataType:"json",
        done:function (e,data) {
            console.log(data);
            // e  事件对象
            // data 通过 data.result.picAddr  可以获取文件的地址
            var picAddr=data.result.picAddr;

           // 把图片地址设置给 img 标签实现实时预览图片
            $("#imgBox img ").attr("src",picAddr);

            // 把图片地址给准备好的隐藏域，用于提交
            $('[name="brandLogo"]').val(picAddr);

            //同上bootstrapValidator 校验的时候监听的是 input 事件，选择图片的时候，只是改变了 value  值，所以不改变他的状态
              // 解决方法1：手动触发 input 事件
              // $('[name="brandLogo"]').trigger("input");
              // 解决方法2：手动改变状态
              $("#form_addSecondCate").data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    })


//  验证表单不能为空
$("#form_addSecondCate").bootstrapValidator({
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
})

// 表单校验成功，发送 请求 ，添加数据
$("#form_addSecondCate").on("success.form.bv",function (e) {
    // 阻止表单默认的提交事件
    e.preventDefault();
    $.ajax({
        url:"/category/addSecondCategory",
        data:$("#form_addSecondCate").serialize(),
        type:"post",
        dataType:"json",
        success:function (info) {
           if(info.success){
                render();
               $("#add_secondCate").modal("hide");
           }
        }
    });
})

})