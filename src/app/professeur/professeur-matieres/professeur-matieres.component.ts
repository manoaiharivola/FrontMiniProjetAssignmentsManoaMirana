import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

import { RenduDirective } from '../../shared/rendu.directive';
import { Matiere } from './matiere.model';
import { MatieresService } from '../../shared/matieres.service';
import { RouterLink } from '@angular/router';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
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
    ScrollingModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    RenduDirective,
  ],
})
export class ProfesseurMatieresComponent implements OnInit {
  titre = 'Liste des matieres';
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

  // tableau des matieres POUR AFFICHAGE
  displayedColumns: string[] = ['nom', 'nombreEtudiants'];

  matieres: Matiere[] = [];

  constructor(
    private matieresService: MatieresService,
    private ngZone: NgZone
  ) {}

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  ngOnInit() {
    console.log('ngOnInit matieres, appelée AVANT affichage du composant');
    this.getMatieresFromService();
  }

  getMatieresFromService() {
    // on récupère les matieres depuis le service
    this.matieresService
      .getMatieresPagines(this.pageIndex + 1, this.pageSize)
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
}
