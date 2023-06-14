import bodyParser from "body-parser";
import express from "express";
import QueueService from "./queue-service";
import { Frame } from "../types";
import BowlingPresenter from "./presenter";

const app = express();
const queue = new QueueService<Frame[]>("bowling-frames");
const presenter = new BowlingPresenter();

queue.awaitQueue().then(() => {
  queue.listen((frames) => {
    app.locals.frames = frames;
  });
});

app.use(bodyParser.json());

app.post("/present/score", (req, res) => {
  const { frames } = app.locals;
  const score = presenter.present(frames);
  res.json(score);
});

const port = 3000;
app.listen(port, () => {
  console.log(`presenter-svc running on port ${port}`);
});
