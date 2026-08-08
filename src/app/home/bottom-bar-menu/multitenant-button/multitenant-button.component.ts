import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DrawerModule } from '@openng/optimus-ui/drawer';
import { MultitenantMenuComponent } from './multitenant-menu/multitenant-menu.component';

@Component({
    selector: 'app-multitenant-button',
    imports: [ButtonModule, DrawerModule, MultitenantMenuComponent],
    templateUrl: './multitenant-button.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './multitenant-button.component.scss'
})
export class MultitenantButtonComponent {
  /** Drawer state, replacing MatBottomSheet.open(MultitenantMenuComponent). */
  menuOpen = false;

  openMenu() {
    this.menuOpen = true;
  }
}
