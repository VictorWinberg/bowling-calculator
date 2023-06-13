import express from 'express';
import bodyParser from 'body-parser';
import { Roll } from "../types";

const app = express();
app.use(bodyParser.json());

app.post('/present/score', (req, res) => {
  const rolls: Roll[] = req.body;

  const calculator = new BowlingCalculator();

  const score = calculator.calculate(rolls);

  res.json({ score });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Presenter microservice is running on port ${port}`);
});