<?php
print <<<_EOL_
<!DOCTYPE html>
<head>
<meta charset="UTF-8"/>
<title>サーバーに送られたデータ</title>
</head>
<body>
<table>
_EOL_;
foreach($_GET as $key=>$value) {
  print "<tr><td>$key</td><td>$value</td></tr>\n";
}
print <<<_EOL_
</table>
</body>
</html>
_EOL_;
?>