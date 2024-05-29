import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DevoirsService } from '../../../shared/services/devoir.service';
import { RouterLink, Router } from '@angular/router';
import { ProfesseurDevoirsDetailsPopUpNoterDevoirComponent } from './professeur-devoirs-details-pop-up-noter-devoir/professeur-devoirs-details-pop-up-noter-devoir.component';

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
export class ProfesseurDevoirsDetailsComponent implements OnInit {
  devoirId: string | null = null;
  devoir: any = null;
  nonNotes: any[] = [];
  notes: any[] = [];
  
  // Pagination
  nonNotesPage = 1;
  notesPage = 1;
  limit = 10;
  nonNotesTotal = 0;
  notesTotal = 0;

  constructor(
    private route: ActivatedRoute,
    private devoirsService: DevoirsService,
    private router: Router,
    private matDialog: MatDialog
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

  getDevoirDetails(devoirId: string): void {
    this.devoirsService.getDevoir(devoirId).subscribe((devoir) => {
      this.devoir = devoir;
    });
  }

  getDevoirsNonNotes(devoirId: string, page: number, limit: number): void {
    this.devoirsService.getDevoirsNonNotes(devoirId, page, limit).subscribe((response) => {
      this.nonNotes = response.docs;
      this.nonNotesTotal = response.totalDocs;
    });
  }

  getDevoirsNotes(devoirId: string, page: number, limit: number): void {
    this.devoirsService.getDevoirsNotes(devoirId, page, limit).subscribe((response) => {
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
    if (event.previousContainer.id === 'liste_non_notes' && event.container.id === 'liste_notes') {
      // Remove the item from nonNotes and add it to notes temporarily
      this.nonNotes = this.nonNotes.filter(devoir => devoir._id !== item._id);
      if (!this.notes.some(devoir => devoir._id === item._id)) {
        this.notes.push(item);
      }
      this.openNoterDialog(item);
    } else if (event.previousContainer.id === 'liste_notes' && event.container.id === 'liste_non_notes') {
      // Il est impossible de drag and drop un devoir déjà noté dans la liste des non notés
      return;
    }
  }

  openNoterDialog(devoirEtudiant: any): void {
    // Remove the item from nonNotes and add it to notes temporarily
    this.nonNotes = this.nonNotes.filter(devoir => devoir._id !== devoirEtudiant._id);
    if (!this.notes.some(devoir => devoir._id === devoirEtudiant._id)) {
      this.notes.push(devoirEtudiant);
    }

    const dialogRef = this.matDialog.open(ProfesseurDevoirsDetailsPopUpNoterDevoirComponent, {
      width: '400px',
      data: { devoirEtudiant }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Refresh the lists after successful note
        this.getDevoirsNonNotes(this.devoirId!, this.nonNotesPage, this.limit);
        this.getDevoirsNotes(this.devoirId!, this.notesPage, this.limit);
      } else {
        // If the dialog was closed or canceled, remove the item from notes and add it back to nonNotes
        this.notes = this.notes.filter(devoir => devoir._id !== devoirEtudiant._id);
        this.nonNotes.push(devoirEtudiant);
      }
    });
  }

}
