import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
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
export class NewItemComponent implements OnInit {
  itemForm = new FormGroup({
    name: new FormControl<string>(''),
    amount: new FormControl<number>(1),
    open: new FormControl<boolean>(false),
  });

  addMore = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public item: Item,
    private _bottomSheetRef: MatBottomSheetRef<NewItemComponent>,
    private _snackBar: MatSnackBar,
    private itemService: ItemsListService
  ) {}

  ngOnInit(): void {
    this.itemForm.setValue({
      name: this.item?.name ?? '',
      amount: this.item?.amount ?? 1,
      open: this.item?.open ?? true,
    });
  }

  updateItem() {
    this.itemService
      .editItem({ id: this.item.id, ...this.itemForm.value } as Partial<Item>)
      .subscribe(() => {
        this._snackBar.open('Item updated successfully', 'CLOSE', {
          verticalPosition: 'top',
          duration: 5000,
        });
      });

    if (!this.addMore) this._bottomSheetRef.dismiss();
  }

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
