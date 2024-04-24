import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter, map, switchMap } from 'rxjs';
import { ItemsListService } from '../items-list/items-list.service';
import { DeleteClosedComponent } from './delete-closed/delete-closed.component';
import { NewItemComponent } from './new-item/new-item.component';

@Component({
  selector: 'app-items-edit-list',
  standalone: true,
  imports: [
    AsyncPipe,
    MatBottomSheetModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
  ],
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
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  openAddMenu() {
    this._bottomSheet.open(NewItemComponent);
  }

  deleteClosed() {
    this._dialog
      .open(DeleteClosedComponent)
      .afterClosed()
      .pipe(
        filter((accepted: boolean) => accepted),
        switchMap(() => this.itemsService.removeClosed())
      )
      .subscribe(() => {
        this._snackBar.open('Closed items removed successfully', 'CLOSE', {
          verticalPosition: 'top',
          duration: 5000,
        });
      });
  }
}
