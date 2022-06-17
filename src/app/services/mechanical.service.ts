import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:9003/api/';

@Injectable({
  providedIn: 'root'
})

export class MechanicalService {
  constructor(private http: HttpClient) { }

  assemblyByOf(database: string, of: string): Observable<any>{
    let url = `${baseURL}${database}/mechanical/${of}`
    console.log(url)
    return  this.http.get<any>(url)
  }

  sumPacking(database: string, of: string): Observable<any>{
    let url = `${baseURL}${database}/mechanical/packing/${of}`
    return  this.http.get<any>(url)
  }
}