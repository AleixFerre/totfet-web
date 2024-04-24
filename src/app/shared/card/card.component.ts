import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Item } from '../../home/items-list/items.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item!: Item;
  @Input() icon!: string;
  @Output() onClick = new EventEmitter<void>();
}
