<?php
$data = new DOMDocument();
$data->loadHTMLFile("compare_php.txt");
$tables = $data->getElementsByTagName("table");
$length = $tables->length;
for($i=0;$i<$length;$i++) {
  $t = $tables->item($i);
  print <<<_EOL
\begin{table}
\caption{
_EOL;
  print($t->getElementsByTagName("caption")->item(0)->nodeValue);
  print "}\r\n";
  $tr = $t->getElementsByTagName("tr");
  $th = $tr->item(0)->getElementsByTagName("th");
  $n = $th->length;
  print <<<_EOL
\\begin{center}
  \\begin{tabular}{|*
_EOL;
  print '{';
  print "$n}{c|}}\hline\n";
  print $th->item(0)->nodeValue;
  for($j=1;$j<$th->length;$j++) {
      print '&\verb+';
    print $th->item($j)->nodeValue;
    print '+';
  }
  print "\\\\\\hline\r\n";
  for($j=1;$j<$tr->length;$j++) {
    $td = $tr->item($j)->getElementsByTagName("td");
    print '\verb+';
    print $td->item(0)->nodeValue;
    print '+';
    for($k=1;$k<$td->length;$k++) {
      print '&\verb+';
      print $td->item($k)->nodeValue;
      print '+';
    }
    print "\\\\\\hline\r\n";
  }
  print <<<_EOL
  \\end{tabular}
\\end{center}
\\end{table}
_EOL;

}
?>
