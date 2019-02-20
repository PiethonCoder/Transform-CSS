var cssBlock = ""

function findColor(indx) {
    var css = cssBlock[indx - 1]

    if (css == "" || css == undefined) {
        return ""
    }

    if (css.indexOf("color") != -1) {
        return css.split(":")[1]
    } else {
        return ""
    }
}

var old_css = 0;
var old_html = 0;
var old_js = 0;
var old_text = 0;

async function pasteLines() {
    //html line count 
    var lht = parseInt($('#HTMLeditor').css('lineHeight'), 10);
    var html_lines = Math.floor($('#HTMLeditor')[0].scrollHeight / lht)

	if(html_lines != old_html){
		//clear line numbers
		$("#htmlLines").html("")
		for (var i = 1; i <= html_lines + 25; i++) {
			$("#htmlLines").append(`<span class="line">${i}</span>`)
		}
		
		old_html = html_lines
		
	}
	
    //css line count 
    lht = parseInt($('#CSSeditor').css('lineHeight'), 10);
    var css_lines = Math.floor($('#CSSeditor')[0].scrollHeight / lht)

    //all css rules, for pigment display 
    cssBlock = $("#CSSeditor").val().split("\n").map(function (x) {
        return x.trim()
    })

	
	//clear line numbers
	$("#cssLines").html("")
	for (var i = 1; i <= css_lines + 25; i++) {
		var c = findColor(i)
		$("#cssLines").append(`<span class="line" style="background:${c}">${i}</span>`)
	}
	
	old_css = css_lines;
	

    //js line count 
    lht = parseInt($('#JSeditor').css('lineHeight'), 10);
    var js_lines = Math.floor($('#JSeditor')[0].scrollHeight / lht)
	
	if(js_lines != old_js){
		//clear line numbers
		$("#jsLines").html("")
		for (var i = 1; i <= js_lines + 25; i++) {
			$("#jsLines").append(`<span class="line">${i}</span>`)
		}
	}
	
	//text line count 
    lht = parseInt($('#previewText').css('lineHeight'), 10);
    let text_lines = Math.floor($('#previewText')[0].scrollHeight / lht)
	
	if(text_lines != old_text){
		//clear line numbers
		$("#textLines").html("")
		for (var i = 1; i <= text_lines + 25; i++) {
			$("#textLines").append(`<span class="line">${i}</span>`)
		}
	}
}