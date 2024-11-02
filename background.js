// Fonction pour convertir les données en CSV
function convertToCSV(data) {
  const headers = ["Post Text", "Impressions", "Date Scraped", "Time Scraped"];
  const csvRows = [];

  // Ajouter les en-têtes
  csvRows.push(headers.join(","));

  // Ajouter les données
  data.forEach(row => {
    const values = [
      row.postText,
      row.impressions,
      row.dateScraped,
      row.timeScraped
    ];
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
}

// Fonction pour télécharger l'historique de scraping en CSV
function downloadCSV() {
  chrome.storage.local.get(["scrapeHistory"], result => {
    const scrapeHistory = result.scrapeHistory || [];

    if (scrapeHistory.length === 0) {
      console.log("Aucune donnée disponible pour le téléchargement.");
      return;
    }

    // Convertir l'historique en CSV
    const csvContent = convertToCSV(scrapeHistory);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const reader = new FileReader();

    // Utiliser FileReader pour lire le Blob comme une URL de données
    reader.onload = () => {
      chrome.downloads.download({
        url: reader.result,
        filename: "LinkedIn_Analytics_History.csv",
        saveAs: true
      });
    };

    reader.readAsDataURL(blob);
  });
}

// Fonction principale pour ouvrir un onglet, scrapper et ajouter à l'historique
function openAndScrape() {
  chrome.tabs.create({ url: "https://www.linkedin.com/analytics/creator/top-posts/?metricType=IMPRESSIONS&resultType=DUMMY&timeRange=past_1_year" }, (tab) => {
    const tabId = tab.id;

    // Injecter `content.js` explicitement
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["content.js"]
      },
      () => {
        if (chrome.runtime.lastError) {
          console.error("Erreur d'injection du content script :", chrome.runtime.lastError.message);
          return;
        }

        // Attendre 5 secondes avant de lancer le scraping
        setTimeout(() => {
          chrome.tabs.sendMessage(tabId, { action: "scrapeData" }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Erreur lors de l'envoi du message :", chrome.runtime.lastError.message);
              return;
            }

            console.log("Données de scraping ajoutées à l'historique.");

            // Envoyer un message à toutes les pages ouvertes pour indiquer que l'historique est mis à jour
            chrome.runtime.sendMessage({ action: "updateHistory" });

            // Fermer l'onglet après le scraping
            setTimeout(() => {
              chrome.tabs.remove(tabId);
            }, 2000);
          });
        }, 5000);  // Attendre 5 secondes
      }
    );
  });
}

// Fonction pour déclencher le scraping toutes les 5 minutes
setInterval(() => {
  console.log("Déclenchement automatique du scraping.");
  openAndScrape();
}, 300000); // 300000 millisecondes = 5 minutes

// Écouter un message pour déclencher la séquence complète ou le téléchargement
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startScraping") {
    openAndScrape();
    sendResponse({ status: "Processus de scraping lancé..." });
  } else if (request.action === "downloadHistory") {
    downloadCSV();
    sendResponse({ status: "Téléchargement de l'historique en cours..." });
  }
});
