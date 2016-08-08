(function() {
    var P = new Page();
    P.addSubpage('list', 'list', 'view/problem/list.html', function(){
        // just for demo
        var probs = $('.problem_list_raw')
        
        for(var it = 0; it < probs.length; ++ it) {
            (function(i){
                if(!probs.eq(i).hasClass('binded')) {
                    probs.eq(i).addClass('binded');
                    probs.eq(i).click(function(){
                        moveToNextPage('single_problem', {
                            contestId : 0,
                            probId : parseInt(probs.eq(i).children().eq(1).text().slice(1))
                        });
                    });
                }

            })(it);
        }
    });
    P.addSubpage('search', 'search', 'view/problem/search.html', function() {
        var showErrorMessage = function(msg) {
            
        };
        
        var getSearchResult = function(id, oj, name, order) {
            console.log({
                'id' : id,
                'oj' : oj,
                'name' : name,
                'order' : order
            });
            // reset pagenum !
        };
        
        var getSearchOrder = function() {
            // get order
            return null;
        };
        
        var filterChecker = function() {
            var text = $('#problem_search_filter_text').val();
            var order = getSearchOrder();
            if(text == '') {
                return null;
            }
            if(text.indexOf('@') != -1 && text.indexOf('#') != -1) {
                return 'Invalid filter : can not use \'@\' and \'#\' at the same time.';
            }
            else if(text.indexOf('@') == -1 && text.indexOf('#') == -1){
                // ok                          
                return [null, null, text, order];                                   // name
            }
            else if(text.indexOf('@') != -1) {
                var tmp = text.split('@');
                if(tmp.length > 2) {
                    return 'Invalid filter : too many \'@\'s.';
                }
                else {
                    // ok
                    if(tmp[0] == '' && tmp[1] == '') return 'Invalid filter : can not be empty.';
                    if(tmp[0] == '') return [null, tmp[1], null, order];            // @oj
                    else if(tmp[1] == '') return [null, null, tmp[0], order];       // name@
                    else return [null, tmp[1], tmp[0], order];                      // name@oj
                }
            }
            else {
                var tmp = text.split('#');
                if(tmp.length > 2) {
                    return 'Invalid filter : too many \'#\'s.';
                }
                else {
                    if(tmp[0] != '' || tmp[1] == '') return 'Invalid filter : please use #id.';
                    else return [tmp[1], null, null, order];                        // #id
                }
            }
        }
        
        $('#problem_search_filter_text').on('input', function(){
            var ret = filterChecker();
            var sign = $('#problem_search_filter .glyphicon.form-control-feedback');
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
    P.load = function() {
        //ajax code get notice!


    };
    P.method = {};
    P.getName = function() {return 'Problems';};
    P.initial = function(){
    };
    return P;
})();
