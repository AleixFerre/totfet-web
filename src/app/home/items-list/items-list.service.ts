import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from '../../shared/globals';
import { Item } from './items.model';

@Injectable()
export class ItemsListService {
  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${url}/items`);
  }
}
