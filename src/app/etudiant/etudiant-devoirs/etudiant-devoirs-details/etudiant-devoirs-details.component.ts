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
import { MatSnackBar } from '@angular/material/snack-bar';
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

  getDevoirsRendusAndTemporaryItem(
    page: number,
    limit: number,
    item: any
  ): void {
    this.devoirsService.getDevoirsRendus(page, limit).subscribe((response) => {
      this.rendus.unshift(item);
      this.rendus = [...this.rendus];
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

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      return;
    }

    const draggedItem = event.item.data;

    if (
      event.previousContainer.id === 'liste_a_rendre' &&
      event.container.id === 'liste_rendus'
    ) {
      this.openRendreDevoirDialog(draggedItem);
    } else if (
      event.previousContainer.id === 'liste_rendus' &&
      event.container.id === 'liste_a_rendre'
    ) {
      // Il est impossible de drag and drop un devoir déjà noté dans la liste des non notés
      return;
    }
  }

  openRendreDevoirDialog(devoirARendre: any) {
    this.aRendre = this.aRendre.filter(
      (devoir) => devoir._id !== devoirARendre._id
    );
    if (!this.rendus.some((devoir) => devoir._id === devoirARendre._id)) {
      this.getDevoirsRendusAndTemporaryItem(
        this.rendusPage,
        this.limit,
        devoirARendre
      );
    }

    const dialogRef = this.matDialog.open(
      EtudiantDevoirsDetailsPopUpRendreDevoirComponent,
      {
        width: '620px',
        height: '220px',
        data: { devoirARendre },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.devoirsService.rendreDevoir(devoirARendre._id, {}).subscribe(
          (response) => {
            console.log(response.message);
            this.snackBar.open('Le devoir a été livré.', 'Fermer', {
              duration: 3000,
            });
            this.getDevoirsARendre(this.aRendrePage, this.limit);
            this.getDevoirsRendus(this.rendusPage, this.limit);
          },
          (error) => {
            console.error('Erreur lors de la suppression du devoir:', error);
          }
        );
      } else {
        this.getDevoirsARendre(this.aRendrePage, this.limit);
        this.getDevoirsRendus(this.rendusPage, this.limit);
      }
    });
  }
}
