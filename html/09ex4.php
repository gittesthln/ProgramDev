<?php
function add($a, $b) {
  return $a+$b;
}
function sub($a, $b) {
  return $a-$b;
}
$a = 5;
$b = 2;
$f = "add";
print "\$$f($a,$b) = " . $f($a,$b) ."\n";
$f = "sub";
print "\$$f($a,$b) = " . $f($a,$b) ."\n";
?>