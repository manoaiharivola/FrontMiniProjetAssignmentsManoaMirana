import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
}
