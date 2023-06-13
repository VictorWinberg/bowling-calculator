import { DeleteMessageCommand, GetQueueUrlCommand, ReceiveMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { Roll } from "../types";

const AWS_URL = process.env.AWS_ENDPOINT_URL || "http://localhost:4566";
const QUEUE_NAME = "bowling-rolls";

class QueueListener {
  private queueUrl: string = "";
  private sqs: SQSClient;

  constructor() {
    this.sqs = new SQSClient({
      endpoint: AWS_URL,
      region: "eu-west-1",
      credentials: {
        accessKeyId: "na",
        secretAccessKey: "na",
      },
    });
  }

  async init(): Promise<QueueListener> {
    this.queueUrl = await this.getQueueUrl(QUEUE_NAME);
    return this;
  }

  private async getQueueUrl(queueName: string): Promise<string> {
    const command = new GetQueueUrlCommand({ QueueName: queueName });
    const response = await this.sqs.send(command);
    if (!response.QueueUrl) {
      throw new Error(`Unable to get queue with name ${queueName}`);
    }

    return response.QueueUrl;
  }

  async listen(callback: (rolls: Roll[]) => void): Promise<void> {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
    });

    while (true) {
      const response = await this.sqs.send(command);
      const messages = response.Messages || [];

      for (const message of messages) {
        const body = JSON.parse(message.Body || "");

        callback(body)

        const deleteCommand = new DeleteMessageCommand({
          QueueUrl: this.queueUrl,
          ReceiptHandle: message.ReceiptHandle || "",
        });

        await this.sqs.send(deleteCommand);
      }
    }
  }
}

export default QueueListener