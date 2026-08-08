import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { ItemsListService } from '../../items-list/items-list.service';

@Component({
    selector: 'app-reload-button',
    imports: [ButtonModule],
    templateUrl: './reload-button.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './reload-button.component.scss'
})
export class ReloadButtonComponent {
  rotating = false;

  constructor(public itemsService: ItemsListService) {}

  rotate() {
    this.rotating = true;
    setTimeout(() => {
      this.rotating = false;
    }, 1000);
  }

  refreshItems() {
    !this.rotating && this.rotate();
    this.itemsService.refreshItems();
  }
}
