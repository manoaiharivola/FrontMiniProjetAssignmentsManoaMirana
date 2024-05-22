import { Injectable } from '@angular/core';
import { Matiere } from '../professeur/professeur-matieres/matiere.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpRequestService } from '../shared/services/http/http-request.service';
import { EnvironmentConst } from '../data/constant/data-env.const';
import { DataWsConst } from '../data/constant/data-ws.const';

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

  getMatieresPagines(page: number, limit: number): Observable<any> {
    return this.httpRequestService.get<Matiere[]>(
      'TEACHER',
      this.uri + '?page=' + page + '&limit=' + limit
    );
  }

  // retourne tous les matieres
  /*getMatieres(): Observable<Matiere[]> {
    return this.httpRequestService.get(this.uri);
  }

  getMatiere(id: number): Observable<Matiere | undefined> {
    return this.http
      .get<Matiere>(this.uri + '/' + id)
      .pipe(
        catchError(
          this.handleError<any>(
            '### catchError: getMatieres by id avec id=' + id
          )
        )
      );
  }

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
