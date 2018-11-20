$(function () {
    var currentPage=1;  //当前页
    var pageSize=3;     // 每一页的条数
    var picArry=[];     // 存储多文件的上传时候的信息

    // 1--- 渲染首屏数据
    render();

    function  render() {
        $.ajax({
            url:"/product/queryProductDetailList",
            data:{
                page:currentPage,
                pageSize:pageSize,
            },
            type:"get",
            dataType:"json",
            success:function (info) {
                currentPage=info.page;
                pageSize=info.size;

                // 3 -- 将查询到的数据渲染到页面中
                $("tbody").html(template("productTmp",info));

                //  2 --  设置分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值,
                        currentPage=page;
                        render();
                    }
                })
            }
        });
    }

    // 4 -- 点击添加商品按钮，弹出模态框，添加商品
    $(".btn-add-product").click(function () {
        $("#add_product").modal("show");

        //5 -- 渲染二级分类
        $.ajax({
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{
                page:1,
                pageSize:100
            },
            dataType:"json",
            success: function (info) {
                console.log(info);
                $(".dropdown-menu").html(template("secondCate",info));

            }

        })

        // 6-- 给每一个 li 里面的 a 注册点击事件，渲染二级分类列表
        $(".dropdown-menu").on("click","a",function () {
            var txt=$(this).text();
            $(".secondName").html(txt);
            //把获取到的二级分类的id  存到隐藏域中
            var id=$(this).data("id");
            $("[name='brandId']").val(id);
            $("[name='brandId']").trigger("input");

        })

        //  7-- 图片上传
        $("#uploadFile").fileupload({
            dataType:"json",
            // data：图片上传后的对象，通过data.result.picAddr可以获取上传后的图片地址  
            done:function (e, data) {
                //每次上传完一张图片就会响应一次
                // e 是事件对象
                // data.result 中存储了图片地址和名称
                var picObj=data.result;
                var picAddr=picObj.picAddr;

                // 从最前面插入图片信息
                picArry.unshift(picObj);
                $(".imgBox").prepend("<img src=" + picAddr+ "  width=80px>");

                //  如果上传的图片大于3张，删除最开始添加的，就是数组中的最后一个
                //  pop 从最后一个删除    unshift 添加到最前面     shift 从最后一个删除    push 添加到最后面
                if(picArry.length>3){
                    picArry.pop();
                    $(".imgBox img:last-of-type").remove();    //移除最后一张图片
                }

               //如果上传了3张图片，那么需要手动改变 对隐藏域校验的状态
               if(picArry.length === 3){
                    // 底层触发了 input 事件 ，所以，也可触发input 事件改变状态。
                    $("#form_addProduct").data("bootstrapValidator").updateStatus("picStatus","VALID");
               }
               console.log(picArry);

            }
        });


        // 8 -- 校验字段
        $("#form_addProduct").bootstrapValidator({
            // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
            excluded: [],

            // 配置图标
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            // 校验字段
            fields:{

                brandId:{
                    validators:{
                        notEmpty:{
                            message:"请选择二级分类"
                        }
                    }
                },

                proName:{
                    validators:{
                        notEmpty:{
                            message:"请输入商品名称"
                        }
                    }
                },

                num:{
                    validators:{
                        notEmpty:{
                            message:"请输入商品库存"
                        },
                        regexp:{
                            regexp:/^[1-9]\d*$/,
                            message:"请输入非 0 开始的数字"
                        }
                    }
                },

                proDesc:{
                    validators:{
                        notEmpty:{
                            message:"请输入商品描述"
                        }
                    }
                },

                size:{
                    validators:{
                        notEmpty:{
                            message:"请输入商品尺码"
                        },
                        regexp:{
                            regexp:/^\d{2}-\d{2}$/,
                            message:"请输入 xx-xx 的格式(例如35-45)"
                        }
                    }
                },

                oldPrice:{
                    validators:{
                        notEmpty:{
                            message:"请输入原价"
                        },
                        regexp:{
                            regexp:/^\d*.\d*$/,
                            message:"请输入数字"
                        }
                    }
                },

                price:{
                    validators:{
                        notEmpty:{
                            message:"请输入现价"
                        },
                        regexp:{
                            regexp:/^\d*.\d*$/,
                            message:"请输入数字"
                        }
                    }
                },

                picStatus:{
                    validators:{
                        notEmpty:{
                            message:"请上传3张图片"
                        }
                    }
                }
            }
        })

       // 9 --  校验字段完成之后，发送 ajax 请求，添加到商品展示区。
        $("#form_addProduct").on("success.form.bv",function (e) {

             //序列化表单数据
             var data=$("#form_addProduct").serialize();
             console.log(picArry);
             data+="&picName1"+"="+picArry[0]['picName']+"&picAddr1"+picArry[0]['picAddr'];
             data+="&picName2"+"="+picArry[1]['picName']+"&picAddr2"+picArry[1]['picAddr'];
             data+="&picName3"+"="+picArry[2]['picName']+"&picAddr3"+picArry[2]['picAddr'];
             console.log(data);

            // 阻止表单默认的提交事件
            e.preventDefault();
            $.ajax({
                url:"/product/addProduct",
                type:"post",
                data:data,
                dataType:"json",
                success:function (info) {

                // 关闭模态框
                    $("#add_product").modal("hide");


                //10 -- 重置表单（对于没有触发input的，不会改变准噶太，需要手动改变）
                  $("#form_addProduct").data("bootstrapValidator").resetForm(true);
                  $(".secondName").text("请选择二级分类");
                  $(".imgBox img").attr('src',"");

                  // 将存储图片的数组清空。
                  picArry=[];

                  currentPage=1;
                  render();

                } 
            })
        })
        });










});