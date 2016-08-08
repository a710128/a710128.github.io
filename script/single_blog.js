(function() {
    var B = new Page();
    B.addSubpage('content', 'file', 'view/single_blog/content.html', function(){
        var avatars = $('#author')
        if(!avatars.hasClass('binded')) {
            avatars.addClass('binded');
            avatars.click(function(){
                moveToNewPage('user', {
                    userId : 1
                });
            });
        }
    });
    B.addSubpage('comment', 'comment', 'view/single_blog/comment.html');
    B.load = function() {
        //ajax code get notice!
    };
    B.method = {};
    B.getName = function() {return 'Blog - ' + this.method.blogId;};
    B.initial = function(param){
    	this.method.blogId = param.blogId;
    };
    return B;
})();
