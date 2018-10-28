self.onmessage = function(M){
  let limit = 10010;
  let primes =[2,3];
  for(let i=5;i<limit;i+=2) {
    for(let j=1; j<primes.length; j++){
      if(i%primes[j] ==0) break;
      if(i<(primes[j]+2)*primes[j]) {
        primes.push(i);//console.log(i);
        break;
      }
    }
  }
  let cnt = 0;
  let from = M.data.from-0;
  if(from < limit) {
    cnt = primes.length;
    from = limit;
  }
  from = from | 1;
  let step = M.data.step;
  let to = (from < step)?(step+1): (from + step);
  let pNo = primes.length;
  for(let i=from; i<to; i+=2) {
    for(let j=0; j<pNo; j++){
      let p = primes[j];
      if(i%p == 0) break;
      if(i < (p+2)*p) {
        cnt++;//console.log(i);
        break;
      }
    }
  }
  postMessage({from:M.data.from, to:to-1, count:cnt,
               time:new Date().getTime()-M.data.time});
};
