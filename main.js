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
  let left = "";
  let right = (elementCounter + textCounter + commentCounter) + "\n" + elementCounter + "\n" + textCounter + "\n" + commentCounter + "\n\n";
  let entries = Object.entries(tagCounter).sort((a, b) => a[1] < b[1] ? 1 : -1);
  let i = 0;
  let x;
  while (
    left += (x = entries[i])[0] + "\n",
    right += x[1] + "\n",
    ++i < entries.length
  );
  
  return [left += "\n ", right];
})();