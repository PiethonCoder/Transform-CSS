var reader = new FileReader();
var xmlhttp = new XMLHttpRequest();

var wrapper = new Vue({
  el: "#container",
  data: {
    htmlCode: "<p>Hello World</p>",
    cssCode: "<p>Hello World</p>",
    htmlLink: "",
    cssLink: ""
  },
  methods: {
    updateHTML: function() {
      clearBox("htmlTab");
      this.html = this.thml;
      hljs.highlightBlock(document.getElementById("htmlTab"));
    },

    loadHTML: function() {
      openTab(event, 'htmlTab');
      var _this = this;
      reader.onload = function(e) {
        _this.htmlCode = reader.result;
        console.log(reader.result)
      }
      try {
        reader.readAsText(document.getElementById("html").files[0]);
      } catch (error) {
        xmlhttp.open("GET", _this.htmlLink, true);
        xmlhttp.send();
      }
    },

    loadCSS: function() {
      openTab(event, 'cssTab');
      var _this = this;
      reader.onload = function(e) {
        _this.cssCode = reader.result;
        console.log(reader.result)
      }

      reader.readAsText(document.getElementById("css").files[0]);
    }
  },
  computed: {
    code: function() {
      // return "<p>Hello World</p>"
      return this.cssCode + this.htmlCode;
    },
    htmlC: function() {


      return this.htmlCode;
    }
  }

})

function clearBox(elementID,code) {
  document.getElementById(elementID).innerHTML = "";
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
