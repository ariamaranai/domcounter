(() => {
  let x = document;
  let walker = x.createTreeWalker(x.documentElement, 133);
  let elementCounter = 0;
  let textCounter = 0;
  let commentCounter = 0;
  let tagCounter = {};
  let { currentNode } = walker;

  while (
    currentNode = walker.nextNode(
      (x = currentNode.nodeType) == 1
        ? (tagCounter[x = currentNode.tagName.toLowerCase()] ??= 0, ++tagCounter[x], ++elementCounter)
        : x == 3
          ? ++textCounter
          : ++commentCounter
    )
  );

  let left = "";
  let right =
    (elementCounter + textCounter + commentCounter) + "\n" +
    elementCounter + "\n" +
    textCounter + "\n" +
    commentCounter + "\n\n";
  let entries = Object.entries(tagCounter).sort((a, b) => a[1] < b[1] || -1);
  let i = 0;

  while (
    left += (x = entries[i])[0] + "\n",
    right += x[1] + "\n",
    ++i < entries.length
  );
  return [left += "\n ", right];
})();