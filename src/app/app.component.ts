import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AuthService } from './shared/services/auth.service';
import { AssignmentsService } from './shared/services/assignments.service';
import { LoginComponent } from './utilisateurs/login/login.component';
import { AuthComponent } from './layout/components/auth/auth.component';
import { SnackBarComponent } from './shared/components/snack-bar/snack-bar.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    AssignmentsComponent,
    AppComponent,
    LoginComponent,
    AuthComponent,
    SnackBarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Application de gestion des assignments';

  constructor(
    private authService: AuthService,
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  login() {
    // on utilise le service d'autentification
    // pour se connecter ou se déconnecter
    if (!this.authService.loggedIn) {
      this.authService.logIn();
    } else {
      this.authService.logOut();
      // on navigue vers la page d'accueil
      this.router.navigate(['/home']);
    }
  }

  genererDonneesDeTest() {
    // on utilise le service
    /* VERSION NAIVE
    this.assignmentsService.peuplerBD();
    */
    // VERSION AVEC Observable
    /*this.assignmentsService.peuplerBDavecForkJoin().subscribe(() => {
      console.log(
        'Données générées, on rafraichit la page pour voir la liste à jour !'
      );
      window.location.reload();
      // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
      // this.router.navigate(['/home'], {replaceUrl:true});
    });*/
  }
}
