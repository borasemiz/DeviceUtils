export function probability(of: number): boolean {
  return Math.random() * 100 <= of;
}

export function range(from: number, to: number): number {
  return Math.round(Math.random() * (to - from) + from);
}
