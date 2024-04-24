import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AutofocusDirective } from '../../../shared/autofocus.directive';
import { ItemsListService } from '../../items-list/items-list.service';
import { Item } from '../../items-list/items.model';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSnackBarModule,
    MatCheckboxModule,
    AutofocusDirective,
  ],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss',
})
export class NewItemComponent {
  itemForm = new FormGroup({
    name: new FormControl<string>(''),
    amount: new FormControl<number>(1),
  });

  addMore = false;

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
          verticalPosition: 'top',
          duration: 5000,
        });
      });

    if (!this.addMore) this._bottomSheetRef.dismiss();
  }
}
