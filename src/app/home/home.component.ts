import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { AutofocusDirective } from '../shared/autofocus.directive';
import { ItemsEditListComponent } from './items-edit-list/items-edit-list.component';
import { NewItemComponent } from './items-edit-list/new-item/new-item.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListService } from './items-list/items-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ItemsListComponent,
    ItemsEditListComponent,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    MatInputModule,
    AutofocusDirective,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  defaultSelectedIndex = localStorage.getItem('selected-tab');

  openSearchBox = false;

  constructor(
    public itemsService: ItemsListService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.itemsService.refreshItems();
  }

  onChangeTab(event: MatTabChangeEvent) {
    localStorage.setItem('selected-tab', event.index.toString());
  }

  openAddMenu() {
    this._bottomSheet.open(NewItemComponent);
  }

  closeSearch() {
    this.openSearchBox = false;
    this.itemsService.setSearchValue('');
  }

  onSearchBoxChange(searchValue: any) {
    this.itemsService.setSearchValue(searchValue.target.value);
  }
}
