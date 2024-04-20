import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ItemsListService } from './items-list.service';
import { Item } from './items.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [AsyncPipe],
  providers: [ItemsListService],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent implements OnInit {
  itemsSubject = new BehaviorSubject<Item[]>([]);
  private items: Observable<Item[]> = this.itemsService.getAllItems();

  constructor(private itemsService: ItemsListService) {}

  ngOnInit(): void {
    this.items.subscribe((value) => {
      this.itemsSubject.next(value);
    });
  }
}
