import BowlingCalculator from "./calculator";

describe("BowlingCalculator", () => {
  let calculator: BowlingCalculator;

  beforeEach(() => {
    calculator = new BowlingCalculator();
  });

  it("should calculate the score for a game with all open frames", () => {
    const rolls = [
      { roll1: 3, roll2: 4 },
      { roll1: 2, roll2: 5 },
      { roll1: 7, roll2: 1 },
      { roll1: 6, roll2: 3 },
      { roll1: 8, roll2: 0 },
      { roll1: 2, roll2: 4 },
      { roll1: 3, roll2: 1 },
      { roll1: 5, roll2: 2 },
      { roll1: 4, roll2: 3 },
      { roll1: 6, roll2: 1 },
    ];

    const score = calculator.calculate(rolls);

    expect(score).toBe(70);
  });

  it("should calculate the score for a game with all strikes", () => {
    const rolls = [
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 10, roll2: 10, roll3: 10 },
    ];

    const score = calculator.calculate(rolls);

    expect(score).toBe(300);
  });

  it("should calculate the score for a game with a strike spare 4|0", () => {
    const rolls = [{ roll1: 10 }, { roll1: 7, roll2: 3 }, { roll1: 4, roll2: 0 }];

    const score = calculator.calculate(rolls);

    expect(score).toBe(38);
  });

  it("should calculate the score for a game with a mix of strikes, spares, and open frames", () => {
    const rolls = [
      { roll1: 10 },
      { roll1: 7, roll2: 3 },
      { roll1: 4, roll2: 5 },
      { roll1: 10 },
      { roll1: 9, roll2: 0 },
      { roll1: 10 },
      { roll1: 10 },
      { roll1: 8, roll2: 2 },
      { roll1: 9, roll2: 1 },
      { roll1: 10, roll2: 10, roll3: 10 },
    ];

    const score = calculator.calculate(rolls);

    expect(score).toBe(188);
  });
});
