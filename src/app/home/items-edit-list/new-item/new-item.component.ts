import { AsyncPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
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
    MatCheckboxModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    AutofocusDirective,
    AsyncPipe,
  ],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss',
})
export class NewItemComponent implements OnInit {
  itemForm = new FormGroup({
    name: new FormControl<string>(''),
    amount: new FormControl<number>(1),
    closed: new FormControl<boolean>(false),
  });

  filteredItems!: Observable<string[]>;
  private allItemNames = this.itemService.getAllItemNames();

  addMore = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public item: Item,
    private _bottomSheetRef: MatBottomSheetRef<NewItemComponent>,
    private _snackBar: MatSnackBar,
    private itemService: ItemsListService
  ) {}

  ngOnInit(): void {
    this.filteredItems = this.itemForm.get('name')!.valueChanges.pipe(
      startWith(''),
      map((value) => {
        if (!value) return [];
        return this.allItemNames.filter((option: string) =>
          option.toLowerCase().includes(value.toLowerCase())
        );
      })
    );

    this.itemForm.setValue({
      name: this.item?.name ?? '',
      amount: this.item?.amount ?? 1,
      closed: this.item?.closed ?? false,
    });
  }

  updateItem() {
    this.itemService
      .editItem({ id: this.item.id, ...this.itemForm.value } as Partial<Item>)
      .subscribe(() => {
        this._snackBar.open('Compra actualitzada correctament', 'CLOSE', {
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
        this._snackBar.open('Compra afegida correctament', 'CLOSE', {
          verticalPosition: 'top',
          duration: 5000,
        });
      });

    if (!this.addMore) this._bottomSheetRef.dismiss();
  }
}
