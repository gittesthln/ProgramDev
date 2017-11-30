<?php
$a = [1,2,3,4,5];
print array_splice($a, -1, 1)[0]."\n";//POP
print_r($a);
array_splice($a, count($a), 0, 10);//PUSH
print_r($a);
print array_splice($a, 0, 1)[0]."\n";//SHIFT
print_r($a);
array_splice($a, 0, 0, [-1, -2]);//UNSHIFT
print_r($a);
function pop(&$a) {
    return array_splice($a, -1, 1)[0];
}
print pop($a)."\n";
print_r($a);
?>