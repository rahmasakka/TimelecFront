import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:9003/api';
@Injectable({
  providedIn: 'root'
})
export class EtlService {

  constructor(private http: HttpClient) { }

  ETL(jour: string) {
    this.ETLVM(jour)
    this.ETLDEVP87(jour)
    this.ETLFuserbloc(jour)
    this.ETLP77(jour)
    this.ETLSIRCOVER(jour)
  }
  ETLVM(jour: string): Observable<object> {
    return this.http.get<object>(`${baseURL}/vm/etl/${jour}`)
  }

  ETLDEVP87(jour: string): Observable<object> {
    return this.http.get<object>(`${baseURL}/devP87/etl/${jour}`)
  }

  ETLFuserbloc(jour: string): Observable<object> {
    return this.http.get<object>(`${baseURL}/fuserbloc/etl/${jour}`)
  }

  ETLP77(jour: string): Observable<object> {
    return this.http.get<object>(`${baseURL}/p77/etl/${jour}`)
  }

  ETLSIRCOVER(jour: string): Observable<object> {
    return this.http.get<object>(`${baseURL}/sircoSircover/etl/${jour}`)
  }
}