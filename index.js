
class Part extends String {

  constructor(part) {
    super(part); //This creates the string on this
    this.part = part;
  }

  /**
   * Show is part starts with given token
   * @param  {string} token Token string to compare
   * @return {Boolean}       Return true or false
   */
  startsWith(token) {
    const part = this.segment.trim();
    return part.charAt(0) == token;
  }

  /**
   * Show is part starts with given token
   * @param  {string} token Token string to compare
   * @return {Boolean} True or false
   */
  endsWith(token) {
    const part = this.part.trim();
    return part.charAt(part.length - 1) == token;
  }

  get startToken() {
    const part = this.part.trim();
    return part.charAt(0);
  }

  get endToken() {
    const part = this.part.trim();
    return part.charAt(part.length - 1);
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
    const startToken = this.startToken;
    const endToken = this.endToken;
    return startToken != endToken ? null : startToken;
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
    const part = this;
    const startToken = part.startToken;
    const endToken = part.endToken;
    return startToken == endToken
      && this.quotes.indexOf(startToken) != -1;
  }

}


class Parts extends Array {

  constructor(...args) {
    super(...args);
  // this.parts = [];
  }

  each(fn) {
    // for (const part of this.parts) {
    for (const part of this) {
      fn(part);
    }
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
    const quoteTokens = new set();
    this.each((part) => {
      if (part.isQuoted) {
        quoteTokens.push(part.quoteToken);
      }
    });
    return quoteTokens.length;
  }
}


class Test {

  constructor() {
    this.parts = new Parts();
  }

  /**
   * Creates all segments of a given line of code or text
   * @param  {string} line The single line in consideration
   * @return {Test}      Returns the object instance
   */
  createSingleLineSegments(line) {}

  testSingleQuotes(line) {
    // if all is within '', you win => /(^'.*?'$)/

    // if there are several strings in a line, 
    // . . check they're all quoted single => /('.*?')/g
    // OR /('[^]*?')/g

    // see if they're mixed and indicate what mixes that is
    // .match(/(['"`].*?['"`])/g) 
    // OR .match(/['"`].*?['"`]/g)
    // OR .match(/['"`](.*?)['"`]/g)
  }

  testDoubleQuotes(line) {}

  testTilderQuotes(line) {}

}