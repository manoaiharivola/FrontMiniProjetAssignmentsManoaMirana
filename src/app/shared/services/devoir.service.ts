import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpRequestService } from './http/http-request.service';
import { EnvironmentConst } from '../../data/constant/data-env.const';
import { DataWsConst } from '../../data/constant/data-ws.const';
import { milleDevoirs } from '../data';

@Injectable({
  providedIn: 'root',
})
export class DevoirsService {
  constructor(private httpRequestService: HttpRequestService) {}

  uri = EnvironmentConst.API_URL + DataWsConst.WS_DEVOIR;

  ajouterDevoir(payload: any): Observable<any> {
    return this.httpRequestService.post<any>('PROFESSEUR', this.uri, payload);
  }

  getProfesseurDevoirs(
    page: number,
    limit: number,
    matiereId?: string,
    search?: string,
    sortField?: string,
    sortOrder?: string
  ): Observable<any> {
    let url = `${this.uri}/professeur?page=${page}&limit=${limit}`;
    if (matiereId) {
      url += `&matiere_id=${matiereId}`;
    }
    if (search) {
      url += `&search=${search}`;
    }
    if (sortField && sortOrder) {
      url += `&sortField=${sortField}&sortOrder=${sortOrder}`;
    }
    return this.httpRequestService.get<any>('PROFESSEUR', url);
  }

  getDevoir(devoirId: string): Observable<any> {
    return this.httpRequestService.get<any>(
      'PROFESSEUR',
      `${this.uri}/${devoirId}`
    );
  }

  getDevoirsNonNotes(
    devoirId: string,
    page: number,
    limit: number
  ): Observable<any> {
    return this.httpRequestService.get<any>(
      'PROFESSEUR',
      `${this.uri}/${devoirId}/nonnotes?page=${page}&limit=${limit}`
    );
  }

  getDevoirsNotes(
    devoirId: string,
    page: number,
    limit: number
  ): Observable<any> {
    return this.httpRequestService.get<any>(
      'PROFESSEUR',
      `${this.uri}/${devoirId}/notes?page=${page}&limit=${limit}`
    );
  }

  noterDevoir(devoirEtudiantId: string, payload: any): Observable<any> {
    return this.httpRequestService.put<any>(
      'PROFESSEUR',
      `${this.uri}/${devoirEtudiantId}/noter`,
      payload
    );
  }

  updateDevoir(payload: any): Observable<any> {
    return this.httpRequestService.put<any>('PROFESSEUR', this.uri, payload);
  }

  deleteDevoir(id: string): Observable<any> {
    return this.httpRequestService.delete<any>(
      'PROFESSEUR',
      `${this.uri}/${id}`
    );
  }

  getDevoirsARendre(): Observable<any> {
    return this.httpRequestService.get<any>(
      'ETUDIANT',
      `${this.uri}/etudiant/a-rendre`
    );
  }

  getDevoirsRendus(): Observable<any> {
    return this.httpRequestService.get<any>(
      'ETUDIANT',
      `${this.uri}/etudiant/rendus`
    );
  }

  rendreDevoir(id: string, payload: any): Observable<any> {
    return this.httpRequestService.put<any>(
      'ETUDIANT',
      `${this.uri}/devoir-etudiant/${id}/rendre`,
      payload
    );
  }

  ajouterMilleDevoirs() {
    milleDevoirs.forEach((devoir) => {
      let nouveauDevoir = {
        nom: devoir.nom,
        dateDeRendu: devoir.dateDeRendu,
        description: devoir.description,
        matiere_id: devoir.matiere_id,
      };
      this.ajouterDevoir(nouveauDevoir).subscribe(() => {
        console.log('Devoir ' + nouveauDevoir.nom + ' ajouté');
      });
    });
  }
}
