import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaodCharge } from '../model/LaodCharge';

const baseURL = "http://localhost:9003/api/cc/";

@Injectable({
  providedIn: 'root'
})
export class LoadChargeService {

  constructor(private http: HttpClient) { }
  getLoadCharge(): Observable<LaodCharge[]> {
    return this.http.get<LaodCharge[]>(baseURL + 'all')
  }

  deleteLoadCharge(id: number) : Observable<Object>{
    return this.http.delete(baseURL+'delete/' + id)
  }

  addNewLoadCharge(loadCharge : LaodCharge) : Observable<Object>{
    return this.http.post(baseURL + 'CreateCC', loadCharge);
  }

  getLoadChargeById(id: number) : Observable<LaodCharge>{
    return this.http.get<LaodCharge>(baseURL+id);
  }

  updateUAP(id: number, loadCharge: LaodCharge): Observable<Object> {
    return this.http.put(baseURL + 'update/' + id, loadCharge)
  }
}