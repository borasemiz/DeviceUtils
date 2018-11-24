import { Options } from "./Options";
import { DefaultOptions } from './Defults';

export class OptionsParser {
  private options: Options = {};

  constructor(options: Options) {
    if (!options) {
      this.options.machineId = DefaultOptions.machineId;
      this.options.rpmRange = DefaultOptions.rpmRange;
      this.options.timeBetweenLogs = DefaultOptions.timeBetweenLogs;
      this.options.workID = DefaultOptions.workID;
      this.options.staffID = DefaultOptions.staffID;
      this.options.malfunction = DefaultOptions.malfunction;
    } else {
      this.options = options;
    }
  }

  getMachineId(): string {
    return !this.options.machineId ? DefaultOptions.machineId : this.options.machineId;
  }
  getRpmRange(): number[] {
    return !this.options.rpmRange ? DefaultOptions.rpmRange : this.options.rpmRange;
  }
  getTimeBetweenLogs(): number {
    return !this.options.timeBetweenLogs ? DefaultOptions.timeBetweenLogs : this.options.timeBetweenLogs;
  }
  getWorkId(): string {
    return !this.options.workID ? DefaultOptions.workID : this.options.workID;
  }
  getStaffId(): string {
    return !this.options.staffID ? DefaultOptions.staffID : this.options.staffID;
  }
}
