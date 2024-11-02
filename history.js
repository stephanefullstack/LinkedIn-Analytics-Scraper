// Fonction pour charger et afficher l'historique
function loadHistory() {
  chrome.storage.local.get("scrapeHistory", (result) => {
    const scrapeHistory = result.scrapeHistory || [];
    const groupedData = {};

    // Regrouper les données par postText
    scrapeHistory.forEach(item => {
      const { postText, impressions, dateScraped, timeScraped } = item;

      if (!groupedData[postText]) {
        groupedData[postText] = [];
      }
      groupedData[postText].push({ impressions, dateScraped, timeScraped });
    });

    // Construire l'HTML pour afficher l'historique
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = ""; // Effacer le contenu existant
    Object.keys(groupedData).forEach(postText => {
      const postSection = document.createElement("div");
      postSection.className = "post-section";

      // Ajouter le postText
      const postTitle = document.createElement("h2");
      postTitle.textContent = `Post: ${postText}`;
      postSection.appendChild(postTitle);

      // Ajouter les détails de chaque scraping pour ce postText
      groupedData[postText].forEach(scrap => {
        const scrapDiv = document.createElement("div");
        scrapDiv.className = "scrap-data";
        scrapDiv.innerHTML = `
          <p>Impressions: ${scrap.impressions}</p>
          <p>Date: ${scrap.dateScraped}</p>
          <p>Heure: ${scrap.timeScraped}</p>
        `;
        postSection.appendChild(scrapDiv);
      });

      historyDiv.appendChild(postSection);
    });
  });
}

// Charger l'historique au démarrage
loadHistory();

// Écouter les messages pour actualiser l'historique en temps réel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateHistory") {
    loadHistory();
  }
});
