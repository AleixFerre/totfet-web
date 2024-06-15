export interface List {
  name: string;
  password: string;
}

export function listFromArray(values: string[]): List {
  return {
    name: values[0],
    password: values[1],
  };
}
