import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatieresService } from '../../../shared/services/matieres.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-professeur-matieres-etudiants',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatListModule,
    MatSliderModule,
    MatCheckbox,
  ],
  templateUrl: './professeur-matieres-etudiants.component.html',
  styleUrls: [
    './professeur-matieres-etudiants.component.css',
    '../../../template/vendors/feather/feather.css',
    '../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../template/vendors/css/vendor.bundle.base.css',
    '../../../template/css/vertical-layout-light/style.css',
  ],
})
export class ProfesseurMatieresEtudiantsComponent implements OnInit {
  id_matiere: any;

  constructor(
    private route: ActivatedRoute,
    private matieresService: MatieresService,
    private router: Router
  ) {}

  // tableau des matieres POUR AFFICHAGE
  displayedColumns: string[] = ['inscrit', 'mail', 'nom', 'prenom'];

  etudiants: any[] = [];
  matiere: any;

  isEditMode = false;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id_matiere = params.get('id');
      console.log(this.id_matiere);
    });
    this.getMatiere(this.id_matiere);
    this.getEtudiantsMatiereFromService();
  }

  getMatiere(idMatiere: String) {
    this.matieresService.getMatiere(this.id_matiere).subscribe((data) => {
      this.matiere = data;
    });
  }

  getEtudiantsMatiereFromService() {
    this.matieresService
      .getEtudiantsMatiere(this.id_matiere)
      .subscribe((data) => {
        console.log('Données arrivées');
        this.etudiants = data;
      });
    console.log('Requête envoyée');
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  applyChanges() {
    const etudiantsInscrits = this.etudiants
      .filter((etudiant) => etudiant.inscrit)
      .map((etudiant) => etudiant._id);
    const payload = { etudiants: etudiantsInscrits };
    this.matieresService.ajouterEtudiants(this.id_matiere, payload).subscribe(
      (response) => {
        console.log('Modifications appliquées avec succès:', response);
        // Met à jour la liste des étudiants inscrits
        this.matiere.etudiant_inscrits = etudiantsInscrits;
        this.isEditMode = false;
      },
      (error) => {
        console.error(
          "Erreur lors de l'application des modifications :",
          error
        );
      }
    );
  }
}
