import { Roll } from "../types";

class BowlingCalculator {
  calculate(rolls: Roll[]): number {
    let totalScore = 0;

    for (let frameIndex = 0; frameIndex <= rolls.length - 1; frameIndex++) {
      const roll1 = rolls[frameIndex].roll1;
      const roll2 = rolls[frameIndex].roll2 || 0;
      const roll3 = rolls[frameIndex].roll3 || 0;
      const isStrike = roll1 === 10;
      const isSpare = !isStrike && roll1 + roll2 === 10;

      // Last frame
      if (frameIndex === 9) {
        totalScore += roll1 + roll2 + roll3;
      }
      // Strike
      else if (isStrike) {
        totalScore += 10 + this.getStrikeBonus(rolls, frameIndex);
      }
      // Spare
      else if (isSpare) {
        totalScore += 10 + this.getSpareBonus(rolls, frameIndex);
      }
      // Open frame
      else {
        totalScore += roll1 + roll2;
      }
    }

    return totalScore;
  }

  private getStrikeBonus(rolls: Roll[], frame: number): number {
    const nextRoll1 = rolls[frame + 1]?.roll1 || 0;
    const nextRoll2 = rolls[frame + 1]?.roll2 || 0;
    const nextNextRoll1 = rolls[frame + 2]?.roll1 || 0;

    return nextRoll1 + nextRoll2 + (nextRoll1 === 10 ? nextNextRoll1 : 0);
  }

  private getSpareBonus(rolls: Roll[], frame: number): number {
    const nextRoll1 = rolls[frame + 1]?.roll1 || 0;
    return nextRoll1;
  }
}

export default BowlingCalculator;
