LinkedIn Analytics Scraper
LinkedIn Analytics Scraper est une extension de navigateur qui collecte automatiquement les statistiques de vos publications LinkedIn depuis l’onglet Analytics et enregistre l’historique des données en local. L'extension effectue un scraping automatique toutes les 5 minutes, en stockant les impressions, la date et l'heure pour chaque publication. Vous pouvez également télécharger l'historique complet des données sous forme de fichier CSV et afficher les données regroupées par publication dans une interface dédiée.

Table des matières
Fonctionnalités
Prérequis
Installation
Utilisation
Structure des fichiers
Contributions
Licence
Fonctionnalités
Scraping automatique : Exécute automatiquement le scraping des statistiques LinkedIn toutes les 5 minutes.
Affichage de l'historique : Visualisez les statistiques historiques regroupées par publication.
Téléchargement de l'historique : Exportez les données de l'historique sous forme de fichier CSV pour une analyse ultérieure.
Mises à jour en temps réel : L'interface d'historique est actualisée automatiquement après chaque scraping.
Prérequis
Navigateur Chromium : Cette extension est compatible avec Google Chrome, Microsoft Edge, ou tout autre navigateur basé sur Chromium.
Compte LinkedIn avec accès aux Analytics : Le module utilise LinkedIn Analytics, assurez-vous d’avoir un compte LinkedIn et d'être connecté pour accéder aux données de votre profil.
Installation
Téléchargez le code source :

Clonez le dépôt depuis GitHub :
bash
Copier le code
git clone https://github.com/votre-utilisateur/linkedin-analytics-scraper.git
Ou téléchargez directement le fichier ZIP depuis GitHub et extrayez-le.
Chargez l'extension dans votre navigateur :

Ouvrez Google Chrome ou tout autre navigateur compatible.
Accédez à chrome://extensions/ dans la barre d'adresse.
Activez le mode développeur (coin supérieur droit).
Cliquez sur Charger l'extension non empaquetée et sélectionnez le dossier extrait du projet.
Configurer les permissions : Assurez-vous que l'extension a accès aux onglets et au site LinkedIn.

Utilisation
Démarrage du scraping :

Une fois l'extension installée, cliquez sur l'icône de l'extension dans la barre de votre navigateur.
Trois boutons sont disponibles :
Scraper les données : Lance un scraping manuel à tout moment.
Télécharger l'historique en CSV : Télécharge tout l'historique des statistiques en un fichier CSV.
Voir l'historique : Ouvre une page de tableau de bord dans un nouvel onglet pour visualiser l'historique des scrapings, regroupé par publication.
Scraping automatique :

L’extension effectue un scraping toutes les 5 minutes sans intervention, même si vous n'êtes pas dans l’onglet LinkedIn Analytics.
À chaque scraping, les nouvelles données sont ajoutées à l’historique de chrome.storage.local.
Affichage de l'historique en temps réel :

Si la page d'historique est ouverte (via le bouton Voir l'historique), elle se mettra à jour automatiquement après chaque scraping.
Les données sont regroupées par publication (postText), avec les impressions, la date et l’heure de chaque scraping.
Structure des fichiers
manifest.json : Décrit les permissions de l'extension, les pages popup et d'options.
popup.html et popup.js : Interface utilisateur pour démarrer le scraping, télécharger les données et visualiser l'historique.
content.js : Script injecté dans la page LinkedIn Analytics pour scrapper les données.
background.js : Gère le scraping automatique toutes les 5 minutes, stocke les données et notifie la page d'historique pour une mise à jour en temps réel.
history.html et history.js : Page de tableau de bord pour afficher l'historique des données, regroupées par publication avec une disposition horizontale des informations.
Contributions
Les contributions sont les bienvenues ! Pour contribuer :

Forkez le dépôt.
Créez une branche spécifique pour votre fonctionnalité : git checkout -b nouvelle-fonctionnalité.
Committez vos modifications : git commit -m 'Ajout de la nouvelle fonctionnalité'.
Poussez votre branche : git push origin nouvelle-fonctionnalité.
Ouvrez une Pull Request.
Licence
Ce projet est sous licence MIT - consultez le fichier LICENSE pour plus de détails.
