📊 LinkedIn Analytics Scraper

**LinkedIn Analytics Scraper** est une extension de navigateur puissante qui vous permet de collecter automatiquement les statistiques de vos publications LinkedIn depuis l’onglet Analytics. Le scraping s'effectue automatiquement toutes les 5 minutes, en stockant l'historique complet des impressions, de la date et de l'heure de chaque publication.

> 🚀 **Fonctionnalités** :
> - **Scraping automatique toutes les 5 minutes**
> - **Historique des statistiques** regroupé par publication
> - **Téléchargement CSV** de l'historique complet
> - **Actualisation en temps réel** de l'interface d'historique

---

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Utilisation](#-utilisation)
- [Structure des fichiers](#-structure-des-fichiers)
- [Contributions](#-contributions)
- [Licence](#-licence)

---

## 🌟 Fonctionnalités

- **Scraping Automatique** : Le module déclenche automatiquement le scraping des statistiques LinkedIn toutes les 5 minutes.
- **Affichage de l'Historique** : Visualisez les statistiques passées regroupées par publication dans une interface dédiée.
- **Export CSV** : Téléchargez l'historique des données en un clic pour une analyse ultérieure.
- **Mises à jour en Temps Réel** : L'interface d'historique se met à jour automatiquement après chaque scraping.

## 🔧 Prérequis

- **Navigateur Chromium** : Cette extension est compatible avec Google Chrome, Microsoft Edge ou tout autre navigateur basé sur Chromium.
- **Compte LinkedIn avec accès aux Analytics** : L'extension utilise LinkedIn Analytics, assurez-vous d’être connecté à LinkedIn pour accéder aux données de votre profil.

---

## 🛠️ Installation

1. **Téléchargez le code source** :
   - Clonez le dépôt depuis GitHub : 
     ```bash
     git clone https://github.com/votre-utilisateur/linkedin-analytics-scraper.git
     ```
   - Ou téléchargez le fichier ZIP depuis GitHub et extrayez-le.

2. **Chargez l'extension dans votre navigateur** :
   - Ouvrez **Google Chrome** ou tout autre navigateur compatible.
   - Accédez à `chrome://extensions/` dans la barre d'adresse.
   - Activez le **mode développeur** (coin supérieur droit).
   - Cliquez sur **Charger l'extension non empaquetée** et sélectionnez le dossier extrait du projet.

3. **Configurer les permissions** : Assurez-vous que l'extension a accès aux onglets et à LinkedIn.

---

## 🚀 Utilisation

1. **Démarrage du Scraping** :
   - Après avoir installé l'extension, cliquez sur l'icône dans la barre du navigateur.
   - Trois options sont disponibles :
     - **Scraper les données** : Lance un scraping manuel des statistiques.
     - **Télécharger l'historique en CSV** : Télécharge toutes les données enregistrées sous forme de fichier CSV.
     - **Voir l'historique** : Ouvre une page de tableau de bord dans un nouvel onglet pour visualiser les statistiques passées, regroupées par publication.

2. **Scraping Automatique** :
   - L’extension scrappe automatiquement toutes les 5 minutes.
   - À chaque scraping, les nouvelles données sont ajoutées à l’historique de `chrome.storage.local`.

3. **Affichage de l'Historique en Temps Réel** :
   - Si la page d'historique est ouverte (via le bouton **Voir l'historique**), elle se mettra à jour automatiquement après chaque scraping.
   - Les données sont regroupées par publication (`postText`), avec les impressions, la date et l’heure de chaque scraping.

---

## 📂 Structure des fichiers

- **manifest.json** : Fichier de configuration de l'extension, déclarant les permissions nécessaires et les pages popup.
- **popup.html** et **popup.js** : Interface utilisateur permettant de lancer le scraping, de télécharger les données et de voir l'historique.
- **content.js** : Script injecté dans la page LinkedIn Analytics pour effectuer le scraping.
- **background.js** : Exécute le scraping automatique toutes les 5 minutes, stocke les données et notifie la page d'historique pour une mise à jour en temps réel.
- **history.html** et **history.js** : Page dédiée pour afficher l'historique des données, regroupées par publication.

---

## 🤝 Contributions

Les contributions sont les bienvenues ! Pour contribuer :
1. **Forkez** le dépôt.
2. **Créez une branche** pour votre fonctionnalité : `git checkout -b nouvelle-fonctionnalité`.
3. **Commitez** vos modifications : `git commit -m 'Ajout de la nouvelle fonctionnalité'`.
4. **Poussez** votre branche : `git push origin nouvelle-fonctionnalité`.
5. **Ouvrez une Pull Request** pour soumettre vos changements.

---

## 📜 Licence

Ce projet est sous licence MIT - consultez le fichier [LICENSE](LICENSE) pour plus de détails.

---

🌟 Merci de soutenir ce projet ! N'hésitez pas à **starrer** ⭐️ le dépôt si vous trouvez cette extension utile et partagez vos retours pour l’améliorer !
