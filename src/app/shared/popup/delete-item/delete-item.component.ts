import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Item } from '../../../home/items-list/items.model';

@Component({
    selector: 'app-delete-item',
    imports: [
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatDialogClose,
    ],
    templateUrl: './delete-item.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './delete-item.component.scss'
})
export class DeleteItemComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Item,
    public dialogRef: MatDialogRef<DeleteItemComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
