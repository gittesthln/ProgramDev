<?php
$A = 2;               //JavaScriptのときは $ は取り除く。
$B = 5;

print "1:$A+$B\n";  //JavaScriptのときは print は　console.log() になおす。
                    //文字列はテンプレートリテラルに、変数の埋め込みの形に直す。
print "2:"+$A+$B+"\n";
print "3:".$A+$B."\n";//JavaScript のときは省略すること

print sum(10,20,30)."\n";
print sum(10,20)."\n";
print sum(10,20,30,40)."\n";

print sum2(10,20)."\n";

function sum($a,$b,$c){
  return $a+$b+$c;
}
function sum2($a,$b){
  return $A+$B;
}
?>