export function addMilliseconds(date: Date, milliseconds: number): Date {
  return new Date(date.valueOf() + milliseconds);
}

export function getNow(): Date {
  const now = new Date().valueOf();
  return new Date( now - (now % 1000) );
}
