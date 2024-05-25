import { Injectable } from '@angular/core';
import { Matiere } from '../models/matiere.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpRequestService } from './http/http-request.service';
import { EnvironmentConst } from '../../data/constant/data-env.const';
import { DataWsConst } from '../../data/constant/data-ws.const';
import { Etudiant } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root',
})
export class MatieresService {
  matieres: Matiere[] = [];

  constructor(
    private logService: LoggingService,
    private httpRequestService: HttpRequestService
  ) {}

  uri = EnvironmentConst.API_URL + DataWsConst.WS_MATIERE;

  getProfesseurMatieresPagines(page: number, limit: number): Observable<any> {
    return this.httpRequestService.get<Matiere[]>(
      'PROFESSEUR',
      this.uri + '/professeur?page=' + page + '&limit=' + limit
    );
  }

  getEtudiantsMatiere(idMatiere: string): Observable<any> {
    return this.httpRequestService.get<Etudiant[]>(
      'PROFESSEUR',
      this.uri + '/' + idMatiere + '/etudiants'
    );
  }

  getProfesseurMatieres(): Observable<any> {
    return this.httpRequestService.get<any>(
      'PROFESSEUR',
      this.uri + '/professeur'
    );
  }

  getMatiere(id_matiere: string): Observable<any> {
    return this.httpRequestService.get<Matiere>(
      'PROFESSEUR',
      this.uri + '/' + id_matiere
    );
  }

  ajouterEtudiants(id_matiere: string, payload: any): Observable<any> {
    return this.httpRequestService.post<any>(
      'PROFESSEUR',
      `${this.uri}/${id_matiere}/ajouter-etudiants`,
      payload
    );
  }

  /*
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  addMatiere(matiere: Matiere): Observable<any> {
    this.logService.log(matiere.name, 'ajouté');
    return this.httpRequestService.post<Matiere>(this.uri, matiere);
  }

  updateMatiere(matiere: Matiere): Observable<any> {
    this.logService.log(matiere.name, 'modifié');
    return this.httpRequestService.put<Matiere>(this.uri, matiere);
  }

  deleteMatiere(matiere: Matiere): Observable<any> {
    this.logService.log(matiere.name, 'supprimé');
    return this.httpRequestService.delete(this.uri + '/' + matiere._id);
  }*/
}
