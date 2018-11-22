import { DeviceLog } from '../models/DeviceLog';

export function withoutMalfunction(length: number): DeviceLog[] {
  return new Array(length).fill(null).map((): DeviceLog => {
    
  });
}
