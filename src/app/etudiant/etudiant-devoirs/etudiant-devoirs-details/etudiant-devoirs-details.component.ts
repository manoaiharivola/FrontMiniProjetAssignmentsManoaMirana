import {
  Component,
  OnInit,
  ViewChild,
  NgZone,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DevoirsService } from '../../../shared/services/devoir.service';
import { RouterLink, Router } from '@angular/router';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs';
import { EtudiantDevoirsDetailsPopUpRendreDevoirComponent } from './etudiant-devoirs-details-pop-up-rendre-devoir/etudiant-devoirs-details-pop-up-rendre-devoir.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-etudiant-devoirs-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule,
    DragDropModule,
    ScrollingModule,
  ],
  templateUrl: './etudiant-devoirs-details.component.html',
  styleUrls: [
    './etudiant-devoirs-details.component.css',
    '../../../template/vendors/feather/feather.css',
    '../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../template/vendors/css/vendor.bundle.base.css',
    '../../../template/css/vertical-layout-light/style.css',
  ],
})
export class EtudiantDevoirsDetailsComponent implements OnInit {
  aRendre: any[] = [];
  rendus: any[] = [];
  aRendreIsLoading = false;
  rendusIsLoading = false;

  // Pagination
  limit = 10;

  // Pour la pagination non notés
  aRendrePage = 1;
  aRendreTotal = 0;
  aRendreTotalDocs!: number;
  aRendreTotalPages!: number;
  aRendreNextPage!: number;
  aRendrePrevPage!: number;
  aRendreHasNextPage!: boolean;
  aRendreHasPrevPage!: boolean;

  // Pour la pagination notés
  rendusPage = 1;
  rendusTotal = 0;
  rendusTotalDocs!: number;
  rendusTotalPages!: number;
  rendusNextPage!: number;
  rendusPrevPage!: number;
  rendusHasNextPage!: boolean;
  rendusHasPrevPage!: boolean;

  // pour virtual scroll infini
  @ViewChild('aRendreScroller') aRendreScroller!: CdkVirtualScrollViewport;
  @ViewChild('rendusScroller') rendusScroller!: CdkVirtualScrollViewport;

  constructor(
    private route: ActivatedRoute,
    private devoirsService: DevoirsService,
    private router: Router,
    private matDialog: MatDialog,
    private ngZone: NgZone,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.getDevoirsARendre(this.aRendrePage, this.limit);
      this.getDevoirsRendus(this.rendusPage, this.limit);
    });
    console.log('------------');
    console.log(this.aRendre);
  }

  getDevoirsARendre(page: number, limit: number): void {
    this.devoirsService.getDevoirsARendre(page, limit).subscribe((response) => {
      this.aRendre = response.docs;
      this.aRendreTotal = response.totalDocs;
      this.aRendreTotalPages = response.totalPages;
      this.aRendreNextPage = response.nextPage;
      this.aRendrePrevPage = response.prevPage;
      this.aRendreHasNextPage = response.hasNextPage;
      this.aRendreHasPrevPage = response.hasPrevPage;
    });
  }

  getDevoirsRendus(page: number, limit: number): void {
    this.devoirsService.getDevoirsRendus(page, limit).subscribe((response) => {
      this.rendus = response.docs;
      this.rendusTotal = response.totalDocs;
      this.rendusTotalPages = response.totalPages;
      this.rendusNextPage = response.nextPage;
      this.rendusPrevPage = response.prevPage;
      this.rendusHasNextPage = response.hasNextPage;
      this.rendusHasPrevPage = response.hasPrevPage;
    });
  }

  isLate(devoir: any): boolean {
    const now = new Date();
    return now > new Date(devoir.devoir_id.dateDeRendu || '');
  }

  estLivre(devoir: any): boolean {
    return devoir.dateLivraison && !devoir.dateNotation;
  }

  estNote(devoir: any): boolean {
    return devoir.dateLivraison && devoir.dateNotation && devoir.note;
  }

  drop(event: CdkDragDrop<any[]>) {}

  openRendreDevoirDialog(devoir: any) {
    const dialogRef = this.matDialog.open(
      EtudiantDevoirsDetailsPopUpRendreDevoirComponent,
      {
        width: '620px',
        height: '220px',
        data: { devoir },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.devoirsService.rendreDevoir(devoir._id, {}).subscribe(
          (response) => {
            console.log(response.message);
            this.snackBar.open('Le devoir a été livrer.', 'Fermer', {
              duration: 3000,
            });
            this.getDevoirsARendre(this.aRendrePage, this.limit);
            this.getDevoirsRendus(this.rendusPage, this.limit);
          },
          (error) => {
            console.error('Erreur lors de la suppression du devoir:', error);
          }
        );
      }
    });
  }
}
