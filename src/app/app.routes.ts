import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { ProfesseurAuthGuard } from './shared/professeur-auth.guard';
import { LoginComponent } from './utilisateurs/login/login.component';
import { DataRoutingConst } from './data/constant/data-routing.const';
import { AuthComponent } from './layout/components/auth/auth.component';
import { ProfesseurTemplateComponent } from './layout/components/professeur/professeur-template/professeur-template.component';
import { ProfesseurMatieresComponent } from './professeur/professeur-matieres/professeur-matieres.component';
import { ProfesseurMatieresEtudiantsComponent } from './professeur/professeur-matieres/professeur-matieres-etudiants/professeur-matieres-etudiants.component';
import { ProfesseurDevoirsComponent } from './professeur/professeur-devoirs/professeur-devoirs.component';
import { ProfesseurDevoirsDetailsComponent } from './professeur/professeur-devoirs/professeur-devoirs-details/professeur-devoirs-details.component';
import { EtudiantDevoirsComponent } from './etudiant/etudiant-devoirs/etudiant-devoirs.component';
import { EtudiantTemplateComponent } from './layout/components/etudiant/etudiant-template/etudiant-template.component';
import { EtudiantAuthGuard } from './shared/etudiant-auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: DataRoutingConst.ROUTE_LOGIN, pathMatch: 'full' },
  { path: 'home', component: AssignmentsComponent },
  { path: 'add', component: AddAssignmentComponent },
  { path: 'assignments/:id', component: AssignmentDetailComponent },
  {
    path: 'assignments/:id/edit',
    component: EditAssignmentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'authentication',
    component: AuthComponent,
    children: [
      {
        path: 'connexion',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'etudiant',
    component: EtudiantTemplateComponent,
    canActivate: [EtudiantAuthGuard],
    children: [
      {
        path: 'devoirs',
        component: EtudiantDevoirsComponent,
      },
    ],
  },
  {
    path: 'professeur',
    component: ProfesseurTemplateComponent,
    canActivate: [ProfesseurAuthGuard],
    children: [
      { path: 'matieres', component: ProfesseurMatieresComponent },
      {
        path: 'matieres/:id/etudiants',
        component: ProfesseurMatieresEtudiantsComponent,
      },
      {
        path: 'devoirs',
        component: ProfesseurDevoirsComponent,
      },
      {
        path: 'devoirs/:id',
        component: ProfesseurDevoirsDetailsComponent,
      },
    ],
  },
];
