var reader = new FileReader();
var xmlhttp = new XMLHttpRequest();

var wrapper = new Vue({
  el: "#container",
  data: {
    htmlCode: "",
    cssCode: "<p>Hello World</p>",
    htmlLink: "",
    cssLink: ""
  },
  methods: {
    paint: function(id) {
      hljs.highlightBlock(document.getElementById(id));
    },

    load: function(tab,data,fileType) {
      openTab(event,tab);
      var _this = this;
      reader.onload = function(e) {
        _this.data = reader.result;
        console.log(reader.result);
		update(tab,_.escape(_this.data));
		hljs.highlightBlock(document.getElementById(tab));
      }
  
      reader.readAsText(document.getElementById(fileType).files[0]);
   
    }
	
  },
  computed: {
    code: function() {
      // return "<p>Hello World</p>"
      return this.cssCode + this.htmlCode;
    }
  }
})

function update(elementID,code) {
  document.getElementById(elementID).innerHTML = code;
}

function openTab(evt, Name) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" on", " off");
  }
  document.getElementById(Name).style.display = "block";
  evt.currentTarget.className = evt.currentTarget.className.replace(" off", " on");
}
