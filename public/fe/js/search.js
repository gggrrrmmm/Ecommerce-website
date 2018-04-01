$(function () {
    showHistory();
    $('.search-btn').on('tap', function () {
        var keywords = $.trim($('.search-box input').val());
        //   var keywords = $.trim($('.search-box input').val());
        if (keywords == " ") {
            mui.toast('没有关键词');
        } else {
            setHistory(keywords);
            showHistory();
            location.href="searchList.html?key="+keywords
        }
    });
    $('.history').on('tap', '.history-list i', function () {
        var text = $(this).siblings('span').text();
        delHistory(text);
        showHistory();
    })
    $('.history').on('tap', '.history-title-manager span:nth-child(2)', function () {
        cleanHistory();
        showHistory();
    })

    $('.history').on('tap', '.history-list span:nth-child(1)', function () {
        var keywords= $(this).text();
        console.log(keywords);
           location.href="searchList.html?key="+keywords;
    })
})
var getHistory = function () {
    return JSON.parse(window.localStorage.getItem('lthistory') || '[]');
}
var setHistory = function (key) {
    var arr = getHistory();
    $.each(arr, function (index, item) {
        if (item == key) {
            arr.splice(index, 1);
        }
    })
    arr.push(key);
    window.localStorage.setItem('lthistory', JSON.stringify(arr));
}

var delHistory = function (key) {
    var arr = getHistory();
    $.each(arr, function (index, item) {
        if (item == key) {
            arr.splice(index, 1);
        }
    })

    window.localStorage.setItem('lthistory', JSON.stringify(arr));
}

var cleanHistory = function () {
    window.localStorage.removeItem('lthistory');
}
var showHistory = function () {
    var arr = getHistory();
    var templateResult = template('temp', { arr, arr });
    $('.history').html(templateResult);
}