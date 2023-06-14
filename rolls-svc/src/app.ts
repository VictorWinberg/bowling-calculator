import bodyParser from "body-parser";
import express, { Request, Response } from "express";
import QueueService from "./queue-service";
import { checkRolls } from "./utils";

const app = express();
const queue = new QueueService("bowling-rolls");

app.use(bodyParser.json());

app.post("/rolls", async (req: Request, res: Response) => {
  const rolls = req.body;

  if (!checkRolls(rolls)) {
    return res.status(400).send({ message: "invalid rolls" });
  }

  const messageId = await queue.sendMessage(rolls);
  return res.send({ messageId });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`roll-svc running on port ${port}`);
});
