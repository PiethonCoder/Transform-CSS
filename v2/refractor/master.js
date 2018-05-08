// force insert of class because the browser doesint do it for some reason 

var myTextarea = document.getElementById("htmlTab");

var myCodeMirror = CodeMirror.fromTextArea(myTextarea,{theme:"elegant",mode:'text/html'});
	
var reader = new FileReader();
var xmlhttp = new XMLHttpRequest();

var wrapper = new Vue({
  el: "#container",
  data: {
  
  },
  methods: {
    // paint: function(id) {
      // hljs.highlightBlock(document.getElementById(id));
    // },

    // load: function(tab,data,fileType,tabBtn) {
      // openTab(event,tab,tabBtn);
      // var _this = this;
      // reader.onload = function(e) {
        // _this.data = reader.result;
        // console.log(reader.result);
		// update(tab,_.escape(_this.data));
		// hljs.highlightBlock(document.getElementById(tab));
      // }
  
      // reader.readAsText(document.getElementById(fileType).files[0]);
   
    // },
	activate:function(event,tab,textArea){
		
		
		if(event.shiftKey) {
			function x(tab){
				
				var textAreas = document.getElementsByClassName('codeArea');
				document.getElementById('commands').className = "slimMenu";
		
				for(i=0; i < textAreas.length; i++){
					if (document.querySelectorAll('.on').length == 3){
						textAreas[i].className = textAreas[i].className.replace(" spanFour"," spanTwo");
						textAreas[i].className = textAreas[i].className.replace(" spanThree"," spanTwo");

					}
					else if(document.querySelectorAll('.on').length == 2){
						textAreas[i].className = textAreas[i].className.replace(" spanFour"," spanThree");

					}
				}	
			}
			openMultiTab(event,textArea);
			x(tab);
			
			
		}
		else{
			openTab(event,textArea);
		}
		
		
	},
	tab:function(box){
		document.getElementById(box).innerHTML = document.getElementById(box).innerHTML + "    ";
	}
	
	
  },
  computed: {

  }
})

function update(elementID,code) {
  document.getElementById(elementID).innerHTML = code;
}

function openMultiTab(evt,name){
	document.getElementById(name).style.display = "block";
	evt.currentTarget.className = evt.currentTarget.className.replace(" off", " on");
}

function openTab(evt, name) {

  document.getElementById('commands').className = "normalMenu";

  var tabcontent = document.getElementsByClassName("tabcontent");
  
  for (var i = 0; i < tabcontent.length; i++) {
	tabcontent[i].className = tabcontent[i].className.replace(" spanTwo"," spanFour");
	tabcontent[i].className = tabcontent[i].className.replace(" spanThree"," spanFour");
    tabcontent[i].style.display = "none";
  }
  var tablinks = document.getElementsByClassName("languageTab");
  
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" on", " off");
  }
  
  document.getElementById(name).style.display = "block";
  
  evt.currentTarget.className = evt.currentTarget.className.replace(" off", " on");
  
}


