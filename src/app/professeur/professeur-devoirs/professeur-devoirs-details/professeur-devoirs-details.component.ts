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

  // Pagination
  notesPage = 1;
  limit = 10;
  nonNotesTotal = 0;
  notesTotal = 0;

  // Pour la pagination non notés
  nonNotesPage = 1;
  nonNotesTotalDocs!: number;
  nonNotesTotalPages!: number;
  nonNotesNextPage!: number;
  nonNotesPrevPage!: number;
  nonNotesHasNextPage!: boolean;
  nonNotesHasPrevPage!: boolean;

  // pour virtual scroll infini
  @ViewChild('nonNotesScroller') nonNotesScroller!: CdkVirtualScrollViewport;

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

    if (!this.nonNotesScroller) return;
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
      });
  }

  isLate(dateLivraison: string): boolean {
    const livraisonDate = new Date(dateLivraison);
    return livraisonDate > new Date(this.devoir?.dateDeRendu || '');
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      return;
    }

    const item = event.previousContainer.data[event.previousIndex];
    if (
      event.previousContainer.id === 'liste_non_notes' &&
      event.container.id === 'liste_notes'
    ) {
      // Remove the item from nonNotes and add it to notes temporarily
      this.nonNotes = this.nonNotes.filter((devoir) => devoir._id !== item._id);
      if (!this.notes.some((devoir) => devoir._id === item._id)) {
        this.notes.unshift(item);
      }
      this.openNoterDialog(item);
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
      this.notes.unshift(devoirEtudiant);
    }

    const dialogRef = this.matDialog.open(
      ProfesseurDevoirsDetailsPopUpNoterDevoirComponent,
      {
        width: '400px',
        data: { devoirEtudiant },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Refresh the lists after successful note
        this.getDevoirsNonNotes(this.devoirId!, this.nonNotesPage, this.limit);
        this.getDevoirsNotes(this.devoirId!, this.notesPage, this.limit);
      } else {
        // If the dialog was closed or canceled, remove the item from notes and add it back to nonNotes
        this.notes = this.notes.filter(
          (devoir) => devoir._id !== devoirEtudiant._id
        );
        this.nonNotes.push(devoirEtudiant);
      }
    });
  }
}
