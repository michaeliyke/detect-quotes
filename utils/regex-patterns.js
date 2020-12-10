// Test string: const email = 'Xtra Pac Telekom' + "web'n'walk" + `Stick Basic für 9,95`;
const REGEXPs = {
  matchQuotesWithQuotedContents: /(?=["'`])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|`[^`\\]*(?:\\[\s\S][^`\\]*)*`|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/,
  // matchQuotesWithQuotedContents: /(["'`])((?:(?!\1)[^\\]|(?:\\\\)*\\[^\\])*)\1/g,
  /*
  Managable: I would have to crop out the trailing parts by hand so error prone
   */
  matchQuotesWithQuotedContents: /(["'`])(.*?[^\\])\1/g, //Works same way
  matchQuotesWithQuotedContents: /(["'`])(?:(?=(\\?))\1.)*?\1/g, //Works same way, get actual text within the quotes
  matchQuotesWithQuotedContents: /(['`"])((\\\1|.)*?)\1/gm, //Works same way, performant 
};

module.exports = REGEXPs;