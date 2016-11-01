<?php
function setParam($name, $default, $min) {
  $val = $default;
  if(array_key_exists($name,$_GET)) {
    $val = $_GET[$name];
    if($val <$min) $val = $min;
  }
  return $val;
}
function setParamS($name, $default) {
  $val =$default;
  if(array_key_exists($name,$_GET)) {
    $val = $_GET[$name];
  }
  return $val;
}
$w = setParam("w",1000,200);
$h = setParam("h",800,200);
$zoom = setParam("zoom",0,-5);
$hl =setParamS("hl","ja");
$mode = true;
if(array_key_exists("mode",$_GET)) {
  $mode = ($_GET["mode"]==="true");
}
$latMaxG=$latminG=35.486210;
$lonMaxG=$lonminG=139.341443;

$filenames = file("history.dat",FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES);
print <<<_EOL_
<!DOCTYPE html>
<html>
<head>
<title>My Trace</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<link rel="stylesheet" type="text/css" href="map.css"/>
<script src="http://maps.google.com/maps/api/js?sensor=false" 
        type="text/javascript" charset="UTF-8"></script>
<script src="jquery-1.11.2.min.js" type="text/javascript" 
        charset="UTF-8"></script>
<script src="map4.js" type="text/ecmascript"></script>
<script type="text/ecmascript">
window.onload = function() {
  initialize($latMaxG,$lonMaxG,$latminG,$lonminG,$zoom);
}
</script>
  </head>
  <body>
<div id="map_canvas" style="width:{$w}px; height:{$h}px"></div>
  <form id="filenames">
_EOL_;
for($i=0;$i<count($filenames); $i++) {
  print '<div class="fn"><div><input type="checkbox" id="file'.$i.
           '"/></div><div>'. $filenames[$i]. '</div><div> </div></div>';
}
print '</form></div>';
?>
</body> </html>
