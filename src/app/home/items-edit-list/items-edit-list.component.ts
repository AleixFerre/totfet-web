import { AsyncPipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogService } from '@openng/optimus-ui/dynamicdialog';
import { DividerModule } from '@openng/optimus-ui/divider';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { TooltipModule } from '@openng/optimus-ui/tooltip';
import { filter, switchMap } from 'rxjs';
import { CardComponent } from '../../shared/card/card.component';
import { CardAction } from '../../shared/card/card.model';
import { DeleteClosedComponent } from '../../shared/popup/delete-closed/delete-closed.component';
import { DeleteItemComponent } from '../../shared/popup/delete-item/delete-item.component';
import { ItemsListService } from '../items-list/items-list.service';
import { Item } from '../items-list/items.model';
import { NewItemComponent } from './new-item/new-item.component';

@Component({
    selector: 'app-items-edit-list',
    imports: [
        AsyncPipe,
        DrawerModule,
        DividerModule,
        ButtonModule,
        TooltipModule,
        CardComponent,
        NewItemComponent,
    ],
    providers: [DialogService],
    templateUrl: './items-edit-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './items-edit-list.component.scss'
})
export class ItemsEditListComponent {
  openItems = this.itemsService.openItems;
  closedItems = this.itemsService.closedItems;

  /** Drawer state, replacing the imperative MatBottomSheet.open() calls. */
  editorOpen = false;
  editingItem?: Item;

  readonly CardActions = [CardAction.Edit, CardAction.Delete];
  readonly CardActionCallBack: Record<CardAction, Function> = {
    [CardAction.Edit]: (item: Item) => {
      this.openEditor(item);
    },
    [CardAction.Delete]: (item: Item) => {
      const ref = this.dialogService.open(DeleteItemComponent, {
        // Was the <h2 mat-dialog-title> inside DeleteItemComponent.
        header: `Esborrar "${item.name}"?`,
        modal: true,
        dismissableMask: true,
        data: item,
      });

      ref?.onClose
        .pipe(
          filter((accepted: boolean) => accepted),
          switchMap(() => this.itemsService.removeItem(item))
        )
        .subscribe(() => {
          this.messageService.add({
            severity: 'success',
            detail: `${item.name} esborrat correctament`,
            life: 5000,
          });
        });
    },
    [CardAction.ShoppingCart]: () => {},
  };

  constructor(
    private itemsService: ItemsListService,
    private messageService: MessageService,
    private dialogService: DialogService
  ) {}

  openAddMenu() {
    this.openEditor(undefined);
  }

  /**
   * The drawer keeps NewItemComponent alive between openings, so the item has
   * to be swapped before it becomes visible for ngOnInit to read the right one.
   */
  private openEditor(item?: Item) {
    this.editingItem = item;
    this.editorOpen = true;
  }

  manageItemClicked(item: Item, action: CardAction) {
    this.CardActionCallBack[action](item);
  }

  deleteClosed() {
    const ref = this.dialogService.open(DeleteClosedComponent, {
      header: 'Esborrar comprats',
      modal: true,
      dismissableMask: true,
    });

    ref?.onClose
      .pipe(
        filter((accepted: boolean) => accepted),
        switchMap(() => this.itemsService.removeClosed())
      )
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          detail: 'Compres tancades esborrades correctament',
          life: 5000,
        });
      });
  }
}
