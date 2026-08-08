import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AutoFocusModule } from '@openng/optimus-ui/autofocus';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DynamicDialogRef } from '@openng/optimus-ui/dynamicdialog';

@Component({
    selector: 'app-delete-closed',
    imports: [ButtonModule, AutoFocusModule],
    templateUrl: './delete-closed.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './delete-closed.component.scss'
})
export class DeleteClosedComponent {
  constructor(private dialogRef: DynamicDialogRef) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
