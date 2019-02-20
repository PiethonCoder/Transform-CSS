function toggleV(id){
	if($(`#${id}`).css("visibility") == "visible"){
		$(`#${id}`).css("visibility","hidden")
	}else{
		$(`#${id}`).css("visibility","visible")
	}
	
	
}

var css_tools = ["paintPalette","paletteGenerator"]
var tool_index = 0;
var gp1,gp2,gp3,gp4;



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
    $(".saved").css("color", color)
    $(".saved").html("copied!")

}
//call random color function
randomPalette()

function generatePalette(){
	var colors = randomColor({
		count: 4,
		format: 'rgb'
	})
	var color_count = 1;
	for(var color in colors){
		$(`#palette${(color_count)}`).css("background-color",colors[color]);
		color_count++;
	}
	$("#paletteBar").css("background",`linear-gradient(90deg,${colors[0]},${colors[1]},${colors[2]},${colors[3]})`)
	
	//clear old values 
	$("#color_vars").val("")
	
	//append new values 
	$("#color_vars").val($("#color_vars").val() + `--color1:${colors[0]};` + "\n")
	$("#color-p1").val(colors[0])
	gp1 = colors[0]
	$("#color_vars").val($("#color_vars").val() + `--color2:${colors[1]};` + "\n")
	$("#color-p2").val(colors[1])
	gp2 = colors[1]
	$("#color_vars").val($("#color_vars").val() + `--color3:${colors[2]};` + "\n")
	$("#color-p3").val(colors[2])
	gp3 = colors[2]
	$("#color_vars").val($("#color_vars").val() + `--color4:${colors[3]};` + "\n")
	$("#color-p4").val(colors[3])
	gp4 = colors[3]
}




$(function(){
	
	generatePalette();

	
	$("#paletteGenerate").click(function(){
		generatePalette()
	})
	
	$("#css_right").click(function(){

		tool_index++
		
		if(tool_index >= css_tools.length){
			tool_index = 0
		}
		
		for(var i in css_tools){
			i = css_tools[i]
			$(`#${i}`).css("visibility","hidden");
		}
		
		toggleV(css_tools[tool_index])
	
	})

	$("#css_left").click(function(){
		
		tool_index--
		
		if(tool_index < 0){
			tool_index = css_tools.length - 1;
		}
		
		for(var i in css_tools){
			i = css_tools[i]
			$(`#${i}`).css("visibility","hidden");
		}
		
		toggleV(css_tools[tool_index])
		
	})
	
	//paint brush icon
    $("#paintIcon").click(function () {
        $("#tools").slideToggle();
    })

    //show line count 
    pasteLines()
})