import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../model/roles';
import { User } from '../model/user';
import { map } from 'rxjs/operators';


const API_URL = 'http://localhost:9003/api/test/';
const baseURL = "http://localhost:9003/api/users/";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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

  createUser(user: User): Observable<Object> {
    return this.http.post(baseURL + 'createUser', user);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(baseURL + id)
  }

  updateUser(id: number, user: User): Observable<Object> {
    return this.http.put(baseURL + 'update/' + id, user)
  }

  deleteUser(id: number): Observable<Object> {
    return this.http.delete(baseURL + 'delete/' + id);
  }

  getListRole(): Observable<Roles[]> {
    return this.http.get<Roles[]>(baseURL + 'roles/all')
  }

  getUsersListPaginate(pageNumber: number, sizeNumber: number): Observable<User[]> {
    const url = baseURL + 'all?page=' + pageNumber + '&size=' + sizeNumber
    return this.http.get<User[]>(url).pipe(map(response => response));
  }
}