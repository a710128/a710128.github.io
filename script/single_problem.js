(function() {
    var P = new Page();
    P.addSubpage('description', 'file', 'view/single_problem/description.html');
    P.addSubpage('submit', 'open', 'view/single_problem/submit.html', function(){
        //$('.code_viewer').html(current_page.codeHightlight($('.code_viewer').text(), 'cpp', 'Anonymous'));
        $('.code_viewer').css({'display':'none'});
        if(typeof(current_page.file) !== 'undefined' && typeof(current_page.file_ext) !== 'undefined')
            current_page.showCode(current_page.file_ext, current_page.file);
        else $('#single_problem_bu').addClass('single_problem_bu_disable');
        $('#single_problem_bs').click(function(){
            $('#single_problem_file').click();
        });
    });

    P.addSubpage('comment', 'comment', 'view/single_problem/comment.html', function(){
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

    P.addSubpage('rank', 'sort-by-attributes', 'view/single_problem/rank.html', function(){
        var avatars = $('#single_problem_rank_table tr').slice(1);
        if(!avatars.hasClass('binded')) {
            avatars.addClass('binded');
            avatars.click(function(){
                moveToNewPage('user', {
                    userId : 1
                });
            });
        }

    });

    P.load = function() {
        //ajax code get notice!
    };
    P.method = {
        codeHightlight : function(text, lang, author) {

            var tabReplace = function(text) {
                var rows = text.split('\n');
                var ret = '';
                for(var i = 0; i < rows.length; ++ i) {
                    var col = 0;
                    for(var j = 0; j < rows[i].length; ++ j) {
                        if(rows[i][j] == '\t') {
                            do{
                                ret += ' ';
                                col += 1;
                            }
                            while(col % 4 != 0);
                        }
                        else {
                            ret += rows[i][j];
                            col += 1;
                        }
                    }
                    ret += '\n';
                }
                return ret;
            }

            if(typeof(hljs) !== 'undefined') {
                var code_len = text.length;
                var ret = hljs.highlightAuto(tabReplace(text), [lang]);
                var rows = ret.value.split('\n');

                ret = '<div class="panel panel-default"><div class="panel-heading">'
                    + '<span class="pull-left" id="lang">' + lang + '</span>'
                    + '<span class="pull-right" id="author">Author: ' + author + '</span>'
                    + '</div>'
                    + '<pre><table>'

                for(var i = 0; i < rows.length; ++ i) {
                    ret += '<tr class="code_viewer_row"><td class="code_viewer_rownum" line-number="' + (i + 1).toString()
                         + '"></td><td class="code_viewer_rowcontent">' + rows[i] + '</td></tr>';
                }
                ret += '</table></pre>';
                return ret;
            }
        },
        showCode : function(ext, file) {
            current_page.file = file;
            current_page.file_ext = ext;
            var code = '<div class="panel panel-default"><div class="panel-heading">'
                + '<span class="pull-left" id="lang">unknown</span>'
                + '<span class="pull-right" id="author">Author: Anonymous</span>'
                + '</div>'
                + '<pre><table>'
                + '<tr><td style="text-align:center;">Invalid File</td></tr>'
                + '</table></pre>';
            if(current_page.file !== null) {
                code = current_page.codeHightlight(current_page.file, ext, 'Anonymous');
                if($('#single_problem_bu').hasClass('single_problem_bu_disable'))
                    $('#single_problem_bu').removeClass('single_problem_bu_disable');
            }
            else {
                if(!$('#single_problem_bu').hasClass('single_problem_bu_disable'))
                    $('#single_problem_bu').addClass('single_problem_bu_disable');
            }

            if($('.code_viewer').css('display') !== 'none')
                $('.code_viewer').hide(500, function(){
                    $('.code_viewer').html(code);
                    $('.code_viewer').show(500);
                });
            else {
                $('.code_viewer').html(code);
                $('.code_viewer').show(500);
            }
        },

        loadFile : function(files) {
            if(files.length) {
                var file = files[0];
                var getExt = function(name) {
                    var st = name.lastIndexOf('.');
                    if(st < 0) return '';
                    return name.substring(st + 1, name.length).toLowerCase();
                };
                var ext = getExt(file.name);

                if((ext == 'c' || ext == 'cpp') && file.size < 200 * 1024) {
                    current_page.file = current_page.readFile(file, ext, current_page.showCode);
                }
                else {
                    if(ext == '') ext = 'unknown';
                    current_page.showCode(ext, null);
                }
                
            }
        },

        readFile : function(path, ext, callback) {
            var oFReader = new FileReader();
            oFReader.onload = function(oFREvent) {
                callback(ext, oFREvent.target.result);
            }
            oFReader.onerror = function() {
                callback(ext, null);
            }
            oFReader.readAsText(path);
        }
    };
    P.getName = function() {
        return 'Problem - ' + this.method.probId.toString();
    };
    P.initial = function(param){
        this.method.probId = param.probId;
        this.method.contestId = param.contestId;

        if(this.method.contestId !== 0) {
            this.getSubpage('comment').hidden = true;
            this.getSubpage('rank').hidden = true;
        }
        else {
            this.getSubpage('comment').hidden = false;
            this.getSubpage('rank').hidden = false;
        }
        if(typeof(this.method.file) !== 'undefined')
            delete this.method.file;
        if(typeof(this.method.file_ext) !== 'undefined')
            delete this.method.file_ext;
    };
    return P;
})();
