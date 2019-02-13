// name change

//when html tab name changes
$("#htmlName").keyup(function () {
    if ($("#htmlName").val() != $("#htmlName").attr("name")) {
        //camelCase name 
        var name = escapeName($("#htmlName").val())
        //name correction
        $("#htmlName").val(name)
        // add a new record to allFiles
        allFiles[name] = $("#HTMLeditor").val()
        // delete the old name
        delete allFiles[$("#htmlName").attr("name")]
        // change the reference in the name prop
        $("#htmlName").attr("name", name)
        // refresh files
        displayFiles()
    } else {
        console.log("no change")
    }
})

//when css tab name changes
$("#cssName").keyup(function () {
    if ($("#cssName").val() != $("#cssName").attr("name")) {
        //camelCase name 
        var name = escapeName($("#cssName").val())
        //name correction
        $("#cssName").val(name)
        // add a new record to allFiles
        allFiles[name] = $("#CSSeditor").val()
        // delete the old name
        delete allFiles[$("#cssName").attr("name")]
        // change the reference in the name prop
        $("#cssName").attr("name", name)
        // refresh files
        displayFiles()
    } else {
        console.log("no change")
    }
})

//when js tab name changes
$("#jsName").keyup(function () {
    if ($("#jsName").val() != $("#jsName").attr("name")) {
        //camelCase name 
        var name = escapeName($("#jsName").val())
        //name correction
        $("#jsName").val(name)
        // add a new record to allFiles
        allFiles[name] = $("#JSeditor").val()
        // delete the old name
        delete allFiles[$("#jsName").attr("name")]
        // change the reference in the name prop
        $("#jsName").attr("name", name)
        // refresh files
        displayFiles()
    } else {
        console.log("no change")
    }
})

$("#imageName").keyup(function () {
    if ($("#imageName").val() != $("#imageName").attr("name")) {
        //camelCase name 
        var name = escapeName($("#imageName").val())
        //name correction
        $("#imageName").val(name)
        // add a new record to allFiles
        allFiles[name] = $("#imageName").val()
        // delete the old name
        delete allFiles[$("#imageName").attr("name")]
        // change the reference in the name prop
        $("#imageName").attr("name", name)
        // refresh files
        displayFiles()
    } else {
        console.log("no change")
    }
})

$("#textName").keyup(function () {
    if ($("#textName").val() != $("#textName").attr("name")) {
        //camelCase name 
        var name = escapeName($("#textName").val())
        //name correction
        $("#textName").val(name)
        // add a new record to allFiles
        allFiles[name] = $("#textName").val()
        // delete the old name
        delete allFiles[$("#textName").attr("name")]
        // change the reference in the name prop
        $("#textName").attr("name", name)
        // refresh files
        displayFiles()
    } else {
        console.log("no change")
    }
})