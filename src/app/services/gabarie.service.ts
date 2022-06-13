import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = "http://localhost:9003/api/gabarie/";

@Injectable({
  providedIn: 'root'
})
export class GabarieService {

  constructor(private http: HttpClient) { }

  getAll(url: string, thePageSize: number, thePageNumber: number): Observable<any> {
    return this.http.get<any>(`${baseURL}${url}/all?pageSize=${thePageSize}&pageNumber=${thePageNumber}`)
  }

  getByDate(url: string, date: string, thePageSize: number, thePageNumber: number): Observable<any> {
    return this.http.get<any>(`${baseURL}${url}/date/${date}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`)
  }

  getByOF(url: string, of: string, thePageSize: number, thePageNumber: number): Observable<any> {
    return this.http.get<any>(`${baseURL}${url}/of/${of}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`)
  }

  getByDateByOF(url: string, date: string, of: string, thePageSize: number, thePageNumber: number): Observable<any> {
    return this.http.get<any>(`${baseURL}${url}/date/${date}/of/${of}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`)
  }

  betweenTwoDates(url: string, dateDeb: string, dateFin: string, thePageSize: number, thePageNumber: number): Observable<any> {
    return this.http.get<any>(`${baseURL}${url}/dateDeb/${dateDeb}/dateFin/${dateFin}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`)
  }

  betweenTwoDatesOf(url: string, dateDeb: string, dateFin: string, of: string, thePageSize: number, thePageNumber: number): Observable<any> {
    return this.http.get<any>(`${baseURL}${url}/dateDeb/${dateDeb}/dateFin/${dateFin}/of/${of}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`)
  }

  
  byMachineBetweenTwoDates(url: string, dateDeb: string, dateFin: string, machine: string, thePageSize: number, thePageNumber: number): Observable<any> {
    return this.http.get<any>(`${baseURL}${url}/dateDeb/${dateDeb}/dateFin/${dateFin}/machine/${machine}
  }?pageSize=${thePageSize}&pageNumber=${thePageNumber}`)
  }

  byMachine(url: string, machine: string, thePageSize: number, thePageNumber: number): Observable<any> {
    return this.http.get<any>(`${baseURL}${url}/machine/${machine}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`)

  }

}