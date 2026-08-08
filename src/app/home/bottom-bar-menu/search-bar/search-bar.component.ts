import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { InputGroupModule } from '@openng/optimus-ui/inputgroup';
import { InputGroupAddonModule } from '@openng/optimus-ui/inputgroupaddon';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { AutofocusDirective } from '../../../shared/autofocus.directive';
import { ItemsListService } from '../../items-list/items-list.service';

@Component({
    selector: 'app-search-bar',
    imports: [
        AutofocusDirective,
        ButtonModule,
        InputGroupModule,
        InputGroupAddonModule,
        InputTextModule
    ],
    templateUrl: './search-bar.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  openSearchBox: boolean = false;

  constructor(private itemsService: ItemsListService) {}

  closeSearch() {
    this.openSearchBox = false;
    this.itemsService.setSearchValue('');
  }

  onSearchBoxChange(searchValue: any) {
    this.itemsService.setSearchValue(searchValue.target.value);
  }
}
