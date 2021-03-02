import boom from '@hapi/boom'

import validate from './validate'


export default function(schema:any, check='body'){
  return function(req:any, res:any, next:any) {
    const error = validate(req[check], schema);

    if (!error){
      next()
    }else{
      next(boom.badRequest(error.toString()))
    }
  };
}