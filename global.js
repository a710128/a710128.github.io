$(document).ready(function() {
    var query = {};
    {
        var splits = location.search.substring(1).split('&');
        for (var i = 0; i < splits.length; ++ i) {
            var pair = splits[i].split("=", 2);
            if (pair.length == 2) {
                query[decodeURI(pair[0])] = decodeURI(pair[1]);
            }
        }
    }
    if (('name' in query) && ('path' in query)) {
        var data = $.ajax({
            url: query.path,
            type: "GET",
            async: false
        }).responseText;
        if (typeof(data) == "string") data = JSON.parse(data);
        window.title = data.page_title;
        $('#activity-name').text(data.title);
        $('#js_name').text(data.js_name);

        
    }
    else {
        window.title = "参数错误";
    }
});
