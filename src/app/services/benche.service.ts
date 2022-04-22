import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { benche } from '../model/benche';


const baseURL = 'http://localhost:9003/api/benche/';

@Injectable({
  providedIn: 'root'
})
export class BencheService {

  constructor(private http: HttpClient) { }

  getListBench() : Observable<benche[]>{
    return this.http.get<benche[]>(baseURL+'all')
  }
}