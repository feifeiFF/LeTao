$(function () {
    var currentPage = 1;
    var pageSize = 5;
    var total = 0;

    render();

    function render() {
        $.ajax({
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            type: "get",
            success: function (info) {
                $("tbody").html(template("cateTmp", info));
                total = info.total;
                currentPage = info.page;

                // 设置分页，使用分页插件
                $("#pagenatior_first").bootstrapPaginator({
                    bootstrapMajorVersion: 3,  //这个分页插件基于bootstrap ，对应的 bootstrp  的版本。
                    currentPage: currentPage,            //当前页
                    totalPages: Math.ceil(total / pageSize),              //总页数
                    size: "small",              //分页组件的大小
                    onPageClicked: function (event, originalEvent, type, page) {
                        //  点击page时候触发,page中存储了当前的页码
                        currentPage = page;
                        render();
                    }
                })

            }
        });
    };




    $(".btn_addCate").click(function (e) {
        $("#addCate_modal").modal("show");
    });

    $("#addCate_form").bootstrapValidator({
        //1  指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
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


    $("#addCate_form").on("success.form.bv",function (e) {
        e.preventDefault();

        $.ajax({
            url:"/category/addTopCategory",
            type:"post",
            dataType:"json",
            data:$("#addCate_form").serialize(),
            success:function (info) {
                console.log(info);
                currentPage=1;
                if(info.success){
                     $("#addCate_modal").modal("hide");
                     render();
                    $("#addCate_form").data("bootstrapValidator").resetForm(true);
                }

            }

         })

    });





});



