import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = "http://localhost:9003/api/";


@Injectable({
  providedIn: 'root'
})
export class CrudGlobaleService {

  constructor(private http: HttpClient) { }

  getListEntity(url: string): Observable<any> {
    return this.http.get<any>(baseURL + url + '/all')
  }

  deleteEntity(url: string, id: number): Observable<Object> {
    return this.http.delete(baseURL + url + '/delete/' + id)
  }

  getEntityById(url: string, id: number): Observable<any> {
    return this.http.get<any>(baseURL + url + "/" + id)
  }

  updateEntity(url: string, id: number, object: object): Observable<Object> {
    return this.http.put(baseURL + url + '/update/' + id, object)
  }

  createNewEntity(url: String, object: object): Observable<Object> {
    return this.http.post(baseURL + url + '/create', object)
  }

  getSonByMother(url: String, id: number): Observable<any> {
    return this.http.get<any>(baseURL + url + '/sonByMother/' + id)
  }
}