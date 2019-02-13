// file handling 

var reader = new FileReader();


var allFiles = {}
var imageURI = {}

function printMaps(){
	
	save()
	var id = 0;
	var maps = [];
	for(var file in allFiles){
		if(file != "" && !(file in imageURI)){
			maps.push(`<div id="${id}-map" class="map" onclick="display('${file}')">${escapeHtml(allFiles[file])}</div>`)
		}
	}
	
	$("#extra").html(maps.join(" "))
	changeStyle(localStorage["currentStyle"] || "default")
	
}

function removeFile(file) {
	
	var fileAlt = file.replaceAll(".", "_")

    delete allFiles[file];
    $(`#${fileAlt}`).parent().remove()
	
	//if the file is the current open file 
	if(file == $("#htmlName").attr("name")){
		$("#htmlName").attr("name","")
		$("#htmlName").val("")
		$("#HTMLeditor").val("")
	}
	else if(file == $("#cssName").attr("name")){
		$("#cssName").attr("name","")
		$("#cssName").val("")
		$("#CSSeditor").val("")
	}
	else if(file == $("#jsName").attr("name")){
		$("#jsName").attr("name","")
		$("#jsName").val("")
		$("#JSeditor").val("")
	}	
	else if(file == $("#textName").attr("name")){
		$("#textName").attr("name","")
		$("#textName").val("")
		$("#previewText").val("")
	}
	
    displayFiles()
}

var blank_file_count = 0
function addFile() {
    let fileName = escapeName($("#newFile").val())
    if (fileName == "") {
        fileName = blank_file_count + "-file.txt"
        blank_file_count++
    }
    if (!fileName.includes(".")) {
        fileName += ".txt"
    }

    allFiles[fileName] = ""
    displayFiles()
	printMaps()
}

function displayFiles() {

    //cache new files
    var slim = {}
    for (var file in allFiles) {
        //dont cache images
        let fileType = file.split(".")[file.split(".").length - 1]
        if (!(images.includes(fileType))) {
            slim[file] = allFiles[file]
        }
    }


    try {
        localStorage["files"] = JSON.stringify(slim)
    } catch (err) {
        console.log("your file sizes are too large, some files may no be cached.")
    }

    //sorting by file type
    var sorted = Object.keys(allFiles).sort(function (a, b) {
        return a.split(".")[1] == b.split(".")[1] ? 0 : a.split(".")[1] < b.split(".")[1] ? -1 : 1;
    })
	
	//remove random blank file 
	delete sorted[sorted.indexOf("")]

    //remove add button. so it gets readded to the bottom 
    $("#addButton").remove()

    //add new files
    try {
        for (var file in sorted) {
            file = sorted[file]

            //file icon
            var icons = window.FileIcons;
            var icon = icons.getClassWithColor(file);

            var altFile = file.replaceAll(".", "_")

            //if file already exists, replace it 
            if ($(`#${altFile}`).length) {
                $(`#${altFile}`).parent().remove()
                $("#main_folder").append(`<div class="fileBox"><div class='file' id='${altFile}' onclick="display('${file}')"><i class="${icon}"></i>${file}</div><div class="remove" onclick="removeFile('${file}')"><img src="https://image.flaticon.com/icons/svg/149/149700.svg"></div></div>`)
            } else {
                $("#main_folder").append(`<div class="fileBox"><div class='file' id='${altFile}' onclick="display('${file}')"><i class="${icon}"></i>${file}</div><div class="remove" onclick="removeFile('${file}')"><img src="https://image.flaticon.com/icons/svg/149/149700.svg"></div></div>`)
            }
        }
    } catch (err) {
        alert("your file name contains invalid symbols" + "\n" + file)
		console.log(err)
        delete allFiles[file]
    }

    //insert add button 
    $("#main_folder").append(`<div class="fileBox" id="addButton"><input autocorrect="false" spellcheck="false" placeholder="file.txt" id="newFile" type="text" ><div onclick="addFile()" class="add"><img src="https://image.flaticon.com/icons/svg/149/149699.svg"></div></div>`)

    //examine old files (for name change)

    var fileNames = $(".file").map(function () {
        return this.id.replace("_", ".")
    })
    for (var file = 0; file < fileNames.length - 1; file++) {
        if (!(fileNames[file] in allFiles)) {
            $(`#${fileNames[file].replace(".","_")}`).parent().remove()
        }
    }

    changeStyle(localStorage["currentStyle"] || "default")
}

