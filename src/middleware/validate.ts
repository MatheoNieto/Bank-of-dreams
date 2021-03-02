import joi from 'joi'

export default function(data:any, schema:any){
  const {error} = schema.validate(data)
  return error
}