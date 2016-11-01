<?php
$a = array(1,2);
$b = $a;

print "1\n";
print_r($a);
print_r($b);

$a[0] = 20;
print "2:\$b[0]=$b[0]\n";

$b = &$a;

$a[1] = 30;
print "3:\$b=$b";
print_r($b);
?>