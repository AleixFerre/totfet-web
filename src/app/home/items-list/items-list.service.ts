import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  map,
  tap,
  throwError
} from 'rxjs';
import { url } from '../../shared/globals';
import { Item } from './items.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsListService {
  private _items: BehaviorSubject<Item[]> = new BehaviorSubject<Item[]>([]);
  private _search: BehaviorSubject<string> = new BehaviorSubject<string>('');

  public items = combineLatest([
    this._items.asObservable(),
    this._search.asObservable(),
  ]).pipe(
    map(([items, search]) =>
      items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()))
    )
  );

  public openItems = this.items.pipe(
    map((items) => items.filter((i) => !i.closed))
  );
  public closedItems = this.items.pipe(
    map((items) => items.filter((i) => i.closed))
  );

  public isLoading = true;

  constructor(private http: HttpClient) {}

  public getAllItemNames(): string[] {
    return Array.from(new Set(this._items.value.map((i) => i.name)));
  }

  public setSearchValue(searchValue: string) {
    this._search.next(searchValue);
  }

  public refreshItems(): void {
    this.isLoading = true;
    this.http.get<Item[]>(`${url}/items`).subscribe((items) => {
      this.isLoading = false;
      return this._items.next(items);
    });
  }

  public addItem(item: Partial<Item>): Observable<Item> {
    this.isLoading = true;

    const itemFound = this._items.value.find((i) => i.name === item.name);

    if (!itemFound) {
      return this.http.post<Item>(`${url}/items`, item).pipe(
        tap((newItem) => {
          this._items.next([...this._items.value, newItem]);
          this.isLoading = false;
        })
      );
    }

    if (itemFound.closed) {
      return this.editItem({ ...item, id: itemFound.id });
    }

    return this.editItem({
      ...item,
      amount: (item.amount ?? 0) + itemFound.amount,
      id: itemFound.id,
    });
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

  public removeClosed(): Observable<void> {
    this.isLoading = true;
    return this.http.delete<void>(`${url}/items/closed`).pipe(
      tap(() => {
        this._items.next(this._items.value.filter((i) => !i.closed));
        this.isLoading = false;
      })
    );
  }

  public removeItem(item: Item): Observable<void> {
    this.isLoading = true;
    return this.http.delete<void>(`${url}/items/${item.id}`).pipe(
      tap(() => {
        const list = [...this._items.value];
        const index = list.findIndex((i) => i.id === item.id);
        list.splice(index, 1);
        this._items.next(list);
        this.isLoading = false;
      })
    );
  }

  public closeItem(itemId: number): Observable<void> {
    const list = [...this._items.value];
    const index = list.findIndex((item) => item.id === itemId);
    list[index].closed = true;
    this._items.next(list);

    return this.http.post<void>(`${url}/items/close`, { id: itemId }).pipe(
      catchError((err) => {
        // revert the changes and rethrow the error
        list[index].closed = false;
        this._items.next(list);
        return throwError(() => err);
      })
    );
  }
}
