import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SanitizePipe } from '../shared/pipes/sanitize/sanitize.pipe';
import { OperatingSystem, VIDEOS } from './help.model';

@Component({
    selector: 'app-help-page',
    imports: [MatIconModule, MatButtonModule, SanitizePipe],
    templateUrl: './help-page.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './help-page.component.scss'
})
export class HelpPageComponent {
  VIDEOS = VIDEOS;
  operatingSystems = [OperatingSystem.Android, OperatingSystem.iOS, OperatingSystem.Windows, OperatingSystem.Mac];
}
