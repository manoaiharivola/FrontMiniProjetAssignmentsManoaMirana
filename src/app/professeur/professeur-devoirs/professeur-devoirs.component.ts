import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { RenduDirective } from '../../shared/rendu.directive';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DevoirsService } from '../../shared/services/devoir.service';
import { MatieresService } from '../../shared/services/matieres.service';
import { Devoir } from '../../shared/models/devoir.model';
import { Matiere } from '../../shared/models/matiere.model';
import { PopUpProfesseursDevoirsAjoutDevoirComponent } from './pop-up-professeurs-devoirs-ajout-devoir/pop-up-professeurs-devoirs-ajout-devoir.component';

@Component({
  selector: 'app-professeur-devoirs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    RenduDirective,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './professeur-devoirs.component.html',
  styleUrls: [
    './professeur-devoirs.component.css',
    '../../template/vendors/feather/feather.css',
    '../../template/vendors/ti-icons/css/themify-icons.css',
    '../../template/vendors/css/vendor.bundle.base.css',
    '../../template/css/vertical-layout-light/style.css',
  ],
})
export class ProfesseurDevoirsComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'description', 'matiere', 'dateDeRendu', 'actions'];
  devoirs: Devoir[] = [];
  matieres: Matiere[] = [];
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;
  matiereControl = new FormControl<string | null>(null);

  constructor(
    private matDialog: MatDialog,
    private devoirsService: DevoirsService,
    private matieresService: MatieresService
  ) {}

  ngOnInit() {
    this.getMatieresFromService();
    this.getDevoirsFromService();
  }

  getMatieresFromService() {
    this.matieresService.getProfesseurMatieres().subscribe((data) => {
      this.matieres = data.docs;
    });
  }

  getDevoirsFromService() {
    const matiereId = this.matiereControl.value ? this.matiereControl.value : undefined;
    this.devoirsService.getProfesseurDevoirs(this.pageIndex + 1, this.pageSize, matiereId).subscribe((data) => {
      this.devoirs = data.docs;
      this.length = data.totalDocs;
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getDevoirsFromService();
  }

  onMatiereChange() {
    this.pageIndex = 0; // Reset to first page
    this.getDevoirsFromService();
  }

  showPopUpAjoutNouveauDevoir() {
    const dialogRef = this.matDialog.open(PopUpProfesseursDevoirsAjoutDevoirComponent, {
      panelClass: 'custom-container',
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'refresh') {
        this.getDevoirsFromService();
      }
    });
  }

  
  editDevoir(devoir: Devoir) {
    // Logic to edit the assignment
  }

  deleteDevoir(devoir: Devoir) {
    // Logic to delete the assignment
  }
}
