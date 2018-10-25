window.onload = function(){
    window.Test["ajax-mode"].value = "true";
}
function createXMLHTTPReq( func ) {
  let xmlHttpObj = new XMLHttpRequest();
  if(xmlHttpObj) xmlHttpObj.onreadystatechange = func;
  return xmlHttpObj;
}
function getData() {
    let interval =10**6;
    let primes = 0;
  let table = document.getElementsByTagName("table")[0];
  let P = table.parentNode;
  P.removeChild(table);
  table = MakeElement(P, "table");
  let request = 0, start = new Date();
  for(let i=0; i<10; i++) {
    let httpObj = createXMLHTTPReq(function(){
      if(httpObj.readyState == 4 && httpObj.status == 200) {
        let tr = MakeElement(table,"tr");
        MakeElement(tr, "td").
            appendChild(document.createTextNode(i*interval+1));
        MakeElement(tr, "td").
              appendChild(document.createTextNode(httpObj.responseText));
          primes -= -httpObj.responseText;
        request--;
          console.log(`${httpObj.responseText} total:${primes}`);
        console.log(new Date()-start);
        if(request <= 0) console.log("done");
      }
    });
    if(httpObj) {
      request++;
      httpObj.open("PUT",`./countPrimes.php?N=${i*interval+1}&Step=${interval}`,
                   window.Test["ajax-mode"].value == "true");
      httpObj.send(null);
    }
  }
}
function MakeElement(P, elem, attribs, events) {
  let Element = document.createElement(elem);
  SetAttributes(Element, attribs);
  if(P) P.appendChild(Element);
  return Element;
} 
function SetAttributes(Elm, attribs) {
  for( attrib in attribs) {
      Elm.setAttribute(attrib,attribs[attrib]);
  }
}
