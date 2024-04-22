import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ItemsListService } from '../../items-list/items-list.service';
import { Item } from '../../items-list/items.model';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSnackBarModule,
  ],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss',
})
export class NewItemComponent {
  itemForm = new FormGroup({
    name: new FormControl<string>(''),
    amount: new FormControl<number>(1),
  });

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<NewItemComponent>,
    private _snackBar: MatSnackBar,
    private itemService: ItemsListService
  ) {}

  addItem() {
    this.itemService
      .addItem(this.itemForm.value as Partial<Item>)
      .subscribe(() => {
        this._snackBar.open('Item added successfully', 'CLOSE', {
          duration: 5000,
        });
      });
    this._bottomSheetRef.dismiss();
  }
}
