# Assignments Management System

## Description
Ce projet est une amélioration de notre TP vue en cours avec Mr Buffa sur la gestion des assignments, développé dans le cadre d'un mini-projet. Il inclut diverses fonctionnalités pour la gestion des devoirs scolaires, l'authentification des utilisateurs, et l'amélioration de l'interface utilisateur. Le projet est hébergé sur Render.com et comprend une vidéo de démonstration.

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
   cd frontend
   npm install
   ```

3. Installez les dépendances pour le back-end :
   ```bash
   cd backend
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
   npm server.js
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
  
![Assignments](screen/Liste%20devoir.png)

### Détails assignment
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
  
![Détails Assignment](screen/detail%20devoir.png)

### Livrer assignment
- Drag and drop des devoirs de la liste des devoirs à rendre vers la liste des devoirs rendus ou bouton "Rendre assignments"
- Pop-up de confirmation pour valider la remise du devoir

![Livrer Assignment](path/to/livrer/assignment.png)

### Notifications
- Notification dans le snackbar à chaque fois qu'un assignment rendu est noté et à chaque nouvel assignment à rendre
- Liste historique des notifications

![Notifications](path/to/notifications.png)

### Logout
- Clic sur le bouton "Se déconnecter" pour terminer la session

### Profs
- Barre horizontale avec le message de bienvenue et le nom du prof connecté
- Barre verticale avec des liens vers : Liste des élèves, Liste des assignments, Liste des matières
  
![Profs Dashboard](path/to/profs/dashboard.png)

### Liste des assignments
- Affichage d'un tableau des assignments appartenant au prof connecté
- Titre, Matière, Date de création, Date limite, Actions possibles (supprimer, modifier, voir détails)
- Filtrable par matière, bouton "Ajout Assignement"
  
![Liste des Assignments](path/to/liste/assignments.png)

### Détails assignment (Prof)
- Page de détails avec titre, matière, description, date de création, date limite
- Deux listes : étudiants ayant rendu l'assignment non notés et notés

![Détails Assignment Prof](path/to/details/assignment_prof.png)

### Noter assignment
- Drag and drop des étudiants de la liste des non notés vers les notés ou bouton "Noter assignments"
- Pop-up de confirmation pour saisir la note et la remarque
  
![Noter Assignment](path/to/noter/assignment.png)

### Ajout assignment
- Formulaire stepper pour l'ajout d'assignments avec sélection de la matière, saisie des informations, et sélection de la date limite
  
![Ajout Assignment](path/to/ajout/assignment.png)

### Modifier assignment
- Formulaire similaire à l'ajout d'assignments avec champs pré-remplis
  
![Modifier Assignment](path/to/modifier/assignment.png)

### Supprimer assignments
- Pop-up de confirmation pour supprimer définitivement l'assignment

![Supprimer Assignment](path/to/supprimer/assignment.png)

### Détails assignment-étudiant
- Pop-up avec les détails de l'étudiant, date de livraison, statut, et possibilité de noter l'étudiant

![Détails Assignment Étudiant](path/to/details/assignment_etudiant.png)

### Logout
- Clic sur le bouton "Se déconnecter" pour terminer la session

## Démo Vidéo
Vous pouvez visionner la démonstration du projet ainsi que le point remarquable de notre projet via ce [lien vidéo](https://drive.google.com/file/d/1u0vzYbKda1Puqw-DvpTofT75dIidsy4U/view?usp=sharing
).

## Liens
- [Frontend GitHub Repository](https://github.com/manoaiharivola/FrontMiniProjetAssignmentsManoaMirana)
- [Backend GitHub Repository](https://github.com/manoaiharivola/BackMiniProjetAssignmentsManoaMirana)
- [Projet hébergé sur Render.com](https://frontminiprojetassignmentsmanoamirana.onrender.com)

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

  - Assistance via ChatGPT (Debug, Import)



