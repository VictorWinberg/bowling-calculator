import BowlingCalculator from "./calculator";
import QueueListener from "./queue-listener";

async function app() {
  const calculator = new BowlingCalculator();

  const queueListener = await new QueueListener().init();
  await queueListener.listen((rolls) => {
    const score = calculator.calculate(rolls)
    console.log(`Score: ${score}`);
  })
}

app();
