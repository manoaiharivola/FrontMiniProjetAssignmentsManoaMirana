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
      email: new FormControl('utilisateur@gmail.com'),
      password: new FormControl('utilisateur'),
    });
  }

  ngOnInit(): void {}

  login() {
    try {
      const userInformations = {
        mail: this.loginForm.value.email,
        mdp: this.loginForm.value.password,
      };
      this.authService.login(userInformations).subscribe({
        next: (res) => {
          this.localStorageService.setItem(
            LocalStorageConst.ACCESS_TOKEN,
            res.access_token
          );
          /*
            this.router.navigate([DataRoutingConst....);*/
          this.router.navigate(['/home']);
        },
        error: (res) => {
          this.snackBarService.openErrorSnackBar(res.error.message);
        },
        complete: () => {},
      });
    } catch (error) {
      this.snackBarService.openErrorSnackBar(DataErrorConst.UNKNOWN_ERROR);
    }
  }
}
