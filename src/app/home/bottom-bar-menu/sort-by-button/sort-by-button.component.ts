import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SortByMenuComponent } from './sort-by-menu/sort-by-menu.component';

@Component({
  selector: 'app-sort-by-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgClass],
  templateUrl: './sort-by-button.component.html',
  styleUrl: './sort-by-button.component.scss',
})
export class SortByButtonComponent {

  constructor(private _bottomSheet: MatBottomSheet) {}

  openSortPicker() {
    this._bottomSheet.open(SortByMenuComponent);
  }

}
