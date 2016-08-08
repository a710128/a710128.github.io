(function() {
    var U = new Page();
    U.addSubpage('info', 'user', 'view/user/info.html', function(){
    	var getUserName = function() {
    		if(current_page.userId === 1) return 'a710128';
    		else if(current_page.userId === 2) return 'myyes';
    		else if(current_page.userId === 3) return 'Anonymous';
    		return '';
    	};
    	var getUserAvatar =function() {
    		if(current_page.userId === 1) return 'storages/avatars/test.jpg';
    		else if(current_page.userId === 2) return 'storages/avatars/test2.jpg';
    		else if(current_page.userId === 3) return 'storages/avatars/anonymous.jpg';
    		return '';
    	}
    	var getUserAC = function() {
    		if(current_page.userId === 1) return 3;
    		return 0;
    	}
    	var getUserLevel = function() {
    		if(current_page.userId === 1) return 1;
    		return 0;
    	}
    	var getContests = function() {
    		if(current_page.userId === 1)
    			return ['#1', '#2', '#3', '#4', '#5', '#6', '#7', '#8', '#9', '#10',
    				'#11', '#12', '#13', '#14', '#15', '#16', '#17', '#18', '#19', '#20'];
    		return [];
    	}
    	var getContestsRank = function() {
    		if(current_page.userId === 1)
    			return [1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 1, 2, 1, 1, 1, 4, 6, 5, 1];
    		return [];
    	}
    	var getSubmissionsDays = function() {
    		var now = new Date();
    		var ret = []
    		for(var i = 14; i >= 0; -- i) {
    			var od = new Date(now - i * 24 * 60 * 60 * 1000);
    			ret.push((od.getMonth() + 1).toString() + '/' + od.getDate());
    		}
    		return ret;
    	}
    	var getSubmissions = function() {
    		var ret = [];
    		for(var i = 14; i >= 0; -- i) {
    			ret.push(0);
    		}
    		return ret;
    	}

    	var getUserDescription = function() {
    		if(current_page.userId === 1) {
    			return '<h3>I\'m a710128</h3>';
    		}
    		return 'Empty';
    	}

    	$('#user_info_avatar').attr('src', getUserAvatar());
    	$('#user_info_name').text(getUserName());
    	$('#ac').text(getUserAC());
    	$('#total').text(getUserAC());
    	$('#level').text('Lv. ' + getUserLevel().toString());
    	$('#user_info_main').html(getUserDescription());
    	$('#user_info_contest .container').highcharts({
    		title : {
    			text : 'Ranks',
    			align : 'left'
    		},
    		xAxis : {
    			title : {
    				text : 'Contest ID'
    			},
    			categories : getContests()
    		},
    		yAxis : {
    			title : {
    				text : 'Rank'
    			},
    			plotLines : [{
    				value : 0,
    				width : 1,
    				color : '#808080'
    			}]
    		},
    		legend : {
    			layout : 'vertical',
    			align : 'right',
    			verticalAlign : 'middle',
    			borderWidth : 0
    		},
    		series : [{
    			name : 'rank',
    			data : getContestsRank()
    		}]
    	});

    	$('#user_info_submission .container').highcharts({
    		title : {
    			text : 'Submissions',
    			align : 'left'
    		},
    		xAxis : {
    			title : {
    				text : null
    			},
    			categories : getSubmissionsDays()
    		},
    		yAxis : {
    			title : {
    				text : 'Number'
    			},
    			plotLines : [{
    				value : 0,
    				width : 1,
    				color : '#808080'
    			}]
    		},
    		legend : {
    			layout : 'vertical',
    			align : 'right',
    			verticalAlign : 'middle',
    			borderWidth : 0
    		},
    		series : [{
    			name : 'num',
    			data : getSubmissions()
    		}]
    	});
    });
    U.load = function() {
        //ajax code get notice!
    };
    U.method = {};
    U.getName = function() {return 'User - ' + this.method.userId;};
    U.initial = function(param) {
    	if(typeof(param.userId) === 'undefined')
    		param.userId = 3; // Anonymous
    	this.method.userId = param.userId;
    };
    return U;
})();
