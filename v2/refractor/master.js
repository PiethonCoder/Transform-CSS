var reader = new FileReader();
var xmlhttp = new XMLHttpRequest();

var wrapper = new Vue({
  el: "#container",
  data: {
  
  },
  methods: {
    paint: function(id) {
      hljs.highlightBlock(document.getElementById(id));
    },

    load: function(tab,data,fileType,tabBtn) {
      openTab(event,tab,tabBtn);
      var _this = this;
      reader.onload = function(e) {
        _this.data = reader.result;
        console.log(reader.result);
		update(tab,_.escape(_this.data));
		hljs.highlightBlock(document.getElementById(tab));
      }
  
      reader.readAsText(document.getElementById(fileType).files[0]);
   
    },
	convert:function(){

	}
	
  },
  computed: {

  }
})

function update(elementID,code) {
  document.getElementById(elementID).innerHTML = code;
}

function openTab(evt, name, btn) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("languageTab");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" on", " off");
  }
  document.getElementById(name).style.display = "block";
  
  if(btn){
	  document.getElementById(btn).className = document.getElementById(btn).className.replace(" off", " on");
  }else{
  evt.currentTarget.className = evt.currentTarget.className.replace(" off", " on");
  }
}


