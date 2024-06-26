import { DataRoutingConst } from '../../../../data/constant/data-routing.const';

export const sidebarData = [
  {
    routerLink: DataRoutingConst.ROUTE_ETUDIANT_DEVOIRS,
    icon: 'mdi mdi-book-open',
    label: 'Devoirs',
    url: DataRoutingConst.ROUTE_ETUDIANT_DEVOIRS,
  },
  {
    routerLink: DataRoutingConst.ROUTE_ETUDIANT_PROFESSEURS,
    icon: 'mdi mdi-glasses',
    label: 'Professeurs',
    url: DataRoutingConst.ROUTE_ETUDIANT_PROFESSEURS,
  },
];
