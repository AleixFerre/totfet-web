import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ItemsListComponent } from './items-list/items-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemsListComponent, MatTabsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
