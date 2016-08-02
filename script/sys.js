
$(document).ready(function(){
    
    var main = function(pageList){
        
        var nowPath = [];
        
        var showSubpage = function(page, newSubpage) {
            var tops = $('#main_land .land_top .land_button');
            
            //remove the last two button
            tops = tops.slice(0, tops.length - 2);
            
            if (page.subpages.length !== tops.length) {
                console.error(page.subpages.length.toString() + ' != ' + tops.length.toString());
                console.error('Unknown error. Please contact us.');
                return;
            }
            
            if (page.nowSubpage < tops.length && tops.eq(page.nowSubpage).hasClass('land_button_active')) {
                tops.eq(page.nowSubpage).removeClass('land_button_active');
            }
            
            if (newSubpage < tops.length) {
                tops.eq(newSubpage).addClass('land_button_active');
                $('#main_land .land_content').html(page.subpages[newSubpage].content);
                page.nowSubpage = newSubpage;
                
                page.subpages[newSubpage].initial();
                
                //update Path
                showPath();
                
                //bind path event 'click'
                topPathBind();
            }
            else {
                console.error('newSubpage is too big (' + newSubpage + ').');
                return;
            }
        }
        
        var landButtonBind = function() {
            var tops = $('#main_land .land_top .land_button');
            var page = nowPath[nowPath.length - 1];
            for(var it = 0; it < tops.length - 2; ++ it) {
                (function(i){
                    tops.eq(i).bind("click",function(){
                        if(tops.eq(i).hasClass('land_button_active') === false)
                            showSubpage(page, i);
                    });
                })(it);
            }
            tops.eq(tops.length - 2).bind("click",function(){
                if(nowPath.length > 1) {
                    nowPath.pop();
                    var lastPage = nowPath[nowPath.length - 1];
                    showPage(lastPage);
                }
            });
            
            tops.eq(tops.length - 1).bind("click",function(){
                var lastPage = nowPath[nowPath.length - 1];
                lastPage.load();
            });
        }
        
        var topPathBind = function() {
            var tops = $('#top_path ol li a');
            for(var it = 0; it < tops.length; ++ it) {
                (function(i){
                    $('#top_path ol li a :eq(' + i.toString() + ')').bind("click",function(){
                        nowPath = nowPath.slice(0, i + 1);
                        var lastPage = nowPath[nowPath.length - 1];
                        showPage(lastPage);
                    });
                })(it);
            }
        }
        
        var showPath = function() {
            var topPathHtml = '';
            for (var i = 0; i < nowPath.length; ++ i) {
                topPathHtml += '<li><a href="#">' + nowPath[i].getName() + '</a></li>';
            }
            var lastPage = nowPath[nowPath.length - 1];
            topPathHtml += '<li class="active">' + lastPage.subpages[lastPage.nowSubpage].name + '</li>';
            $('#top_path .top_mid ol').html(topPathHtml);
        }
        
        var showPage = function(page) {
            
            var landTopHtml = '';
            for(var i = 0; i < page.subpages.length; ++ i) {
                landTopHtml += '<div class="land_button"><span class="glyphicon glyphicon-' + page.subpages[i].icon + '" aria-hidden="true"></span></div>';
            }
            landTopHtml += '<div class="land_button pull-right"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></div>';
            landTopHtml += '<div class="land_button pull-right"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></div>';
            $('#main_land .land_top').html(landTopHtml);
            
            //bind button event 'click'
            landButtonBind();
            
            //init method
            window.current_page = page.method;
            
            //show subpage
            showSubpage(page, page.nowSubpage);
            
            //Auto Refresh
            if(page.autorefresh.delay > 0) {
                (function(page) {
                    var sk = setInterval(function(){
                        if(nowPath.length > 0 && nowPath[nowPath.length - 1] == page) {
                            page.autorefresh.call();
                        }
                        else {
                            clearInterval(sk);
                        }
                    }, page.autorefresh.delay);
                })(page);
            }
            
            //load content (Ajax)
            page.load();
            
            
        };
        
        window.moveToNewPage = function(page, param) {
            var page = pageList[page];
            nowPath = [page];
            
            page.nowSubpage = 0;
            
            page.initial(param);
            
            showPage(page);

            $(window).scrollTop(0);
            
        };

        window.moveToNextPage = function(page, param) {
            var page = pageList[page];
            nowPath.push(page);

            page.nowSubpage = 0;

            page.initial(param);

            showPage(page);

            $(window).scrollTop(0);
        }
        console.log(pageList);
        for(var key in pageList) {
            if($('#nav_' + key).length) {
                (function(key){
                    $('#nav_' + key).click(function(){
                        moveToNewPage(key, {});
                    })
                })(key);
                
            }
        }

        moveToNewPage('home');
    };
    
    var sourceNum, sourceOK;
    var updateCallback = function (status, msg){
        if (status === true) {
            sourceOK += 1;
            $('#load_progress_img').css({'width' : (sourceOK / sourceNum * 100).toString() + '%'});
            $('#load_progress_text').text(sourceOK.toString() + ' / ' + sourceNum.toString());
        }
        else {
            if($('#load_failed').hasClass('hidden')) {
                $('#load_failed').removeClass('hidden');
                $('#load_failed #load_failed_msg').text(msg);
                $('#load_progress_img').removeClass('progress-bar-info');
                $('#load_progress_img').addClass('progress-bar-danger');
            }
        }
    };
    
    (function(next) {
        $('#top_nav').addClass('hidden');
        $('#top_path').addClass('hidden');
        $('#main_land').addClass('hidden');
        
        var idCounter = 0;
        
        var Page = function() {
            this.id = idCounter;
            idCounter += 1;
            
            this.subpages = [];
            this.addSubpage = function (name, icon, html, initialFunc) {
                if (typeof(arguments[3]) == 'undefined')
                    initialFunc = function(){};
                this.subpages.push({
                    'name' : name, 
                    'icon' : icon, 
                    'html' : html, 
                    'content' : '', 
                    'initial': initialFunc
                });
            };
            
            this.nowSubpage = 0;
            
            this.getSourceNum = function() {
                return this.subpages.length;
            };
            
            this.getSource = function(callback) {
                if (this.getSourceNum() === 0) {
                    console.error('Page id : ' + this.id.toString() + 'has no subpage!');
                    return;
                }
                for (var i = 0; i < this.subpages.length; ++ i) {
                    (function(item){
                        
                            $.ajax({
                                type : 'GET',
                                url : item.html,
                                success : function(data, status) {
                                    if(status === 'success') {
                                        item.content = data;
                                        callback(true);
                                    }
                                    else {
                                        console.error('Can\'t get : ' + item.html + ' ( Status :' + status + ')');
                                        callback(false, 'Failed to load the resource file!');
                                    }
                                },
                                dataType : 'text',
                                error : function(){
                                    console.error('Can\'t get : ' + item.html + ' ( Status :' + status + ')');
                                    callback(false, 'Failed to load the resource file!');
                                }
                            });
                        
                    })(this.subpages[i]);
                }
            };
            
            this.load = function() {};
            
            this.initial = function() {};
            
            this.method = {};
            
            this.getName = function() {
                return '';
            };
            
            this.autorefresh = {
                delay : -1,
                call : function(){}
            };
        }
        
        // Config
        
        sourceNum = 0;
        sourceOK = 0;
        var modelList = {
            'home' : 'script/home.js',
            'problem' : 'script/problem.js',
            'single_problem' : 'script/single_problem.js'
        };
        var pageList = {};
        
        for(var key in modelList) sourceNum += 1;
        $('#load_title').text('Loading models ...');
        $('#load_progress_img').css({'width' : '0%'});
        $('#load_progress_text').text(sourceOK.toString() + ' / ' + sourceNum.toString());
        
        (function(callback){
            for(var key in modelList) {
                (function(key){

                    $.ajax({
                        type: 'GET',
                        url : modelList[key],
                        success: function(data, status) {
                            if(status === 'success') {
                                pageList[key] = eval(data);
                                callback(true);
                            }
                            else {
                                console.error('Can\'t get : ' + modelList[key] + ' ( Status :' + status + ')');
                                callback(false, 'Failed to load the model file!');
                            }
                        }, 
                        dataType: 'text',
                        error: function(){
                            console.error('Can\'t get : ' + modelList[key] + ' ( Status :' + status + ')');
                            callback(false, 'Failed to load the model file!');
                        }
                    });

                })(key);
            }
        })(updateCallback);
        
        var loadInterval = setInterval(function(){
            if(sourceOK === sourceNum) {
                clearInterval(loadInterval);
                next(main, pageList);
            }
        }, 100);
    })(function(next, pageList){
        // Load
        sourceNum = 0;
        sourceOK = 0;
        for (var key in pageList) {
            var page = pageList[key];
            sourceNum += page.getSourceNum();
        }
        
        $('#load_title').text('Loading resources ...');
        $('#load_progress_img').css({'width' : '0%'});
        $('#load_progress_text').text(sourceOK.toString() + ' / ' + sourceNum.toString());
        
        
        for (var key in pageList) {
            var page = pageList[key];
            page.getSource(updateCallback);
        }
        
        var loadInterval = setInterval(function(){
            if(sourceOK === sourceNum) {
                clearInterval(loadInterval);
                
                // continue
                $('#top_nav').removeClass('hidden');
                $('#top_path').removeClass('hidden');
                $('#main_land').removeClass('hidden');
                $('#load_pad').addClass('hidden');
                next(pageList);
            }
        }, 100);
        
    })
    
});