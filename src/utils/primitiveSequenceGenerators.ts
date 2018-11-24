import { DeviceLog } from '../models/DeviceLog';
import { Options } from '../models/option/Options';
import { range } from './probability';
import { MachineMalfunction } from '../models/MachineMalfunction';
import { OptionsParser } from '../models/option/OptionParser';
 
export function withoutMalfunctionOfLength(length: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  let now = new Date().valueOf() - parsedOptions.getTimeBetweenLogs();
  return new Array(length).fill(null).map((): DeviceLog => {
    now += parsedOptions.getTimeBetweenLogs();
    return new DeviceLog(
      true, range(parsedOptions.getRpmRange()[0], parsedOptions.getRpmRange()[1]), range(10000, 30000),
      parsedOptions.getWorkId(), parsedOptions.getMachineId(), parsedOptions.getStaffId(),
      MachineMalfunction.NO_MALFUNCTION, now
    );
  });
}

export function withoutMalfunctionOfTimeLength(milliseconds: number, options: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  let now = new Date().valueOf();
  const finish = now + milliseconds;
  now -= parsedOptions.getTimeBetweenLogs();
  const logs = [];
  while (now <= finish) {
    now += parsedOptions.getTimeBetweenLogs();
    logs.push(new DeviceLog(
      true, range(parsedOptions.getRpmRange()[0], parsedOptions.getRpmRange()[1]), range(10000, 30000),
      parsedOptions.getWorkId(), parsedOptions.getMachineId(), parsedOptions.getStaffId(),
      MachineMalfunction.NO_MALFUNCTION, now
    ));
  }
  return logs;
}

export function withDisabilityOfLength(length: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  let now = new Date().valueOf() - parsedOptions.getTimeBetweenLogs();
  return new Array(length).fill(null).map(() => {
    now += parsedOptions.getTimeBetweenLogs();
    return new DeviceLog(
      false, 0, 0, parsedOptions.getWorkId(), parsedOptions.getMachineId(),
      parsedOptions.getStaffId(), MachineMalfunction.NO_MALFUNCTION, now
    );
  });
}

export function withDisabilityOfTimeLenggth(milliseconds: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  let now = new Date().valueOf();
  const finish = now + milliseconds;
  now -= parsedOptions.getTimeBetweenLogs();
  const logs = [];
  while (now <= finish) {
    now += parsedOptions.getTimeBetweenLogs();
    logs.push(new DeviceLog(
      false, 0, 0, parsedOptions.getWorkId(), parsedOptions.getMachineId(),
      parsedOptions.getStaffId(), MachineMalfunction.NO_MALFUNCTION, now
    ));
  }
  return logs;
}