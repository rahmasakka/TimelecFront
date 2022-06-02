import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dashboard } from '../model/dashboard';


const baseURL = "http://localhost:9003/api/dashboard";
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  //1 [database testerID datedeb datefin]
  getDashboardBetween2DaysByDatabaseByTester(database: string, dateDeb: string, dateFin: string, tester: number): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/database/${database}/dateDeb/${dateDeb}/dateFin/${dateFin}/tester/${tester}`)
  }

  //2 [database testerID datedeb !datefin]
  getDashboardByDateByDatabaseByTester(database: string, dateDeb: string, tester: number): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/database/${database}/dateDeb/${dateDeb}/tester/${tester}`)
  }

  //3 [database testerID !datedeb !datefin]
  getDashboardByDatabaseByTester(database: string, tester: number): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/database/${database}/tester/${tester}`)
  }

  //4 [database !testerID datedeb datefin]
  getDashboardBetween2DaysByDatabase(database: string, dateDeb: string, dateFin: string): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/database/${database}/dateDeb/${dateDeb}/dateFin/${dateFin}`)
  }

  //5 [database !testerID datedeb !datefin]
  getDashboardByDateByDatabase(database: string, dateDeb: string): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/database/${database}/dateDeb/${dateDeb}`)
  }

  //6 [database !testerID !datedeb !datefin]
  getDashboardByDatabase(database: string): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/database/${database}`)
  }

  //7 [!database testerID datedeb datefin]
  getDashboardBetween2DaysByTester(tester: number, dateDeb: string, dateFin: string): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/dateDeb/${dateDeb}/dateFin/${dateFin}/tester/${tester}`)
  }

  //8 [!database testerID datedeb !datefin]
  getDashboardByDateBytesterId(dateDeb: string, tester: number): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/dateDeb/${dateDeb}/tester/${tester}`)
  }

  //9 [!database testerID !datedeb !datefin]
  getDashboardByTesterID(tester: number): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/tester/${tester}`)
  }

  //10 [!database !testerID datedeb datefin]
  getDashboardBetween2Days(dateDeb: string, dateFin: string): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/dateDeb/${dateDeb}/dateFin/${dateFin}`)
  }

  //11 [!database !testerID datedeb !datefin]
  getDashboardByDate(dateDeb: string): Observable<dashboard[]> {
    return this.http.get<dashboard[]>(`${baseURL}/date/${dateDeb}`)
  }

  //12 
  dashboardByTesterID(): Observable<object[]> {
    return this.http.get<object[]>(`${baseURL}/DashboardByTesters`)
  }

  //14 
  listTesters(): Observable<object[]> {
    return this.http.get<object[]>(`${baseURL}/listTesters`)
  }

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