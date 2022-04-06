# NetFlex

## Description
Recréer une application web comme Netflix pour s'entrainer et apprendre les technos niveau soft / web

## Technologies utilisées
- Docker (pour que l'application puisse être déployable sans aucun soucis) :
	- docker-compose => pour relier toutes les parties de l'application
	- Dockerfile => Pour conteneuriser chaque partie de l'application
- Postman => Pour tester l'API backend

### Frontend
- ReactJS
- HTML
- CSS
- JavaScript
- TailwindCSS

### Backend
- NodeJS
- JavaScript
- ExpressJS

### Base de données
- MariaDB
- PhpMyAdmin
- SQL

## Schema base de donnée
*netflex.sql :*
```sql
CREATE DATABASE IF NOT EXISTS netflex
    COLLATE utf8mb4_unicode_ci;

USE netflex;

CREATE TABLE IF NOT EXISTS user
(
    id BIGINT unsigned NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    nickname VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    create_at DATETIME NOT NULL DEFAULT current_timestamp,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS films
(
    id BIGINT unsigned NOT NULL AUTO_INCREMENT,
    show_id VARCHAR(255) UNIQUE,
    type VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255),
    cast text,
    country VARCHAR(100) NOT NULL,
    date_added DATETIME NOT NULL,
    release_year VARCHAR(4) NOT NULL,
    rating VARCHAR(5) NOT NULL,
    duration VARCHAR(10) NOT NULL,
    listed_in VARCHAR(100) NOT NULL,
    description text NOT NULL,
    picture text NOT NULL,
    PRIMARY KEY (id)
);
```

## Installation

- At the root of the project
```bash
cat netflex.sql | mysql -u root -p
```

- In ./backend directory
Install all the dependencies:
```bash
npm install
```

Import films from movies.json into the database:
```bash
node json_to_db.js
```
(You can use Ctrl-C after the database connection message in the terminal)

Then, start API:

with Nodemon:
```bash
npm run dev
```
or:
```bash
npm run start
```

- In ./frontend directory
Install all the dependencies:
```
npm install
```

then, start the react app:
```bash
npm start
```
React will automatically redirect you to the home page of the website

## Routes Backend *(en développement)*
|Route|Method|Protected|Description|
|-----|------|---------|-----------|
|/register|POST|NO|Register a new user|
|/login|POST|NO|Connect a user|
||||
|/films|GET|YES|Get **all** movies and tv shows in the database|
|/type|POST|YES|Get **10** movies or tv shows depending on type given in the request body|
|/movies|GET|YES|Get **all** movies|
|/tv_shows|GET|YES|Get **all** tv shows|

## Routes Frontend *(en développement)*
### **`` netflex.com/ ``**
> Home of the website. You can register you if you are not logged in. Else you can show out selection of movies and tv shows<br/><br/>
> *Logged In* :
![Home Logged In](assets/home_logged_in.png)<br/><br/>
*Not Logged In* :
![Home Not Logged In](assets/home_not_logged_in.png)


### **``netflex.com/login``**
> Login page
![Login](assets/login.png)

### **``netflex.com/register``**
> Register page
![Register](assets/register.png)

### **``netflex.com/movies``**
> All movies with filter
![Movies](assets/movies.png)

### **``netflex.com/tvshows``**
> All tv shows with filter
![](assets/tvshows.png)