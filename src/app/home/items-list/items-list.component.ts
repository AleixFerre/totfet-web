import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CardComponent } from '../../shared/card/card.component';
import { CardAction } from '../../shared/card/card.model';
import { ItemsListService } from './items-list.service';
import { Item } from './items.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, CardComponent, MatSnackBarModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent {
  items: Observable<Item[]> = this.itemsService.openItems;

  readonly CardActions = [CardAction.ShoppingCart];
  readonly CardActionCallBack: Record<CardAction, Function> = {
    [CardAction.Edit]: () => {},
    [CardAction.Delete]: () => {},
    [CardAction.ShoppingCart]: (item: Item) => {
      this.itemsService.closeItem(item.id).subscribe({
        next: () =>
          this._snackBar.open('Compra tancada correctament', 'TANCAR', {
            verticalPosition: 'top',
            duration: 5000,
          }),
        error: () =>
          this._snackBar.open('Error al tancar la compra', 'TANCAR', {
            verticalPosition: 'top',
            duration: 5000,
          }),
      });
    },
  };

  constructor(
    private itemsService: ItemsListService,
    private _snackBar: MatSnackBar
  ) {}

  manageClicked(item: Item, action: CardAction) {
    this.CardActionCallBack[action](item);
  }
}
