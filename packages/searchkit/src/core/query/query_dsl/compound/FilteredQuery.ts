export interface FilteredQueryOptions {
  filter?:any
  query?:any
}
export function FilteredQuery(bool:FilteredQueryOptions){
  return {bool}
}
