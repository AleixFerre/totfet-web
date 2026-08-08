import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '@openng/optimus-ui/api';
import { Observable } from 'rxjs';
import { CardComponent } from '../../shared/card/card.component';
import { CardAction } from '../../shared/card/card.model';
import { ItemsListService } from './items-list.service';
import { Item } from './items.model';

@Component({
    selector: 'app-items-list',
    imports: [AsyncPipe, CardComponent],
    templateUrl: './items-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './items-list.component.scss'
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
          this.messageService.add({
            severity: 'success',
            detail: 'Compra tancada correctament',
            life: 5000,
          }),
        error: () =>
          this.messageService.add({
            severity: 'error',
            detail: 'Error al tancar la compra',
            life: 5000,
          }),
      });
    },
  };

  constructor(
    private itemsService: ItemsListService,
    private messageService: MessageService
  ) {}

  manageClicked(item: Item, action: CardAction) {
    this.CardActionCallBack[action](item);
  }
}
