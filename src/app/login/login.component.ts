import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarModule,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private snackBarRef!: MatSnackBarRef<TextOnlySnackBar>;
  password = new FormControl('', [Validators.required]);

  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  sendRequest() {
    if (this.password.invalid) return;

    this.snackBarRef?.dismiss();
    this.loginService.login(this.password.value!).subscribe({
      complete: () => {
        this.router.navigate(['home']);
      },
      error: () => {
        this.snackBarRef = this._snackBar.open('Incorrect password', 'CLOSE', {
          duration: 5000,
        });
      },
    });
  }
}
