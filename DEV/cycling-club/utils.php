<?php
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
?>