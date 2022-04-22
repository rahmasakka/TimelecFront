import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { summary } from '../model/summary';


const baseURL = 'http://localhost:9003/api/production/';

@Injectable({
  providedIn: 'root'
})

export class ProductionService {

  constructor(private http: HttpClient) { }


  getSummaryByDate( maDate: string) : Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+'testStartTime/'+ maDate)
  }

  getListSummaryByTesterId(maDate: string, testerId:number) : Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+'testStartTime/'+maDate+'/testerID/'+testerId)
  }

  getSummariesBetweenTwoDays(date1 : string , date2: string ): Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+date1+'/'+date2)
  }

  getSummariesBetweenTwoDaysByTesterId(date1 : string , date2: string , testerId: number): Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+date1+'/'+date2+'/'+testerId)
  }

  getTesterId(testerId: number): Observable<summary[]>{
    return this.http.get<summary[]>(baseURL+'testerID/'+testerId)
  }
}
