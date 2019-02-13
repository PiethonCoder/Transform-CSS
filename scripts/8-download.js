//download 
function download() {

    save()

    var html = $("#htmlName").val()
    var css = $("#cssName").val()
    var js = $("#jsName").val()

    if (!(html in allFiles)) {
        allFiles[html] = $("#HTMLeditor").val()
    } else if (!(css in allFiles)) {
        allFiles[css] = $("#CSSeditor").val()
    } else if (!(js in allFiles)) {
        allFiles[js] = $("#JSeditor").val()
    }

    var zip = new JSZip();
    var main_folder = $("#main_folder > input").val()
    var site = zip.folder(main_folder);

    for (var file in allFiles) {
        //if the file is a image
        if (images.includes(file.split(".")[1])) {
            site.file(file, allFiles[file], {
                binary: true
            })
        } else {
            site.file(file, allFiles[file])
        }

    }
    zip.generateAsync({
            type: "blob"
        })
        .then(function (content) {
            // see FileSaver.js
            saveAs(content, "code.zip");
        });


}