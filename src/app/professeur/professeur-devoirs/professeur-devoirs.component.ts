import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTable, MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { RenduDirective } from '../../shared/rendu.directive';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { PopUpProfesseursDevoirsAjoutDevoirComponent } from './pop-up-professeurs-devoirs-ajout-devoir/pop-up-professeurs-devoirs-ajout-devoir.component';

@Component({
  selector: 'app-professeur-devoirs',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSliderModule,
    RenduDirective,
    MatIconModule,
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
export class ProfesseurDevoirsComponent {
  constructor(private matDialog: MatDialog) {}

  showPopUpAjoutNouveauDevoir() {
    const dialogRef = this.matDialog.open(
      PopUpProfesseursDevoirsAjoutDevoirComponent,
      {
        panelClass: 'custom-container',
        autoFocus: false,
      }
    );
  }
}
