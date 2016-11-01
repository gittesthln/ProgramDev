<?php
mb_internal_encoding("UTF8");
//print mb_internal_encoding();
$m = isset($_GET["month"])?$_GET["month"]: $argv[1];
$d = isset($_GET["day"])?$_GET["day"]:$argv[2];
$data = file("aniversary.txt",FILE_IGNORE_NEW_LINES);
for($i=0;$i<count($data);$i++) {
  $data[$i] = mb_convert_encoding($data[$i],"UTF8");
  $mm = mb_split("\[",$data[$i]);
  if(count($mm) >1) {
    if(mb_convert_encoding($m."月","UTF8") === $mm[0]) break;
  }
}
for($i++;$i<count($data);$i++) {
  $data[$i] = mb_convert_encoding($data[$i],"UTF8");
  $dd = mb_split("\s-\s",$data[$i]);
  if(($d."日") === $dd[0]) break;
}
//  print mb_convert_encoding($dd[1],"SJIS");
print $dd[1]; 
?>
