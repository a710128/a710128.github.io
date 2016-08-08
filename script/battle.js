(function() {
    var B = new Page();
    B.addSubpage('list', 'list', 'view/battle/list.html', function(){

    	// demo

    	var probs = $('.problem_list_raw')
        
        for(var it = 0; it < 20; ++ it) {
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
    B.addSubpage('rank', 'sort-by-attributes', 'view/battle/rank.html', function(){
        var avatars = $('#battle_rank tr').slice(1);
        if(!avatars.hasClass('binded')) {
            avatars.addClass('binded');
            avatars.click(function(){
                moveToNewPage('user', {
                    userId : 1
                });
            });
        }
    });
    B.load = function() {
        //ajax code get notice!
    };
    B.method = {};
    B.getName = function() {return 'Battles';};
    B.initial = function(){};
    return B;
})();
