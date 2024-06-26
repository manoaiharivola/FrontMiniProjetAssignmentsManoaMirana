import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../shared/services/snack-bar/snack-bar.service';
import { AuthService } from '../../shared/services/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage/local-storage.service';
import { SnackBarComponent } from '../../shared/components/snack-bar/snack-bar.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpStatusConst } from '../../shared/constant/http-status.const';
import { LocalStorageConst } from '../../shared/constant/local-storage.const';
import { DataRoutingConst } from '../../data/constant/data-routing.const';
import { DataErrorConst } from '../../data/constant/data-error.const';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: [
    './inscription.component.css',
    '../../template/css/vertical-layout-light/style.css',
    '../../template/vendors/css/vendor.bundle.base.css',
    '../../template/vendors/feather/feather.css',
    '../../template/vendors/ti-icons/css/themify-icons.css',
  ],
})
export class InscriptionComponent implements OnInit {
  inscriptionForm: FormGroup;
  theresError: boolean = false;
  error: string = '';
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private router: Router,
    private snackBarService: SnackBarService,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.inscriptionForm = new FormGroup({
      nom: new FormControl(),
      prenom: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      role: new FormControl('etudiant'),
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview the image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  inscription() {
    const userInformations = {
      nom: this.inscriptionForm.value.nom,
      prenom: this.inscriptionForm.value.prenom,
      mail: this.inscriptionForm.value.email,
      mdp: this.inscriptionForm.value.password,
    };
    if (this.inscriptionForm.value.role === 'etudiant') {
      this.inscriptionEtudiant(userInformations);
    } else if (this.inscriptionForm.value.role === 'professeur') {
      this.inscriptionProfesseur(userInformations);
    }
  }

  inscriptionEtudiant(userInformations: {
    nom: string;
    prenom: string;
    mail: string;
    mdp: string;
  }) {
    const formData = new FormData();
    formData.append('nom', userInformations.nom);
    formData.append('prenom', userInformations.prenom);
    formData.append('mail', userInformations.mail);
    formData.append('mdp', userInformations.mdp);
    if (this.selectedFile) {
      formData.append('etudiant_image', this.selectedFile);
    }
    this.authService.inscription(formData).subscribe({
      next: (res) => {
        this.router.navigate([DataRoutingConst.ROUTE_LOGIN]);
        this.snackBarService.openSuccesSnackBar(
          'Votre compte étudiant a été créé avec succès. Connectez-vous pour continuer.'
        );
      },
      error: (res) => {
        this.snackBarService.openErrorSnackBar(res.error.message);
      },
      complete: () => {},
    });
  }

  inscriptionProfesseur(userInformations: {
    nom: string;
    prenom: string;
    mail: string;
    mdp: string;
  }) {
    const formData = new FormData();
    formData.append('nom', userInformations.nom);
    formData.append('prenom', userInformations.prenom);
    formData.append('mail', userInformations.mail);
    formData.append('mdp', userInformations.mdp);
    if (this.selectedFile) {
      formData.append('professeur_image', this.selectedFile);
    }
    this.authService.inscriptionProfesseur(formData).subscribe({
      next: (res) => {
        this.router.navigate([DataRoutingConst.ROUTE_LOGIN]);
        this.snackBarService.openSuccesSnackBar(
          'Votre compte professeur a été créé avec succès. Connectez-vous pour continuer.'
        );
      },
      error: (res) => {
        this.snackBarService.openErrorSnackBar(res.error.message);
      },
      complete: () => {},
    });
  }
}
