(function() {
    var S = new Page();
    S.addSubpage('list', 'list', 'view/status/list.html', function(){

    	var subs = $('.status_list_row')
        
        for(var it = 0; it < subs.length; ++ it) {
            (function(i){
                if(!subs.eq(i).hasClass('binded')) {
                    subs.eq(i).addClass('binded');
                    subs.eq(i).click(function(){
                        moveToNextPage('submission', {
                            contestId : 0,
                            submissionId : parseInt(subs.eq(i).children().eq(0).text().slice(1))
                        });
                    });
                }

            })(it);
        }
    });
    S.addSubpage('search', 'search', 'view/status/search.html', function() {
        var getOrder = function() {
            //get order
            return null;
        }
        var filterChecker = function() {
            var text = $('#status_filter_text').val();
            var order = getOrder();
            if(text == "")
                return null;
            if(text.indexOf('#') != -1) {
                var tmp = text.split('#');
                if(tmp.length > 2) {
                    return 'Invalid filter : too many \'#\'s.';
                }
                if(tmp[0] == '' && tmp[1] == '') {
                    return 'Invalid filter : please use #id';
                }
                else if(tmp[0] == '') return [null, tmp[1], order];
                else if(tmp[1] == '') return [tmp[0], null, order];
                else return [tmp[0], tmp[1], order];
            }
            else {
                return [text, null, order];
            }

        }
        $('#status_filter_text').on('input', function(){
            var ret = filterChecker();
            var sign = $('#status_filter .glyphicon.form-control-feedback');
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
    })
    S.load = function() {
        //ajax code get notice!
    };
    S.method = {};
    S.getName = function() {return 'Status';};
    S.initial = function(){};
    return S;
})();
