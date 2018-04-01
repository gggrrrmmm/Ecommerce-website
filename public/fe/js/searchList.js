$(function(){
   mui('.mui-scroll-wrapper').scroll({
  scrollY: true, //是否竖向滚动
  scrollX: false, //是否横向滚动
  startX: 0, //初始化时滚动至x
  startY: 0, //初始化时滚动至y
  indicators: true, //是否显示滚动条
  deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
  bounce: true //是否启用回弹
});
    var url=new URLSearchParams(location.search);
    var key=url.get("key");
    console.log(key);
getNum(1,key);
// $('.lt-sports-content').on('tap',' button',function(){
//     var id=$(this).data(id);
//     console.log(id);

//     location.href="detail.html?id="+id;
// })
$('.lt-sports-content').on('tap','button',function(){
    var id=$(this).data('id');
    console.log(id);
    location.href="detail.html?productId="+id;
})
// });

})
 function getNum(page,proName,num,price){
    $.ajax({
        url:'/product/queryProduct',
        type:'GET',
        data:{
            page:page || 1,
           pageSize:10,
           proName:proName || "",
           num:num || null,
           price : price || null
        },
        success:function(result){
            var tempResult=template('temp',result);
            $('.lt-sports-content').html(tempResult);
        }
    })
}