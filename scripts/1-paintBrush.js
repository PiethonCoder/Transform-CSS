//generate random colors 
function randomPalette() {

    var luminosity = $("#luminosity").val()
    var hue = $("#hue").val()
	
//	var maxHeight = parseInt($("#CSSeditor").css("height")) * .955 * .60
	var maxItems = 21;
	
    var colors = randomColor({
        count: maxItems,
        "luminosity": luminosity,
        "hue": hue,
        format: 'rgb'
    })

    var colorIndex = 1

    $("#paintColors").html("")
    for (var color in colors) {
        color = colors[color]
        $("#paintColors").append(`<div><div onclick="copy_('${colorIndex}','${color}')" class="paint" style="background:${color}"></div><input id="color${colorIndex}" class="colorName" value="${color}" readonly="readonly"></div>`)
        colorIndex++;
    }
}

//copy color on click 
function copy_(id, color) {
    id = "color" + id
    var c = $(`#${id}`).select()
    document.execCommand("copy");
    $("#saved").css("color", color)
    $("#saved").html("copied!")

}
//call random color function
randomPalette()