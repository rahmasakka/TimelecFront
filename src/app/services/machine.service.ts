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

  getListMachine() : Observable<machine[]>{
    return this.http.get<machine[]>(baseURL+'all')
  }

  getMachineById(id: number): Observable<machine>{
    return this.http.get<machine>(baseURL+id)
  }

  deleteMachine(id: number):Observable<Object>{
    return this.http.delete(baseURL+'delete/'+id)
  }

  updateMachine(id: number, machine :machine): Observable<Object>{
    return this.http.put(baseURL+'update/' + id, machine)
  }

  createMachine(machine: machine) : Observable<object>{
    return this.http.post(baseURL+"createMachine", machine)
  }

  listMachineByLoadCharge(id: number): Observable<machine[]>{
    return this.http.get<machine[]>(baseURL+'listMachineByCC/'+ id)
  } 
}