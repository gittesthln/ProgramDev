window.onload = function(){
  let form = document.getElementById("form");
  let table = document.getElementById("result");
  document.getElementById("Go").addEventListener("click",function(E){
    E.target.setAttribute("disabled", "disabled");
    form.removeChild(table);
    table = table.cloneNode(false);
    form.appendChild(table);
    let limit = document.getElementById("limit").value-0;
    if(limit <= 10**6) limit = 10**6;
    let noI = document.getElementById("NoI").value-0;
    if(noI <= 0) noI = 1;
    let noW = document.getElementById("NoW").value-0;
    if(noW > noI) {
      noW = noI;
      document.getElementById("NoW").value= noW;
    }
    let step = Math.floor(limit/noI);
    let start = new Date();
    let workersNo = 0;
    let worker = [];
    let i;
    for(i = 0; i<noW; i++){
      worker[i] = new Worker("primes.js");
      worker[i].onmessage = function(M){
        let tr = document.createElement("tr");
        table.appendChild(tr);
        Object.keys(M.data).forEach((key)=>{
          let td = document.createElement("td");
          tr.appendChild(td);
          td.innerText=M.data[key];
        });
        workersNo--;
        let wNo = M.data.No-0;
        if(i<noI) {
          worker[wNo].postMessage(
            {from:1+i*step, step:step, time:start.getTime(), No:wNo});
          i++;
          workersNo++;
        } else {
          if(workersNo == 0){
            E.target.removeAttribute("disabled");
          }
          worker[wNo].terminate();
          delete worker[wNo];
        }
      };
    }
    for(i = 0; i<noW; i++){
      worker[i].postMessage(
        {from:1+i*step, step:step, time:start.getTime(), No:i});
      workersNo++;
    }
  });
}
