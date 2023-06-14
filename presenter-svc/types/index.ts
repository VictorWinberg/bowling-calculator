// this file should be shared as a npm package

export interface Roll {
  roll1: number;
  roll2?: number;
  roll3?: number;
}

export interface Frame {
  roll: Roll;
  score: number;
}