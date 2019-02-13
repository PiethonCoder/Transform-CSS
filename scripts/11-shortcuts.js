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


var codeHistory = {}

var priorCopy = ""
var copy = ""
var keyCount = 0

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

//caching
function cache() {
    //console.log({code:$("#HTMLeditor").val(),name:$("#htmlName").val()})
    localStorage['page_source'] = JSON.stringify({
        code: $("#HTMLeditor").val(),
        name: $("#htmlName").val()
    })
    localStorage['script_source'] = JSON.stringify({
        code: $("#JSeditor").val(),
        name: $("#jsName").val()
    })
    localStorage['style_source'] = JSON.stringify({
        code: $("#CSSeditor").val(),
        name: $("#cssName").val()
    })
}

function beautify() {
    //html
    $("#HTMLeditor").val(html_beautify($("#HTMLeditor").val()))
    //css
    $("#CSSeditor").val(css_beautify(cleanCss(minify($("#CSSeditor").val(), options))))
    //js
    $("#JSeditor").val(js_beautify($("#JSeditor").val()))
}

function miny() {
    //mini html
    $("#HTMLeditor").val(minify($("#HTMLeditor").val(), options))
    //mini css
    $("#CSSeditor").val(minify($("#CSSeditor").val(), options))
    //mini js 
    $("#JSeditor").val(minify($("#JSeditor").val(), options))
}

//keyboard shortcuts 
$(function () {

    $("#newFile").keydown(function (event) {
        // on enter
        if (event.which == 13) {
            addFile()
        }
    })


    //keypress event 
    $("body").keydown(function (event) {
        //console.log(event.which)

        //save a copy every 60 keys
        keyCount += 1

        if (keyCount >= 60) {
            history();
        }

        //cache the code when it is modified
        cache();

        //clear cache ctrl f5
        if (event.ctrlKey && event.which == 116) {
            localStorage["files"] = ""
            localStorage["page_source"] = ""
            localStorage["script_source"] = ""
            localStorage["style_source"] = ""
            localStorage["currentStyle"] = "default"
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
        //beautify
        if (event.ctrlKey && event.which == 66) {
            beautify()
        }
        //minify
        if (event.ctrlKey && event.which == 77) {
            miny()
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
