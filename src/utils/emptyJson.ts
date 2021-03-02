export function isEmptyObject(obj:any){
  return JSON.stringify(obj) == '{}';
}