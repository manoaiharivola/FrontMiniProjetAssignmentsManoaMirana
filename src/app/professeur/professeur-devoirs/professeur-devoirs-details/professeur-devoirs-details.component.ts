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
import { ProfesseurDevoirsDetailsPopUpNoterDevoirComponent } from './professeur-devoirs-details-pop-up-noter-devoir/professeur-devoirs-details-pop-up-noter-devoir.component';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-professeur-devoirs-details',
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
  templateUrl: './professeur-devoirs-details.component.html',
  styleUrls: [
    './professeur-devoirs-details.component.css',
    '../../../template/vendors/feather/feather.css',
    '../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../template/vendors/css/vendor.bundle.base.css',
    '../../../template/css/vertical-layout-light/style.css',
  ],
})
export class ProfesseurDevoirsDetailsComponent
  implements OnInit, AfterViewInit
{
  devoirId: string | null = null;
  devoir: any = null;
  nonNotes: any[] = [];
  notes: any[] = [];
  nonNotesIsLoading = false;
  notesIsLoading = false;

  // Pagination
  limit = 5;

  // Pour la pagination non notés
  nonNotesPage = 1;
  nonNotesTotal = 0;
  nonNotesTotalDocs!: number;
  nonNotesTotalPages!: number;
  nonNotesNextPage!: number;
  nonNotesPrevPage!: number;
  nonNotesHasNextPage!: boolean;
  nonNotesHasPrevPage!: boolean;

  // Pour la pagination notés
  notesPage = 1;
  notesTotal = 0;
  notesTotalDocs!: number;
  notesTotalPages!: number;
  notesNextPage!: number;
  notesPrevPage!: number;
  notesHasNextPage!: boolean;
  notesHasPrevPage!: boolean;

  // pour virtual scroll infini
  @ViewChild('nonNotesScroller') nonNotesScroller!: CdkVirtualScrollViewport;
  @ViewChild('notesScroller') notesScroller!: CdkVirtualScrollViewport;

  constructor(
    private route: ActivatedRoute,
    private devoirsService: DevoirsService,
    private router: Router,
    private matDialog: MatDialog,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.devoirId = params.get('id');
      if (this.devoirId) {
        this.getDevoirDetails(this.devoirId);
        this.getDevoirsNonNotes(this.devoirId, this.nonNotesPage, this.limit);
        this.getDevoirsNotes(this.devoirId, this.notesPage, this.limit);
      }
    });
  }

  ngAfterViewInit() {
    console.log(' ----- after view init ----');

    if (!this.nonNotesScroller || !this.notesScroller) return;

    if (this.nonNotesScroller) {
      // Infinite scroll for non-notes list
      this.nonNotesScroller
        .elementScrolled()
        .pipe(
          tap(() => {
            // const dist = this.nonNotesScroller.measureScrollOffset('bottom');
            // console.log('dans le tap, distance par rapport au bas de la fenêtre = ' + dist);
          }),
          map(() => this.nonNotesScroller.measureScrollOffset('bottom')),
          pairwise(),
          filter(([y1, y2]) => y2 < y1 && y2 < 20),
          throttleTime(150)
        )
        .subscribe(() => {
          console.log('On demande de nouveaux assignments');
          console.log(
            'je CHARGE DE NOUVELLES DONNEES page = ' + this.nonNotesPage
          );
          this.ngZone.run(() => {
            if (this.nonNotesIsLoading || !this.nonNotesHasNextPage) return;
            this.nonNotesIsLoading = true;
            const prevScrollHeight =
              this.nonNotesScroller.measureScrollOffset('bottom');
            this.nonNotesPage = this.nonNotesNextPage;
            if (this.devoirId) {
              this.getDevoirsNonNotesFromServicePourScrollInfini(
                this.devoirId,
                this.nonNotesPage,
                this.limit,
                prevScrollHeight
              );
            }
          });
        });
    }

    if (this.notesScroller) {
      // Infinite scroll for notes list
      this.notesScroller
        .elementScrolled()
        .pipe(
          tap(() => {
            // const dist = this.notesScroller.measureScrollOffset('bottom');
            // console.log('dans le tap, distance par rapport au bas de la fenêtre = ' + dist);
          }),
          map(() => this.notesScroller.measureScrollOffset('bottom')),
          pairwise(),
          filter(([y1, y2]) => y2 < y1 && y2 < 20),
          throttleTime(150)
        )
        .subscribe(() => {
          console.log('On demande de nouveaux assignments notés');
          console.log(
            'je CHARGE DE NOUVELLES DONNEES page = ' + this.notesPage
          );
          this.ngZone.run(() => {
            if (this.notesIsLoading || !this.notesHasNextPage) return;
            this.notesIsLoading = true;
            const prevScrollHeight =
              this.notesScroller.measureScrollOffset('bottom');
            this.notesPage = this.notesNextPage;
            if (this.devoirId) {
              this.getDevoirsNotesFromServicePourScrollInfini(
                this.devoirId,
                this.notesPage,
                this.limit,
                prevScrollHeight
              );
            }
          });
        });
    }
  }

  getDevoirDetails(devoirId: string): void {
    this.devoirsService.getDevoir(devoirId).subscribe((devoir) => {
      this.devoir = devoir;
    });
  }

  getDevoirsNonNotes(devoirId: string, page: number, limit: number): void {
    this.devoirsService
      .getDevoirsNonNotes(devoirId, page, limit)
      .subscribe((response) => {
        this.nonNotes = response.docs;
        this.nonNotesTotal = response.totalDocs;
        this.nonNotesTotalPages = response.totalPages;
        this.nonNotesNextPage = response.nextPage;
        this.nonNotesPrevPage = response.prevPage;
        this.nonNotesHasNextPage = response.hasNextPage;
        this.nonNotesHasPrevPage = response.hasPrevPage;
      });
  }

  getDevoirsNonNotesFromServicePourScrollInfini(
    devoirId: string,
    page: number,
    limit: number,
    prevScrollHeight: number
  ): void {
    this.devoirsService
      .getDevoirsNonNotes(devoirId, page, limit)
      .subscribe((response) => {
        this.nonNotes = [...this.nonNotes, ...response.docs];
        this.nonNotesTotal = response.totalDocs;
        this.nonNotesTotalPages = response.totalPages;
        this.nonNotesNextPage = response.nextPage;
        this.nonNotesPrevPage = response.prevPage;
        this.nonNotesHasNextPage = response.hasNextPage;
        this.nonNotesHasPrevPage = response.hasPrevPage;
        this.nonNotesIsLoading = false;

        setTimeout(() => {
          const newScrollHeight =
            this.nonNotesScroller.measureScrollOffset('bottom');
          this.nonNotesScroller.scrollToOffset(
            newScrollHeight - prevScrollHeight
          );
        }, 150);
      });
  }

  getDevoirsNotes(devoirId: string, page: number, limit: number): void {
    this.devoirsService
      .getDevoirsNotes(devoirId, page, limit)
      .subscribe((response) => {
        this.notes = response.docs;
        this.notesTotal = response.totalDocs;
        this.notesTotalPages = response.totalPages;
        this.notesNextPage = response.nextPage;
        this.notesPrevPage = response.prevPage;
        this.notesHasNextPage = response.hasNextPage;
        this.notesHasPrevPage = response.hasPrevPage;
      });
  }

  getDevoirsNotesAndTemporaryItem(
    devoirId: string,
    page: number,
    limit: number,
    item: any
  ): void {
    this.devoirsService
      .getDevoirsNotes(devoirId, page, limit)
      .subscribe((response) => {
        this.notes.unshift(item);
        this.notes = [...this.notes];
        this.notesTotal = response.totalDocs;
        this.notesTotalPages = response.totalPages;
        this.notesNextPage = response.nextPage;
        this.notesPrevPage = response.prevPage;
        this.notesHasNextPage = response.hasNextPage;
        this.notesHasPrevPage = response.hasPrevPage;
      });
  }

  getDevoirsNotesFromServicePourScrollInfini(
    devoirId: string,
    page: number,
    limit: number,
    prevScrollHeight: number
  ): void {
    this.devoirsService
      .getDevoirsNotes(devoirId, page, limit)
      .subscribe((response) => {
        this.notes = [...this.notes, ...response.docs];
        this.notesTotal = response.totalDocs;
        this.notesTotalPages = response.totalPages;
        this.notesNextPage = response.nextPage;
        this.notesPrevPage = response.prevPage;
        this.notesHasNextPage = response.hasNextPage;
        this.notesHasPrevPage = response.hasPrevPage;
        this.notesIsLoading = false;

        setTimeout(() => {
          const newScrollHeight =
            this.notesScroller.measureScrollOffset('bottom');
          this.notesScroller.scrollToOffset(newScrollHeight - prevScrollHeight);
        }, 150);
      });
  }

  isLate(dateLivraison: string): boolean {
    const livraisonDate = new Date(dateLivraison);
    return livraisonDate > new Date(this.devoir?.dateDeRendu || '');
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      return;
    }

    const draggedItem = event.item.data;

    if (
      event.previousContainer.id === 'liste_non_notes' &&
      event.container.id === 'liste_notes'
    ) {
      this.openNoterDialog(draggedItem);
    } else if (
      event.previousContainer.id === 'liste_notes' &&
      event.container.id === 'liste_non_notes'
    ) {
      // Il est impossible de drag and drop un devoir déjà noté dans la liste des non notés
      return;
    }
  }

  openNoterDialog(devoirEtudiant: any): void {
    // Remove the item from nonNotes and add it to notes temporarily
    this.nonNotes = this.nonNotes.filter(
      (devoir) => devoir._id !== devoirEtudiant._id
    );
    if (!this.notes.some((devoir) => devoir._id === devoirEtudiant._id)) {
      this.getDevoirsNotesAndTemporaryItem(
        devoirEtudiant._id,
        this.notesPage,
        this.limit,
        devoirEtudiant
      );
    }

    const currentNonNotesPage = this.nonNotesPage;
    const currentNotesPage = this.notesPage;

    const dialogRef = this.matDialog.open(
      ProfesseurDevoirsDetailsPopUpNoterDevoirComponent,
      {
        width: '400px',
        data: { devoirEtudiant },
      }
    );

    dialogRef.afterClosed().subscribe(() => {
      if (currentNonNotesPage > 1) {
        // Récupérer toutes les pages de 1 à currentNonNotesPage
        this.getAllDevoirsNonNotes(
          this.devoirId!,
          currentNonNotesPage,
          this.limit
        );
      } else {
        // Restaurer la page actuelle des non notés
        this.getDevoirsNonNotes(
          this.devoirId!,
          currentNonNotesPage,
          this.limit
        );
      }

      if (currentNotesPage > 1) {
        // Récupérer toutes les pages de 1 à currentNotesPage
        this.getAllDevoirsNotes(this.devoirId!, currentNotesPage, this.limit);
      } else {
        // Restaurer la page actuelle des notés
        this.getAllDevoirsNotes(this.devoirId!, currentNotesPage, this.limit);
      }
    });
  }

  getAllDevoirsNonNotes(devoirId: string, pages: number, limit: number): void {
    const observables = [];
    for (let i = 1; i <= pages; i++) {
      observables.push(
        this.devoirsService.getDevoirsNonNotes(devoirId, i, limit)
      );
    }

    forkJoin(observables).subscribe((responses) => {
      this.nonNotes = [];
      responses.forEach((response) => {
        this.nonNotes = [...this.nonNotes, ...response.docs];
      });

      const lastResponse = responses[responses.length - 1];
      this.nonNotesTotal = lastResponse.totalDocs;
      this.nonNotesTotalPages = lastResponse.totalPages;
      this.nonNotesNextPage = lastResponse.nextPage;
      this.nonNotesPrevPage = lastResponse.prevPage;
      this.nonNotesHasNextPage = lastResponse.hasNextPage;
      this.nonNotesHasPrevPage = lastResponse.hasPrevPage;
    });
  }

  getAllDevoirsNotes(devoirId: string, pages: number, limit: number): void {
    const observables = [];
    for (let i = 1; i <= pages; i++) {
      observables.push(this.devoirsService.getDevoirsNotes(devoirId, i, limit));
    }

    forkJoin(observables).subscribe((responses) => {
      this.notes = [];
      responses.forEach((response) => {
        this.notes = [...this.notes, ...response.docs];
      });

      const lastResponse = responses[responses.length - 1];
      this.notesTotal = lastResponse.totalDocs;
      this.notesTotalPages = lastResponse.totalPages;
      this.notesNextPage = lastResponse.nextPage;
      this.notesPrevPage = lastResponse.prevPage;
      this.notesHasNextPage = lastResponse.hasNextPage;
      this.notesHasPrevPage = lastResponse.hasPrevPage;
    });
  }
}
