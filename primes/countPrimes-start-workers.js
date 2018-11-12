self.onmessage = function(M){
    let workers = [];
    let workersNo = 0;
    let limit = M.data.limit;
    let noI = M.data.noInterval;
    let step = Math.floor(limit/noI);
    let noW = M.data.noWorkers;
    let start = M.data.start;
    for(i = 0; i<noW; i++){
      workers[i] = new Worker("primes.js");
      workers[i].onmessage = function(M){ 
          postMessage(M.data);
          if(i<noI) {
            if(workersNo <wNo) {
              workers[i] = new Worker("primes.js");
              workers[i].onmessage = function(M){
                workersNo--
                if(workersNo == 0 && i==noI){
                  E.target.removeAttribute("disabled");
                }
              }
            }
          }
        };
        worker[i].postMessage(
           {from:1+i*step, step:step, time:start.getTime(), No:i});
        i++;
        workersNo++;
      }
    }
    for(;workersNo > 0;);
      }
      workers[i].postMessage(
            {from:1+i*step, step:step, time:M.data.start, No:i});
    }
}
