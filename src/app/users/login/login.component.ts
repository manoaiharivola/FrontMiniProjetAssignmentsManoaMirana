import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { HttpStatusConst } from '../../shared/constant/http-status.const';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { LocalStorageConst } from '../../shared/constant/local-storage.const';
import { Router } from '@angular/router';
import { DataErrorConst } from '../../data/constant/data-error.const';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../template/css/vertical-layout-light/style.css',
    '../../template/vendors/css/vendor.bundle.base.css',
    '../../template/vendors/feather/feather.css',
    '../../template/vendors/ti-icons/css/themify-icons.css',
  ],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  theresError: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('utilisateur@gmail.com'),
      password: new FormControl('utilisateur'),
    });
  }

  ngOnInit(): void {}

  openErrorSnackBar(errorMessage: String) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message: errorMessage,
      },
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: 'error',
    });
  }

  login() {
    try {
      const userInformations = {
        mail: this.loginForm.value.email,
        mdp: this.loginForm.value.password,
      };
      this.authService.login(userInformations).subscribe({
        next: (res) => {
          if (res.status > HttpStatusConst.SUCCESS) {
            this.openErrorSnackBar(
              'Echec de la connexion. Vérifiez votre adresse e-mail et votre mot de passe.'
            );
          } else {
            this.localStorageService.setItem(
              LocalStorageConst.ACCESS_TOKEN,
              res.data[0].access_token
            );
            /*
            this.router.navigate([DataRoutingConst....);*/
            this.router.navigate(['/home']);
          }
        },
        error: () => {
          this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
        },
        complete: () => {},
      });
    } catch (error) {
      this.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
    }
  }
}
