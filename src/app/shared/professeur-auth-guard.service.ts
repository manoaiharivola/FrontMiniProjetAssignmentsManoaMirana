import { Injectable } from '@angular/core';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageConst } from './constant/local-storage.const';
@Injectable({
  providedIn: 'root',
})
export class ProfesseurAuthGuardService {
  constructor(private localStorageService: LocalStorageService) {}

  checkAuthorisation() {
    const helper = new JwtHelperService();
    const token =
      this.localStorageService.getItem(
        LocalStorageConst.PROFESSEUR_ACCESS_TOKEN
      ) != null
        ? this.localStorageService.getItem(
            LocalStorageConst.PROFESSEUR_ACCESS_TOKEN
          )
        : '';
    return !helper.isTokenExpired(token);
  }
}
