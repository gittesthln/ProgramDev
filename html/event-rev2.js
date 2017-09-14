window.onload = function() {
  let Squares, Select, ColorName, Radio, Set;
		(function(document,getElementById){
      Squares   = document[getElementById]("Squares");
      Select    = document[getElementById]("select");
      ColorName = document[getElementById]("colorName");
      Radio     = document[getElementById]("radio");
      Set       = document[getElementById]("Set");
	})(document,"getElementById");
  let Inputs    = document.getElementsByClassName("click");
  let lastClicked = Squares.children[1];  
  Squares.children[0].style.background = "red";
  Squares.children[1].style.background = "yellow";
  Squares.children[2].style.background = "blue";
  Select.style.fontSize = "30px";
  Squares.addEventListener("click",function(E){
    Inputs[0].value = E.clientX;
    Inputs[1].value = E.clientY;
    Inputs[2].value = E.pageX;
    Inputs[3].value = E.pageY;
    Inputs[4].value = window.pageXOffset;
    Inputs[5].value = window.pageYOffset;
    let R = E.target.getBoundingClientRect();
    Inputs[6].value = E.pageX-R.left;
    Inputs[7].value = E.pageY-R.top;
    ColorName.value = E.target.style.background;
    lastClicked = E.target;
  },false);
  Select.addEventListener("change", function(){
      lastClicked.style.background = Select.value; },false);
  Radio.addEventListener("click", function(E){
      alert(E.target.tagName);
      if(E.target.tagName === "DIV") {
        E.target.firstChild.checked = true;
      }
      console.log("----" + Radio.value);
      lastClicked.style.background = Radio.querySelector("input:checked").value;
    },false);
  Set.addEventListener("click", function(){
      lastClicked.style.background = ColorName.value; }, false);
}
