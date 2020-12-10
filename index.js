const {log} = console;
const REGEXPs = require("./utils/regex-patterns");

class Part extends String {

  /**
   * Object to represent each segment of a split line of string
   * @param  {string} part A unit part of the whole line
   * @return {Part}
   */
  constructor(part) {
    super(part); //This creates the string on this
  }

  /**
   * Show is part starts with given token
   * @param  {string} token Token string to compare
   * @return {Boolean}       Return true or false
   */
  startsWith(token) {
    return this.charAt(0) == token;
  }

  /**
   * Show is part starts with given token
   * @param  {string} token Token string to compare
   * @return {Boolean} True or false
   */
  endsWith(token) {
    return this.charAt(this.length - 1) == token;
  }

  get startToken() {
    return this.trim().charAt(0);
  }

  get endToken() {
    return this.trim().charAt(this.length - 1);
  }

  /**
   * Array of valid quotes
   * @return {array}
   */
  get quotes() {
    return ["\"", "'", "`"];
  }

  /**
   * Returns the token of a quoted part
   * @return {sting} returns single character
   */
  get quoteToken() {
    if (this.isQuoted) {
      if (this.startToken in ["\"", "'", "`"] && this.startToken == this.endToken) {
        return this.startToken
      }
    }
    return null;
  }

  get isSingleQuoted() {
    return this.startsWith("'") && this.endsWith("'");
  }

  get isTildaQuoted() {
    return this.startsWith("`") && this.endsWith("`");
  }

  get isDoubleQuoted() {
    return this.startsWith("\"") && this.endsWith("\"");
  }

  /**
   * Show whether or not the segment is within quotes
   * @return {Boolean} True or false
   */
  get isQuoted() {
    const startToken = this.startToken;
    const endToken = this.endToken;
    return startToken == endToken
      && this.quotes.indexOf(startToken) != -1;
  }

}


class Parts extends Array {

  constructor(partsArray) {
    if (Array.isArray(partsArray) !== true) {
      if (typeof partsArray === "string" || typeof partsArray === "number") {
        super(new Part(partsArray));
      }
    }

    if (Array.isArray(partsArray) === true) {
      const parts = partsArray.map(part => new Part(part));
      super(...parts);
    }

  }

  get quoteTokens() {
    return this.quotedSegments.map(segment => segment.quoteToken);
  }

  get quotedSegments() {
    return this.filter(segment => segment.isQuoted);
  }

  getQuoteTokens() {
    return this.quoteTokens;
  }

  each(fn) {
    let index = 0;
    for (const part of this) {
      fn(part, index++, this);
    }
  }

  push(...args) {
    const parts = args.map(arg => new Part(arg));
    return super.prototype.push.call(this, ...parts)
  }

  countQuotedParts() {
    const parts = this; //Just a reminder that this is an  class
    parts.each((part) => {
      const count = 0;
      if (part.isQuoted) {
        count++;
      }
    });
    return count;
  }

  countQuoteTokens() {
    const quoteTokens = new Set();
    this.each((part) => {
      if (part.isQuoted) {
        quoteTokens.add(part.quoteToken);
      }
    });
    return quoteTokens.size;
  }
}



class Detect {

  constructor(line) {
    this.createSingleLineSegments(line);
  }

  get segments() {
    return this.parts;
  }

  get quotedSegments() {
    return this.segments.quotedSegments;
  }

  /**
   * Creates all segments of a given line of code or text
   * @param  {string} line The single line in consideration
   * @return {Test}      Returns the object instance
   */
  createSingleLineSegments(line) {
    if (typeof line !== "string" && typeof this.line !== "string") {
      throw ("createSingleLineSegments: no line specified")
    }

    if (!line && this.line) {
      line = this.line;
    }

    this.line = line;

    // This regex covers all three JavaScript quotes cases eg ', ", `
    const regex = REGEXPs.matchQuotesWithQuotedContents;
    const quotedParts = line.match(regex);
    const temp = line.replace(regex, "###detect###quotes###slot").split("###detect");
    let index = 0;
    const parts = [];

    for (const part of temp) {
      if (part.indexOf("###quotes###slot") != -1) {
        parts.push(quotedParts[index++], part.replace("###quotes###slot", ""));
        continue;
      }
      parts.push(part);
    }

    this.parts = new Parts(parts);

    return this;
  }

  /**
   * Check if the default quote token is single quote
   * @param  {strin} line The given line
   * @return {Boolean} True or false
   */
  isSingleQuotes(line) {
    /* if (!line && this.line) {
       throw ("testSingleQuotes: specified argument is not a string");
     }*/
    this.createSingleLineSegments(line);
    const quoteTokens = this.quotedSegments.getQuoteTokens();
    if (quoteTokens.length == 1 && quoteTokens[0] == "'") {
      return true;
    }
    return false
  }

  /**
   * Check if the default quote token is qouble quote
   * @param  {string} line The given line
   * @return {Boolean} True or false
   */
  isDoubleQuotes(line) {
    this.createSingleLineSegments(line);
    const quoteTokens = this.quotedSegments.getQuoteTokens();
    if (quoteTokens.length == 1 && quoteTokens[0] == '"') {
      return true;
    }
    return false
  }

  /**
   * Check if the default quote token is tilda
   * @param  {string} line The given line
   * @return {Boolean} True or false
   */
  isTildaQuotes(line) {
    this.createSingleLineSegments(line);
    const quoteTokens = this.quotedSegments.getQuoteTokens();
    if (quoteTokens.length == 1 && quoteTokens[0] == "`") {
      return true;
    }
    return false
  }

  isMixedQuotes(line) {
    this.createSingleLineSegments(line);
    const quoteTokens = this.quotedSegments.getQuoteTokens();
    if (quoteTokens.length > 1) {
      return true;
    }
    return false
  }

}


module.exports = Detect;