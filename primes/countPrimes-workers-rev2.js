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
    let worker = [];
      
    let startWorker =  new Worker("countPrimes-start-workers.js");
    let workersNo = i = noW;
    startWorker.onmessage = function(M){
      showResult(M);
      workersNo--;
    };
    startWorker.postMessage(
        {limit:limit, noInterval:noI, noWorkers:noW, start:start});
    document.getElementById("Go").removeAttribute("disabled");
  });
  function showResult(M) {
    let tr = document.createElement("tr");
    table.appendChild(tr);
    Object.keys(M.data).forEach((key)=>{
      let td = document.createElement("td");
      tr.appendChild(td);
      td.innerText = M.data[key];
    });
  }
}

