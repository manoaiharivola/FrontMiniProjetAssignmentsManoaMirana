import { Injectable } from '@angular/core';
import {HttpRequestService} from "../../../shared/services/http/http-request.service";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {JsonModel} from "../../../core/bean/json-model";
import {DataWsConst} from "../../constant/data-ws.const";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpRequestService: HttpRequestService) { }

  public login(user:any): Observable<JsonModel> {
    return this.httpRequestService.post(null, environment.apiUrl + DataWsConst.WS_LOGIN,user);
  }

  public inscription(user:any): Observable<JsonModel> {
    return this.httpRequestService.post(null, environment.apiUrl + DataWsConst.WS_INSCRIPTION,user);
  }
}
