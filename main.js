(() => {
  let walker = document.createTreeWalker(document.documentElement, 133);
  let elementCounter = 0;
  let textCounter = 0;
  let commentCounter = 0;
  let tagCounter = {};
  let node = walker.currentNode;
  while (node) {
    let type = node.nodeType;
    if (type == 1) {
      let tagName = node.tagName.toLowerCase();
      tagCounter[tagName] ??= 0;
      ++tagCounter[tagName];
      ++elementCounter;
    } else
      type == 3 ? ++textCounter : ++commentCounter;
    node = walker.nextNode();
  }
  return [["TOTAL", elementCounter + textCounter + commentCounter], ["ELEMENT_NODE", elementCounter], ["TEXT_NODE", textCounter], ["COMMENT_NODE", commentCounter]].concat(Object.entries(tagCounter).sort((a, b) => a[1] < b[1] ? 1 : -1));
})();