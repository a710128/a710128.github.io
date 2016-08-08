(function() {
    var S = new Page();
    S.addSubpage('info', 'tags', 'view/submission/info.html', function(){
    	$('#id').text(current_page.submissionId.toString());
        $('#status').text('Correct');
        $('#problem').text('A + B Problem')
        $('#author').text('a710128');
        $('#memory').text('1000KB');
        $('#time').text('1000ms');
        $('#length').text('233B');
        $('#score').text('100');
        $('#date').text('2016-08-01 00:02:03');
    });

    S.addSubpage('result', 'check', 'view/submission/result.html');

    S.addSubpage('code', 'file', 'view/submission/code.html', function(){
        var code = "#include <iostream>\nusing namespace std;\nint main() {\n\tint a, b;\n\tcin >> a >> b;\n\tcout << a + b << endl;\n\treturn 0;\n}";
        $('.code_viewer').html(current_page.codeHightlight(code, 'cpp', 'a710128'));
    });

    S.load = function() {
        //ajax code get notice!
    };
    S.method = {
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
        }
    };
    S.getName = function() {return 'Submission - ' + this.method.submissionId.toString();};
    S.initial = function(param){
    	this.method.submissionId = param.submissionId;
    };
    return S;
})();
