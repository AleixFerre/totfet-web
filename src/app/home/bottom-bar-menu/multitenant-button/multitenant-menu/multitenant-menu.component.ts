import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
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
  ],
  templateUrl: './multitenant-menu.component.html',
  styleUrl: './multitenant-menu.component.scss',
})
export class MultitenantMenuComponent {
  selectedList = 'list1';
  lists: any[] = [
    { name: 'List 1', value: 'list1' },
    { name: 'List 2', value: 'list2' },
    { name: 'List 3', value: 'list3' },
  ];

  constructor(
    private dialog: MatDialog,
    private _bottomSheetRef: MatBottomSheetRef<MultitenantMenuComponent>
  ) {}

  selectList(newList: string) {
    this.selectedList = newList;
  }

  openInfo() {
    this.dialog.open(MultitenantAddComponent, {
      data: {
        bottomBarRef: this._bottomSheetRef,
      },
    });
  }
}
