export default function(err:any, req:any, res:any, next:any) {
  console.log('[ERROR]=>',err);
  next(err);
}