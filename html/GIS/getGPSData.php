<?php
function getPos($lat, $lon) {
    $R = 6378137;
    $latRad = $lat * M_PI/180;
    $lonRad = $lon * M_PI/180;
    $latCos = cos($latRad);
    return array(
        $R*$latCos*cos($lonRad),$R*$latCos*sin($lonRad),$R*sin($latRad));
}
function SetDatafromFile($fn,$mode) {
  $data = new DOMDocument();
  $data->load($fn);
  $trks = $data->getElementsByTagName("trk");
  $len = $trks->length;
  $trackdata = array();
  $lengthdata = array();
  $cnt=0;
  for($i=0;$i<$len;$i++){
    $trk = $trks->item($i);
    $trksegs = $trk->getElementsByTagName("trkpt");
    $len2 = $trksegs->length;
    if($len2 <10) continue;
    $trkseg = $trksegs->item(0);
    $latmin = $latMax = $lat = $trkseg->getAttribute("lat");
    $lonmin = $lonMax = $lon = $trkseg->getAttribute("lon");
    $newtrk = array("[$lat,$lon]");
    $ppos = getPos($lat, $lon);
    $length = 0;
    for($j = 1; $j < $len2; $j++) {
      $trkseg = $trksegs->item($j);
      $lat = $trkseg->getAttribute("lat");
      $lon = $trkseg->getAttribute("lon");
      $latMax = max($lat-0,$latMax);
      $latmin = min($lat-0,$latmin);
      $lonMax = max($lon-0,$lonMax);
      $lonmin = min($lon-0, $lonmin);
      array_push($newtrk,"[$lat,$lon]");
      $cpos = getPos($lat, $lon);
      $xd = $ppos[0]-$cpos[0];
      $yd = $ppos[1]-$cpos[1];
      $zd = $ppos[2]-$cpos[2];
      $length += sqrt($xd*$xd+$yd*$yd+$zd*$zd);
      $ppos = $cpos;
    }
    if($lonMax - $lonmin >0.001 ||$latMax - $latmin > 0.001) {
      $cnt++;
      array_push($trackdata,
        '{"range":['."$latMax,$latmin,$lonMax,$lonmin".'],"route":[' .
      implode(",",$newtrk).'],"length":'.($length/1000).'}');
    }
  }
  return $length/1000;
}
print <<<_EOL_
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8"/>
    <title>GPXファイルの処理</title>
  </head>
  <body>
_EOL_;
if (is_uploaded_file($_FILES["data"]["tmp_name"])) {
$fileName = "Files/" . $_FILES["data"]["name"];
  if (move_uploaded_file($_FILES["data"]["tmp_name"], $fileName) ) {
//    chmod("Files/" . $_FILES["upfile"]["name"], 0644);
    echo $_FILES["data"]["name"] . "をアップロードしました。";
    printf("距離は%.2fkmです",SetDatafromFile($fileName, true));
  } else {
    echo "ファイルをアップロードできません。";
  }
} else {
  echo "ファイルが選択されていません。";
}
print <<<_EOL_
  </body>
</html>
_EOL_;
?>