import { Directive, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';

@Directive({
  standalone: true,
  selector: '[matInputAutofocus]',
})
export class AutofocusDirective implements OnInit {
  constructor(private matInput: MatInput) { }

  ngOnInit() {
    setTimeout(() => this.matInput.focus());
  }
}
