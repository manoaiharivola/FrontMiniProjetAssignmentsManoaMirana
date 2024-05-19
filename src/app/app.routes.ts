import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './users/login/login.component';
import { DataRoutingConst } from './data/constant/data-routing.const';
import { AuthComponent } from './layout/components/auth/auth.component';

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
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];
