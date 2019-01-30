import { DeviceLog } from "../types/DeviceLog";

export function getRecordOfDate(
  time: Date, records: DeviceLog[]
): (log: DeviceLog, ind: number, arr: DeviceLog[]) => boolean {
  return (log, ind, arr) => {
    if (ind === 0) {
      return time === log.receivedOn;
    }
    return arr[ind-1].receivedOn > time && time <= log.receivedOn;
  }
}
