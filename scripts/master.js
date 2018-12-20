
//emmet start
emmet.require('textarea').setup({
    pretty_break: true, // enable formatted line breaks (when inserting
    // between opening and closing tag)
    use_tab: true, // expand abbreviations by Tab key
    syntax: "html"
});

//emmet end



//on page load 
$(function() {
    //if there is prior code that was made, import it 
    if (localStorage["page_source"]) {
		var html = JSON.parse(localStorage["page_source"])
        $("#HTMLeditor").val(html.code)
		$("#htmlName").val(escapeName(html.name))
    }
    if (localStorage["script_source"]) {
        var js = JSON.parse(localStorage["script_source"])
        $("#JSeditor").val(js.code)
		$("#jsName").val(escapeName(js.name))

    }
    if (localStorage["style_source"]) {
        var css = JSON.parse(localStorage["style_source"])
        $("#CSSeditor").val(css.code)
		$("#cssName").val(escapeName(css.name))
    }
	if(localStorage["files"]){
 
		allFiles = JSON.parse(localStorage["files"])
		displayFiles()
	}

    //open html tab
    $("#defaultOpen").click();
	
	// open style
	$("#theme_ribbon").click();
	
	//add default files 
	
	allFiles[escapeName($("#htmlName").val()) + ".html"] = $("#HTMLeditor").val()
	$("#htmlName").attr("name",$("#htmlName").val() + ".html")
	
	allFiles[escapeName($("#cssName").val()) + ".css"] = $("#CSSeditor").val()
	$("#cssName").attr("name",$("#cssName").val() + ".css")
	
	allFiles[escapeName($("#jsName").val()) + ".js"] = $("#JSeditor").val()
	$("#jsName").attr("name",$("#jsName").val() + ".js")
	
	displayFiles()
	
})


var reader = new FileReader();
var xmlhttp = new XMLHttpRequest();

var wrapper = new Vue({
    el: "#container",
    data: {

    },
    methods: {

        //    shift click tab feature  
        activate: function(event, tab, textArea) {


            if (event.shiftKey) {
                function x(tab) {

                    var textAreas = document.getElementsByClassName('codeArea');
                    $("#commands").css("display", "none");
                    $("#files").css("display", "none");
                    $("#filler").css("display", "none");

                    for (i = 0; i < textAreas.length; i++) {
                        if (document.querySelectorAll('.on').length == 3) {
                            textAreas[i].className = textAreas[i].className.replace(" spanFour", " spanTwo");
                            textAreas[i].className = textAreas[i].className.replace(" spanThree", " spanTwo");
                            //full screen
                            textAreas[i].className = textAreas[i].className.replace(" spanSix", " spanTwo");

                        } else if (document.querySelectorAll('.on').length == 2) {
                            textAreas[i].className = textAreas[i].className.replace(" spanFour", " spanThree");
                            //full screen
                            textAreas[i].className = textAreas[i].className.replace(" spanSix", " spanThree");

                        }
                    }
                }
                openMultiTab(event, textArea);
                x(tab);


            } else {
                openTab(event, textArea);
            }


        },
        tab: function(box) {
            document.getElementById(box).innerHTML = document.getElementById(box).innerHTML + "    ";
        }


    },
    computed: {

    }
})

function update(elementID, code) {
    document.getElementById(elementID).innerHTML = code;
}

function openMultiTab(evt, name) {
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className = evt.currentTarget.className.replace(" off", " on");

}

//changing active langugae 
function openTab(evt, name) {

    //show globes
    $("#globeBox").css("display", "flex");



    document.getElementById('commands').className = "normalMenu customBar";

    var tabcontent = document.getElementsByClassName("tabcontent");

    //if in fullscreen mode     
    if (toggleMode) {
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].className = tabcontent[i].className.replace(" spanTwo", " spanSix");
            tabcontent[i].className = tabcontent[i].className.replace(" spanThree", " spanSix");
            tabcontent[i].style.display = "none";
        }
    } else if (!toggleMode) {
        //pull the 3 textarea's, make the width full, since only one is selected, then hide all
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].className = tabcontent[i].className.replace(" spanTwo", " spanFour");
            tabcontent[i].className = tabcontent[i].className.replace(" spanThree", " spanFour");
            tabcontent[i].style.display = "none";
        }

        $("#commands").css("display", "flex");
        $("#files").css("display", "flex");
        $("#filler").css("display", "flex");
    }


    //pull the tab objects
    var tablinks = document.getElementsByClassName("languageTab");
    //turn them all off
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" on", " off");
    }
    //show the active code area
    document.getElementById(name).style.display = "block";

    //change the current tabs style
    evt.currentTarget.className = evt.currentTarget.className.replace(" off", " on");

}



