import { DataRoutingConst } from '../../../../data/constant/data-routing.const';

export const sidebarProfesseurData = [
  {
    routerLink: DataRoutingConst.ROUTE_PROFESSEUR_MATIERES,
    icon: 'mdi mdi-book-multiple',
    label: 'Matières',
    url: DataRoutingConst.ROUTE_PROFESSEUR_MATIERES,
  },
  {
    routerLink: DataRoutingConst.ROUTE_PROFESSEUR_DEVOIRS,
    icon: 'mdi mdi-book-open',
    label: 'Devoirs',
    url: DataRoutingConst.ROUTE_PROFESSEUR_DEVOIRS,
  },
  {
    routerLink: DataRoutingConst.ROUTE_PROFESSEUR_ETUDIANTS,
    icon: 'mdi mdi-account-box-outline',
    label: 'Etudiants',
    url: DataRoutingConst.ROUTE_PROFESSEUR_ETUDIANTS,
  },
  {
    routerLink: DataRoutingConst.ROUTE_PROFESSEUR_PROFESSEURS,
    icon: 'mdi mdi-mdi-glasses',
    label: 'Professeurs',
    url: DataRoutingConst.ROUTE_PROFESSEUR_PROFESSEURS,
  },
];
