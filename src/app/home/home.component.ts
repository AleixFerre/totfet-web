import { Component } from '@angular/core';
import { ItemsListComponent } from './items-list/items-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ItemsListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
