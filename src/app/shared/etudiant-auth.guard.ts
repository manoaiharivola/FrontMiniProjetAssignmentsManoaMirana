import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { EtudiantAuthGuardService } from './etudiant-auth-guard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './services/snack-bar/snack-bar.service';
import { DataRoutingConst } from '../data/constant/data-routing.const';

@Injectable({
  providedIn: 'root',
})
export class EtudiantAuthGuard implements CanActivate {
  constructor(
    private etudiantAuthGuardService: EtudiantAuthGuardService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private snackBarService: SnackBarService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.etudiantAuthGuardService.checkAuthorisation()) {
      this.router.navigate([DataRoutingConst.ROUTE_LOGIN]);
      this.snackBarService.openErrorSnackBar(
        'Vous devez vous connecter pour accéder à cette page.'
      );
      return false;
    } else {
      return true;
    }
  }
}
