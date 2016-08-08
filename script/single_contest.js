(function() {
    var C = new Page();
    C.addSubpage('index', 'bullhorn', 'view/single_contest/index.html', function(){
        var avatars = $('#notice_top .avatar_mid');
        if(!avatars.hasClass('binded')) {
            avatars.addClass('binded');
            avatars.click(function(){
                moveToNewPage('user', {
                    userId : 2
                });
            });
        }
    });
    C.addSubpage('problems', 'list', 'view/single_contest/list.html', function(){
        // just for demo
        var probs = $('.contest_problem_list_row');
        for(var it = 0; it < probs.length; ++ it) {
            (function(i){
                if(!probs.eq(i).hasClass('binded')) {
                    probs.eq(i).addClass('binded');
                    probs.eq(i).click(function(){
                        moveToNextPage('single_problem', {
                            contestId : current_page.contestId,
                            probId : parseInt(probs.eq(i).children().eq(0).text().slice(1))
                        });
                    });
                }
            })(it);
        }
    });
    C.addSubpage('status', 'list-alt', 'view/single_contest/status.html', function(){

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
    });
    C.addSubpage('comment', 'comment', 'view/single_contest/comment.html', function(){
        var avatars = $('#single_problem_comment_table .comment_user a');
        avatars = avatars.slice(0, avatars.length - 1);
        if(!avatars.hasClass('binded')) {
            avatars.addClass('binded');
            avatars.click(function(){
                moveToNewPage('user', {
                    userId : 1
                });
            });
        }
    });
    C.addSubpage('rank', 'sort-by-attributes', 'view/single_contest/rank.html');
    C.load = function() {
        //ajax code get notice!
    };
    C.method = {};
    C.getName = function() {return 'Contest - ' + this.method.contestId.toString();};
    C.initial = function(param){
    	this.method.contestId = param.contestId;
    };
    return C;
})();
