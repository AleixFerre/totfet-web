import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-multitenant-add',
    imports: [MatDialogModule, MatButtonModule, MatDialogTitle, MatDialogContent],
    templateUrl: './multitenant-add.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './multitenant-add.component.scss'
})
export class MultitenantAddComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { bottomBarRef: MatBottomSheetRef },
    private router: Router
  ) {}

  closeSession() {
    this.data.bottomBarRef.dismiss();
    this.router.navigate(['/login']);
  }
}
