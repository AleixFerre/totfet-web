import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { LOCAL_STORAGE_KEYS } from '../shared/globals';
import { BottomBarMenuComponent } from './bottom-bar-menu/bottom-bar-menu.component';
import { ItemsEditListComponent } from './items-edit-list/items-edit-list.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { ItemsListService } from './items-list/items-list.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ItemsListComponent,
    ItemsEditListComponent,
    BottomBarMenuComponent,
    MatTabsModule,
    MatProgressBarModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  defaultSelectedIndex = localStorage.getItem(LOCAL_STORAGE_KEYS.SELECTED_TAB);

  constructor(public itemsService: ItemsListService) {}

  ngOnInit(): void {
    this.itemsService.refreshItems();
  }

  onChangeTab(event: MatTabChangeEvent) {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.SELECTED_TAB,
      event.index.toString()
    );
  }
}
