//code styles

var styles = {
    nightLight:{
        "textarea bg": "#001d30",
        commandItem:"#001d30",
        files:"#001d30",
        "textarea c":"#ecc242",
        file:"#ecc242",
        extra:"#00304c",
        lineCount:"#fcce02",
        remove:"#fcce02"
    },
    dayNight:{
        "textarea bg": "black",
        commandItem:"black",
        files:"black",
        "textarea c":"white",
        file:"white",
        extra:"#151718",
        lineCount:"#cc0a34",
        remove:"#cc0a34"
    },
    velvet:{
        "textarea bg": "#fff0db",
        commandItem:"#fff0db",
        files:"#fff0db",
        "textarea c":"#d4302b",
        file:"#d4302b",
        extra:"#ffe3bb",
        lineCount:"#ea726e",
        remove:"#ea726e"
    },
    mist:{
        "textarea bg": "#242424",
        commandItem:"#242424",
        files:"#242424",
        "textarea c":"#10508c",
        file:"#10508c",
        extra:"#1e1e1e",
        lineCount:"#043468",
        remove:"#043468"
    },
    grave:{
        "textarea bg": "#1e1e1e",
        commandItem:"#1e1e1e",
        files:"#1e1e1e",
        "textarea c":"red",
        file:"red",
        extra:"black",
        lineCount:"#292c2f",
        remove:"#292c2f"
    },
    default:{
        "textarea bg": "white",
        commandItem:"#eaeaea",
        files:"#eaeaea",
        "textarea c":"black",
        file:"black",
        extra:"white",
        lineCount:"steelblue",
        remove:"steelblue"
    }
    
}

function changeStyle(style){
    $("textarea").css("background", styles[style]["textarea bg"]);
	$("#imageName").css("background", styles[style]["textarea bg"])
	
    $(".commandItem").css("background-color", styles[style]["commandItem"])
    $("#files").css("background", styles[style]["files"])
    $("textarea").css("color", styles[style]["textarea c"]);
	$(".map").css("color", styles[style]["textarea c"]);
    $(".file").css("color", styles[style]["file"]);
    $("#extra").css("background-color", styles[style]["extra"])
    $(".lineCount").css("background-color", styles[style]["lineCount"])
    $("#fileName").css("background-color", styles[style]["lineCount"])
    $(".remove").css("color",styles[style]["remove"])
    
    $(".file").hover(function () {$(this).css("color", styles[style]["lineCount"]) }, function () { $(this).css("color", styles[style]["textarea c"]) })
    
    $("#newFile").css("color",styles[style]["textarea c"])
}


$("#theme_nightLight").click(function () {
    localStorage["currentStyle"] = "nightLight"
    changeStyle("nightLight")
})

$("#theme_dayNight").click(function () {
    localStorage["currentStyle"] = "dayNight"
    changeStyle("dayNight")
})

$("#theme_velvet").click(function () {
    localStorage["currentStyle"] = "velvet"
    changeStyle("velvet")
})

$("#theme_mist").click(function () {
    localStorage["currentStyle"] = "mist"
    changeStyle("mist")
})

$("#theme_grave").click(function () {
    localStorage["currentStyle"] = "grave"
    changeStyle("grave")
})

$("#theme_default").click(function () {
    localStorage["currentStyle"] = "default"
    changeStyle("default")
})