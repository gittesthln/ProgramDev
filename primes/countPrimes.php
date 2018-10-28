<?php
$from = (array_key_exists('from', $_GET))?$_GET['from']:$argv[1];
$step  = (array_key_exists('step', $_GET))?$_GET['step']:$argv[2];
$limit = 10010;
$primes = [2,3];
for($i=5;$i<$limit; $i+=2) {
  for($j=0;$j<count($primes);$j++) {
    $p = $primes[$j];
    if($i % $p == 0) break;
    if($i< $p*$p+$p) {
      array_push($primes, $i);
      break;
    }
  }
}
$cnt = 0;
$res =array("from"=>$from);
if($from < $limit ) {
  $cnt = count($primes);
  $from = $limit;
}
$from = $from | 1;
$to = ($from < $step)?($step+1): ($from + $step);
$res["to"] = $to;
$pNo = count($primes);
for($i=$from; $i<$to; $i+=2) {
  for($j=0; $j<$pNo; $j++) {
    $p = $primes[$j];
    if($i % $p == 0) break;
    if($i< ($p+2)*$p) {
      $cnt++;
      break;
    }
  }
}
$res["count"] = $cnt;
print json_encode($res);
?>