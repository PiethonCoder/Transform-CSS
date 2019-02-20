
$(".code").keypress(function(){
	if(minimap){
		printMaps() // in 14-fileHandle
	}
})

$("#map_view").click(function(){
	$(".map").toggle();
	if(minimap){
		minimap = false;
	}else{
		minimap = true;
	}
})