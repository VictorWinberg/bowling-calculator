import { Frame, Roll } from "../types";
import BowlingCalculator from "./calculator";
import QueueService from "./queue-service";

const calculator = new BowlingCalculator();
const queueRolls = new QueueService<Roll[]>("bowling-rolls");
const queueFrames = new QueueService<Frame[]>("bowling-frames");

queueRolls.awaitQueue().then(() => {
  queueRolls.listen((rolls) => {
    const frames = calculator.calculate(rolls);
    queueFrames.sendMessage(frames);
  });
});
