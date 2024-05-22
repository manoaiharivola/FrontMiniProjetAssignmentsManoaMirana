import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestService } from '../shared/services/http/http-request.service';
import { EnvironmentConst } from '../data/constant/data-env.const';
import { DataWsConst } from '../data/constant/data-ws.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;

  constructor(private httpRequestService: HttpRequestService) {}

  // méthode pour connecter l'utilisateur
  // Typiquement, il faudrait qu'elle accepte en paramètres
  // un nom d'utilisateur et un mot de passe, que l'on vérifierait
  // auprès d'un serveur...
  logIn() {
    this.loggedIn = true;
  }

  // méthode pour déconnecter l'utilisateur
  logOut() {
    this.loggedIn = false;
  }

  // methode qui indique si on est connecté en tant qu'admin ou pas
  // pour le moment, on est admin simplement si on est connecté
  // En fait cette méthode ne renvoie pas directement un booleén
  // mais une Promise qui va renvoyer un booléen (c'est imposé par
  // le système de securisation des routes de Angular)
  //
  // si on l'utilisait à la main dans un composant, on ferait:
  // this.authService.isAdmin().then(....) ou
  // admin = await this.authService.isAdmin()
  isAdmin() {
    const promesse = new Promise((resolve, reject) => {
      // ici accès BD? Web Service ? etc...
      resolve(this.loggedIn);
      // pas de cas d'erreur ici, donc pas de reject
    });

    return promesse;
  }

  /*add login*/
  public login(user: any): Observable<any> {
    return this.httpRequestService.post(
      null,
      EnvironmentConst.API_URL + DataWsConst.WS_LOGIN,
      user
    );
  }

  public loginProfesseur(user: any): Observable<any> {
    return this.httpRequestService.post(
      null,
      EnvironmentConst.API_URL + DataWsConst.WS_TEACHER_LOGIN,
      user
    );
  }
}
