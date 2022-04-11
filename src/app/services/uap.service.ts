import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LaodCharge } from '../model/LaodCharge';
import { UAP } from '../model/uap';

const baseURL = "http://localhost:9003/api/uap/";

@Injectable({
  providedIn: 'root'
})
export class UapService {

  constructor(private http: HttpClient) { }

  getUAPList():Observable<UAP[]>{
    return this.http.get<UAP[]>(baseURL+'all')
  }

  deleteUAP(id: number): Observable<Object> {
    return this.http.delete(baseURL + 'delete/' + id);
  }

  addNewUAP(uap: UAP): Observable<Object>{
    return this.http.post(baseURL+'createUAP' , uap)
  }

  getUAPById(id: number) : Observable<UAP>{
    return this.http.get<UAP>(baseURL+ id)
  }

  updateUAP(id: number, uap: UAP): Observable<Object> {
    return this.http.put(baseURL + 'update/' + id, uap)
  }

  listCCByUAP(id:number):Observable<LaodCharge>{
    return this.http.get<LaodCharge>(baseURL+'listCCByUAP/' + id)
  }
}