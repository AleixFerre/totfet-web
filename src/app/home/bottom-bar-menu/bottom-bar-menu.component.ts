import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NewItemComponent } from '../items-edit-list/new-item/new-item.component';
import { MultitenantButtonComponent } from './multitenant-button/multitenant-button.component';
import { ReloadButtonComponent } from './reload-button/reload-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
  selector: 'app-bottom-bar-menu',
  standalone: true,
  imports: [
    MatBottomSheetModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    SearchBarComponent,
    ReloadButtonComponent,
    MultitenantButtonComponent,
  ],
  templateUrl: './bottom-bar-menu.component.html',
  styleUrl: './bottom-bar-menu.component.scss',
})
export class BottomBarMenuComponent {
  constructor(private _bottomSheet: MatBottomSheet) {}

  openAddMenu() {
    this._bottomSheet.open(NewItemComponent);
  }

  goToHelp() {
    location.href="./help";
  }
}
