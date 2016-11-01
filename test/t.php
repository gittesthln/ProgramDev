<?php
print(1/8*16)."\n";                     //(1)
print(21>8?"TRUE":"FALSE")."\n";        //(2)
print(21>"8"?"TRUE":"FALSE")."\n";      //(3)
print("21">"8"?"TRUE":"FALSE")."\n";    //(4)
print("2"+3)."\n";                      //(5)
print("2"-3)."\n";                      //(6)
print(([ ])?"TRUE":"FALSE")."\n";       //(7)
print("false"?"TRUE":"FALSE")."\n";     //(8)
$w = 10;
function F($a,$b,$c){
  $x = $a;
  $y = -5;
  $c[0] *= 2;
  $w = 5;
}
print(isset($x)?$x:"無効")."\n";         //(9)
$y = 10;
$c = [1,2,3];
$P = F(10,$y,$c);
print(isset($x)?$x:"無効")."\n";         //(10)
print(isset($P->x) ?$P->x:"無効")."\n";  //(11)
print($w)."\n";                          //(12)
print($y)."\n";                          //(13)
print($c[0])."\n";                       //(14)
?>
