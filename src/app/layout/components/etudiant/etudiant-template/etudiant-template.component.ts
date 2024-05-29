import { Component } from '@angular/core';
import { sidebarData } from './sidebar-data';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant-template',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
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
export class EtudiantTemplateComponent {
  sidebarData = sidebarData;

  constructor(private router: Router) {}

  isLinkActive(url: string): boolean {
    return this.router.url === url;
  }

  isParentLinkActive(url: string): boolean {
    return this.router.url.startsWith(url);
  }
}
