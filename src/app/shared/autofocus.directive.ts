import { Directive, ElementRef, OnInit, inject } from '@angular/core';

/**
 * Focuses the host input on init.
 *
 * Previously injected Material's `MatInput` and called its `focus()`; now works
 * against the native element so it is independent of any UI library.
 */
@Directive({
  standalone: true,
  selector: '[appAutofocus]',
})
export class AutofocusDirective implements OnInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  ngOnInit() {
    setTimeout(() => this.host.nativeElement.focus());
  }
}
