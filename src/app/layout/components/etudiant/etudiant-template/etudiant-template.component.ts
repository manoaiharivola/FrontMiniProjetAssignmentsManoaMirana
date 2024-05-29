import { Component, OnInit } from '@angular/core';
import { sidebarData } from './sidebar-data';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LocalStorageService } from '../../../../shared/services/local-storage/local-storage.service';
import { LocalStorageConst } from '../../../../shared/constant/local-storage.const';
import { SnackBarService } from '../../../../shared/services/snack-bar/snack-bar.service';
import { DataRoutingConst } from '../../../../data/constant/data-routing.const';
import { EtudiantsService } from '../../../../shared/services/etudiants.service';

@Component({
  selector: 'app-etudiant-template',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, MatButtonModule],
  templateUrl: './etudiant-template.component.html',
  styleUrls: [
    './etudiant-template.component.css',
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
export class EtudiantTemplateComponent implements OnInit {
  sidebarData = sidebarData;
  etudiant: any = null;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private snackBarService: SnackBarService,
    private etudiantsService: EtudiantsService
  ) {}

  ngOnInit() {
    this.getEtudiantConnected();
  }

  isLinkActive(url: string): boolean {
    return this.router.url === url;
  }

  isParentLinkActive(url: string): boolean {
    return this.router.url.startsWith(url);
  }

  logout() {
    this.localStorageService.removeItem(LocalStorageConst.ACCESS_TOKEN);
    this.router.navigate([DataRoutingConst.ROUTE_LOGIN]);
    this.snackBarService.openSuccesSnackBar(
      "Vous êtes déconnecté en tant qu'étudiant."
    );
  }

  getEtudiantConnected() {
    this.etudiantsService.getEtudiantConnected().subscribe((data) => {
      this.etudiant = data;
    });
  }
}
