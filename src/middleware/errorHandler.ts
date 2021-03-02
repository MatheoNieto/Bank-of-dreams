
import withErrorStack from './errorStack'

export default function(err:any, req:any, res:any, next:any) { // eslint-disable-line
  const {
    output: { statusCode, payload }
  } = err;
  res.status(statusCode);
  res.json(withErrorStack(payload, err.stack));
}