chrome.tabs.query({ active: !0, currentWindow: !0 }, async tab => {
  try {
    let d = document;
    let { result } = (await chrome.userScripts.execute({
      target: { tabId: tab[0].id },
      js: [{ file: "main.js" }]
    }))[0];
    let i = 0;
    while (i < result.length)
      d.body.appendChild(d.createElement("p")).textContent = result[i][0] + "\n" + result[i][1],
      ++i;
  } catch {}
});