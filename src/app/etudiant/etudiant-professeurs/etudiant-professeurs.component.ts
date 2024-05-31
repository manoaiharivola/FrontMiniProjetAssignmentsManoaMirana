import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { ProfesseursService } from '../../shared/services/professeurs.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EnvironmentConst } from '../../data/constant/data-env.const';
@Component({
  selector: 'app-professeur-professeurs',
  standalone: true,
  providers: [],
  templateUrl: './etudiant-professeurs.component.html',
  styleUrls: [
    './etudiant-professeurs.component.css',
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
    MatPaginatorModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
  ],
})
export class EtudiantProfesseursComponent implements OnInit {
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
    private professeursService: ProfesseursService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  professeurs: any[] = [];

  ngOnInit() {
    console.log('ngOnInit étudiants, appelée AVANT affichage du composant');
    this.getProfesseursFromService();
  }

  getProfesseursFromService() {
    // on récupère les étudiants depuis le service
    this.professeursService
      .getListeProfesseurs(this.pageIndex + 1, this.pageSize)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.professeurs = data.docs;
        console.log(this.professeurs);
        this.length = data.totalDocs;
      });
    console.log('Requête envoyée');
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getProfesseursFromService();
  }
}
