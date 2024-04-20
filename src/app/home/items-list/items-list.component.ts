import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
export class ItemsListComponent {
  items: Observable<Item[]> = this.itemsService.getAllItems();
  
  constructor(private itemsService: ItemsListService) {}
}
