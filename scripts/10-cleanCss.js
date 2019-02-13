function cleanCss(css) {

    if ($("#abcSort").is(":checked")) {

        //seperate into lists 
        var blank_list = []
        var id_list = []
        var class_list = []
        var code_list = []
        var media_list = []
        var keyframes = []

        //if css has media queries 
        if (css.split("@media").length >= 2) {
            var newCss = css.split("@media")

            for (var style in newCss) {
                style = newCss[style]

                var i = (style.indexOf("}}") != -1) ? style.indexOf("}}") : style.indexOf("} }")
                var media = style.slice(0, i)
                var other = style.slice(i + 3)

                if (i != -1) {
                    if (media != "") {
                        media_list.push("@media" + media + "} }")
                    }
                    if (other != "") {
                        code_list.push(other)
                    }
                } else {
                    code_list.push(style)
                }


            }

            var temp_media = []
            var temp_code = []

            for (var x in media_list) {
                if (media_list[x] != "") {
                    temp_media.push(media_list[x])
                }
            }

            media_list = temp_media

            for (var i in code_list) {
                if (code_list[i] != "") {
                    temp_code.push(code_list[i])
                }
            }

            code_list = temp_code

        }

        //if there arnt any media queries, leave css as default parameter value 
        css = (code_list.length != 0) ? code_list.join("") : css

        //parse styles 
        var rules = css.split("}").map(function (x) {
            return x = x.trim() + "}"
        })
        rules = rules.slice(0, rules.length - 1)


        //loop thorugh all css styles 
        for (rule in rules) {

            //find comments 
            if (rules[rule].startsWith("/*")) {
                let start = rules[rule].indexOf("*/")
                var temp = rules[rule].slice(start + 2).trim()

                if (temp.startsWith(".")) {
                    class_list.push(rules[rule])
                } else if (temp.startsWith("#")) {
                    id_list.push(rules[rule])
                } else {
                    blank_list.push(rules[rule])
                }
            }
            //no comments
            else {
                if (rules[rule].startsWith(".")) {
                    class_list.push(rules[rule])
                } else if (rules[rule].startsWith("#")) {
                    id_list.push(rules[rule])
                } else {
                    blank_list.push(rules[rule])
                }
            }

        }

        //sort lists
        blank_list.sort()

        id_list.sort(function (a, b) {

            //if a or b has a comment 
            if (a.startsWith("/*")) {
                a = a.slice(a.indexOf("*/") + 2).trim()
            }
            if (b.startsWith("/*")) {
                b = b.slice(b.indexOf("*/") + 2).trim()
            }

            if (a.slice(1) < b.slice(1)) {
                return -1;
            }
            if (a.slice(1) > b.slice(1)) {
                return 1;
            }
            return 0;
        })

        class_list.sort(function (a, b) {

            //if a or b has a comment 
            if (a.startsWith("/*")) {
                a = a.slice(a.indexOf("*/") + 2).trim()
            }
            if (b.startsWith("/*")) {
                b = b.slice(b.indexOf("*/") + 2).trim()
            }

            if (a.slice(1) < b.slice(1)) {
                return -1;
            }
            if (a.slice(1) > b.slice(1)) {
                return 1;
            }
            return 0;
        })

        //join and return 
        return blank_list.concat(id_list, class_list, media_list).join(" ")
    }else{
        return css;
    }

}