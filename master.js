
var reader = new FileReader();
 
var wrapper = new Vue({
  el:"#container",
  data:{
	  htmlCode:"",
	  cssCode:"",
      htmlLink:"",
      cssLink:""
  },
  methods:{
	  
	loadHTML:function(){
		var _this = this;
	    reader.onload = function(e) {
			_this.htmlCode = reader.result;
			console.log(reader.result)
		} 
		
		reader.readAsText(document.getElementById("html").files[0]);		
	},
	loadCSS:function(){
		var _this = this;
	    reader.onload = function(e) {
			_this.cssCode = reader.result;
			console.log(reader.result)
		} 
		
		reader.readAsText(document.getElementById("css").files[0]);
    }
  },
  computed:{
	code: function(){
		return "<p>Hello World</p>"
		// return this.cssCode + this.htmlCode; 
	}
  }

})

// || "<p>Hello World</p>";