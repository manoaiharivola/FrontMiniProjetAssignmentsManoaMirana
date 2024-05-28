import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpRequestService } from './http/http-request.service';
import { EnvironmentConst } from '../../data/constant/data-env.const';
import { DataWsConst } from '../../data/constant/data-ws.const';

@Injectable({
  providedIn: 'root',
})
export class DevoirsService {
  constructor(private httpRequestService: HttpRequestService) {}

  uri = EnvironmentConst.API_URL + DataWsConst.WS_DEVOIR;

  ajouterDevoir(payload: any): Observable<any> {
    return this.httpRequestService.post<any>('PROFESSEUR', this.uri, payload);
  }

  getProfesseurDevoirs(page: number, limit: number, matiereId?: string): Observable<any> {
    let url = `${this.uri}/professeur?page=${page}&limit=${limit}`;
    if (matiereId) {
      url += `&matiere_id=${matiereId}`;
    }
    return this.httpRequestService.get<any>('PROFESSEUR', url);
  }
}
