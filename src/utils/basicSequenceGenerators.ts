import { Options } from '../models/option/Options';
import { OptionsParser } from '../models/option/OptionParser';
import { DeviceLog } from '../models/DeviceLog';
import { range } from './probability';
import {
  withDisabilityOfLength,
  withDisabilityOfTimeLenggth,
  withoutMalfunctionOfLength,
  withoutMalfunctionOfTimeLength
} from './primitiveSequenceGenerators';
import { SECOND } from '../models/TimeConstants';

export function malfunctionReportedWhileRepairingOfLength(length: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  const reportedIndex = range(0, length - 1);
  const logs = withDisabilityOfLength(length, options);
  logs[reportedIndex].malfunctionData = parsedOptions.getMalfunction();
  return logs;
}

export function malfunctionReportedWhileRepairingOfTimeLength(milliseconds: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  const reportedTime = range(0, milliseconds-1);
  const logs = withDisabilityOfTimeLenggth(milliseconds, options);
  const log = logs.find((log, ind, arr) => {
    if (ind === 0) {
      return reportedTime === log.receivedOn;
    }
    return arr[ind-1].receivedOn > reportedTime && reportedTime <= log.receivedOn;
  });
  log.malfunctionData = parsedOptions.getMalfunction();
  return logs;
}

export function malfunctionReportedAfterRepairingOfLength(length: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  const reportedTime =  parsedOptions.getTimeOnMalfunctionReported();
  const logsOfDisabledStatus = withDisabilityOfLength(length, options);
  const logsOfEnabledStatus = withoutMalfunctionOfTimeLength(reportedTime + SECOND * 5, options);
  return null;
}
