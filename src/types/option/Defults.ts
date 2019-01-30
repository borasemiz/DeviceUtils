import { range } from "../../utils/probability";
import { SECOND } from "../TimeConstants";
import { MachineMalfunction } from "../MachineMalfunction";
import { getNow } from "../../utils/date";

export const DefaultOptions = {
  machineId: '11',
  rpmRange: [50, 70],
  workID: 'R20171234567890',
  timeBetweenLogs: SECOND * 5,
  staffID: '111',
  malfunction: MachineMalfunction.ROPE_SNAP,
  timeOnMalfunctionReported: SECOND * 5,
  startTime: getNow(),
  malfunctionIndex: 0,
}
