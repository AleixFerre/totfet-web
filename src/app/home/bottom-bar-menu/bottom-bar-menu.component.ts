import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { NewItemComponent } from '../items-edit-list/new-item/new-item.component';
import { MultitenantButtonComponent } from './multitenant-button/multitenant-button.component';
import { ReloadButtonComponent } from './reload-button/reload-button.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@Component({
    selector: 'app-bottom-bar-menu',
    imports: [
        DrawerModule,
        ButtonModule,
        SearchBarComponent,
        ReloadButtonComponent,
        MultitenantButtonComponent,
        NewItemComponent,
    ],
    templateUrl: './bottom-bar-menu.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './bottom-bar-menu.component.scss'
})
export class BottomBarMenuComponent {
  /** Drawer state, replacing MatBottomSheet.open(NewItemComponent). */
  addOpen = false;

  openAddMenu() {
    this.addOpen = true;
  }

  goToHelp() {
    location.href="./help";
  }
}
