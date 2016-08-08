(function() {
    var C = new Page();
    C.addSubpage('list', 'list', 'view/contest/list.html', function(){
        // demo !
        var conts = $('.contest_list_row')
        
        for(var it = 0; it < conts.length; ++ it) {
            (function(i){
                if(!conts.eq(i).hasClass('binded')) {
                    conts.eq(i).addClass('binded');
                    conts.eq(i).click(function(){
                        moveToNextPage('single_contest', {contestId : parseInt(conts.eq(i).children().eq(0).text().slice(1))});
                    });
                }
            })(it);
        }
    });
    C.addSubpage('search', 'search', 'view/contest/search.html', function(){
    	var autoComp = function(inp) {
    		var list = ['current', 'past', 'coming', 'oi', 'acm'];
    		var rlen = inp.length;
    		for(var i = 0; i < list.length; ++ i) {
    			if(list[i].slice(0, rlen).toLowerCase() === inp.toLowerCase()) {
    				return inp + list[i].slice(rlen);
    			}
    		}
    		return '';
    	};

    	var calcFunc = function() {
    		var text = $('#contest_search_filter_text').val();
    		if(text[0] == '@') {
    			var comp = autoComp(text.slice(1));
    			if(comp != '') $('#contest_search_filter_hint').val('@' + comp);
    			else $('#contest_search_filter_hint').val('');
    		}
    		else $('#contest_search_filter_hint').val('');
    	};

    	$('#contest_search_filter_text').focusin(function(){
    		calcFunc();
    	});

    	$('#contest_search_filter_hint').focusin(function(){
    		var text = $('#contest_search_filter_text').val();
    		if(text[0] == '@') {
    			var comp = autoComp(text.slice(1));
    			if(comp != '') $('#contest_search_filter_text').val('@' + comp);
    		}
    		$('#contest_search_filter_text').focus();
    	});

    	$('#contest_search_filter_text').focusout(function(){
    		$('#contest_search_filter_hint').val('');
    	});
    	$('#contest_search_filter_text').keypress(function(event){
    		if(event.keyCode == 13) {
    			var hint = $('#contest_search_filter_hint').val();
    			if(hint != '') {
    				$('#contest_search_filter_text').val(hint);
    			}
    		}
    	});
    	$('#contest_search_filter_text').on('input', function(){
    		calcFunc();
    	});
    });
    C.load = function() {
        //ajax code get notice!
    };
    C.method = {};
    C.getName = function() {return 'Contests';};
    C.initial = function(){};
    return C;
})();
