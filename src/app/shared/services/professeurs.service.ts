import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpRequestService } from './http/http-request.service';
import { EnvironmentConst } from '../../data/constant/data-env.const';
import { DataWsConst } from '../../data/constant/data-ws.const';

@Injectable({
  providedIn: 'root',
})
export class ProfesseursService {
  constructor(private httpRequestService: HttpRequestService) {}

  uri = EnvironmentConst.API_URL + DataWsConst.WS_PROFESSEUR;

  getProfesseurConnected(): Observable<any> {
    return this.httpRequestService.get<any>(
      'PROFESSEUR',
      this.uri + '/connected'
    );
  }

  getListeProfesseurs(page: number, limit: number): Observable<any> {
    const url = `${this.uri}?page=${page}&limit=${limit}`;
    return this.httpRequestService.get<any>('PROFESSEUR', url);
  }
}
