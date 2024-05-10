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
import { CardComponent } from '../../shared/card/card.component';
import { CardAction } from '../../shared/card/card.model';
import { DeleteClosedComponent } from '../../shared/popup/delete-closed/delete-closed.component';
import { DeleteItemComponent } from '../../shared/popup/delete-item/delete-item.component';
import { ItemsListService } from '../items-list/items-list.service';
import { Item } from '../items-list/items.model';
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
    CardComponent,
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

  readonly CardActions = [CardAction.Edit, CardAction.Delete];
  readonly CardActionCallBack: Record<CardAction, Function> = {
    [CardAction.Edit]: (item: Item) => {
      this._bottomSheet.open(NewItemComponent, {
        data: item,
      });
    },
    [CardAction.Delete]: (item: Item) => {
      this._dialog
        .open(DeleteItemComponent, {
          data: item
        })
        .afterClosed()
        .pipe(
          filter((accepted: boolean) => accepted),
          switchMap(() => this.itemsService.removeItem(item))
        )
        .subscribe(() => {
          this._snackBar.open(`${item.name} esborrat correctament`, 'CLOSE', {
            verticalPosition: 'top',
            duration: 5000,
          });
        });
    },
    [CardAction.ShoppingCart]: () => {},
  };

  constructor(
    private itemsService: ItemsListService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  openAddMenu() {
    this._bottomSheet.open(NewItemComponent);
  }

  manageItemClicked(item: Item, action: CardAction) {
    this.CardActionCallBack[action](item);
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
        this._snackBar.open('Compres tancades esborrades correctament', 'CLOSE', {
          verticalPosition: 'top',
          duration: 5000,
        });
      });
  }
}
