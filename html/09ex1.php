<?php
$a = 1;
$b = $a;

print "1:\$a=$a, \$b=$b\n";

$a = 2;
print "2:\$a=$a, \$b=$b\n";

$b = &$a;
print "3:\$a=$a, \$b=$b\n";

$a = 10;
print "4:\$a=$a, \$b=$b\n";
?>