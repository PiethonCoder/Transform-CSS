function formatHtml(html) {
    var findCss = new RegExp('<link .*href="(?!(http))(.+)".*>');
    var findJs = new RegExp('<script src="(?!(http))(.+)">\s*<\/script>');
    
    var css = html.match(findCss)
    var js = html.match(findJs)

    if (css) {
        while (html.match(findCss)) {
            css = html.match(findCss)
            html = html.replace(findCss, `<style>\n${allFiles[css[2]]}\n</style>`)
        }

    }
    if (js) {
        while (html.match(findJs)) {
            js = html.match(findJs)
            html = html.replace(findJs, `<script>\n${allFiles[js[2]]}\n</script>`)
        }

    }

    return html
}

var wrapper = new Vue({
    el: "#container",
    data: {
        code: ""
    },
    methods: {

        //    shift click tab feature  
        activate: function (event, tab, textArea) {


            if (event.shiftKey) {
                function x(tab) {

                    var textAreas = document.getElementsByClassName('codeArea');

                    for (i = 0; i < textAreas.length; i++) {
                        if (document.querySelectorAll('.on').length == 3) {
                            textAreas[i].className = textAreas[i].className.replace(" spanFour", " spanTwo");
                            textAreas[i].className = textAreas[i].className.replace(" spanThree", " spanTwo");
                            //full screen
                            textAreas[i].className = textAreas[i].className.replace(" spanSix", " spanTwo");

                        } else if (document.querySelectorAll('.on').length == 2) {
                            textAreas[i].className = textAreas[i].className.replace(" spanFour", " spanThree");
                            //full screen
                            textAreas[i].className = textAreas[i].className.replace(" spanSix", " spanThree");

                        }
                    }
                }
                x(tab);

            } 

        },
        tab: function (box) {
            document.getElementById(box).innerHTML = document.getElementById(box).innerHTML + "    ";
        },
        update: function () {

            //line number update 
            pasteLines()

            if (live) {
				
				save()
				
                //update code
                this.code = formatHtml($("#HTMLeditor").val())
                
                //parse head from html 
                var parser = new DOMParser();
                var doc = parser.parseFromString(this.code, "text/html");
                var head = (doc.getElementsByTagName("head").length >= 1) ? doc.getElementsByTagName("head")[0].innerHTML : ""  

				$('iframe').contents().find('head').html(head)
				$('iframe').contents().find('body').html(this.code)
                
            }

        }


    },
    computed: {

    }
})