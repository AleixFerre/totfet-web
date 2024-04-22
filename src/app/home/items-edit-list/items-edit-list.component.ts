import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';
import { map } from 'rxjs';
import { ItemsListService } from '../items-list/items-list.service';
import { NewItemComponent } from './new-item/new-item.component';

@Component({
  selector: 'app-items-edit-list',
  standalone: true,
  imports: [AsyncPipe, MatBottomSheetModule, MatDividerModule],
  templateUrl: './items-edit-list.component.html',
  styleUrl: './items-edit-list.component.scss',
})
export class ItemsEditListComponent {
  openItems = this.itemsService.items.pipe(
    map((items) => items.filter((i) => i.open))
  );
  closedItems = this.itemsService.items.pipe(
    map((items) => items.filter((i) => !i.open))
  );

  constructor(
    private itemsService: ItemsListService,
    private _bottomSheet: MatBottomSheet
  ) {}

  openAddMenu() {
    this._bottomSheet.open(NewItemComponent);
  }
}
