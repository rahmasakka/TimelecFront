import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { summary } from '../model/summary';

const baseURL = 'http://localhost:9003/api/';

@Injectable({
  providedIn: 'root'
})

export class ProductionService {

  constructor(private http: HttpClient) { }

  getListTesterByDatabase(baseDeDonnés: string): Observable<object>{
    return this.http.get<Object>(`${baseURL}${baseDeDonnés}listeTesterIdByDatabase`)
  }


  getSummaryByDatePaginate(baseDeDonnés: string, maDate: string, thePageSize: number, thePageNumber: number): Observable<GetResponseSummary> {
    const searchUrl = `${baseURL}${baseDeDonnés}testStartTime/${maDate}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`
    return this.http.get<GetResponseSummary>(searchUrl);
    //baseURL + baseDeDonnés + 'testStartTime/' + maDate + "?pageSize=" + thePageSize + "&pageNumber=" + thePageNumber
  }

  getListSummaryByDateByTesterIdPaginate(baseDeDonnés: string, maDate: string, testerId: number, thePageSize: number, thePageNumber: number): Observable<GetResponseSummary[]> {
    const searchUrl = `${baseURL}${baseDeDonnés}testStartTime/${maDate}/testerID/${testerId}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`
    return this.http.get<GetResponseSummary[]>(searchUrl)
  }
  
  getListSummaryByTesterId(baseDeDonnés: string, testerId: number, thePageSize: number, thePageNumber: number): Observable<GetResponseSummary[]> {
    const searchUrl = `${baseURL}${baseDeDonnés}testerID/${testerId}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`
    return this.http.get<GetResponseSummary[]>(searchUrl)
  }

  getSummariesBetweenTwoDaysPaginate(baseDeDonnés: string, date1: string, date2: string, thePageSize: number, thePageNumber: number): Observable<GetResponseSummary[]> {
    const searchUrl = `${baseURL}${baseDeDonnés}${date1}/${date2}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`
    return this.http.get<GetResponseSummary[]>(searchUrl)
  }

  getSummariesBetweenTwoDaysByTesterIdPaginate(baseDeDonnés: string, date1: string, date2: string, testerId: number, thePageSize: number, thePageNumber: number): Observable<GetResponseSummary[]> {
    const searchUrl = `${baseURL}${baseDeDonnés}${date1}/${date2}/${testerId}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`
    return this.http.get<GetResponseSummary[]>(searchUrl)  }

  getSummaryListPaginate(baseDeDonnés: string, pageNumber: number, pageSize: number): Observable<GetResponseSummary[]> {
    const searchUrl = `${baseURL}${baseDeDonnés}all?pageSize=${pageSize}&pageNumber=${pageNumber}`
    return this.http.get<GetResponseSummary[]>(searchUrl)
  }

  getSummaryByYearByMonth(baseDeDonnés: string, month: number, year: number, thePageSize: number, thePageNumber: number): Observable<GetResponseSummary[]> {
    const searchUrl = `${baseURL}${baseDeDonnés}month/${month}/year/${year}?pageSize=${thePageSize}&pageNumber=${thePageNumber}`
    return this.http.get<GetResponseSummary[]>(searchUrl)
  }
}

interface GetResponseSummary{
  _embedded:{
    summaries : summary[];
  },
  page: {
    size: number;
    totalElements: number;
    totalPages:  number,
    number : number
  }
}