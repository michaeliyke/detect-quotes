// matchQuotesWithQuotedContents: /(["'`])((?:(?!\1)[^\\]|(?:\\\\)*\\[^\\])*)\1/g,
  /*
  Managable: I would have to crop out the trailing parts by hand so error prone
   */
  // matchQuotesWithQuotedContents: /(["'`])(?:(?=(\\?))\1.)*?\1/g, //Works same way, get actual text within the quotes
  // matchQuotesWithQuotedContents: /(['`"])((\\\1|.)*?)\1/gm, //Works same way, performant 
  
const REGEXPs = {
  matchQuotesWithQuotedContents: /(?=["'`])(?:"[^"\\]*(?:\\[\s\S][^"\\]*)*"|`[^`\\]*(?:\\[\s\S][^`\\]*)*`|'[^'\\]*(?:\\[\s\S][^'\\]*)*')/,
  matchQuotesWithQuotedContents: /(["'`])(.*?[^\\])\1/g, //Works same way - BAD ASS!!!
};

module.exports = REGEXPs;

// Test string: const email = 'Xtra Pac Telekom' + "web'n'walk" + `Stick Basic für 9,95`;