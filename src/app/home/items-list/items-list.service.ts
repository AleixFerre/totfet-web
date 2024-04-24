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
    this.http.get<Item[]>(`${url}/items`).subscribe((items) => {
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

  public editItem(item: Partial<Item>): Observable<Item> {
    this.isLoading = true;
    return this.http.put<Item>(`${url}/items`, item).pipe(
      tap((newItem) => {
        const list = [...this._items.value];
        const index = list.findIndex((i) => i.id === item.id);
        list[index] = newItem;
        this._items.next(list);
        this.isLoading = false;
      })
    );
  }

  public removeClosed() {
    this.isLoading = true;
    return this.http.delete<void>(`${url}/items/closed`).pipe(
      tap(() => {
        this._items.next(this._items.value.filter((i) => i.open));
        this.isLoading = false;
      })
    );
  }

  public closeItem(itemId: number) {
    this.isLoading = true;
    return this.http.post<void>(`${url}/items/close`, { id: itemId }).pipe(
      tap(() => {
        const list = [...this._items.value];
        const index = list.findIndex((item) => item.id === itemId);
        list[index].open = false;
        this._items.next(list);
        this.isLoading = false;
      })
    );
  }
}