function save() {
    let hname = $("#htmlName").val() 
    let cname = $("#cssName").val() 
    let jname = $("#jsName").val() 

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
    var filetype = filename.split(".")[filename.split(".").length - 1]
    var filename_ = filename.split(".")[0]

    save()

    if (filetype == undefined) {
        $("#previewText").val(allFiles[filename])
        $("#text-outer").toggleClass("visible")
        miscFile = filename
    } else {
        switch (filetype.toLowerCase()) {
            case "html":
                $("#HTMLeditor").val(allFiles[filename]);
                $("#htmlName").val(filename)
                $("#htmlName").attr("name", filename)

                $("#scriptOpen").hide()
                $("#styleOpen").hide()
                $("#defaultOpen").show()
				$("#textOpen").hide()

                $("#javascriptTab").removeClass("flex")
                $("#htmlTab").addClass("flex")
                $("#cssTab").removeClass("flex")
				$("#textTab").removeClass("flex")

                miscFile = ""
                break
            case "css":
                $("#CSSeditor").val(allFiles[filename]);
                $("#cssName").val(filename)
                $("#cssName").attr("name", filename)

                $("#scriptOpen").hide()
                $("#styleOpen").show()
                $("#defaultOpen").hide()
				$("#textOpen").hide()

                $("#javascriptTab").removeClass("flex")
                $("#htmlTab").removeClass("flex")
                $("#cssTab").addClass("flex")
				$("#textTab").removeClass("flex")

                miscFile = ""
                break
            case "js":
                $("#JSeditor").val(allFiles[filename]);
                $("#jsName").val(filename)
                $("#jsName").attr("name", filename)

                $("#scriptOpen").show()
                $("#styleOpen").hide()
                $("#defaultOpen").hide()
				$("#textOpen").hide()

                $("#javascriptTab").addClass("flex")
                $("#htmlTab").removeClass("flex")
                $("#cssTab").removeClass("flex")
				$("#textTab").removeClass("flex")

                miscFile = ""
                break
            case "png":
            case "jpeg":
            case "svg":
            case "gif":
            case "ico":
            case "jpg":
                $("#imageName").val(filename)
                $("#imageName").attr("name", filename)
                $("#previewImage").attr("src", imageURI[filename])
				
                if ( $('#popup3').css('visibility') == 'hidden' ){
					$('#popup3').css('visibility','visible');
				} else
					$('#popup3').css('visibility','hidden');
				
                miscFile = ""
                break
            default:
                $("#textName").val(filename)
                $("#textName").attr("name", filename)
                $("#previewText").val(allFiles[filename])
				
				$("#scriptOpen").hide()
                $("#styleOpen").hide()
                $("#defaultOpen").hide()
				$("#textOpen").show()
				
				$("#javascriptTab").removeClass("flex")
                $("#htmlTab").removeClass("flex")
                $("#cssTab").removeClass("flex")
				$("#textTab").addClass("flex")
                
                
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

function escapeName(n) {
    //camelCase all words excepts first word
    let name = n.split("_").join(" ").split(" ").slice(1).map(function (x) {
        return x.capitalize()
    })
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
                    let name = fileName.split(".")[fileName.split(".").length - 1]

                    reader.onload = function (event) {
                        $("#HTMLeditor").val(event.target.result)
                        $("#htmlName").val(name)
                        $("#htmlName").attr("name", name)
                        allFiles[name] = event.target.result
                        displayFiles()
                    }
                    reader.readAsText(file)
                } else if (file.name.endsWith(".css")) {
                    let name = fileName.split(".")[0]

                    reader.onload = function (event) {
                        $("#CSSeditor").val(event.target.result)
                        $("#cssName").val(name)
                        $("#cssName").attr("name", name )
                        allFiles[name ] = event.target.result
                        displayFiles()
                    }
                    reader.readAsText(file)
                } else if (file.name.endsWith(".js")) {
                    let name = fileName.split(".")[0]

                    reader.onload = function (event) {
                        $("#JSeditor").val(event.target.result)
                        $("#jsName").val(name)
                        $("#jsName").attr("name", name )
                        allFiles[name ] = event.target.result
                        displayFiles()
                    }
                    reader.readAsText(file)
                } else if (images.indexOf(file.name.split(".")[file.name.split(".").length - 1]) > -1) {
                    let name = fileName
                    let tempFile = file
                    reader.onload = function (event) {
                        var reader = new FileReader();

                        allFiles[name] = event.target.result
                        displayFiles()

                        reader.onload = function (event) {
                            imageURI[name] = event.target.result

                        }
                        reader.readAsDataURL(tempFile)

                    }
                    reader.readAsBinaryString(file)


                } else {
                    let name = fileName
                    reader.onload = function (event) {
                        allFiles[name] = event.target.result
                        displayFiles()
                    }
                    reader.readAsText(file)

                }


            }
            //folder reading 
            else if (entry.isDirectory) {



            }

        }
    }

}
