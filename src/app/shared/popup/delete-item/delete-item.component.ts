import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AutoFocusModule } from '@openng/optimus-ui/autofocus';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DynamicDialogRef } from '@openng/optimus-ui/dynamicdialog';

/**
 * The item name that used to come in through MAT_DIALOG_DATA is now rendered by
 * the dialog's own `header`, set by the opener, so this component needs no data.
 */
@Component({
    selector: 'app-delete-item',
    imports: [ButtonModule, AutoFocusModule],
    templateUrl: './delete-item.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './delete-item.component.scss'
})
export class DeleteItemComponent {
  constructor(private dialogRef: DynamicDialogRef) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
