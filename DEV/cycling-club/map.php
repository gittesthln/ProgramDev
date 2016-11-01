<!DOCTYPE html>
<html>
<head>
<title>My Trace</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<style type="text/css">
#map_canvas {
 position: relative;
 float:left;
}
#filenames> div   {
  float:left;
  width:200px;
}
#filenames > div div:nth-child(1) {
  width:20px;
  float:left;
}
#filenames > div div:nth-child(2) {
  width:80px;
  float:left;
}

#filenames > div div:nth-child(3){
  float:left;
  width:100px;
  text-align:right;
}
</style>
<?php
function getTextVal($node, $elm) {
  return $node->getElementsByTagName($elm)->item(0)->firstChild->nodeValue;
}
function SetDatafromFile($fin,$folder,$mode) {
  $fn = "$folder$fin.gpx";
  if(!file_exists($fn)) return;

  $data = new DOMDocument();
  $data->load($fn);
  $trks = $data->getElementsByTagName("trk");
  $len = $trks->length;
  $trackdata = "";
  $lonMax = -181;
  $lonmin =  181;
  $latMax =  -91;
  $latmin =   91;
  $cnt=0;
  for($i=0;$i<$len;$i++){
    $trk = $trks->item($i);
//  print getTextVal($trk, "name")."\r\n";
    $trksegs = $trk->getElementsByTagName("trkpt");
    $len2 = $trksegs->length;
    if($len2 <10) continue;
    $newtrk = "[";
    for($j = 0;$j<$len2;$j++) {
      $trkseg = $trksegs->item($j);
      $lat = $trkseg->getAttribute("lat");
      $lon = $trkseg->getAttribute("lon");
      if($lat > $latMax) $latMax = $lat;
      if($lat < $latmin) $latmin = $lat;
      if($lon > $lonMax) $lonMax = $lon;
      if($lon < $lonmin) $lonmin = $lon;
      if($j % 5 == 0) $newtrk .="\r\n";
      $newtrk .= "[$lat,$lon],";
    }
    $newtrk .= "],\r\n";
    if($lonMax - $lonmin >0.001 ||$latMax - $latmin > 0.001) {
      $cnt++;
      $trackdata .= $newtrk;
    }
  }
  print $trackdata;
  setMaxMin($fin,$cnt,$latMax,$latmin,$lonMax,$lonmin);
}
function setMaxMin($fin,$cnt,$latMax,$latmin,$lonMax,$lonmin) {
  if($latMax > $GLOBALS["latMaxG"]) $GLOBALS["latMaxG"] = $latMax;
  if($latmin < $GLOBALS["latminG"]) $GLOBALS["latminG"] = $latmin;
  if($lonMax > $GLOBALS["lonMaxG"]) $GLOBALS["lonMaxG"] = $lonMax;
  if($lonmin < $GLOBALS["lonminG"]) $GLOBALS["lonminG"] = $lonmin;
  for(;$cnt>0;$cnt--) {
    $GLOBALS["filenames"][] = $fin;
  }
}
function setDay($D,$m,$day) {
  $dd = mb_split(",",$D);
  $ddd = array(date("Y"),$m,$day);
  for($i=0;$i<count($dd)&& $i<3;$i++) {
    $ddd[$i] = $dd[$i];
  }
  return mktime(0,0,0,$ddd[1],$ddd[2],$ddd[0]);
}
function setParam($name, $default, $min) {
  $val = $default;
  if(array_key_exists($name,$_REQUEST)) {
    $val = $_REQUEST[$name];
    if($val <$min) $val = $min;
  }
  return $val;
}
function setParamS($name, $default) {
  $val =$default;
  if(array_key_exists($name,$_REQUEST)) {
    $val = $_REQUEST[$name];
  }
  return $val;
}
$w = setParam("w",1000,200);
$h = setParam("h",800,200);
$zoom = setParam("zoom",0,-5);
$hl =setParamS("hl","ja");
$mode = true;
if(array_key_exists("mode",$_REQUEST)) {
  $mode = ($_REQUEST["mode"]==="true");
}
$folder = "./";
$files = file("history.dat",FILE_IGNORE_NEW_LINES|FILE_SKIP_EMPTY_LINES);
$filenames = array();
$lonMaxG =  -181;
$lonminG = 181;
$latMaxG = -91;
$latminG =  91;
print <<<_EOL_
<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript" charset="UTF-8">
<!-- maps.googleapis.com/maps/api/js?v=3&language=$hl&sensor=false" type="text/javascript"-->
</script>
<script type="text/javascript">
    //<![CDATA[
var Points =[
_EOL_;
for($l = 0; $l<count($files); $l++) {
  SetDatafromFile(basename($files[$l],".gpx"),$folder,$mode);
}
print "];\r\n";
print <<<_EOL_
//]]>
</script>
<script src="map3.js" type="text/ecmascript"></script>
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
//print date("Ymd",mktime());
for($i=0;$i<count($filenames); $i++) {
  print '<div class="fn"><div><input type="checkbox" id="file'.$i.
           '"/></div><div>'. $filenames[$i]. '</div><div> </div></div>';
}
print '</form></div>';
?>
</body> </html>
