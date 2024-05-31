import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { EtudiantsService } from '../../shared/services/etudiants.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-professeur-etudiants',
  standalone: true,
  providers: [],
  templateUrl: './professeur-etudiants.component.html',
  styleUrls: [
    './professeur-etudiants.component.css',
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
export class ProfesseurEtudiantsComponent implements OnInit {
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
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map((str) => +str);
    }
  }

  constructor(
    private etudiantsService: EtudiantsService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  etudiants: any[] = [];

  ngOnInit() {
    console.log('ngOnInit étudiants, appelée AVANT affichage du composant');
    this.getEtudiantsFromService();
  }

  getEtudiantsFromService() {
    // on récupère les étudiants depuis le service
    this.etudiantsService.getListeEtudiants(this.pageIndex + 1, this.pageSize).subscribe((data) => {
      // les données arrivent ici au bout d'un certain temps
      console.log('Données arrivées');
      this.etudiants = data.docs;
      this.length = data.totalDocs;
    });
    console.log('Requête envoyée');
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getEtudiantsFromService();
  }
}
