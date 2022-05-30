import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { machine } from '../model/machine';


const baseURL = "http://localhost:9003/api/machine/";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }
  
  machineReferencedToCentreCharge(idCentreCharge: number):Observable<machine>{
    return this.http.get<machine>(baseURL+'referenced/'+idCentreCharge)
  }

  updateReferenceMachine(idMachine: number): Observable<Object>{
    return this.http.put(baseURL + 'updateReferenceMachine/'+idMachine, idMachine)
  }

  updateReferenceMachineFalse(idCC : number): Observable<Object>{
    return this.http.put(baseURL + 'updateReferenceMachineFalse/'+idCC, null)
  }

  listTesteurReferenced(): Observable<machine[]>{
    return this.http.get<machine[]>(baseURL+'listTesteurReferenced')
  }
}