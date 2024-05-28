import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
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
        this.getEtudiantsDevoirs(this.devoirId);
      }
    });
  }

  getDevoirDetails(devoirId: string): void {
    this.devoirsService.getDevoir(devoirId).subscribe((devoir) => {
      this.devoir = devoir;
    });
  }

  getEtudiantsDevoirs(devoirId: string): void {
    this.devoirsService.getDevoirsEtudiants(devoirId).subscribe((response) => {
      this.nonNotes = response.nonNotes;
      this.notes = response.notes;
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
