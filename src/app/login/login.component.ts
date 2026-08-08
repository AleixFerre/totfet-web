import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from '@openng/optimus-ui/api';
import { ButtonModule } from '@openng/optimus-ui/button';
import { FloatLabelModule } from '@openng/optimus-ui/floatlabel';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { MessageModule } from '@openng/optimus-ui/message';
import { TooltipModule } from '@openng/optimus-ui/tooltip';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

/** Scopes MessageService.clear() to this component's login-error toast. */
const LOGIN_ERROR_KEY = 'login-error';

@Component({
    selector: 'app-login',
    imports: [
        FloatLabelModule,
        InputTextModule,
        ReactiveFormsModule,
        ButtonModule,
        MessageModule,
        TooltipModule
    ],
    providers: [LoginService],
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup = new FormGroup({
    list: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}

  sendRequest() {
    // Replaces holding a MatSnackBarRef to dismiss the previous message.
    this.messageService.clear(LOGIN_ERROR_KEY);
    const loginInfo = this.formGroup.value;
    this.loginService.login(loginInfo.list!, loginInfo.password!).subscribe({
      complete: () => {
        this.router.navigate(['home']);
      },
      error: () => {
        this.messageService.add({
          key: LOGIN_ERROR_KEY,
          severity: 'error',
          detail: 'Contrasenya Incorrecta',
          life: 5000,
        });
      },
    });
  }
}
