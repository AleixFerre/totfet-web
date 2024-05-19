import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
  formGroup = new FormGroup({
    list: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  sendRequest() {
    this.snackBarRef?.dismiss();
    const loginInfo = this.formGroup.value;
    this.loginService.login(loginInfo.list!, loginInfo.password!).subscribe({
      complete: () => {
        this.router.navigate(['home']);
      },
      error: () => {
        this.snackBarRef = this._snackBar.open(
          'Contrasenya Incorrecta',
          'TANCAR',
          {
            duration: 5000,
          }
        );
      },
    });
  }
}
