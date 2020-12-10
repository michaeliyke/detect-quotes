# detect-quotes
Detect which type of quotes a string is using. 
 Some times it is very difficult to detect which kind of quotes a string is using especially when you're dealing with source files directly and transforming it in some way. Whether you're just manipulating a source code a little or you're doing full parsing, this problem will definitly surface.
 
 It is a very annoying situation  to always try to figure out whether you're dealing with a double or single quote or a tilda each time. Now there are many tools that will try to handle this already however I see a lot of such tools annoying because they usually employ a long chain of dependencies to implement any small amount of functionality. I feel that's unnecessary and I'm not afraid to roll out mine. 

 If you can detect the string pattern for free, you can easily write a regular expression pattern match against it.

With this tool, you can detect if a raw string is single-quoted or double-quoted or both are combined in one giant urgly string. You can also detect tilda quotes as well. It analizes a string by first dividing it into segments allowing you to see quoted and unquoted parts separately, what quotes are used and the various concatenations involved in the case of source code manipulation.

//Very light-weight quotes detector

const fs = require("fs");
const file = fs.readFileSync("test.test", "utf-8");
const lines = file.split(/[\n\r]+/);

npm install detect-quotes

const Detection = require("detect-quotes");
const detection = new Detection();

//Detect quotes
detection.isSingleQuotes(lines[0]) //true or false
detection.isDoubleQuotes(lines[0]) //true or false
detection.isTildaQuotes(lines[0]) //true or false
detection.isMixedQuotes(lines[0]) //true or false

//View into various parts
detection.segments; //Shows all created segments of a given line both quoted and unquoted
detection.parts[1].isQuoted; //true or false
detection.quotedSegments; // Shows all parts that are quoted

//Want to loop?
// You can loop through the segments

detection.segments.forEach(function(segment) {
  segment.quoteToken; //Show the kind of quote the segment uses
  segment.isSingleQuoted; //true or false
  segment.isTildaQuoted; //true or false
  segment.isDoubleQuoted; //true or false
  segment.isQuoted; //true or false
});