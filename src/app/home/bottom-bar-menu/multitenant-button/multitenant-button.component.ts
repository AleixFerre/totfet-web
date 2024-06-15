import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MultitenantMenuComponent } from './multitenant-menu/multitenant-menu.component';

@Component({
  selector: 'app-multitenant-button',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatBottomSheetModule],
  templateUrl: './multitenant-button.component.html',
  styleUrl: './multitenant-button.component.scss',
})
export class MultitenantButtonComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openMenu() {
    this._bottomSheet.open(MultitenantMenuComponent);
  }
}