var myWindow
var live = false
var toggleMode = 0

//built in libraries 
var jquery = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>'

function fullToggle() {
	//fullscreen
    if (!toggleMode) {
        $("#commands").css("display", "none");
        $("#files").css("display", "none");
        $("#filler").css("display", "none");

        var tabcontent = document.getElementsByClassName("tabcontent");
        //pull the 3 textarea's, make the width full, since only one is selected, then hide all
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].className = tabcontent[i].className.replace(" spanFour", " spanSix");
        }

        $("#section2").css("height", "40px")
		$(".code").css("height", parseInt($(".code").css("height")) + 100)
        toggleMode = 1
    } 
	//normal 
	else if (toggleMode) {

        var tabcontent = document.getElementsByClassName("tabcontent");
        //pull the 3 textarea's, make the width full, since only one is selected, then hide all
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].className = tabcontent[i].className.replace(" spanSix", " spanFour");
        }

        $("#section2").css("height", "120px")
        $(".code").css("height", parseInt($(".code").css("height")) - 100)
        toggleMode = 0
		
		//if only one file open 
		if($(".on").length == 1){
			$("#commands").css("display", "flex");
			$("#files").css("display", "flex");
			$("#filler").css("display", "flex");
		}
    }

}

//download 
function download() {
	
	save()
	
    var html = $("#htmlName").val()
    var css = $("#cssName").val()
    var js = $("#jsName").val()
	
	if(!(html+".html" in allFiles)){
		allFiles[html+".html"] = $("#HTMLeditor").val()
	}
	else if(!(css+".css" in allFiles)){
		allFiles[css+".css"] = $("#CSSeditor").val()
	}
	else if(!(js+".js" in allFiles)){
		allFiles[js+".js"] = $("#JSeditor").val()
	}

    var zip = new JSZip();
	var main_folder = $("#main_folder > input").val()
    var site = zip.folder(main_folder);

	for(var file in allFiles){
		//if the file is a image
		if(images.includes(file.split(".")[1])){
			site.file(file,allFiles[file],{binary: true})
		}else{
			site.file(file,allFiles[file])
		}
		
	}
    zip.generateAsync({
            type: "blob"
        })
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "code.zip");
        });


}

//live code view function
function liveCode() {

    live = true;

    var html = $("#HTMLeditor").val();
    var css = $("#CSSeditor").val();
    var js = $("#JSeditor").val();

    try {
        myWindow.close();
    } catch (e) {

    }

    myWindow = window.open("", "_blank", "", true);

    var doc = `${jquery}\n <style> ${css} </style> \n ${html} \n <script> ${js} </script>`

    myWindow.document.write(doc);

    //when the page closes
    myWindow.onunload = function() {
        live = false;
    }

    return doc;
}

function liveUpdate() {

    while (myWindow.document.firstChild) {
        myWindow.document.removeChild(myWindow.document.firstChild);

    }

    var html = $("#HTMLeditor").val();
    var css = $("#CSSeditor").val();
    var js = $("#JSeditor").val();

    var doc = `${jquery}\n <style> ${css} </style> \n ${html} \n <script> ${js} </script>`

    myWindow.document.write(doc)
}

//prep inline css call 
function prepLine() {
    var html = $("#HTMLeditor").val();
    var css = $("#CSSeditor").val();
    css = "<style>" + css + "</style>"

    var doc = css + html;

    return doc;
}


var minify = require('html-minifier').minify;

//minify options 
var options = {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    decodeEntities: true,
    html5: true,
    minifyCSS: true,
    minifyJS: true,
    removeComments: false,
    removeEmptyElements: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
}

