import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NewItemComponent } from '../items-edit-list/new-item/new-item.component';
import { ItemsListService } from '../items-list/items-list.service';

@Component({
  selector: 'app-bottom-bar-menu',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatInputModule,
  ],
  templateUrl: './bottom-bar-menu.component.html',
  styleUrl: './bottom-bar-menu.component.scss',
})
export class BottomBarMenuComponent {
  openSearchBox: boolean = false;

  constructor(
    public itemsService: ItemsListService,
    private _bottomSheet: MatBottomSheet
  ) {}

  closeSearch() {
    this.openSearchBox = false;
    this.itemsService.setSearchValue('');
  }

  onSearchBoxChange(searchValue: any) {
    this.itemsService.setSearchValue(searchValue.target.value);
  }

  openAddMenu() {
    this._bottomSheet.open(NewItemComponent);
  }

  refreshItems() {
    this.itemsService.refreshItems();
  }
}
