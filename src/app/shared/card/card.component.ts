import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { ButtonModule } from '@openng/optimus-ui/button';
import { Item } from '../../home/items-list/items.model';
import { CardAction, CardActionIcons, CardActionSeverities } from './card.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-card',
    imports: [ButtonModule, CommonModule],
    templateUrl: './card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() item!: Item;
  @Input() actions!: CardAction[];
  @Input() isFirst!: boolean;
  @Output() onClick = new EventEmitter<CardAction>();

  CardActionIcons = CardActionIcons;
  CardActionSeverities = CardActionSeverities;
}
