//on page load 
$(function () {
    //if there is prior code that was made, import it 
    if (localStorage.getItem("page_source") != "" && localStorage.getItem("page_source") != null) {
        var html = JSON.parse(localStorage["page_source"]) || ""
        $("#HTMLeditor").val(html.code)
        $("#htmlName").val(html.name)
        $("#htmlName").attr("name", html.name)
    }
    if (localStorage.getItem("script_source") != "" && localStorage.getItem("script_source") != null) {
        var js = JSON.parse(localStorage["script_source"]) || ""
        $("#JSeditor").val(js.code)
        $("#jsName").val(js.name)
        $("#jsName").attr("name", js.name)

    }
    if (localStorage.getItem("style_source") != "" && localStorage.getItem("style_source") != null) {
        var css = JSON.parse(localStorage["style_source"]) || ""
        $("#CSSeditor").val(css.code)
        $("#cssName").val(css.name)
        $("#cssName").attr("name", css.name)

    }
    if (localStorage.getItem("files") != "" && localStorage.getItem("files") != null) {
        allFiles = JSON.parse(localStorage["files"])
        displayFiles()
    }


    //    deafult html
    allFiles[$("#htmlName").val()] = $("#HTMLeditor").val()

    displayFiles()

    //default live preview mode 
    $("#popup").click()

})

//scroll the line count with the editors 
$(function () {

    $('#HTMLeditor').scroll(function () {
        $('#htmlLines').scrollTop($(this).scrollTop())
    })

    $('#CSSeditor').scroll(function () {
        $('#cssLines').scrollTop($(this).scrollTop())
    })

    $('#JSeditor').scroll(function () {
        $('#jsLines').scrollTop($(this).scrollTop())
    })
	
	$("#previewText").scroll(function () {
        $('#textLines').scrollTop($(this).scrollTop())
    })

})
