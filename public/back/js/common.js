//进度条事件
 $(document).ajaxStart(function(){
      NProgress.start();
 });
$(document).ajaxStop(function () {
     //设置延时是为了模拟访问服务器的效果
     setTimeout(function () {
         NProgress.done();
     },500);
})



