window.onload = function() {
  let Squares   = document.getElementById("Squares");
  let Select    = document.getElementById("select");
  let ColorName = document.getElementById("colorName");
  let Radio     = document.getElementById("radio");
  let Set       = document.getElementById("Set");
  let Inputs    = document.getElementsByClassName("click");
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
      },false);
  Select.addEventListener("change", function(){
      Squares.children[0].style.background = Select.value; },false);
  Radio.addEventListener("click", function(E){
      alert(E.target.tagName);
      if(E.target.tagName === "DIV") {
        E.target.firstChild.checked = true;
      }
      Squares.children[1].style.background = Radio.querySelector("input:checked").value;
    },false);
  Set.addEventListener("click", function(){
      Squares.children[2].style.background = ColorName.value; }, false);
  let Form = document.getElementsByTagName("form")[0];
  Form.setAttribute("method","PUT");
  Form.setAttribute("action","09sendDataGet.php");
}
