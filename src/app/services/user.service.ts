import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { TokenStorageService } from './token-storage.service';

const API_URL = 'http://localhost:9001/api/test/';
const baseURL = "http://localhost:9001/api/users/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenInfo: TokenStorageService) { }


  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUser(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdmin(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(baseURL + 'all')
  }

  createUser(user: User): Observable<Object>{
    return this.http.post(baseURL + 'createUser',user);
  }

  getUserById(id: number): Observable<User>{
    console.log(baseURL + id)
    return this.http.get<User>(baseURL+id)
  }

  updateUser(id: number, user: User): Observable<Object>{
    return this.http.put(baseURL+'update/'+id, user)
  }
  
  deleteUser(id:number):Observable<Object>{
    return this.http.delete(baseURL+'delete/'+id);
  }
}