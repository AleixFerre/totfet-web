import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Item } from '../../home/items-list/items.model';
import { CardAction, CardActionColors, CardActionIcons } from './card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() item!: Item;
  @Input() actions!: CardAction[];
  @Input() isFirst!: boolean;
  @Output() onClick = new EventEmitter<CardAction>();

  CardActionIcons = CardActionIcons;
  CardActionColors = CardActionColors;
}
