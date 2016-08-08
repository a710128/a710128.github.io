(function() {
    var Home = new Page();
    Home.addSubpage('index', 'bullhorn', 'view/home/notice.html', function(){
    	if(!$('#notice_top .avatar_mid').hasClass('binded')) {
    		$('#notice_top .avatar_mid').addClass('binded');
	    	$('#notice_top .avatar_mid').click(function(){
	    		moveToNewPage('user', {
	    			userId : 1
	    		});
	    	});
    	}
    });
    Home.load = function() {
        //ajax code get notice!
    };
    Home.method = {};
    Home.getName = function() {return 'Home';};
    Home.initial = function(){};
    return Home;
})();
