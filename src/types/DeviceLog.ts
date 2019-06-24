import { RawDeviceMessage } from 'indet-models';

export class DeviceLog implements RawDeviceMessage {
  enableStatus: boolean;
  rpm: number;
  cycleCount: number;
  workId: string;
  machineId: string;
  staffId: string;
  malfunctionData: number;
  receivedOn: number;

  constructor(
    enableStatus: boolean,
    rpm: number,
    cycleCount: number,
    workId: string,
    machineId: string,
    staffId: string,
    malfunctionData: number,
    receivedOn: number
  ) {
    this.enableStatus = enableStatus;
    this.rpm = rpm;
    this.cycleCount = cycleCount;
    this.workId = workId;
    this.machineId = machineId;
    this.staffId = staffId;
    this.malfunctionData = malfunctionData;
    this.receivedOn = receivedOn;
  }

  public serialize(): string {
    return (`${this.enableStatus ? 1 : 0}${ (this.rpm+'').padStart(2, '0') }${ (this.cycleCount+'').padStart(5, '0') }`
      + `${this.workId}${this.machineId}${this.staffId}`
      + `${this.malfunctionData}`);
  }
}
