export class DeviceLog {
  enableStatus: boolean | number;
  rpm: number;
  cycleCount: number;
  workId: string;
  machineId: string;
  staffId: string;
  malfunctionData: string;
  receivedOn: number;

  public serialize(): string {
    return (`${this.enableStatus ? 1 : 0}${ (this.rpm+'').padStart(2, '0') }${ (this.cycleCount+'').padStart(5, '0') }`
      + `${this.workId}${this.machineId}${this.staffId}`
      + `${this.malfunctionData}`);
  }
}