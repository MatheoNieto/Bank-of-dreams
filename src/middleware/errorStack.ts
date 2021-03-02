import {configHost} from '../config/settings'

export default function(error:any, stack:any) {
  if (configHost.dev) {
    return { ...error, stack };
  }

  return error;
}