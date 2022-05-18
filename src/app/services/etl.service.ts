import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:9003/api/';
@Injectable({
  providedIn: 'root'
})
export class EtlService {

  constructor(private http: HttpClient) { }
  ETL(jour: string, database: string): Observable<object> {
    return this.http.get<object>(`${baseURL}${database}/etl/${jour}`)
  }
}