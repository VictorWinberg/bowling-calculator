import { Roll } from "../types";

const checkRoll = (roll: any): roll is Roll => {
  const { roll1, roll2 } = roll;
  if ([roll1, roll2].some((roll) => roll === undefined || roll < 0 || roll > 10)) {
    return false;
  }
  return true;
};

export const checkRolls = (rolls: any): rolls is Roll[] => {
  if (!Array.isArray(rolls)) {
    return false;
  }

  if (rolls.length === 0 || rolls.length > 21) {
    return false;
  }

  if (!rolls.some(checkRoll)) {
    return false;
  }

  return true;
};
