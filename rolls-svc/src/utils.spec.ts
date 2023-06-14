import { checkRoll, checkRolls } from './utils';

describe('utils', () => {
  describe('checkRoll', () => {
    it('should return true for a valid roll', () => {
      const roll = { roll1: 3, roll2: 5 };
      expect(checkRoll(roll)).toBe(true);
    });

    it('should return false for a roll with invalid values', () => {
      const roll = { roll1: -1, roll2: 12 };
      expect(checkRoll(roll)).toBe(false);
    });

    it('should return false for a roll with missing values', () => {
      const roll = { roll1: 5 };
      expect(checkRoll(roll)).toBe(false);
    });
  });

  describe('checkRolls', () => {
    it('should return true for an array of valid rolls', () => {
      const rolls = [
        { roll1: 3, roll2: 5 },
        { roll1: 10 },
        { roll1: 4, roll2: 0 },
      ];
      expect(checkRolls(rolls)).toBe(true);
    });

    it('should return false for an empty array', () => {
      expect(checkRolls([])).toBe(false);
    });

    it('should return false for an array with invalid rolls', () => {
      const rolls = [
        { roll1: 3, roll2: -2 },
        { roll1: 11 },
        { roll1: 4, roll2: 0 },
      ];
      expect(checkRolls(rolls)).toBe(false);
    });
  });
});