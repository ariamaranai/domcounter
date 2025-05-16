chrome.tabs.query({ active: !0, currentWindow: !0 }, tab =>
  chrome.userScripts.execute({
    target: { tabId: tab[0].id },
    js: [{ code:
`(() => {
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

  let html = "TOTAL: <u>" + (elementCounter + textCounter + commentCounter) + "</u>\\n" +
    "ELEMENT_NODE: <u>" + elementCounter +
    "</u>\\nTEXT_NODE: <u>" + textCounter +
    "</u>\\nCOMMENT_NODE: <u>" + commentCounter + "</u>\\n\\n";
  let entries = Object.entries(tagCounter).sort((a, b) => a[1] < b[1] || -1);
  let i = 0;
  
  while (
    html += (x = entries[i])[0] + ": <u>" + x[1] + "</u>\\n",
    ++i < entries.length
  );
  
  return html;
})();`
    }]
  }).then(results =>
    document.body.innerHTML = results[0].result
  ).catch(() => 0)
);