import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { centreCharge } from '../model/centreCharge';

const baseURL = "http://localhost:9003/api/cc/";

@Injectable({
  providedIn: 'root'
})
export class CentreChargeService {

  constructor(private http: HttpClient) { }

  getLoadCharge(): Observable<centreCharge[]> {
    return this.http.get<centreCharge[]>(baseURL + 'all')
  }

  deleteLoadCharge(id: number): Observable<Object> {
    return this.http.delete(baseURL + 'delete/' + id)
  }

  addNewLoadCharge(centreCharge: centreCharge): Observable<Object> {
    return this.http.post(baseURL + 'createCC', centreCharge);
  }

  getLoadChargeById(id: number): Observable<centreCharge> {
    return this.http.get<centreCharge>(baseURL + id);
  }

  updateLoadCharge(id: number, centreCharge: centreCharge): Observable<Object> {
    return this.http.put(baseURL + 'update/' + id, centreCharge)
  }

  listLoadChargeByUAP(id: number): Observable<centreCharge[]> {
    return this.http.get<centreCharge[]>(baseURL + 'listCCByUAP/' + id)
  }
}