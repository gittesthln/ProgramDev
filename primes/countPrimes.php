<?php
$start = (array_key_exists('N', $_GET))?$_GET['N']:$argv[1];
$step  = (array_key_exists('Step', $_GET))?$_GET['Step']:$argv[2];
$limit = 10000;
$primes = [];
array_push($primes,2);
for($i=3;$i<$limit; $i+=2) {
    $flag = true;
    for($j=0;$j<count($primes);$j++) {
        $p = $primes[$j];
        if($i % $p == 0) {
             $flag = false;
            break;
        }
        if($i< $p*$p+$p) break;
    }
    if($flag) array_push($primes, $i);
}
  $c = 0;
if($start < $limit ) {
  $c = count($primes);
  $start = $limit;
}
$start = $start - $start % 2 + 1;
$pNo = count($primes);
$L = ($start < $step)?$step: ($start + $step);
for($i=$start;$i<$L; $i+=2) {
  for($j=0;$j<$pNo;$j++) {
    $p = $primes[$j];
    if($i % $p == 0) break;
    if($i< ($p)*($p+1)) {
		  $c++;
      break;
    }
	}
}
print $c;
?>