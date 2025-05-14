chrome.tabs.query({ active: !0, currentWindow: !0 }, tab =>
  chrome.userScripts.execute({
    target: { tabId: tab[0].id },
    js: [{ code:
`(() => {
  let walker = document.createTreeWalker(document.documentElement, 133);
  let elementCounter = 0;
  let textCounter = 0;
  let commentCounter = 0;
  let tagCounter = {};

  while (walker.nextNode()) {
    let { currentNode } = walker;
    let { nodeType } =  currentNode;
    if (nodeType == 1) {
      let k = currentNode.tagName.toLowerCase();
      let n = tagCounter[k];
      tagCounter[k] = n ? n + 1 : 1;
      ++elementCounter;
    } else if (nodeType == 3)
      ++textCounter;
    else
      ++commentCounter;
  }

  return "element: <u>" +
    elementCounter +
    "</u>\\ntext: <u>" +
    textCounter +
    "\\n</u>comment: <u>" +
    commentCounter +
    "</u>\\n\\n" +
    JSON.stringify(Object.fromEntries(
      Object.entries(tagCounter).sort((a, b) => b[0] < a[0] ? 1 : -1))
    ).slice(1, -1).replaceAll('"', "").replaceAll(",", "</u>\\n").replaceAll(":", ": <u>");
})();`
    }]
  }).then(results =>
    document.body.innerHTML = results[0].result
  ).catch(() => 0)
);