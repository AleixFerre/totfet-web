import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { LOCAL_STORAGE_KEYS } from '../../../../shared/globals';
import { List, listFromArray } from '../../../../shared/list.model';
import { ItemsListService } from '../../../items-list/items-list.service';
import { MultitenantAddComponent } from './multitenant-add/multitenant-add.component';

@Component({
  selector: 'app-multitenant-menu',
  standalone: true,
  imports: [
    MatRadioModule,
    MatRadioModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    TitleCasePipe,
    JsonPipe,
  ],
  templateUrl: './multitenant-menu.component.html',
  styleUrl: './multitenant-menu.component.scss',
})
export class MultitenantMenuComponent implements OnInit {
  selectedList!: List;
  lists: List[] = [];

  constructor(
    private itemsService: ItemsListService,
    private dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef<MultitenantMenuComponent>
  ) {}

  ngOnInit(): void {
    this.selectedList = listFromArray(
      localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORIZATION)!.split(':')
    );
    this.lists = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.LISTS) || '[]'
    );
  }

  selectList(listSelected: List) {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.AUTHORIZATION,
      `${listSelected.name}:${listSelected.password}`
    );
    this.itemsService.refreshItems();
    this._bottomSheetRef.dismiss();
  }

  openInfo() {
    this.dialog.open(MultitenantAddComponent, {
      data: {
        bottomBarRef: this._bottomSheetRef,
      },
    });
  }
}
