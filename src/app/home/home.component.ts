import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProgressBarModule } from '@openng/optimus-ui/progressbar';
import { TabsModule } from '@openng/optimus-ui/tabs';
import { LOCAL_STORAGE_KEYS } from '../shared/globals';
import { List, listFromArray } from '../shared/list.model';
import { BottomBarMenuComponent } from './bottom-bar-menu/bottom-bar-menu.component';
import { ItemsEditListComponent } from './items-edit-list/items-edit-list.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListService } from './items-list/items-list.service';

@Component({
    selector: 'app-home',
    imports: [
        ItemsListComponent,
        ItemsEditListComponent,
        BottomBarMenuComponent,
        TabsModule,
        ProgressBarModule,
    ],
    templateUrl: './home.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './home.component.scss'
})
export class HomeComponent {
  /**
   * Optimus tabs are keyed by an arbitrary `value` rather than a numeric index,
   * so the tabs use '0'/'1' to keep the stored value byte-identical to what
   * MatTabChangeEvent.index used to persist.
   */
  selectedTab = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_TAB) ?? '0';
  lists: List[] = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.LISTS) || '[]'
  );

  constructor(public itemsService: ItemsListService) {}

  ngOnInit(): void {
    this.itemsService.refreshItems();
    this.defaultListSetup();
  }

  onChangeTab(value: string | number | undefined) {
    this.selectedTab = String(value);
    localStorage.setItem(LOCAL_STORAGE_KEYS.SELECTED_TAB, this.selectedTab);
  }

  private defaultListSetup() {
    const newList = listFromArray(
      localStorage.getItem(LOCAL_STORAGE_KEYS.AUTHORIZATION)!.split(':')
    );

    if (!this.lists.find((list) => list.name === newList.name)) {
      this.lists.push({
        name: newList.name,
        password: newList.password,
      });
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.LISTS,
        JSON.stringify(this.lists)
      );
    }
  }
}
