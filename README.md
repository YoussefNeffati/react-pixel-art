
# Pixel Art Projet

## Réalisé par 
- DIEYE Khadidiatou
- DIALLO Fatoumata Binta
- KHALIFA Hassen
- NEFFATI Youssef

Ce projet a pour but de développer une application de dessin (pixel art) collaboratif. Chaque utilisateur peut colorier un unique pixel toutes les x minutes / secondes, en choisissant un nombre de couleur limité. Le dessin a une durée de vie, c'est à dire qu'à partir d'une date, il n'est plus possible de dessiner et le dessin est considéré comme terminé.

## Pages du site

### Accueil
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/accueil.PNG?raw=true)

![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/Dessiner.PNG?raw=true)

### Login/Inscription
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/Login.PNG?raw=true)

### allBoard
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/ListPixels.PNG?raw=true)

### boardPixelAndDetails
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/DetailPixel.PNG?raw=true)

### admin
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/PageAdmin.PNG?raw=true)

![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/ListPixelsAdmin.PNG?raw=true)

### Mon compte
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/MonCompte.PNG?raw=true)

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