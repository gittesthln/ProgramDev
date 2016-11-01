window.onload = function() {
  function getElm(N){
    return document.getElementById(N);
  }
  var Squares   = getElm("Squares");
  var Select    = getElm("select");
  var ColorName = getElm("colorName");
  var Radio     = getElm("radio");
  var Set       = getElm("Set");
  var Inputs    = document.getElementsByClassName("click");
  var Squareschildren =	 Squares.children;
  var lastClicked = Squareschildren[1];  
  function SetBackground(Pos, Color) {
    Squareschildren[Pos].style.background = Color;
  }
  var v = "value";
  SetBackground(0, "red");
  SetBackground(1, "yellow");
  SetBackground(2, "blue");
  Select.style.fontSize = "30px";
  Squares.addEventListener("click",function(E){
    Inputs[0][v] = E.clientX;
    Inputs[1][v] = E.clientY;
    Inputs[2][v] = E.pageX;
    Inputs[3][v] = E.pageY;
    Inputs[4][v] = window.pageXOffset;
    Inputs[5][v] = window.pageYOffset;
    var R = E.target.getBoundingClientRect();
    Inputs[6][v] = E.pageX-R.left;
    Inputs[7][v] = E.pageY-R.top;
    ColorName[v] = E.target.style.background;
    lastClicked = E.target;
  },false);
  Select.addEventListener("change", function(){
      lastClicked.style.background = Select[v]; },false);
  Radio.addEventListener("click", function(E){
      alert(E.target.tagName);
      if(E.target.tagName === "DIV") {
        E.target.firstChild.checked = true;
      }
      console.log("----" + Radio[v]);
      lastClicked.style.background = Radio.querySelector("input:checked")[v];
    },false);
  Set.addEventListener("click", function(){
      lastClicked.style.background = ColorName[v]; }, false);
}
