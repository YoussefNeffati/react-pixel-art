# Pixel Art Projet Master 2 MBDS 2022 par DIALLO Fatoumata Binta, DIEYE Khadidiatou, NEFFATI Youssef, KHALIFA Hassen

Lien de la vidéo démo : https://youtu.be/qUa_DrAAi1I
## Informations générales 
Cette application intitulée **PIXELART** est une application  de dessin (pixel art) collaboratif.
Dans cette application, chaque utilisateur peut colorier un unique pixel toutes les x minutes / secondes, en choisissant un nombre de couleur limité. Le dessin a une durée de vie, c'est à dire qu'à partir d'une date, il n'est plus possible de dessiner et le dessin est considéré comme terminé.

## Informations générales


## Profil utilisateur
Nous avons trois profils utilisateurs :

1. L'administrateur gère les utilisateurs ainsi que les PixelBoard. Il peut :
    - Créer un PixelBoard en spécifiant les propriétés dans un formulaire
    -  Modifier, Supprimer un PixelBoard
    - Afficher, trier, filtrer tous les PixelBoards
    - Terminer un pixelboard

2. Le client peut :
    - Se connecter / s'incrire
    - Voir le nombre d'utilisateur inscrits
    - Voir le nombre de PixelBoard créés.
    - Voir la prévisualisation des derniers PixelBoards en cours de création
    - Voir la prévisualisation des derniers pixelsboards terminés
    - Consulter tous les derniers PixelBoard terminés
    - Consulter tous les pixelsboards en cours
    - Choisir un pixelBoard en cours de création et y dessiner
    - Créer un pixel board si aucun n'est en cours de création
    - Afficher, filtrer tous les PixelBoards
    - Voir les informations d'une pixel dessiné( son auteur, sa date de création)

3. Le visiteur peut:
    - s'inscrire
    - Voir le nombre d'utilisateur inscrits
    - Voir le nombre de PixelBoard créés.
    - Voir la prévisualisation des derniers PixelBoards en cours de création
    - Voir la prévisualisation des derniers pixelsboards terminés
    - Consulter tous les derniers PixelBoard terminés
    - Consulter tous les pixelsboards en cours
    - Afficher, filtrer tous les PixelBoards
    - Voir les informations d'une pixel dessiné( son auteur, sa date de création)




## Lancer le projet
### En local
- Taper la commande suivante pour installer le node-modules et package-lock.json côté client et api.
```bash
cd api
npm install
```
```bash
cd client 
npm install --legacy-peer-deps
```
 
Lancer la commande suivante sur le repertoire ``api`` pour démarrer le serveur:
```bash
npm start
```
Puis lancer la commande sur le repertoire ``client`` pour démarrer le client:
```bash
npm start
```

### Sur docker
On peut facilement lancer tout le projet avec deux commandes :  
1.
```bash
docker-compose build
```  
2 .
```bash
docker-compose up
```

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
#### PixelBoards en cours
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/accueil.PNG?raw=true)
#### PixelBoards terminés
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/accueil2.PNG?raw=true)
### SuperPixelBoards
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/superpixelboard.PNG?raw=true)

### Draw
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/Dessiner.png?raw=true)

### Login/Inscription
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/Login.png?raw=true)

### Liste des Pixels Boards
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/ListPixels.PNG?raw=true)

### Admin
#### Paramètres
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/PageAdmin.png?raw=true)
#### Liste des Pixels Boards Admin
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/ListPixelsAdmin.png?raw=true)

### Mon compte
![alt text](https://github.com/YoussefNeffati/react-pixel-art/blob/main/assetsReadme/MonCompte.png?raw=true)

## Fonctionnalités du projet
- Une interface simple et responsive permettant de naviguer dans les différentes pages de l'application,
- Un utilisateur peut se connecter/ s'incrire
- Il peut voir le nombre d'utilisateur inscrits
- Il peut voir le nombre de PixelBoard créés.
- Il peut voir la prévisualisation des derniers PixelBoards en cours de création
- Il peut voir la prévisualisation des derniers PixelBoards terminés
- Il peut voir  tous les derniers PixelBoards en cours de création
- Il peut voir  tous les derniers PixelBoards terminés
- Il peut créer un pixel board si aucun n'est en cours de création
- Il peut consulter les derniers PixelBoard terminés
- Il peut voir les informations d'une pixel dessiné( son auteur, sa date de création)
- Il peut  afficher, filtrer tous les PixelBoards
- Un utilisateur ayant un role admin peut créer un PixelBoard en spécifiant les propriétés dans un formulaire
-  Un utilisateur ayant un role admin peut Modifier, Supprimer un PixelBoard
- Un utilisateur a la possibilité de changer le thème de l'application 
deux thèmes possibles (un light et un dark) 
- Le choix du thème sera sauvegardé dans le navigateur, si je recharge la page le thème est le même.
- le site sera automatiquement proposé en mode dark
- Toutes les opérations crud ont été réalisées côté back via des api rest.
- La base de donnée est stoké en ligne.

## Bonus:

- Un utilisateur peut télécharger un pixel board en cours, terminé ou en prévisualisation.
- L'admin ou l'auteur d'un pixelboard peut terminer un pixelboard avant sa date de fin

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
- MongoDB

## Comment contribuer
Pour contribuer, veuillez demander aux auteurs pour que l'on puisse créer un document contributeur.

## Versionnement
- Version 1
- Version 2 les visiteurs pouront dessiner sur le pixelboard en cours sans pour autant s'inscrire
## Crédit
Pour la réalisation de ce projet, nous nous sommes ressourcées de :
- https://www.bezkoder.com/react-node-express-mongodb-mern-stack/ pour le backend

- https://reactjs.org/docs/getting-started.html pour la docummentation de react.
-  react-jsonschema-form-validation
- Create Simple Login form with React JS code : https://contactmentor.com/login-form-react-js-code/
- How to build a Pixel Art Drawing App in React : https://youtu.be/IAD68la3An8
- Les apports de cours donner par nos professeurs de ce cours. Mr François et Mr Hugo.