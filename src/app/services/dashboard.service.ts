import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseURL = "http://localhost:9003/api/dashboard";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardGroupByDateUAP(dateDeb: string, dateFin: string): Observable<object[]> {
    return this.http.get<object[]>(`${baseURL}/GroupByDateUAP/dateDeb/${dateDeb}/dateFin/${dateFin}`)
  }


  getDashboardGroupByDateUAPBytester(dateDeb: string, dateFin: string, tester: number): Observable<object[]> {
    return this.http.get<object[]>(`${baseURL}/GroupByDateUAPBytester/dateDeb/${dateDeb}/dateFin/${dateFin}/tester/${tester}`)
  }

  getSommeGlobale(dateDeb: string, dateFin: string): Observable<object[]> {
    return this.http.get<object[]>(`${baseURL}/sommeGlobale/dateDeb/${dateDeb}/dateFin/${dateFin}`)
  }

  getDashboardByUAPDetails(dateDeb: string, dateFin: string, idUAP: number): Observable<object[]> {
    return this.http.get<object[]>(`${baseURL}/dashboardByUAPDetails/${idUAP}/dateDeb/${dateDeb}/dateFin/${dateFin}`)
  }

  getDashboardByUAP(dateDeb: string, dateFin: string, idUAP: number): Observable<object[]> {
    return this.http.get<object[]>(`${baseURL}/dashboardByUAP/${idUAP}/dateDeb/${dateDeb}/dateFin/${dateFin}`)
  }

  dashboardByCentreCharge(dateDeb: string, dateFin: string, idCC: number): Observable<object[]> {
    return this.http.get<object[]>(`${baseURL}/dashboardByCentreCharge/${idCC}/dateDeb/${dateDeb}/dateFin/${dateFin}`)
  }

}