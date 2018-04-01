$(function(){
   $.ajax({
       url:"/user/queryUserMessage",
       type:"GET",
       data:null,
       success:function(result){
        console.log(result);
        var tempinfo=template("info",result);
        $('.info').html(tempinfo);
       }
   }) 
$('.loginout').on('tap',function(){
    $.ajax({
        url:" /user/logout",
        type:"GET",
        data:null,
        success:function(result){
            // console.log(result);
            if(result.success==true){
                var url=location.href;
                location.href="login.html?url="+url;
            }
        }
    })
})

})