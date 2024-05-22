import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { HttpStatusConst } from '../../shared/constant/http-status.const';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { LocalStorageConst } from '../../shared/constant/local-storage.const';
import { Router } from '@angular/router';
import { DataErrorConst } from '../../data/constant/data-error.const';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';
import { DataRoutingConst } from '../../data/constant/data-routing.const';

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
    private snackBarService: SnackBarService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl('etudiant'),
    });
  }

  ngOnInit(): void {}

  login() {
    const userInformations = {
      mail: this.loginForm.value.email,
      mdp: this.loginForm.value.password,
    };

    if (this.loginForm.value.role === 'etudiant') {
      this.loginEtudiant(userInformations);
    } else if (this.loginForm.value.role === 'professeur') {
      this.loginProfesseur(userInformations);
    }
  }

  loginEtudiant(userInformations: { mail: string; mdp: string }) {
    this.authService.login(userInformations).subscribe({
      next: (res) => {
        this.localStorageService.setItem(
          LocalStorageConst.ACCESS_TOKEN,
          res.access_token
        );
        this.router.navigate(['/home']);
      },
      error: (res) => {
        this.snackBarService.openErrorSnackBar(res.error.message);
      },
      complete: () => {},
    });
  }

  loginProfesseur(userInformations: { mail: string; mdp: string }) {
    this.authService.loginProfesseur(userInformations).subscribe({
      next: (res) => {
        this.localStorageService.setItem(
          LocalStorageConst.TEACHER_ACCESS_TOKEN,
          res.teacher_access_token
        );
        this.router.navigate(['/professeur/matieres']);
      },
      error: (res) => {
        this.snackBarService.openErrorSnackBar(res.error.message);
      },
      complete: () => {},
    });
  }
}
