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
    uikit: "https://cdnjs.cloudflare.com/ajax/libs/uikit/3.0.0-rc.23/css/uikit.min.css",
	clean:"https://cdn.jsdelivr.net/gh/PiethonCoder/clean.css/versions/clean@latest.css"
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

//library switches

//javascript

//jquery
$("#check_jquery").change(function () {
    if ($("#check_jquery").is(':checked'))
        import_("jquery", "js")
    else
        remove_("jquery", "js")

})

//vue
$("#check_vue").change(function () {
    if ($("#check_vue").is(':checked'))
        import_("vue", "js")
    else
        remove_("vue", "js")

})

//angular
$("#check_angular").change(function () {
    if ($("#check_angular").is(':checked'))
        import_("angular", "js")
    else
        remove_("angular", "js")

})

//react
$("#check_react").change(function () {
    if ($("#check_react").is(':checked'))
        import_("react", "js")
    else
        remove_("react", "js")

})

//backbone
$("#check_backbone").change(function () {
    if ($("#check_backbone").is(':checked'))
        import_("backbone", "js")
    else
        remove_("backbone", "js")

})

//css

//w3
$("#check_w3").change(function () {
    if ($("#check_w3").is(':checked'))
        import_("w3", "css")
    else
        remove_("w3", "css")
})

//bootstrap
$("#check_bootstrap").change(function () {
    if ($("#check_bootstrap").is(':checked'))
        import_("bootstrap", "css")
    else
        remove_("bootstrap", "css")
})

//pure
$("#check_pure").change(function () {
    if ($("#check_pure").is(':checked'))
        import_("pure", "css")
    else
        remove_("pure", "css")
})

//skeleton
$("#check_skeleton").change(function () {
    if ($("#check_skeleton").is(':checked'))
        import_("skeleton", "css")
    else
        remove_("skeleton", "css")
})

//uikit
$("#check_uikit").change(function () {
    if ($("#check_uikit").is(':checked'))
        import_("uikit", "css")
    else
        remove_("uikit", "css")
})

//clean
$("#check_clean").change(function () {
    if ($("#check_clean").is(':checked'))
        import_("clean", "css")
    else
        remove_("clean", "css")
})
