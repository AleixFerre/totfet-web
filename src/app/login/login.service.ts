import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../shared/globals';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(password: string): Observable<void> {
    localStorage.setItem('Authorization', password);
    return this.http.get<void>(url);
  }
}