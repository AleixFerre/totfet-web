import { Component, Inject, inject } from '@angular/core';
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
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatDialogTitle, MatDialogContent],
  templateUrl: './multitenant-add.component.html',
  styleUrl: './multitenant-add.component.scss',
})
export class MultitenantAddComponent {
  readonly router = inject(Router);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { bottomBarRef: MatBottomSheetRef }
  ) {}

  closeSession() {
    console.log(this.data);
    this.data.bottomBarRef.dismiss();
    this.router.navigate(['/login']);
  }
}
