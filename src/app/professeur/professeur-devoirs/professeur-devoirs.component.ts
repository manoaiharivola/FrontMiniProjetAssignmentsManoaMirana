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
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataRoutingConst } from '../../data/constant/data-routing.const';
import { Router } from '@angular/router';
import { PopUpProfesseursDevoirsModifierDevoirComponent } from './pop-up-professeurs-devoirs-modifier-devoir/pop-up-professeurs-devoirs-modifier-devoir.component';
import { PopUpProfesseursDevoirsSupprimerDevoirComponent } from './pop-up-professeurs-devoirs-supprimer-devoir/pop-up-professeurs-devoirs-supprimer-devoir.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';

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
    MatTooltipModule,
    MatInput
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
  displayedColumns: string[] = [
    'nom',
    'matiere',
    'dateDeCreation',
    'dateDeRendu',
    'actions',
  ];
  devoirs: Devoir[] = [];
  matieres: Matiere[] = [];

  // Pagination
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 50, 100];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | undefined;
  matiereControl = new FormControl<string | null>(null);
  searchControl = new FormControl('');
  sortField = 'nom';
  sortOrder = 'asc';

  constructor(
    private matDialog: MatDialog,
    private devoirsService: DevoirsService,
    private matieresService: MatieresService,
    private router: Router,
    private snackBar: MatSnackBar
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
    const matiereId = this.matiereControl.value ?? undefined;
    const search = this.searchControl.value ?? '';
    this.devoirsService
      .getProfesseurDevoirs(this.pageIndex + 1, this.pageSize, matiereId, search, this.sortField, this.sortOrder)
      .subscribe((data) => {
        this.devoirs = data.docs;
        this.length = data.totalDocs;
        this.pageSize = data.limit;
        this.pageIndex = data.page - 1;
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

  onSearchChange() {
    this.pageIndex = 0; // Reset to first page
    this.getDevoirsFromService();
  }

  onSortChange(sortField: string) {
    this.sortField = sortField;
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.getDevoirsFromService();
  }

  showPopUpAjoutNouveauDevoir() {
    const dialogRef = this.matDialog.open(
      PopUpProfesseursDevoirsAjoutDevoirComponent,
      {
        panelClass: 'custom-container',
        autoFocus: false,
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'refresh') {
        this.getDevoirsFromService();
      }
    });
  }

  deleteDevoir(devoir: Devoir) {
    // Logic to delete the assignment
  }

  detailsDevoir(devoir: Devoir) {
    this.router.navigate([
      DataRoutingConst.ROUTE_PROFESSEUR_DEVOIRS,
      devoir._id,
    ]);
  }

  openModifierDialog(devoir: any): void {
    console.log(devoir);
    const dialogRef = this.matDialog.open(
      PopUpProfesseursDevoirsModifierDevoirComponent,
      {
        width: '400px',
        data: { devoir },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDevoirsFromService();
      }
    });
  }

  openSupprimerDialog(devoir: any): void {
    const dialogRef = this.matDialog.open(
      PopUpProfesseursDevoirsSupprimerDevoirComponent,
      {
        width: '620px',
        height: '220px',
        data: { devoir },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.devoirsService.deleteDevoir(devoir._id).subscribe(
          (response) => {
            console.log(response.message);
            this.getDevoirsFromService(); // Recharger la liste des devoirs après la suppression
            this.snackBar.open('Le devoir a bien été supprimé.', 'Fermer', {
              duration: 3000,
            });
          },
          (error) => {
            console.error('Erreur lors de la suppression du devoir:', error);
          }
        );
      }
    });
  }

  genererMilleDevoirs() {
    this.devoirsService.ajouterMilleDevoirs();
  }
}
