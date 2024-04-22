import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { url } from '../../shared/globals';
import { Item } from './items.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsListService {
  private _items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  public items = this._items.asObservable();
  public isLoading = true;

  constructor(private http: HttpClient) {}

  public refreshItems(): void {
    this.http
      .get<Item[]>(`${url}/items`)
      .subscribe((items) => {
        this.isLoading = false;
        return this._items.next(items);
      });
  }

  public addItem(item: Partial<Item>): Observable<Item> {
    this.isLoading = true;
    return this.http.post<Item>(`${url}/items`, item).pipe(
      tap((newItem) => {
        this._items.next([...this._items.value, newItem]);
        this.isLoading = false;
      })
    );
  }
}
