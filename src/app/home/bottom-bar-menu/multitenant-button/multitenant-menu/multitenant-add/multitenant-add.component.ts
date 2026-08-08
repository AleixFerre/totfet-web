import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AutoFocusModule } from '@openng/optimus-ui/autofocus';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DynamicDialogRef } from '@openng/optimus-ui/dynamicdialog';

@Component({
    selector: 'app-multitenant-add',
    imports: [ButtonModule, AutoFocusModule],
    templateUrl: './multitenant-add.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './multitenant-add.component.scss'
})
export class MultitenantAddComponent {
  constructor(private dialogRef: DynamicDialogRef) {}

  cancel() {
    this.dialogRef.close(false);
  }

  /**
   * Reports that the user wants to log out. The parent menu handles closing the
   * drawer and navigating; this component used to do it itself by dismissing a
   * MatBottomSheetRef passed in through MAT_DIALOG_DATA.
   */
  closeSession() {
    this.dialogRef.close(true);
  }
}
