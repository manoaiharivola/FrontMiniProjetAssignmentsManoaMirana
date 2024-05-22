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
  page = 0;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  // tableau des matieres POUR AFFICHAGE
  displayedColumns: string[] = ['nom'];

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
      .getMatieresPagines(this.page, this.limit)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.matieres = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  // Pour la pagination
  pagePrecedente() {
    this.page = this.prevPage;
    this.getMatieresFromService();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getMatieresFromService();
  }

  premierePage() {
    this.page = 1;
    this.getMatieresFromService();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getMatieresFromService();
  }

  // Pour le composant angular material paginator
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getMatieresFromService();
  }
}
