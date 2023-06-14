import { Frame, Roll } from "../types";

const format = (roll: number) => (roll === 10 ? "X" : roll);

class BowlingPresenter {
  present(frames?: Frame[]): { frames: string[]; total: number } {
    if (!frames) {
      return { frames: [], total: 0 };
    }

    const presentation = frames.map(({ roll, score }, frameIndex) => {
      const roll1 = roll.roll1;
      const roll2 = roll.roll2 || 0;
      const roll3 = roll.roll3 || 0;

      const isStrike = roll1 === 10;
      const isSpare = !isStrike && roll1 + roll2 === 10;
      let frameScore;

      if (frameIndex === 9) {
        if (isSpare) {
          frameScore = `${roll1} | / | ${format(roll3)}`;
        } else {
          frameScore = `${format(roll1)} | ${format(roll2)} | ${format(roll3)}`;
        }
      } else {
        frameScore = isStrike ? "X" : isSpare ? `${roll1} | /` : `${roll1} | ${roll2}`;
      }
      return `${frameScore} => ${score}`;
    });

    return { frames: presentation, total: frames[frames.length - 1].score };
  }
}

export default BowlingPresenter;
