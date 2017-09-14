window.onload = function() {
  let Squares, Select, ColorName, Radio, Set;
  (function(document,getElementById){
      Squares   = getElementById.call(document,"Squares");
      Select    = getElementById.call(document,"select");
      ColorName = getElementById.call(document,"colorName");
      Radio     = getElementById.call(document,"radio");
      Set       = getElementById.call(document,"Set");
	})(document,document.getElementById);
  let Inputs    = document.getElementsByClassName("click");
  let lastClicked = Squares.children[1];  
  Squares.children[0].style.background = "red";
  Squares.children[1].style.background = "yellow";
  Squares.children[2].style.background = "blue";
  Select.style.fontSize = "30px";
  Squares.addEventListener("click",function(E){
  let R = E.target.getBoundingClientRect();
  [E.clientX, E.clientY, E.pageX, E.pageY,
   window.pageXOffset, window.pageYOffset,
   E.pageX-R.left, E.pageY-R.top].forEach(function(val, i) {
     Inputs[i].value = val;
    });
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
