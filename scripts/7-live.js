var myWindow
var live = false
var toggleMode = 0

//built in libraries 
var jquery = '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>'

function allCode() {

    let style = ""
    let script = ""

    for (var file in allFiles) {
        if (file.endsWith(".css")) {
            style += `\n <style>${allFiles[file]}</style>`
        } else if (file.endsWith(".js")) {
            script += `\n <script>${allFiles[file]}</script>`
        }
    }

    return {
        "styles": style,
        "scripts": script
    }

}


//live code view function
function liveCode() {

    var mode = $('input[name=radio1]:checked').attr("id");

    var importAll = $("#includeAll").is(':checked')

    if (mode == "window") {

        live = true;

        var html = $("#HTMLeditor").val();

        try {
            myWindow.close();
        } catch (e) {
            console.log("no window is open")
        }

        myWindow = window.open("", "_blank", "", true);

        //insert styles and scripts
        doc = formatHtml(html)

        myWindow.document.write(doc);

        //when the page closes
        myWindow.onunload = function () {
            live = false;
        }

        return doc;
    } else if (mode == "popup") {

        if (live) {
            live = false
        } else {
            live = true
        }

        wrapper.update()
        $("#iframe").toggle()
    }
}
