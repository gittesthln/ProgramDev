<?php
$a = array("red","yellow","blue");
foreach($a as $val) {
  print "$val\n";
}
foreach($a as $key=>$val) {
  print "$key:$val\n";
}
$a = array("red"=>"赤","yellow"=>"黄","blue"=>"青");
foreach($a as $val) {
  print "$val\n";
}
foreach($a as $key=>$val) {
  print "$key:$val\n";
}
$b = array();
$b[3] = "3rd";
$b[0] = "0";
print count($b)."\n";
foreach($b as $key=>$val) {
  print "$key:$val\n";
}
for($i=0;$i<count($b);$i++) {
  if(isset($b[$i])) {
    print "$i:$b[$i]\n";
  }
}
?>