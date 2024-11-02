// Créer une alarme toutes les 5 minutes pour déclencher le scraping
chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create("scrapeAlarm", { periodInMinutes: 5 });
});

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

            // Envoyer un message pour indiquer que l'historique est mis à jour
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

// Démarrer le compte à rebours de 5 minutes
let nextScrapeTime = Date.now() + 5 * 60 * 1000; // Prochain scraping dans 5 minutes

// Écouter l'alarme pour lancer le scraping toutes les 5 minutes
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "scrapeAlarm") {
    console.log("Déclenchement automatique du scraping via alarme.");
    openAndScrape();
    nextScrapeTime = Date.now() + 5 * 60 * 1000; // Réinitialiser le compte à rebours
  }
});

// Envoyer le temps restant à `history.js` toutes les secondes
setInterval(() => {
  const timeRemaining = Math.max(0, nextScrapeTime - Date.now());
  chrome.runtime.sendMessage({ action: "updateTimer", timeRemaining });
}, 1000); // Envoyer le temps restant chaque seconde
