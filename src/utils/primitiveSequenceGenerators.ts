import { DeviceLog } from '../types/DeviceLog';
import { Options } from '../types/option/Options';
import { range } from './probability';
import { MachineMalfunction } from '../types/MachineMalfunction';
import { OptionsParser } from '../types/option/OptionParser';
import { addMilliseconds, getNow } from './date';

/**
 * Return an array of logs of a speciffied array length.
 * @param enableStatus Return whether all logs are disabled or not
 * @param length length of the array that will be returned.
 * @param options an options object specifying log properties.
 */
export function generateLogsOfLength(enableStatus: boolean, length: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  let startTime = parsedOptions.getStartTime();
  return new Array(length).fill(null).map((): DeviceLog => {
    const log = new DeviceLog(
      enableStatus, range(parsedOptions.getRpmRange()[0], parsedOptions.getRpmRange()[1]), range(10000, 30000),
      parsedOptions.getWorkId(), parsedOptions.getMachineId(), parsedOptions.getStaffId(),
      MachineMalfunction.NO_MALFUNCTION, startTime
    );
    startTime = addMilliseconds(startTime, parsedOptions.getTimeBetweenLogs());
    return log;
  });
}

/**
 * Return an array of logs which covers the specified time length.
 * @param enableStatus Return whether all logs are disabled or not
 * @param milliseconds time delta between the first and latest logs' receivedOn property
 * @param options an options object specifying log properties.
 */
export function generateLogsOfTimeLength(enableStatus: boolean, milliseconds: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  let startTime = parsedOptions.getStartTime();
  const finish = addMilliseconds(startTime, milliseconds);
  const logs = [];
  while (startTime <= finish) {
    logs.push(new DeviceLog(
      enableStatus, range(parsedOptions.getRpmRange()[0], parsedOptions.getRpmRange()[1]), range(10000, 30000),
      parsedOptions.getWorkId(), parsedOptions.getMachineId(), parsedOptions.getStaffId(),
      MachineMalfunction.NO_MALFUNCTION, startTime
    ));
    startTime = addMilliseconds(startTime, parsedOptions.getTimeBetweenLogs());
  }
  return logs;
}

/**
 * Return an array of logs and put malfunction data in one log which specified by options.malfunctionIndex.
 * options.malfunctionIndex should contain the log index which contain malfunction data. If you provide a higher value,
 * it will be clamped to the length-1.
 * @param enableStatus Return whether all logs are disabled or not
 * @param length Length of the array that will be returned
 * @param options an options object specifying log properties
 */
export function generateLogsWithMalfunctionOfLength(enableStatus: boolean, length: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  const logs = generateLogsOfLength(enableStatus, length, options);
  const malfunctionIndex = parsedOptions.getMalfunctionIndex() >= length ? length - 1 : parsedOptions.getMalfunctionIndex();
  logs[malfunctionIndex].malfunctionData = parsedOptions.getMalfunction();
  return logs;
}

/**
 * Return an array of logs and put malfunction data in one log which specified by options.malfunctionIndex.
 * options.malfunctionIndex should contain the information that at which time a log has malfunction data. 
 * @param enableStatus Return whether all logs are disabled or not.
 * @param milliseconds Time delta between the first and last log's receivedOn property.
 * @param options An options object specifying log properties
 */
export function generateLogsWithMalfunctionOfTimeLength(enableStatus: boolean, milliseconds: number, options?: Options): DeviceLog[] {
  const parsedOptions = new OptionsParser(options);
  const logs = generateLogsOfTimeLength(enableStatus, milliseconds, options);
  const malfunctionIndex = logs.reduce((acc: number, curr: DeviceLog, index: number, arr: DeviceLog[]) => {
    if (index === 0) return acc;
    const malfunctionMillisecond = parsedOptions.getStartTime().valueOf() + parsedOptions.getMalfunctionIndex();
    return arr[index-1].receivedOn.valueOf() <= malfunctionMillisecond && malfunctionMillisecond < curr.receivedOn.valueOf() ?
      index - 1 : acc;
  }, 0);
  logs[malfunctionIndex].malfunctionData = parsedOptions.getMalfunction();
  return logs;
}