//find what text is selected
function getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
        (activeElTagName == "textarea") || (activeElTagName == "input" &&
            /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
        (typeof activeEl.selectionStart == "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    return text;
}

//change cursor position
$.fn.selectRange = function(start, end) {
    if (end === undefined) {
        end = start;
    }
    return this.each(function() {
        if ('selectionStart' in this) {
            this.selectionStart = start;
            this.selectionEnd = end;
        } else if (this.setSelectionRange) {
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};

function quickEdit() {
    var selection = getSelectionText()
    var class_ = selection.includes("class=")
    var id_ = selection.includes("id=")
    var jump;

    //change elm value based on how much is selected 
    elm = (selection.match(/"(.+)"/g)) ? selection.match(/"(.+)"/g)[0].slice(1, selection.match(/"(.+)"/g)[0].length - 1) : selection

    var css = $("#CSSeditor").val();

    if (class_) {
        jump = css.indexOf("." + elm)
    } else if (id_) {
        jump = css.indexOf("#" + elm)
    } else {
        jump = css.indexOf(elm)
    }

    $("#CSSeditor").blur();
    $("#styleOpen").click();
    $("#CSSeditor").focus();
    $("#CSSeditor").selectRange(jump)


}



//caching
function cache() {
	//console.log({code:$("#HTMLeditor").val(),name:$("#htmlName").val()})
    localStorage['page_source'] = JSON.stringify({code:$("#HTMLeditor").val(),name:$("#htmlName").val()})
    localStorage['script_source'] = JSON.stringify({code:$("#JSeditor").val(),name:$("#jsName").val()})
    localStorage['style_source'] = JSON.stringify({code:$("#CSSeditor").val(),name:$("#cssName").val()})
}


//insert text at cursor
function insertAtCaret(areaId, text) {
    var txtarea = areaId;
    if (!txtarea) {
        return;
    }

    var scrollPos = txtarea.scrollTop;
    var strPos = 0;
    var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
        "ff" : (document.selection ? "ie" : false));
    if (br == "ie") {
        txtarea.focus();
        var range = document.selection.createRange();
        range.moveStart('character', -txtarea.value.length);
        strPos = range.text.length;
    } else if (br == "ff") {
        strPos = txtarea.selectionStart;
    }

    var front = (txtarea.value).substring(0, strPos);
    var back = (txtarea.value).substring(strPos, txtarea.value.length);
    txtarea.value = front + text + back;
    strPos = strPos + text.length;
    if (br == "ie") {
        txtarea.focus();
        var ieRange = document.selection.createRange();
        ieRange.moveStart('character', -txtarea.value.length);
        ieRange.moveStart('character', strPos);
        ieRange.moveEnd('character', 0);
        ieRange.select();
    } else if (br == "ff") {
        txtarea.selectionStart = strPos;
        txtarea.selectionEnd = strPos;
        txtarea.focus();
    }

    txtarea.scrollTop = scrollPos;
}

function history() {
    keyCount = 0

    codeHistory["html"] = $("#HTMLeditor").val();
    codeHistory["css"] = $("#CSSeditor").val();
    // codeHistory["js"] = $("#JSeditor").val();
}

function getHistory() {
    $("#HTMLeditor").val(codeHistory["html"])
    $("#CSSeditor").val(codeHistory["css"])
    // $("#JSeditor").val(codeHistory["js"])  
}

var codeHistory = {}

var priorCopy = ""
var copy = ""
var keyCount = 0

//keyboard shortcuts 
$(function() {
    //keypress event 
    $("body").keydown(function(event) {
        //console.log(event.which)

        //save a copy every 60 keys
        keyCount += 1

        if (keyCount >= 60) {
            history();
        }

        //cache the code when it is modified
        cache();

        //live code update 
        //        if (live) {
        //            liveUpdate()
        // 		}
		
		//clear cache ctrl f5
		if(event.ctrlKey && event.which == 116){
			localStorage["files"] = ""
			localStorage["page_source"] = ""
			localStorage["script_source"] = ""
			localStorage["style_source"] = ""
		}

        //code history
        if (event.ctrlKey && event.shiftKey && event.which == 72) {
            getHistory();
        }

        //download 
        if (event.ctrlKey && event.shiftKey && event.which == 83) {
            download()
        }
        //quick edit
        if (event.ctrlKey && event.which == 81) {
            quickEdit()
        }
        //copy
        if (event.ctrlKey && event.which == 67) {
            priorCopy = copy
            copy = getSelectionText()
        }
        //paste prior copy
        if (event.ctrlKey && event.altKey && event.which == 86) {
            insertAtCaret(document.activeElement, priorCopy)
        }
        //live preview
        if (event.ctrlKey && event.which == 76) {
            liveCode();
        }
        //full screen toggle
        if (event.ctrlKey && event.shiftKey && event.which == 70) {
            fullToggle();
        }
        //inline css
        if (event.ctrlKey && event.which == 73) {
            $("#HTMLeditor").val(doInline(prepLine()))
        }
        //beautify
        if (event.ctrlKey && event.which == 66) {
            //html
            $("#HTMLeditor").val(html_beautify($("#HTMLeditor").val()))
            //css
            $("#CSSeditor").val(css_beautify($("#CSSeditor").val()))
            //js
            $("#JSeditor").val(js_beautify($("#JSeditor").val()))
        }
        //html minify
        if (event.ctrlKey && event.which == 77) {
            //mini html
            $("#HTMLeditor").val(minify($("#HTMLeditor").val(), options))
            //mini css
            $("#CSSeditor").val(minify($("#CSSeditor").val(), options))
            //mini js 
            $("#JSeditor").val(minify($("#JSeditor").val(), options))


        }
        //mega encrypter  
        if (event.altKey && event.shiftKey && event.ctrlKey && event.which == 69) {
            //decode html
            $("#HTMLeditor").val(Encrypt($("#HTMLeditor").val(), true))
            //decode css
            $("#CSSeditor").val(Encrypt($("#CSSeditor").val(), true))
            //decode js
            $("#JSeditor").val(Encrypt($("#JSeditor").val(), true))
        }
        //decrypter 
        else if (event.shiftKey && event.ctrlKey && event.which == 69) {
            //decode html
            $("#HTMLeditor").val(Decrypt($("#HTMLeditor").val()))
            //decode css
            $("#CSSeditor").val(Decrypt($("#CSSeditor").val()))
            //decode js
            $("#JSeditor").val(Decrypt($("#JSeditor").val()))
        }
        //encrypter
        else if (event.ctrlKey && event.which == 69) {
            //encode html
            $("#HTMLeditor").val(Encrypt($("#HTMLeditor").val(), false))
            //encode css
            $("#CSSeditor").val(Encrypt($("#CSSeditor").val(), false))
            //encode js
            $("#JSeditor").val(Encrypt($("#JSeditor").val(), false))
        }

    })

})

//string capitalize
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//insert function 
function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}

//checkboxes

var librarys = {
    jquery: "https://code.jquery.com/jquery-3.3.1.min.js",
    vue: "https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js",
    angular: "http://ajax.googleapis.com/ajax/libs/angularjs/1.0.7/angular.min.js",
    react: "https://unpkg.com/react@16/umd/react.development.js",
    backbone: "https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min.js",
    bootstrap: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
    w3: "https://www.w3schools.com/w3css/4/w3.css",
    pure: "https://unpkg.com/purecss@1.0.0/build/pure-min.css",
    skeleton: "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css",
    uikit: "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.23/css/uikit.min.css"
}

function import_(library, type) {

    if (type == "js") {
        var link = '<script src="' + librarys[library] + '"></script>'
    } else if (type == "css") {
        var link = '<link rel="stylesheet" type="text/css" href="' + librarys[library] + '">'
    }

    var index = $("#HTMLeditor").val().search("<head>") + 6
    //if theres a <head>
    if (index > 6) {
        $("#HTMLeditor").val(insert($("#HTMLeditor").val(), index, link))

    } else {
        $("#HTMLeditor").val(link + $("#HTMLeditor").val())
    }
    //make dom look nice 
    $("#HTMLeditor").val(html_beautify($("#HTMLeditor").val()))



}

function remove_(library, type) {
    if (type == "js") {
        var link = '<script src="' + librarys[library] + '"></script>'
    } else if (type == "css") {
        var link = '<link rel="stylesheet" type="text/css" href="' + librarys[library] + '">'
    }

    $("#HTMLeditor").val($("#HTMLeditor").val().replace(link + "\n", ""))
}


//icon hover effect 

$("#icon").hover(function() {
    $("#icon_ball").css("fill", "orange");
    $("#icon_tail").css("fill", "#ff5353");

}, function() {
    $("#icon_ball").css("fill", "black");
    $("#icon_tail").css("fill", "black");
})


//library switches

//javascript

//jquery
$("#check_jquery").change(function() {
    if ($("#check_jquery").is(':checked'))
        import_("jquery", "js")
    else
        remove_("jquery", "js")

})

//vue
$("#check_vue").change(function() {
    if ($("#check_vue").is(':checked'))
        import_("vue", "js")
    else
        remove_("vue", "js")

})

//angular
$("#check_angular").change(function() {
    if ($("#check_angular").is(':checked'))
        import_("angular", "js")
    else
        remove_("angular", "js")

})

//react
$("#check_react").change(function() {
    if ($("#check_react").is(':checked'))
        import_("react", "js")
    else
        remove_("react", "js")

})

//backbone
$("#check_backbone").change(function() {
    if ($("#check_backbone").is(':checked'))
        import_("backbone", "js")
    else
        remove_("backbone", "js")

})

//css

//w3
$("#check_w3").change(function() {
    if ($("#check_w3").is(':checked'))
        import_("w3", "css")
    else
        remove_("w3", "css")
})

//bootstrap
$("#check_bootstrap").change(function() {
    if ($("#check_bootstrap").is(':checked'))
        import_("bootstrap", "css")
    else
        remove_("bootstrap", "css")
})

//pure
$("#check_pure").change(function() {
    if ($("#check_pure").is(':checked'))
        import_("pure", "css")
    else
        remove_("pure", "css")
})

//skeleton
$("#check_skeleton").change(function() {
    if ($("#check_skeleton").is(':checked'))
        import_("skeleton", "css")
    else
        remove_("skeleton", "css")
})

//uikit
$("#check_uikit").change(function() {
    if ($("#check_uikit").is(':checked'))
        import_("uikit", "css")
    else
        remove_("uikit", "css")
})




//code styles

//flamingo

$("#theme_nightLight").click(function() {
    $("textarea").css("background", "#001d30");
    $(".commandItem").css("background", "#001d30")
    $("#files").css("background", "#001d30")
    $("textarea").css("color", "#ecc242");
	$(".file").css("color", "#ecc242");
    $("body").css("background-color", "#00304c")
})

$("#theme_dayNight").click(function() {
    $("textarea").css("background", "black");
    $(".commandItem").css("background", "black")
    $("#files").css("background", "black")
    $("textarea").css("color", "white");
	$(".file").css("color", "white");
    $("body").css("background-color", "#151718")

})

$("#theme_hacker").click(function() {
    $("textarea").css("background", "black");
    $(".commandItem").css("background", "black")
    $("#files").css("background", "black")
    $("textarea").css("color", "#4dff4a");
	$(".file").css("color", "#4dff4a");
    $("body").css("background-color", "black")
})

$("#theme_plum").click(function() {
    $("textarea").css("background", "#591952");
    $(".commandItem").css("background", "#591952")
    $("#files").css("background", "#591952")
    $("textarea").css("color", "#9f5596");
	$(".file").css("color", "#9f5596");
    $("body").css("background-color", "#4d1647")
})

$("#theme_velvet").click(function() {
    $("textarea").css("background", "#fff0db");
    $(".commandItem").css("background", "#fff0db")
    $("#files").css("background", "#fff0db")
    $("textarea").css("color", "#d4302b");
	$(".file").css("color", "#d4302b");
    $("body").css("background-color", "#ffe3bb")
})

$("#theme_mist").click(function() {
    $("textarea").css("background", "#242424");
    $(".commandItem").css("background", "#242424")
    $("#files").css("background", "#242424")
    $("textarea").css("color", "#10508c");
	$(".file").css("color", "#10508c");
    $("body").css("background-color", "#1e1e1e")
})

$("#theme_ribbon").click(function() {
    $("textarea").css("background", "#801336");
    $(".commandItem").css("background", "#801336")
    $("#files").css("background", "#801336")
    $("textarea").css("color", "#ee4540");
	$(".file").css("color", "#ee4540");
    $("body").css("background-color", "#510a32")
	
	$(".fileName").css("color","#ee4540")
	// $(".on").css("color","#ee4640")
	$("#filesHead").css("color","#ee4540")
	
})

$("#theme_grave").click(function() {
    $("textarea").css("background", "#1e1e1e");
    $(".commandItem").css("background", "#1e1e1e")
    $("#files").css("background", "#1e1e1e")
    $("textarea").css("color", "red");
	$(".file").css("color", "red");
    $("body").css("background-color", "black")
})

$("#theme_default").click(function() {
    $("textarea").css("background", "white");
    $(".commandItem").css("background", "#eaeaea")
    $("#files").css("background", "#eaeaea")
    $("textarea").css("color", "black");
	$(".file").css("color", "black");
    $("body").css("background-color", "white")
})




// file handling 


var allFiles = {}
var imageURI = {}

function removeFile(fileName){
	
	delete allFiles[fileName];
	$(`#${fileName.replace(".", "_")}`).parent().remove()
	displayFiles()
}

function addFile(){
	let fileName = escapeName($("#newFile").val())
	if(!fileName.includes(".")){
		fileName += ".txt"
	}
	allFiles[fileName] = ""
	displayFiles()
}

function displayFiles() {
	
	//cache new files
	var slim = {}
	for(var file in allFiles){
		//dont cache images
		let fileType = file.split(".")[file.split(".").length - 1]
		if(!(images.includes(fileType))){
			slim[file] = allFiles[file]
		}
	}
	
	try{
		localStorage["files"] = JSON.stringify(slim)
	}catch(err){
		console.log("your file sizes are too large, some files may no be cached.")
	}
	
	//sorting by file type
	var sorted = Object.keys(allFiles).sort(function(a,b){return a.split(".")[1] == b.split(".")[1] ? 0 : a.split(".")[1] < b.split(".")[1] ? -1 : 1; })
	
	//remove add button. so it gets readded to the bottom 
	$("#addButton").remove()

	//add new files
	try{
		for (var file in sorted) {
			file = sorted[file]
			
			//file icon
			var icons = window.FileIcons;
			var icon = icons.getClassWithColor(file);

			var altFile = file.replace(".", "_")

			//if file already exists, replace it 
			if ($(`#${altFile}`).length) {
				$(`#${altFile}`).parent().remove()
				$("#main_folder").append(`<div class="fileBox"><div class='file' id='${altFile}' onclick="display('${file}')"><i class="${icon}"></i>${file}</div><div class="remove" onclick="removeFile('${file}')"><img src="https://image.flaticon.com/icons/svg/149/149700.svg"></div></div>`)
			} else {
				$("#main_folder").append(`<div class="fileBox"><div class='file' id='${altFile}' onclick="display('${file}')"><i class="${icon}"></i>${file}</div><div class="remove" onclick="removeFile('${file}')"><img src="https://image.flaticon.com/icons/svg/149/149700.svg"></div></div>`)
			}
		}
	}catch(err){
		alert("your file name contains invalid symbols" + "\n" + file)
		delete allFiles[file]
	}
	
	//insert add button 
	$("#main_folder").append(`<div class="fileBox" id="addButton"><input id="newFile" type="text" ><div onclick="addFile()" class="add"><img src="https://image.flaticon.com/icons/svg/149/149699.svg"></div></div>`)
	
	//examine old files (for name change)
	
		var fileNames = $(".file").map(function(){return this.id.replace("_",".")})
		for(var file = 0;file < fileNames.length-1;file++){
			if(!(fileNames[file] in allFiles)){
				$(`#${fileNames[file].replace(".","_")}`).parent().remove()
			}
		}

	//.file onhover
	var c = ""
	$(".file").hover(function() {
		c = $(this).css("color") 
		$(this).css("color", "red")
	}, function() {
		$(this).css("color", c)
	})
}

function save() {
    let hname = $("#htmlName").val() + ".html"
    let cname = $("#cssName").val() + ".css"
    let jname = $("#jsName").val() + ".js"

    allFiles[hname] = $("#HTMLeditor").val()
    allFiles[cname] = $("#CSSeditor").val()
    allFiles[jname] = $("#JSeditor").val()

    if (miscFile != "") {
        allFiles[miscFile] = $("#previewText").val()
    }
	
	//displayFiles()

}

var miscFile = ""


function display(filename) {
    //alert(filename.toString())
    var filetype = filename.split(".")[1]
    var filename_ = filename.split(".")[0]

    save()

    if (filetype == undefined) {
        $("#previewText").val(allFiles[filename])
        $("#popup4").toggle(1000)
        miscFile = filename
    } else {
        switch (filetype.toLowerCase()) {
            case "html":
                $("#HTMLeditor").val(allFiles[filename]);
                $("#htmlName").val(filename_)
				$("#htmlName").attr("name",filename)
                $("#defaultOpen").click();
                miscFile = ""
                break
            case "css":
                $("#CSSeditor").val(allFiles[filename]);
                $("#cssName").val(filename_)
				$("#cssName").attr("name",filename)
                $("#styleOpen").click();
                miscFile = ""
                break
            case "js":
                $("#JSeditor").val(allFiles[filename]);
                $("#jsName").val(filename_)
				$("#jsName").attr("name",filename)
                $("#scriptOpen").click();
                miscFile = ""
                break
            case "png":
            case "jpeg":
            case "svg":
            case "gif":
            case "ico":
            case "jpg":
				$("#imageName").val(filename)
				$("#imageName").attr("name",filename)
                $("#previewImage").attr("src", imageURI[filename])
                $("#popup3").toggle(1000)
                miscFile = ""
                break
            default:
				$("#textName").val(filename)
				$("#textName").attr("name",filename)
                $("#previewText").val(allFiles[filename])
                $("#popup4").toggle(1000)
                miscFile = filename
                break


        }
    }
}

//file upload 
function dragOverHandler(ev) {

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

var images = ["jpg", "png", "svg", "jpeg", "gif", "ico"]

function escapeName(n){
	//camelCase all words excepts first word
	let name = n.split("_").join(" ").split(" ").slice(1).map(function(x){return x.capitalize()})
	//combind the first word with the rest
	name = n.split("_").join(" ").split(" ")[0].concat(name.join(""))
	
	return name 
}


function dropHandler(ev) {

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (var i = 0; i < ev.dataTransfer.items.length; i++) {

            var entry = ev.dataTransfer.items[i].webkitGetAsEntry();

            if (entry.isFile) {

                var reader = new FileReader();
                var file = ev.dataTransfer.items[i].getAsFile();
				
				
				//fix spaces & underscores in file names by making them camelCase  
				var fileName = escapeName(file.name)
					
				if (file.name.endsWith(".html")) {
					let name = fileName.split(".")[0]
				   
					reader.onload = function(event) {
						$("#HTMLeditor").val(event.target.result)
						$("#htmlName").val(name)
						$("#htmlName").attr("name",name+".html")
						allFiles[name + ".html"] = event.target.result
						displayFiles()
					}
					reader.readAsText(file)
				} else if (file.name.endsWith(".css")) {
					let name = fileName.split(".")[0]
				   
					reader.onload = function(event) {
						$("#CSSeditor").val(event.target.result)
						$("#cssName").val(name)
						$("#cssName").attr("name",name+".css")
						allFiles[name + ".css"] = event.target.result
						displayFiles()
					}
					reader.readAsText(file) 
				} else if (file.name.endsWith(".js")) {
					let name = fileName.split(".")[0]
				   
					reader.onload = function(event) {
						$("#JSeditor").val(event.target.result)
						$("#jsName").val(name)
						$("#jsName").attr("name",name+".js")
						allFiles[name + ".js"] = event.target.result
						displayFiles()
					}
					reader.readAsText(file)
				} else if (images.indexOf(file.name.split(".")[1]) > -1) {
					let name = fileName
					let tempFile = file 
					reader.onload = function(event) {
						var reader = new FileReader();
						
						allFiles[name] = event.target.result
						displayFiles() 
						
						reader.onload = function(event){
							imageURI[name] = event.target.result
							
						 }
						reader.readAsDataURL(tempFile)
						
					}
					reader.readAsBinaryString(file)
					
					
				} else {
					let name = fileName
					reader.onload = function(event) {
						allFiles[name] = event.target.result
						displayFiles()
					}
					reader.readAsText(file)

				}
			

            } 
			//folder reading 
			else if(entry.isDirectory){
				
				
				// let directoryReader = entry.createReader();
				// directoryReader.readEntries(function(entries) {
					// entries.forEach(function(entry) {
					  // alert("file")
				  // });
				// });
				
				// console.log("folder")
				
                // var dirReader = entry.createReader();
			
                // var entries = [];

                // // function getEntries() {
                    // // dirReader.readEntries(function(results) {
						// // alert(1)
                        // // if (results.length > 0) {
							
                            // // //entries = entries.concat(toArray(results));
                            // // getEntries();
                        // // }else{"done"}
                    // // })
                // // };

                // // getEntries();
				
				// dirReader.readEntries(function(results) {
					// alert(1)
					// if (results.length > 0) {
						
						// //entries = entries.concat(toArray(results));
						// getEntries();
					// }else{"done"}
				// })
				
				
				// function traverse_directory(entry) {
					// let reader = entry.createReader();
					// // Resolved when the entire directory is traversed
					// return new Promise((resolve_directory) => {
						// var iteration_attempts = [];
						// (function read_entries() {
							// // According to the FileSystem API spec, readEntries() must be called until
							// // it calls the callback with an empty array.  Seriously??
							// reader.readEntries((entries) => {
								// if (!entries.length) {
									// // Done iterating this particular directory
									// resolve_directory(Promise.all(iteration_attempts));
								// } else {
									// // Add a list of promises for each directory entry.  If the entry is itself 
									// // a directory, then that promise won't resolve until it is fully traversed.
									// iteration_attempts.push(Promise.all(entries.map((entry) => {
										// if (entry.isFile) {
											// // DO SOMETHING WITH FILES
											// return entry;
										// } else {
											// // DO SOMETHING WITH DIRECTORIES
											// return traverse_directory(entry);
										// }
									// })));
									// // Try calling readEntries() again for the same dir, according to spec
									// read_entries();
								// }
							// }, (error)=>{console.log(error.code)} );
						// })();
					// });
				// }

				// traverse_directory(entry).then(()=> {
					// // AT THIS POINT THE DIRECTORY SHOULD BE FULLY TRAVERSED.
				// });
                

            }

        }
    } 
	 else {
		alert("here")
        // // Use DataTransfer interface to access the file(s)
        // for (var i = 0; i < ev.dataTransfer.files.length; i++) {
            // if (ev.dataTransfer.items[i].kind === 'file') {

                // var reader = new FileReader();
                // var file = ev.dataTransfer.items[i].getAsFile();
				// file.name = file.name.replace(" ","-")

                // if (file.name.endsWith(".html")) {
                  
                    // reader.onload = function(event) {
                        // $("#HTMLeditor").val(event.target.result)
                        // $("#htmlName").val(file.name)
                        // allFiles[name + ".html"] = event.target.result
                        // displayFiles()
                    // }
                    // reader.readAsText(file)
                // } else if (file.name.endsWith(".css")) {
                    
                    // reader.onload = function(event) {
                        // $("#CSSeditor").val(event.target.result)
                        // $("#cssName").val(file.name)
                        // allFiles[name + ".css"] = event.target.result
                        // displayFiles()
                    // }
                    // reader.readAsText(file)
                // } else if (file.name.endsWith(".js")) {
                
                    // reader.onload = function(event) {
                        // $("#JSeditor").val(event.target.result)
                        // $("#jsName").val(file.name)
                        // allFiles[name + ".js"] = event.target.result
                        // displayFiles()
                    // }
                    // reader.readAsText(file)
                // } else if (images.indexOf(file.name.split(".")[1]) > -1) {
                    // reader.onload = function(event) {
                        // allFiles[file.name] = event.target.result
                       
                        // displayFiles()
                    // }
                    // reader.readAsDataURL(file)
                // } else {
                    // let name = file.name
                    // reader.onload = function(event) {
                        // allFiles[name] = event.target.result
                        // displayFiles()
                    // }
                    // reader.readAsText(file)

                // }

            // }

        // }
    }

}

// name change

//when html tab name changes
$("#htmlName").keyup(function(){
	if($("#htmlName").val()+".html" != $("#htmlName").attr("name")){
		//camelCase name 
		var name = escapeName($("#htmlName").val())
		//name correction
		$("#htmlName").val(name)
		// add a new record to allFiles
		allFiles[name +".html"] = $("#HTMLeditor").val()
		// delete the old name
		delete allFiles[$("#htmlName").attr("name")]
		// change the reference in the name prop
		$("#htmlName").attr("name",name+".html")
		// refresh files
		displayFiles()
	}else{
		console.log("no change")
	}
}) 

//when css tab name changes
$("#cssName").keyup(function(){
	if($("#cssName").val()+".css" != $("#cssName").attr("name")){
		//camelCase name 
		var name = escapeName($("#cssName").val())
		//name correction
		$("#cssName").val(name)
		// add a new record to allFiles
		allFiles[name+".css"] = $("#CSSeditor").val()
		// delete the old name
		delete allFiles[$("#cssName").attr("name")]
		// change the reference in the name prop
		$("#cssName").attr("name",name+".css")
		// refresh files
		displayFiles()
	}else{
		console.log("no change")
	}
}) 

//when js tab name changes
$("#jsName").keyup(function(){
	if($("#jsName").val()+".js" != $("#jsName").attr("name")){
		//camelCase name 
		var name = escapeName($("#jsName").val())
		//name correction
		$("#jsName").val(name)
		// add a new record to allFiles
		allFiles[name+".js"] = $("#JSeditor").val()
		// delete the old name
		delete allFiles[$("#jsName").attr("name")]
		// change the reference in the name prop
		$("#jsName").attr("name",name+".js")
		// refresh files
		displayFiles()
	}else{
		console.log("no change")
	}
}) 

$("#imageName").keyup(function(){
	if($("#imageName").val() != $("#imageName").attr("name")){
		//camelCase name 
		var name = escapeName($("#imageName").val())
		//name correction
		$("#imageName").val(name)
		// add a new record to allFiles
		allFiles[name] = $("#imageName").val()
		// delete the old name
		delete allFiles[$("#imageName").attr("name")]
		// change the reference in the name prop
		$("#imageName").attr("name",name)
		// refresh files
		displayFiles()
	}else{
		console.log("no change")
	}
})

$("#textName").keyup(function(){
	if($("#textName").val() != $("#textName").attr("name")){
		//camelCase name 
		var name = escapeName($("#textName").val())
		//name correction
		$("#textName").val(name)
		// add a new record to allFiles
		allFiles[name] = $("#textName").val()
		// delete the old name
		delete allFiles[$("#textName").attr("name")]
		// change the reference in the name prop
		$("#textName").attr("name",name)
		// refresh files
		displayFiles()
	}else{
		console.log("no change")
	}
})