let fileHandle;

// Fonction pour ouvrir ou créer un fichier CSV
async function getFileHandle() {
  [fileHandle] = await window.showOpenFilePicker({
    types: [{
      description: 'CSV Files',
      accept: { 'text/csv': ['.csv'] }
    }],
    multiple: false
  });

  if (!fileHandle) {
    console.log("Aucun fichier sélectionné.");
    return;
  }

  console.log("Fichier CSV sélectionné :", fileHandle.name);
}

// Initialiser le fichier CSV avec des en-têtes
async function initializeCSV() {
  const writableStream = await fileHandle.createWritable();
  await writableStream.write("Content,Impressions,ScrapedAt\n"); // En-têtes CSV
  await writableStream.close();
  console.log("Fichier CSV initialisé avec les en-têtes.");
}

// Ajouter des données scrappées au fichier CSV
async function appendDataToCSV(scrapedData) {
  if (!fileHandle) {
    console.error("Le fichier CSV n'est pas sélectionné. Veuillez d'abord choisir un fichier.");
    return;
  }

  // Préparer les nouvelles lignes CSV
  let csvContent = "";
  scrapedData.forEach(data => {
    csvContent += `"${data.content}",${data.impressions},"${data.scrapedAt}"\n`;
  });

  // Ajouter les nouvelles lignes au fichier CSV
  const writableStream = await fileHandle.createWritable({ keepExistingData: true });
  await writableStream.write(csvContent);
  await writableStream.close();

  console.log("Données ajoutées au fichier CSV.");
}

// Exemple d'appel avec des données scrappées
const scrapedPosts = [
  { content: "Exemple de contenu de post 1", impressions: 123, scrapedAt: new Date().toLocaleString() },
  { content: "Exemple de contenu de post 2", impressions: 456, scrapedAt: new Date().toLocaleString() }
];

document.getElementById("chooseCsvButton").addEventListener("click", async () => {
  await getFileHandle();
  await initializeCSV();
  await appendDataToCSV(scrapedPosts);
});

document.getElementById("downloadCsvButton").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "downloadCsv" });
});
