import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  textInput: string = '';
  showError: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  sendRequest() {
    this.loginService.login(this.textInput).subscribe({
      complete: () => {
        this.router.navigate(['home']);
      },
      error: () => {
        this.showError = true;
      },
    });
  }
}
