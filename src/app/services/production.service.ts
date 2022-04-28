import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { summary } from '../model/summary';

const baseURL = 'http://localhost:9003/api/';

@Injectable({
  providedIn: 'root'
})

export class ProductionService {

  constructor(private http: HttpClient) { }

  getSummaryByDate(baseDeDonnés: string,  maDate: string) : Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+baseDeDonnés+'testStartTime/'+ maDate)
  }

  getListSummaryByTesterId(baseDeDonnés: string,maDate: string, testerId:number) : Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+baseDeDonnés+'testStartTime/'+maDate+'/testerID/'+testerId)
  }

  getSummariesBetweenTwoDays(baseDeDonnés: string,date1 : string , date2: string ): Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+baseDeDonnés + date1+'/'+date2)
  }

  getSummariesBetweenTwoDaysByTesterId(baseDeDonnés: string,date1 : string , date2: string , testerId: number): Observable<summary[]>{
    return this.http.get<summary[]>(baseURL + baseDeDonnés+date1+'/'+date2+'/'+testerId)
  }

  getTesterId(baseDeDonnés: string,testerId: number): Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+baseDeDonnés+'testerID/'+testerId)
  }

  getTesterIDPageable(baseDeDonnés: string,testerId: number): Observable<object[]>{
    return this.http.get<object[]>(baseURL+baseDeDonnés+'testerIDPageable/'+testerId)
  }

  getSummaryListPaginate(baseDeDonnés: string,pageNumber: number, pageSize: number): Observable<object[]> {
    const url = baseURL + baseDeDonnés+ `all?pageSize=${pageSize}&pageNumber=${pageNumber}`
    console.log(url);
    return this.http.get<object[]>(url).pipe(map(response => response));
  }
}