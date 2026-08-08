import { ButtonSeverity } from '@openng/optimus-ui/types/button';

export enum CardAction {
  ShoppingCart,
  Edit,
  Delete
}

/** Icon font classes, previously Material Icons ligature names. */
export const CardActionIcons: Record<CardAction, string> = {
  [CardAction.ShoppingCart]: 'pi pi-shopping-cart',
  [CardAction.Edit]: 'pi pi-pencil',
  [CardAction.Delete]: 'pi pi-trash'
}

/**
 * Button severities, replacing Material's `color` input. The old values were
 * `default` (which Material ignored, so the icon inherited the text colour) and
 * `warn` for the destructive action.
 */
export const CardActionSeverities: Record<CardAction, ButtonSeverity> = {
  [CardAction.ShoppingCart]: 'secondary',
  [CardAction.Edit]: 'secondary',
  [CardAction.Delete]: 'danger'
}
