import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { RenduDirective } from '../../shared/rendu.directive';
import { Matiere } from '../../shared/models/matiere.model';
import { MatieresService } from '../../shared/services/matieres.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataRoutingConst } from '../../data/constant/data-routing.const';
import { Router } from '@angular/router';
import { PopUpProfesseursMatieresAjoutDevoirComponent } from './pop-up-professeurs-matieres-ajout-devoir/pop-up-professeurs-matieres-ajout-devoir.component';
import { MatDialog } from '@angular/material/dialog';
import { EnvironmentConst } from '../../data/constant/data-env.const';
@Component({
  selector: 'app-professeur-matieres',
  standalone: true,
  providers: [],
  templateUrl: './professeur-matieres.component.html',
  styleUrls: [
    './professeur-matieres.component.css',
    '../../template/vendors/feather/feather.css',
    '../../template/vendors/ti-icons/css/themify-icons.css',
    '../../template/vendors/css/vendor.bundle.base.css',
    '../../template/css/vertical-layout-light/style.css',
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    RenduDirective,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class ProfesseurMatieresComponent implements OnInit {
  titre = 'Liste des matieres';
  urlPhoto = EnvironmentConst.API_URL + '/api/';
  // Pour la pagination

  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(',')
        .map((str) => +str);
    }
  }

  constructor(
    private matieresService: MatieresService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  // tableau des matieres POUR AFFICHAGE
  displayedColumns: string[] = [
    'photo',
    'nom',
    'nombreEtudiants',
    'listeEtudiants',
  ];

  matieres: Matiere[] = [];

  ngOnInit() {
    console.log('ngOnInit matieres, appelée AVANT affichage du composant');
    this.getMatieresFromService();
  }

  getMatieresFromService() {
    // on récupère les matieres depuis le service
    this.matieresService
      .getProfesseurMatieresPagines(this.pageIndex + 1, this.pageSize)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.matieres = data.docs;
        this.length = data.totalDocs;
      });
    console.log('Requête envoyée');
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getMatieresFromService();
  }

  showEtudiantsInscrits(idMatiere: string) {
    this.router.navigate([
      DataRoutingConst.ROUTE_PROFESSEUR_MATIERES,
      idMatiere,
      'etudiants',
    ]);
  }

  showPopUpAjoutNouvelleMatiere() {
    const dialogRef = this.matDialog.open(
      PopUpProfesseursMatieresAjoutDevoirComponent,
      {
        width: '620px',
        minHeight: '300px',
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getMatieresFromService();
      }
    });
  }
}
