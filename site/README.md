# CSGO ESGI
Site web pour l'association csgo de l'esgi.

## First Install
Après avoir récupéré le repository, copiez le fichier `.env.dist` à la racine vers le fichier `.env` :

```shell
cp .env.dist .env
```

Puis le fichier , copiez le fichier `config/nginx/project.conf.dist` à la racine vers le fichier `config/nginx/project.conf` :

```shell
cp config/nginx/project.conf.dist config/nginx/project.conf
```

Ensuite, lancez simplement les commandes docker suivantes :

```shell
docker-compose build
docker-compose up -d
```

Puis, dès les containers montés, vous connectez au service `php` afin d'initialiser l'app (Laravel) :

```shell
docker-compose exec php bash
composer install
php artisan key:generate //générer la clé d'application
```

Ensuite verifiez le .env et modifiez APP_URL et les DB_ avec les bonnes valeurs

```dotenv
APP_URL=csgo-esgi.fr
DB_USERNAME=db
DB_PASSWORD=db
```

Pour finir, modifiez vos `hosts` pour ajouter les suivants :

```shell
# PROJECT NAME
127.0.0.1	csgo-esgi.fr
```

## Usage

Pour lancer le docker :

```shell
docker-compose start
```

Pour couper le docker :

```shell
docker-compose stop
```

Pour se connecter à un service :

```shell
docker-compose exec service bash
```
