import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ItemsListService } from '../../items-list/items-list.service';

@Component({
  selector: 'app-reload-button',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, NgClass],
  templateUrl: './reload-button.component.html',
  styleUrl: './reload-button.component.scss',
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
