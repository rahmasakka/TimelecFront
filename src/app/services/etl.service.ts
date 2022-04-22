import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:9003/api/ETL/';
@Injectable({
  providedIn: 'root'
})
export class EtlService {

  constructor(private http: HttpClient) { }

  calculNbSecond( maDate: string , testerId: number , nbMinute : number) : Observable<number>{
    return this.http.get<number>(baseURL+'nbSecondParJour/'+ maDate+'/testerID/'+testerId+'/nbMinute/'+nbMinute)
  }
}