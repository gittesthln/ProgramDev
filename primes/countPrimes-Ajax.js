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
  let table = document.getElementsByTagName("table")[0];
  let P = table.parentNode;
  P.removeChild(table);
  table = MKHTMLElm(P, "table",{}, {});
  let request = 0, start = new Date();
  for(let i=0; i<10; i++) {
    let httpObj = createXMLHTTPReq(function(){
      if(httpObj.readyState == 4 && httpObj.status == 200) {
        let tr = MKHTMLElm(table,"tr",{}, {});
        MKHTMLElm(tr, "td", {}, {}).
            appendChild(document.createTextNode(i*interval+1));
        MKHTMLElm(tr, "td", {}, {}).
            appendChild(document.createTextNode(httpObj.responseText));
        request--;
        console.log(httpObj.responseText);
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
