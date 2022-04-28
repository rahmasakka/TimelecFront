import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:9003/api/';
@Injectable({
  providedIn: 'root'
})
export class EtlService {

  constructor(private http: HttpClient) { }

  calculNbSecond(databaseId: string,  maDate: string , testerId: number , nbMinute : number) : Observable<number>{
    return this.http.get<number>(baseURL+databaseId+'nbSecondParJour/'+ maDate+'/testerID/'+testerId+'/nbMinute/'+nbMinute)
  }
}