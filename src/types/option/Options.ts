import { Range } from '../Range';
import { MachineMalfunction } from '../MachineMalfunction';

export interface Options {
  machineId?: string;
  enable?: boolean;
  rpmRange?: number[];
  workID?: string;
  timeBetweenLogs?: number;
  staffID?: string;
  malfunction?: MachineMalfunction;
  timeOnMalfunctionReported?: number;
  startTime?: Date;
  malfunctionIndex?: number;
}
