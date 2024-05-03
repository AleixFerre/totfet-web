export enum CardAction {
  ShoppingCart,
  Edit,
  Delete
}

export const CardActionIcons: Record<CardAction, string> = {
  [CardAction.ShoppingCart]: 'shopping_cart',
  [CardAction.Edit]: 'edit',
  [CardAction.Delete]: 'delete'
}

export const CardActionColors: Record<CardAction, string> = {
  [CardAction.ShoppingCart]: 'default',
  [CardAction.Edit]: 'default',
  [CardAction.Delete]: 'warn'
}
