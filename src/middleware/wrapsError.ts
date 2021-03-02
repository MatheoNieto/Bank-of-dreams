import boom from '@hapi/boom'

export default function(err:any, req:any, res:any, next:any) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  next(err);
}