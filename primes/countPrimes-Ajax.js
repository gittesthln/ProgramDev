window.onload = function(){
  let form = document.getElementById("form");
  let table = document.getElementById("result");
  form["ajax-mode"].value = "true";
  document.getElementById("Go").addEventListener("click",function(E){
    E.target.setAttribute("disabled", "disabled");
    form.removeChild(table);
    table = table.cloneNode(false);
    form.appendChild(table);
    let limit = document.getElementById("limit").value-0;
    if(limit <= 10**6) limit = 10**6;
    let no = document.getElementById("No").value-0;
    if(no <= 0) no = 1;
    let step = Math.floor(limit/no);
    let start = new Date();
    let request = 0;
    for(let i=0; i<no; i++) {
      let httpObj = createXMLHTTPReq(function(){
        if(httpObj.readyState == 4 && httpObj.status == 200) {
          let tr = document.createElement("tr");
          table.appendChild(tr);
          let response = JSON.parse(httpObj.responseText);
          response["time"] = new Date()-start;
          Object.keys(response).forEach((key)=>{
            let td = document.createElement("td");
            tr.appendChild(td);
            td.innerText=response[key];
          });
          request--;
          if(request == 0){
            E.target.removeAttribute("disabled");
          }
        }
      });
      if(httpObj) {
        request++;
        httpObj.open("PUT",`./countPrimes.php?from=${i*step+1}&step=${step}`,
               form["ajax-mode"].value == "true");
        httpObj.send(null);
      }
    }
  });
}
function createXMLHTTPReq( func ) {
    let xmlHttpObj = new XMLHttpRequest();
    if(xmlHttpObj) xmlHttpObj.onreadystatechange = func;
    return xmlHttpObj;
}
