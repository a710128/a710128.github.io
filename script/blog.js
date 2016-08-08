(function() {
    var B = new Page();
    B.addSubpage('list', 'list', 'view/blog/list.html', function(){
    	// demo
    	var blogs = $('.blog_list_row')
        
        for(var it = 0; it < blogs.length; ++ it) {
            (function(i){
                if(!blogs.eq(i).hasClass('binded')) {
                    blogs.eq(i).addClass('binded');
                    blogs.eq(i).click(function(){
                        moveToNextPage('single_blog', { 
                            blogId : 1
                        });
                    });
                }

            })(it);
        }
    });
    B.addSubpage('search', 'search', 'view/blog/search.html', function(){
    	var getOrder = function() {
            //get order
            return null;
        }
        var filterChecker = function() {
            var text = $('#blog_filter_text').val();
            var order = getOrder();
            if(text == "")
                return null;
            if(text.indexOf('@') != -1) {
                var tmp = text.split('@');
                if(tmp.length > 2) {
                    return 'Invalid filter : too many \'@\'s.';
                }
                if(tmp[0] == '' && tmp[1] == '') {
                    return 'Invalid filter : please use @author';
                }
                else if(tmp[0] == '') return [null, tmp[1], order];
                else if(tmp[1] == '') return [tmp[0], null, order];
                else return [tmp[0], tmp[1], order];
            }
            else {
                return [text, null, order];
            }

        }
        $('#blog_filter_text').on('input', function(){
            var ret = filterChecker();
            var sign = $('#blog_filter .glyphicon.form-control-feedback');
            if(ret === null) {
                if(sign.hasClass('glyphicon-ok')) {
                    sign.removeClass('glyphicon-ok');
                }
                if(sign.hasClass('glyphicon-remove')) {
                    sign.removeClass('glyphicon-remove');
                }
            }
            else if(typeof(ret) === 'string') {
                if(sign.hasClass('glyphicon-ok')) {
                    sign.removeClass('glyphicon-ok');
                }
                if(!sign.hasClass('glyphicon-remove')) {
                    sign.addClass('glyphicon-remove');
                }
            }
            else {
                if(sign.hasClass('glyphicon-remove')) {
                    sign.removeClass('glyphicon-remove');
                }
                if(!sign.hasClass('glyphicon-ok')) {
                    sign.addClass('glyphicon-ok');
                }
            }
        });
    });
    B.load = function() {
        //ajax code get notice!
    };
    B.method = {};
    B.getName = function() {return 'Blogs';};
    B.initial = function(){};
    return B;
})();
