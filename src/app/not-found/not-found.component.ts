import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    imports: [ButtonModule],
    templateUrl: './not-found.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
