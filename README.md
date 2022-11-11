# Docker Compose Nodejs and MySQL

## Lancer le projet
On peut facilement lancer tout le projet avec une seule commande :
```bash
docker-compose up
```

Docker will pull the MySQL and Node.js images (if our machine does not have it before).

Docker crée les images MySQL et Node.js (si notre machine ne l'a pas avant).
```bash
docker-compose up -d
```

## Arrêter le projet
L'arrêt de tous les conteneurs en cours d'exécution est également simple avec une seule commande :
```bash
docker-compose down
```

Si vous devez arrêter et supprimer tous les conteneurs, réseaux et toutes les images utilisées par n'importe quel service dans le fichier <em>docker-compose.yml</em>, utilisez la commande :
```bash
docker-compose down --rmi all
```
