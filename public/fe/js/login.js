$(function () {
    $('.login').on('tap', function () {
        var formData = $('#form').serialize();
        $.ajax({
            url: "/user/login",
            type: "POST",
            data: formData,
            beforeSend: function () {
                var username=$('.name').val();
                var password=$('.password').val();
                if(!username){
                    mui.toast('请输入用户名');
                    return false;
                }
                 if(!password){
                    mui.toast('请输入密码');
                    return false;
                }
            },
            success: function (result) {
                    if(result.success==true){
                        var url=new URLSearchParams(Location.href);
                        var newUrl=url.get('url');
                        if(!newUrl){
                            location.href="index.html";
                        }else{
                            location.href=newUrl;
                        }
                    }
            }
        })
    })
})