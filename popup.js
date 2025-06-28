chrome.tabs.query({ active: !0, currentWindow: !0 }, async tab => {
  try {
    let { result } = (await chrome.userScripts.execute({
      target: { tabId: tab[0].id },
      js: [{ file: "main.js" }]
    }))[0];
    let { body } = document;
    body.firstChild.textContent += result[0];
    body.lastChild.textContent += result[1];
  } catch {}
});