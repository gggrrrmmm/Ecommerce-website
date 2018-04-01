$(function () {
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    var url = new URLSearchParams(location.search);
    var newUrl = url.get('productId');
    // console.log(newUrl);
    id = newUrl;

    get(id);
    $('.product-cart').on('tap',function(){
        var size=$('.product-size span.active').text();
        var num=$('.mui-numbox-input').val();
        var productId=id;
        console.log(size);
        console.log(num);
        console.log(productId);
        addCar(productId,num,size);
})
})
$(".mui-scroll").on('tap','.product-size span',function(){
    $(".product-size span").removeClass('active');
    $(this).addClass('active');
});

function get(id) {
    $.ajax({
        url: '/product/queryProductDetail',
        type: "GET",
        data: {
            id: id
        },
        success: function (result) {
            console.log(result)
            var tempResult = template('temp', result);
            $('.mui-scroll').html(tempResult);
            var arr = result.size.split('-');
            console.log(arr);
            var size = template('size', {
                startNum: arr[0],
                endNum: arr[1]
            });
            $(".product-size").html(size);
            mui(".mui-numbox").numbox();
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000//自动轮播周期，若为0则不自动播放，默认为0；
            });

        }


    })
}


function addCar(productId,num,size){
    $.ajax({
        url:"/cart/addCart",
        type:'POST',
        data:{
           productId:productId,
           num:num,
           size:size 
        },
        beforeSend:function(){
         
          if(!productId){
              mui.toast('没有选择商品');
              return false;
          }  
           if(!num){
              mui.toast('没有选择数量');
              return false;
          }  
           if(!size){
              mui.toast('没有选择尺寸');
              return false;
          }  
        },
        success:function(result){
                if(result.error==400){
                    var url=location.href;
                    location.href="../login.html?url="+url;
                }
        }
    })
}
