import { Component, OnInit } from '@angular/core';
import { sidebarProfesseurData } from './sidebar-professeur-data';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';
import { LocalStorageConst } from '../../../../shared/constant/local-storage.const';
import { SnackBarService } from '../../../../shared/services/snack-bar/snack-bar.service';
import { DataRoutingConst } from '../../../../data/constant/data-routing.const';
import { ProfesseursService } from '../../../../shared/services/professeurs.service';
import { EnvironmentConst } from '../../../../data/constant/data-env.const';

@Component({
  selector: 'app-professeur-template',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, MatButtonModule],
  templateUrl: './professeur-template.component.html',
  styleUrls: [
    './professeur-template.component.css',
    '../../../../template/vendors/feather/feather.css',
    '../../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../../template/vendors/css/vendor.bundle.base.css',
    '../../../../template/vendors/datatables.net-bs4/dataTables.bootstrap4.css',
    '../../../../template/vendors/ti-icons/css/themify-icons.css',
    '../../../../template/js/select.dataTables.min.css',
    '../../../../template/css/vertical-layout-light/style.css',
    '../../../../template/vendors/mdi/css/materialdesignicons.min.css',
  ],
})
export class ProfesseurTemplateComponent implements OnInit {
  sidebarData = sidebarProfesseurData;
  professeur: any = null;
  urlPhoto = EnvironmentConst.API_URL + '/api/';

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackBarService,
    private professeursService: ProfesseursService
  ) {}

  ngOnInit() {
    this.getProfesseurConnected();
  }

  isLinkActive(url: string): boolean {
    return this.router.url === url;
  }

  isParentLinkActive(url: string): boolean {
    return this.router.url.startsWith(url);
  }

  logout() {
    this.localStorageService.removeItem(
      LocalStorageConst.PROFESSEUR_ACCESS_TOKEN
    );
    this.router.navigate([DataRoutingConst.ROUTE_LOGIN]);
    this.snackBarService.openSuccesSnackBar(
      'Vous êtes déconnecté en tant que professeur.'
    );
  }

  getProfesseurConnected() {
    this.professeursService.getProfesseurConnected().subscribe((data) => {
      this.professeur = data;
    });
  }
}
