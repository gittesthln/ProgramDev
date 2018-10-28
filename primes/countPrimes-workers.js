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
    let no = document.getElementById("No").value-0;
    if(no <= 0) no = 1;
    let step = Math.floor(limit/no);
    let start = new Date();
    let workersNo = 0;
    let worker = [];
    for(let i = 0; i<no; i++){
      worker[i] = new Worker("primes.js");
      workersNo++;
    }
    for(let i = 0; i<no; i++){
      worker[i].postMessage({from:1+i*step, step:step, time:start.getTime()});
      worker[i].onmessage = function(M){
        let tr = document.createElement("tr");
        table.appendChild(tr);
        Object.keys(M.data).forEach((key)=>{
          let td = document.createElement("td");
          tr.appendChild(td);
          td.innerText=M.data[key];
        });
        workersNo--;
        if(workersNo == 0){
          E.target.removeAttribute("disabled");
        }
        worker[i].terminate();
        delete worker[i];
      };
    }
  });
}
