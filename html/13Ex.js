window.onload = function(){
  let areaColor = ["RGB", "HSL"].map((type)=>{
    let area = DOMObject.getElmId(type);
      return [area, new SetColor(type, type, area, function(){setColors();},
                   {style:"display:inline-block;vertical-align:middle;"})];
    });
  setColors();
  function setColors(){
    areaColor.forEach((C)=>
      {C[0].elm.children[0].style.background = `${C[1]}`;});
  }
}
