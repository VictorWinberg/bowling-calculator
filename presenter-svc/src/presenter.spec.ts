import BowlingPresenter from "./presenter";

describe("BowlingPresenter", () => {
  let presenter: BowlingPresenter;

  beforeEach(() => {
    presenter = new BowlingPresenter();
  });

  it("should return empty frames and total 0 when no frames are provided", () => {
    const result = presenter.present();
    expect(result.frames).toEqual([]);
    expect(result.total).toBe(0);
  });

  it("should format frames correctly and calculate total score", () => {
    const frames = [
      { roll: { roll1: 10 }, score: 20 },
      { roll: { roll1: 3, roll2: 7 }, score: 34 },
      { roll: { roll1: 4, roll2: 0 }, score: 38 },
    ];

    const result = presenter.present(frames);

    expect(result.frames).toEqual(["X => 20", "3 | / => 34", "4 | 0 => 38"]);
    expect(result.total).toBe(38);
  });

  it("should handle last frame with three strikes", () => {
    const frames = [
      { roll: { roll1: 10 }, score: 30 },
      { roll: { roll1: 10 }, score: 60 },
      { roll: { roll1: 10 }, score: 90 },
      { roll: { roll1: 10 }, score: 120 },
      { roll: { roll1: 10 }, score: 150 },
      { roll: { roll1: 10 }, score: 180 },
      { roll: { roll1: 10 }, score: 210 },
      { roll: { roll1: 10 }, score: 240 },
      { roll: { roll1: 10 }, score: 270 },
      { roll: { roll1: 10, roll2: 10, roll3: 10 }, score: 300 },
    ];

    const result = presenter.present(frames);

    expect(result.frames).toEqual([
      "X => 30",
      "X => 60",
      "X => 90",
      "X => 120",
      "X => 150",
      "X => 180",
      "X => 210",
      "X => 240",
      "X => 270",
      "X | X | X => 300",
    ]);
    expect(result.total).toBe(300);
  });
});
