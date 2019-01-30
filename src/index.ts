import {
  generateLogsOfLength,
  generateLogsOfTimeLength,
  generateLogsWithMalfunctionOfLength,
  generateLogsWithMalfunctionOfTimeLength,
} from './utils/primitiveSequenceGenerators';

import * as fs from 'fs';
import * as path from 'path';

const logs = generateLogsWithMalfunctionOfTimeLength(false, 2000, { startTime: new Date(1548844220000), timeBetweenLogs: 500, malfunctionIndex: 1000 });
fs.writeFileSync(path.resolve(__dirname, 'output.json'), JSON.stringify(logs, null, 2));

