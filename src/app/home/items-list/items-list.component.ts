import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { CardComponent } from '../../shared/card/card.component';
import { ItemsListService } from './items-list.service';
import { Item } from './items.model';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, CardComponent, MatSnackBarModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
})
export class ItemsListComponent {
  items: Observable<Item[]> = this.itemsService.items.pipe(
    map((items) => items.filter((i) => i.open))
  );

  constructor(
    private itemsService: ItemsListService,
    private _snackBar: MatSnackBar
  ) {}

  closeItem(itemId: number) {
    this.itemsService.closeItem(itemId).subscribe(() =>
      this._snackBar.open('Item closed successfully', 'CLOSE', {
        verticalPosition: 'top',
        duration: 5000,
      })
    );
  }
}
