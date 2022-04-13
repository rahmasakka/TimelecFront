import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaodCharge } from '../model/LaodCharge';

const baseURL = "http://localhost:9003/api/cc/";

@Injectable({
  providedIn: 'root'
})
export class CentreChargeService {

  constructor(private http: HttpClient) { }

  getLoadCharge(): Observable<LaodCharge[]> {
    return this.http.get<LaodCharge[]>(baseURL + 'all')
  }

  deleteLoadCharge(id: number): Observable<Object> {
    return this.http.delete(baseURL + 'delete/' + id)
  }

  addNewLoadCharge(loadCharge: LaodCharge): Observable<Object> {
    return this.http.post(baseURL + 'createCC', loadCharge);
  }

  getLoadChargeById(id: number): Observable<LaodCharge> {
    return this.http.get<LaodCharge>(baseURL + id);
  }

  updateLoadCharge(id: number, loadCharge: LaodCharge): Observable<Object> {
    return this.http.put(baseURL + 'update/' + id, loadCharge)
  }

  listLoadChargeByUAP(id: number): Observable<LaodCharge[]> {
    return this.http.get<LaodCharge[]>(baseURL + 'listCCByUAP/' + id)
  }
}