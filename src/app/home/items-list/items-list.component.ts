import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ItemsListService } from './items-list.service';
import { Item } from './items.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent {
  items: Observable<Item[]> = this.itemsService.items.pipe(
    map((items) => items.filter((i) => i.open))
  );

  constructor(private itemsService: ItemsListService) {}
}
