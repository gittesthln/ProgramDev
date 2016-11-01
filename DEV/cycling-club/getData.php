<?php
function getTextVal($node, $elm) {
  return $node->getElementsByTagName($elm)->item(0)->firstChild->nodeValue;
}
function SetDatafromFile($fin,$folder,$mode) {
  $fn = "$folder$fin";
  if(!file_exists($fn)) return;

  $data = new DOMDocument();
  $data->load($fn);
  $trks = $data->getElementsByTagName("trk");
  $len = $trks->length;
  $trackdata = array();
  $lonMax = -181;
  $lonmin =  181;
  $latMax =  -91;
  $latmin =   91;
  $cnt=0;
  for($i=0;$i<$len;$i++){
    $trk = $trks->item($i);
    $trksegs = $trk->getElementsByTagName("trkpt");
    $len2 = $trksegs->length;
    if($len2 <10) continue;
    $newtrk = array();
    for($j = 0;$j<$len2;$j++) {
      $trkseg = $trksegs->item($j);
      $lat = $trkseg->getAttribute("lat");
      $lon = $trkseg->getAttribute("lon");
      if($lat > $latMax) $latMax = $lat;
      if($lat < $latmin) $latmin = $lat;
      if($lon > $lonMax) $lonMax = $lon;
      if($lon < $lonmin) $lonmin = $lon;
      array_push($newtrk,"[$lat,$lon]");
    }
    if($lonMax - $lonmin >0.001 ||$latMax - $latmin > 0.001) {
      $cnt++;
      array_push($trackdata,"[".implode(",",$newtrk)."]");
    }
  }
  print "{\"position\":[$latMax,$latmin,$lonMax,$lonmin],\"route\":[".
      implode(",",$trackdata)."]}";
}
SetDatafromFile($_GET["file"],"",true);
?>