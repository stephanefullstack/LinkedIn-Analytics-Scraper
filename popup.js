document.getElementById("download").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "downloadHistory" }, response => {
    console.log(response.status);
  });
});

document.getElementById("scrape").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "startScraping" }, response => {
    console.log(response.status);
  });
});

document.getElementById("viewHistory").addEventListener("click", () => {
  chrome.tabs.create({ url: chrome.runtime.getURL("history.html") });
});
