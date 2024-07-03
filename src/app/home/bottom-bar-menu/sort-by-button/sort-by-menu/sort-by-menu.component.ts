import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import {
  SortOrder,
  SortType
} from '../sort.model';

@Component({
  selector: 'app-sort-by-menu',
  standalone: true,
  imports: [
    MatRadioModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TitleCasePipe,
    KeyValuePipe,
  ],
  templateUrl: './sort-by-menu.component.html',
  styleUrl: './sort-by-menu.component.scss',
})
export class SortByMenuComponent {
  sortTypes = SortType;
  sortOrders = SortOrder;

  SortType = SortType;
  SortOrder = SortOrder;

  selectedSortType: SortType = SortType.NO_SORT;
  selectedSortOrder: SortOrder | null = null;

  selectSortType(sortType: SortType) {
    this.selectedSortType = sortType;
  }

  selectSortOrder(sortOrder: SortOrder) {
    this.selectedSortOrder = sortOrder;
  }
}
