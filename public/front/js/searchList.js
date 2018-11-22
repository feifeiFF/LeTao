
$(function () {


var key = getSearch("key");
 $(".ipt-box").val(key);  // 将地址栏的值填充到搜索框中

 //1 --  首屏渲染
 render();

 //   每次点击搜索，或排序都要发送请求，重新渲染页面
 function render(){
         //  每次请求之前加上 loading 效果
         $(".product ul").html("<div class='loading'><div>");

         var options={};
          options.proName=$(".ipt-box").val();
          options.page=1;
          options.pageSize=100;
  // 额外的两个参数
     // (1) 通过判断有没有current的 a, 来决定需不需要传参
     // (2) 通过判断箭头方向, 决定升序还是降序排列,  1升序,  2降序
   var $current =$(".sort a.current");
   if($current.length == 1){
       var sortName=$current.data("type");  // 排序关键字
       var sortValue =$current.find("i").hasClass("fa-angle-up")?1:2;
      options[sortName]=sortValue;
   }

 console.log(options);
 //  加setTimeout 为了模拟网络延迟
    setTimeout(function () {
        $.ajax({
            url:"/product/queryProduct",
            type:"get",
            dataType:"json",
            data:options,
            success:function (info) {
                console.log(info);
                $(".product  ul ").html(template("productTmp",info));
            }
        })
    },500);

 }


// 2--   点击搜搜按钮实现搜索功能
  $(".btn-search").click(function () {

  //  获取搜索框的值
   var key = $(".search_input").val();

  // 获取本地存储
      var jsonStr=localStorage.getItem("search_list");
      var arr=JSON.parse(jsonStr);

      var index=arr.indexOf( key );
      if(index >-1 ){
      //  说明存在，历史记录,将之前的删除，当前的存储
          arr.splice(index,1);
      }

      if(arr.length>= 10){
      //   删除最后一个
        arr.pop();
      }

      arr.unshift(key);
  //    存储到localStorage
      localStorage.setItem("search_list",JSON.stringify(arr));
       render();

  })


//  3  给排序按钮，添加点击效果
 // 如果自己没有 current ,加上 current
 // 如果自己有，改变 箭头方向

 $(".sort a[data-type]").click(function () {

     if($(this).hasClass("current")){
          // 如果有 current 类切换箭头方向
          $(this).find("i").toggleClass("fa-angle-up").toggleClass("fa-angle-down");
     }else {
        // 没有类添加类
          $(this).siblings().find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
          $(this).addClass("current").siblings().removeClass("current");
     }
     render();

 })


});