# Projet Gestion des Devoirs

## Description
Ce projet est une amélioration de notre TP vue en cours avec Mr Buffa sur la gestion des devoirs, développé dans le cadre d'un mini-projet. Il inclut diverses fonctionnalités pour la gestion des devoirs scolaires, l'authentification des utilisateurs, et l'amélioration de l'interface utilisateur. Le projet est hébergé sur Render.com et comprend une vidéo de démonstration.

## Table des matières
- [Installation](#installation)
- [Fonctionnalités](#fonctionnalités)
- [Démo Vidéo](#démo-vidéo)
- [Liens](#liens)
- [Contributions](#contributions)
- [Crédits](#crédits)

## Installation

### Prérequis
- Node.js (version 17.2.1)
- Angular (version 20.11.1)
- MongoDB Atlas

### Étapes d'installation

1. Clonez les dépôts GitHub :
    - Front:
   ```bash
   git clone https://github.com/manoaiharivola/FrontMiniProjetAssignmentsManoaMirana.git
   
   ```

    - Back:
   ```bash
   git clone https://github.com/manoaiharivola/BackMiniProjetAssignmentsManoaMirana.git
   
   ```

2. Installez les dépendances pour le front-end :
   ```bash
   npm install
   ```

3. Installez les dépendances pour le back-end :
   ```bash
   npm install
   ```

4. Configurez votre base de données MongoDB et mettez à jour les variables d'environnement nécessaires dans un fichier `.env`.
    ```code
    DB_URI="mongodb://manoa:manoa@ac-vqs4r23-shard-00-01.iaghwhs.mongodb.net:27017/assignments?authSource=admin&replicaSet=atlas-fxg5p1-shard-0&retryWrites=true&w=majority&appName=Cluster0&ssl=true"
    PORT=2324
    JWT_ACCESS_EXPIRATION_DURATION = 1440 
    JWT_SECRET = "8Se7LMMIf8uqVifWBItR4ylHtdki7r7FYwELk6zmEELskmWGdQ"
   ```

5. Démarrez le serveur back-end :
   ```bash
   npm run start
   ```
   ou
    ```bash
   nodemon server.js
   ```


6. Démarrez le serveur front-end :
   ```bash
   ng serve
   ```

## Fonctionnalités
Nous avons non seulement mis à jour l'interface de l'application, mais aussi ajouté de nouvelles fonctionnalités. Voici un aperçu des fonctionnalités avec des captures d'écran correspondantes :

### Login
- Saisie de l'identifiant (Login)
- Saisie du mot de passe (Mdp)
- Sélection du profil (étudiant ou prof)
- Clic sur le bouton "Se connecter"
  
![Login Screen](screen/login.png)

#### Sécurité (JWT et hachage)
- Dans la base de données, les mots de passe sont hashés lors de l'inscription. Les options de hachage peuvent être configurées dans le fichier .env.
- L'authentification utilise JWT (JSON Web Token), en s'inspirant de nos anciens projets. Les tokens d'accès pour les étudiants (access_token) et les professeurs (professeur_access_token) sont stockés dans le stockage local du navigateur. La durée de validité des tokens est d'un jour (modifiable via le fichier .env).
- Si aucun token d'accès n'est présent dans le stockage local (ce qui signifie que l'utilisateur n'est pas connecté) ou si le token a expiré, l'utilisateur est automatiquement redirigé vers la page de connexion (login).
- De même, si un utilisateur tente d'accéder à un lien nécessitant un token d'accès alors qu'aucun token n'est présent dans le stockage local, il est également redirigé vers la page de connexion (login).

### Inscription
- Saisie du nom
- Saisie du prénom
- Saisie de l'email
- Saisie du mot de passe
- Entrée d'un fichier photo pour le profil
- Sélection du profil (étudiant ou prof)
- Clic sur le bouton "S'inscrire"

![Inscription Screen](screen/inscription.png)

## Étudiants
- Barre horizontale contenant le message de bienvenue avec le nom de l'étudiant connecté
  
![Étudiants Dashboard](screen/bare%20hori.png)

### Tableau de bord
- Affichage de deux listes : les devoirs à rendre et les devoirs rendus

Liste des devoirs à rendre :
  - Nom du devoir
  - Photo illustrant la matière
  - Matière
  - Nom du professeur
  - Photos du professeur
  - Date limite de rendu
  - Icône d'alerte (si "en retard")
  - Ordre d'affichage : devoirs en retard en premier, puis par date limite, et par ordre alphabétique du titre en cas de même date

Liste des devoirs rendus :
  - Nom du devoir
  - Photo illustrant la matière
  - Matière
  - Nom du professeur
  - Photos du professeur
  - Date limite de rendu
  - Date de livraison
  - Date de notation
  - Note
  - Remarque
  - Statut (livré, noté avec la note sur 20)
  - Ordre d'affichage : devoirs rendus non corrigés en premier, puis corrigés, tri par date de rendu et par ordre alphabétique
  
![Devoirs](screen/Liste%20devoir.png)

### Détails Devoir
  - Nom du devoir
  - Photo illustrant la matière
  - Matière
  - Nom du professeur
  - Photos du professeur
  - Date limite de rendu
  - Date de livraison
  - Date de notation
  - Note
  - Remarque
  - Statut (livré, noté avec la note sur 20)
  
![Détails Devoir](screen/detail%20devoir.png)

### Livrer Devoir
- Drag and drop des devoirs de la liste des devoirs à rendre vers la liste des devoirs rendus ou bouton "Livrer"

![Livrer Devoir Drag Drop](screen/rendre.png)


- Pop-up de confirmation pour valider la remise du devoir

![Livrer Devoir pop up confirmation](screen/pop%20up%20confirmation%20rendre.png)


### Notifications
- Notification dans le snackbar à chaque actions importante sur l'application (ajout, modification, suppression, login, logout)

![Notifications](screen/notifications.png)

![Notifications](screen/notification2.png)

### Liste des profs
- Liste des profs avec leurs informations (nom, prénom, email et photos)

![Liste Prof](screen/liste%20prof.png)

### Logout
- Clic sur le bouton "Déconnexion" pour terminer la session
- Le token d'accès de l'étudiant qui se déconnecte est supprimé du stockage local du navigateur, puis il est redirigé vers la page de connexion (login).

![Liste Prof](screen/deco1.png)

### Profs
- Barre horizontale avec le message de bienvenue et le nom du prof connecté
- Barre verticale avec des liens vers : Liste des élèves, Liste des devoirs, Liste des matières
  
![Profs Dashboard](screen/bare%20hor%20prof.png)


### Liste des matières
- Affichage de la liste des matières du professeur 

![Liste des matières](screen/Liste%20des%20matières.png)

### Ajout d'une matière
- Ajout d'une matière avec upload d'une image pour la matière
  
![Ajout des Matières](screen/Ajout%20d'une%20matière.png)

### Liste étudiant inscrit à une matière et mise à jour de cette liste
- Clic sur le bouton "Modifier" dans la liste et séléctionner les étudiant à inscrire à cette matières

![Etudiants inscrit à la Matière](screen/Liste%20des%20étudiants%20matière.png)

### Liste des Devoirs
- Affichage d'un tableau des devoirs appartenant au prof connecté
- Titre, Matière, Date de création, Date limite, Actions possibles (supprimer, modifier, voir détails)
- Filtrable par matière, triable par colonne bouton "Ajouter un nouveau devoir"
- Recherche d'un devoirs possible
  
![Liste des Devoirs](screen/liste%20devoir%20prof.png)

#### Génération de 1000 devoirs
- Pour remplir cette liste, nous avons ajouté 1000 devoirs dans la base de données. Pour générer ces données, nous avons utilisé [Mockaroo](https://www.mockaroo.com/), un outil de génération de données aléatoires et de simulation d'API.

### Détails devoir (Prof)
- Page de détails avec titre, matière, description, date de création, date limite
- Deux listes : étudiants ayant rendu le devoir non notés et notés

#### Scroll infini
- Chacune de ces deux listes (devoirs non notés et devoirs notés) a un scroll infini, ce qui permet de charger les données au fur et à mesure que le professeur scrolle.

![Détails Devoir Prof](screen/liste%20devoir%20rendu.png)


### Noter devoir
- Drag and drop des étudiants de la liste des non notés vers les notés ou bouton "Noter"
- Pop-up de confirmation pour saisir la note et la remarque
  
![Noter Devoir](screen/Noter%20Drag%20and%20drop.png)

![Noter Devoir](screen/Pop%20up%20noter.png)

### Ajout Devoir
- Formulaire stepper pour l'ajout de devoirs avec sélection de la matière, saisie , et sélection de la date limite
  
![Ajout Devoir 1](screen/Ajout%20devoir.png)

![Ajout Devoir 2](screen/Ajout%20assignments%202.png)

![Ajout Devoir 3](screen/ajout%20devoir%203.png)

![Ajout Devoir 4](screen/ajout%20devoir%204.png)


### Modifier devoir
- Formulaire pour modifier les informations sur le devoir
  
![Modifier Devoir](screen/Modifier%20devoir.png)

### Supprimer devoirs
- Pop-up de confirmation pour supprimer définitivement le devoir

![Supprimer Devoir](screen/supprimer%20assignments.png)

### Détails Devoir-étudiant
- Pop-up avec les détails de l'étudiant, date de livraison, statut

![Détails Devoir Prof](screen/pop%20up%20det%20devoir%20etu%201.png)

![Détails Devoir Prof](screen/pop%20up%20det%20devoir%20etu%202.png)

### Liste des étudiants
- Liste des étudiants avec leurs informations (nom, prénom, email et photos)

![Liste Prof](screen/Liste%20étudiant%20prof.png)

### Liste des profs
- Liste des profs avec leurs informations (nom, prénom, email et photos)

![Liste Prof](screen/Liste%20des%20profs%20prof.png)

### Logout
- Clic sur le bouton "Déconnexion" pour terminer la session
- Le token d'accès du professeur qui se déconnecte est supprimé du stockage local du navigateur, puis il est redirigé vers la page de connexion (login).

![Logout](screen/logout%20prof.png)

## Démo Vidéo
Vous pouvez visionner la démonstration du projet ainsi que le point remarquable de notre projet via ce [lien vidéo](https://drive.google.com/file/d/1u0vzYbKda1Puqw-DvpTofT75dIidsy4U/view?usp=sharing
).

## Liens
- [Frontend GitHub Repository](https://github.com/manoaiharivola/FrontMiniProjetAssignmentsManoaMirana)
- [Backend GitHub Repository](https://github.com/manoaiharivola/BackMiniProjetAssignmentsManoaMirana)
- [Projet hébergé sur Render.com](https://frontminiprojetassignmentsmanoamirana.onrender.com)

#### Login disponible sur la plateforme hébergé:
- Prof: login: christophe.richard@uca.edu / mdp: chri
- Etudiant: login: hugo.laurent@uca.edu / mdp: hug

## Contributions
Ce projet a été réalisé en binôme par [07 - INALIARIJAONA Ony Mirana](https://github.com/MiranaIns) et [18 - RAKOTOARIMANANA Manoa Iharivola](https://github.com/manoaiharivola).

## Crédits
- Code de base du TP du cours

- Tutoriels et ressources utilisés :
  - [Tutoriel JWT](lien_tutoriel_jwt)
  - Ancien projet que l'on a fait en M1:
       - [Front](https://github.com/manoaiharivola/Front-m1p10android-Mirana-Manoa)
       - [Back](https://github.com/MiranaIns/Front-m1p10mean-Mirana-Manoa)
    
  - [Upload file - Ancien projet M1 aussi](https://github.com/MiranaIns/Back-m1p10android-Mirana-Manoa)

  - Assistance via ChatGPT (Debug, Import,... )



