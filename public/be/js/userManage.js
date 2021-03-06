$(function () {
    getNum();

    $('body').on('click', '.btn', function () {
        // console.log(1);
        var id = $(this).data("id");
        var isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        $('#optionModal').modal('show');
        $('#optionModal').find('strong').text($(this).text() + $(this).data("username"));
        $('.yes').on("click", function () {
            $.ajax({
                url: " /user/updateUser",
                data: {
                    id: id,
                    isDelete: isDelete
                },
                type: "POST",
                success: function (result) {
                    console.log(result);
                    getNum();
                    $('#optionModal').modal('hide');
                }
            })
        })
    })


});



function getNum(page, pageSize) {
    $.ajax({
        url: "/user/queryUser",
        data: {
            page: page || 1,
            pageSize: pageSize || 5
        },
        type: "GET",
        success: function (result) {
            // console.log(result);
            var temp = template('temp', result);
            $('tbody').html(temp);
            $('.pagination').bootstrapPaginator({
                bootstrapMajorVersion: 3,
                currentPage: result.page,//当前页面  
                // numberOfPages: ,//一页显示几个按钮（在ul里面生成5个li）  
                totalPages: Math.ceil(result.total / result.size), //总页数 
                onPageChanged: function (event, originalEvent, typePage, currentPage) {
                    //事件：typePage是被点击的页码
                    page = currentPage;
                    getNum(page);
                }

            })
        }
    });
}