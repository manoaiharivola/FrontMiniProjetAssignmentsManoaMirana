import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DevoirsService } from '../../../shared/services/devoir.service';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-professeur-devoirs-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
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
    private router: Router
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
      item.dateNotation = new Date(); // Set the notation date when moving to the noted list
      this.notes.push(item);
      this.nonNotes.splice(event.previousIndex, 1);
    } else if (event.previousContainer.id === 'liste_notes' && event.container.id === 'liste_non_notes') {
      item.dateNotation = null; // Clear the notation date when moving back to the non-noted list
      this.nonNotes.push(item);
      this.notes.splice(event.previousIndex, 1);
    }

    event.container.data.push(item);
    event.previousContainer.data.splice(event.previousIndex, 1);
  }
}
