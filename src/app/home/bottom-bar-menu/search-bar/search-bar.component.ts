import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AutofocusDirective } from '../../../shared/autofocus.directive';
import { ItemsListService } from '../../items-list/items-list.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [AutofocusDirective, MatIconModule, MatButtonModule, MatInputModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
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
