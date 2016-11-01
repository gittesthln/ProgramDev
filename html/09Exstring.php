<?php
print 'string1 \':abcd\n';
print "string2 \":abcd\n";

$a = 1;
print 'string3 \':$a bcd\n';
print "string4 \":$a bcd\n";
print "string5 \":{$a}bcd\n";

$b = array(1,2,3);
print "string6:$b\n";
print "string7:$b[1]aa\n";
print "string7:$b[$a]aa\n";

print <<<_EOL_
string8:
  aa
  \$a = $a
_EOL_;
