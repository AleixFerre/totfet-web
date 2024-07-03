export enum SortType {
  NO_SORT = 'No ordenar',
  NAME = 'Nom',
}

export const SortFunctions: Record<SortType, (a: any, b: any) => number> = {
  [SortType.NO_SORT]: () => 0,
  [SortType.NAME]: (a: any, b: any) => a.name.localeCompare(b.name),
};

export enum SortOrder {
  ASC = 'Ascendent',
  DESC = 'Descendent',
}
