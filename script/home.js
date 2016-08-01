(function() {
    var Home = new Page();
    Home.addSubpage('index', 'bullhorn', 'view/home/notice.html');
    Home.load = function() {
        //ajax code get notice!
    };
    Home.method = {};
    Home.getName = function() {return 'Home';};
    Home.initial = function(){};
    return Home;
})();
