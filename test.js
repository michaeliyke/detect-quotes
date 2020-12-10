
const {log} = console;

const fs = require("fs");
const Detection = require("./");
const file = fs.readFileSync("test.test", "utf-8");
const lines = file.split(/[\r\n]+/);
log(lines[0]);
const detection = new Detection(lines[0]);
log(detection.parts)
log(detection.parts[4].isQuoted);
// log(detection.isMixedQuoted(lines[0]));

detection.segments.forEach(function(segment) {
  log(segment.quoteToken); //Show the kind of quote the segment uses
  log(segment.isSingleQuoted); //true or false
  log(segment.isTildaQuoted); //true or false
  log(segment.isDoubleQuoted); //true or false
  log(segment.isQuoted); //true or false
});