console.log("Script de scraping chargé dans l'onglet LinkedIn Analytics.");

// Fonction de scraping
async function scrapeData() {
  const postContainers = document.querySelectorAll('a.ember-view.member-analytics-addon__mini-update-item');
  const scrapedData = [];

  const now = new Date();
  const dateScraped = now.toLocaleDateString(); // Date format: DD/MM/YYYY
  const timeScraped = now.toLocaleTimeString(); // Time format: HH:MM:SS

  postContainers.forEach((container, index) => {
    if (index < 10) {  // Limiter à 10 posts, modifiez si nécessaire
      const postTextElement = container.querySelector('span[dir="ltr"]');
      const impressionsElement = container.querySelector('.member-analytics-addon__cta-list-item-title');

      let postText = postTextElement ? postTextElement.innerText : "";

      // Extraire la première ligne et retirer les virgules
      postText = postText.split("\n")[0].substring(0, 100).replace(/,/g, "");

      const impressions = impressionsElement ? impressionsElement.innerText : "0";

      scrapedData.push({
        postText,
        impressions,
        dateScraped,
        timeScraped
      });
    }
  });

  // Récupérer l'historique existant, ajouter les nouvelles données, et sauvegarder
  chrome.storage.local.get({ scrapeHistory: [] }, (result) => {
    const updatedHistory = result.scrapeHistory.concat(scrapedData);
    chrome.storage.local.set({ scrapeHistory: updatedHistory }, () => {
      console.log("Données de scraping ajoutées à l'historique.");
    });
  });
}

// Écouter le message de `background.js` pour commencer le scraping
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "scrapeData") {
    scrapeData();
    sendResponse({ status: "Données scrappées." });
  }
});
