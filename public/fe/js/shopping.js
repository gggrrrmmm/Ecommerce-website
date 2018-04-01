$(function () {

    mui.init();
    get();
    // 自调用函数
    (function ($) {
        var btnArray = ['确认', '取消'];
        // 删除
        $('#OA_task_1').on('tap', '.mui-btn-red', function (event) {
            var elem = this;

            var li = elem.parentNode.parentNode;
            mui.confirm('确认删除该商品吗？', '温馨提示', btnArray, function (e) {
                if (e.index == 0) {
                    var id = elem.dataset.id;
                    console.log(id);
                    var arr = [];
                    arr.push(id);
                    var obj = {
                        id: arr
                    }
                    $.ajax({
                        url: "/cart/deleteCart",
                        type: "GET",
                        data: obj,
                        success: function (result) {
                            console.log(result);
                        }
                    })
                    li.parentNode.removeChild(li);
                } else {
                    setTimeout(function () {
                        $.swipeoutClose(li);
                    }, 0);
                }
            });
        });

        // 编辑
        $('#OA_task_1').on('tap', '.mui-btn-blue', function (event) {
            var elem = this;
            var li = elem.parentNode.parentNode;
            var id = elem.dataset.id;
            var productsize = elem.dataset.productsize;
            var sizeArr = productsize.split('-');
            // console.log(sizeArr);
            var size = elem.dataset.size;
            var productnum = elem.dataset.productnum;
            var num = elem.dataset.num;
            // console.log(id);
            // console.log(productsize);
            // console.log(size);
            // console.log(productnum);
            // console.log(num);

            var obj = {
                id: id,
                productsize: sizeArr,
                size: size,
                productnum: productnum,
                num: num
            }
            var tempResult=template("edit",obj).replace(/\n/g,'');
           
            mui.confirm(tempResult, '编辑商品', btnArray, function (e) {
                if (e.index == 0) {

                    // li.parentNode.removeChild(li);
                } else {
                    setTimeout(function () {
                        $.swipeoutClose(li);
                    }, 0);
                }
            });

          mui('.mui-numbox').numbox();

        });
    })(mui);

});
function get() {
    $.ajax({
        url: "/cart/queryCart",
        type: "GET",
        data: null,
        success: function (result) {
            console.log(result);
            if (result.error == 400) {
                var url = location.href;
                location.href = "login.html?newURL" + url;
            }
            var templateResult = template("get", { data: result });
            $('.list').html(templateResult);
        }
    })
}