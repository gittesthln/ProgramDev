<?php
function example($a, $as, &$b, $f=false) {
  print "\$a = $a\n";
  print_r($as);
  print "\$b = $b\n";
  if(!isset($x)) $x = "defined in function";
  print "\$x = $x\n";
  if($f) {
    print "\$GLOBALS['x'] = ". $GLOBALS['x']."\n";
  }
  $a = $a*2;
  $as[0] += 10;
  $b = $b*2;
  return array($a,$as);
}
?>