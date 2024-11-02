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
      groupedData[postText].push({ impressions: parseInt(impressions), dateTime: `${dateScraped} ${timeScraped}` });
    });

    // Construire les données pour le graphique global
    const globalDatasets = [];
    Object.keys(groupedData).forEach((postText, index) => {
      const labels = groupedData[postText].map(scrap => scrap.dateTime);
      const data = groupedData[postText].map(scrap => scrap.impressions);

      globalDatasets.push({
        label: postText,
        data: data,
        borderColor: `hsl(${index * 50 % 360}, 70%, 50%)`, // Couleur unique par post
        fill: false,
        tension: 0.1
      });
    });

    // Créer le graphique global
    const globalCtx = document.getElementById('global-chart').getContext('2d');
    new Chart(globalCtx, {
      type: 'line',
      data: {
        labels: [...new Set(scrapeHistory.map(item => `${item.dateScraped} ${item.timeScraped}`))], // Toutes les dates/horaires uniques
        datasets: globalDatasets
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date et heure'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Impressions'
            }
          }
        }
      }
    });

    // Construire l'HTML pour afficher l'historique et les graphiques individuels
    const historyDiv = document.getElementById("history");
    historyDiv.innerHTML = ""; // Effacer le contenu existant
    Object.keys(groupedData).forEach((postText, index) => {
      const postSection = document.createElement("div");
      postSection.className = "post-section";

      // Ajouter le postText
      const postTitle = document.createElement("h2");
      postTitle.textContent = `Post: ${postText}`;
      postSection.appendChild(postTitle);

      // Créer un conteneur pour le graphique individuel
      const chartContainer = document.createElement("div");
      chartContainer.className = "chart-container";
      const canvas = document.createElement("canvas");
      canvas.id = `chart-${index}`;
      chartContainer.appendChild(canvas);
      postSection.appendChild(chartContainer);

      // Ajouter les détails de chaque scraping pour ce postText
      groupedData[postText].forEach(scrap => {
        const scrapDiv = document.createElement("div");
        scrapDiv.className = "scrap-data";
        scrapDiv.innerHTML = `
          <p>Impressions: ${scrap.impressions}</p>
          <p>Date et heure: ${scrap.dateTime}</p>
        `;
        postSection.appendChild(scrapDiv);
      });

      historyDiv.appendChild(postSection);

      // Créer le graphique individuel pour ce postText
      const labels = groupedData[postText].map(scrap => scrap.dateTime);
      const data = groupedData[postText].map(scrap => scrap.impressions);

      new Chart(canvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre d\'impressions',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date et heure'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Impressions'
              }
            }
          }
        }
      });
    });
  });
}

// Charger l'historique au démarrage
loadHistory();

// Écouter les messages pour actualiser l'historique en temps réel et le compte à rebours
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateHistory") {
    loadHistory();
  } else if (request.action === "updateTimer") {
    const countdownElement = document.getElementById("countdown");
    if (countdownElement) {
      const seconds = Math.floor((request.timeRemaining / 1000) % 60);
      const minutes = Math.floor((request.timeRemaining / 1000) / 60);
      countdownElement.textContent = `Prochain scraping dans : ${minutes}m ${seconds}s`;
    }
  }
});
