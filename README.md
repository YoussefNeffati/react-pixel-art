# Pixel Art Projet Master 2 MBDS 2022 par DIALLO Fatoumata Binta, DIEYE Khadidiatou, NEFFATI Youssef, KHALIFA Hassen
## Informations générales 
Cette application intitulée **PIXELART** est une application  de dessin (pixel art) collaboratif.
Dans cette application, chaque utilisateur peut colorier un unique pixel toutes les x minutes / secondes, en choisissant un nombre de couleur limité. Le dessin a une durée de vie, c'est à dire qu'à partir d'une date, il n'est plus possible de dessiner et le dessin est considéré comme terminé.

## Profil utilisateur
Nous avons trois profils utilisateurs :
1. L'administrateur gère les utilisateurs ainsi que les PixelBoard. Il peut : 
 Créer un PixelBoard en spécifiant les propriétés dans un formulaire
-  Modifier, Supprimer un PixelBoard
- Afficher, trier, filtrer tous les PixelBoards

2. Le client peut :
- Se connecter / s'incrire
- Voir le nombre d'utilisateur inscrits
- Voir le nombre de PixelBoard créés.
- Voir la prévisualisation du dernier PixelBoard en cours de création
- Modifier le dernier PixelBoard en cours de création
- Créer un pixel board si aucun n'est en cours de création
- Consulter les derniers PixelBoard terminés
- Afficher, trier, filtrer tous les PixelBoards

3. Le visiteur peut:
- s'inscrire
- visualiser le dernier pixelboad en cours.


## Démarrage et compilation
### EN local
Pour démarrer le serveur : se positionner sur le repertoire API sur l'invite de commande:

- Taper la commande suivante pour intaller le node-modules et package-lock.json

```bash
    npm install
```
- Lancer la commande pour démarrer le serveur:
```bash
    node index.js
```
Pour lancer le client: Se positionner sur le repertoire client  sur l'invite de commande et lancer la commande:
```bash
    npm start
```

### Sur docker
## Lancer le projet
On peut facilement lancer tout le projet avec une seule commande :
```bash
docker-compose build
```
Docker crée les images serveur et client (si notre machine ne l'a pas avant).
```bash
docker-compose up
```
## Arrêter le projet
L'arrêt de tous les conteneurs en cours d'exécution est également simple avec une seule commande :
```bash
docker-compose down
```
# Auteur
Cette précieuse application est le résultat d'un travail collaboratif entre les étudiantes au master 2 MBDS à l'université côte d'azur de Nice dont:
- **DIALLO Fatoumata Binta**
- **DIEYE Khadidiatou**
- **KHALIFA Hassen**
- **NEFFATI Youssef**
## Licence
Ce projet est "open source".
## Pages du site
### Accueil
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/accueil.PNG?raw=true)

![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/Dessiner.png?raw=true)

### Login/Inscription
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/Login.png?raw=true)

### allBoard
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/ListPixels.PNG?raw=true)

### boardPixelAndDetails
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/DetailPixel.png?raw=true)

### admin
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/PageAdmin.png?raw=true)

![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/ListPixelsAdmin.png?raw=true)

### Mon compte
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/MonCompte.png?raw=true)

## Fonctionnalités du projet
L'utilisateur à la possibilité de :
- Se connecter / s'incrire
- Voir le nombre d'utilisateur inscrits
- Voir le nombre de PixelBoard créés.
- Voir la prévisualisation du dernier PixelBoard en cours de création
- Modifier le dernier PixelBoard en cours de création
- Créer un pixel board si aucun n'est en cours de création
- Consulter les derniers PixelBoard terminés
- Afficher, trier, filtrer tous les PixelBoards

L'admin à la possibilité de :
- Créer un PixelBoard en spécifiant les propriétés dans un formulaire
-  Modifier, Supprimer un PixelBoard
- Afficher, trier, filtrer tous les PixelBoards


## Versions
Version de node : v14.17.6
Git : version non pertinente

## Technologies
Les technologies utilisées sont :
- React,
- HTML
- CSS
- JS
- nodeJS

## Comment contribuer
Pour contribuer, veuillez demander aux auteurs pour que l'on puisse créer un document contributeur.

## Versionnement
- Version 1
- Version 2 les visiteurs pouront dessiner sur le pixelboard en cours sans pour autant s'inscrire
## Crédit
Pour la réalisation de ce projet, nous nous sommes ressourcées de :
- https://www.bezkoder.com/react-node-express-mongodb-mern-stack/ pour le backend

- https://reactjs.org/docs/getting-started.html pour la docummentation de react.

- Les apports de cours donner par nos professeurs de ce cours. Mr François et Mr Hugo.