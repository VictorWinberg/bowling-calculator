// this file should be shared as a npm package

import {
  CreateQueueCommand,
  DeleteMessageCommand,
  ReceiveMessageCommand,
  SQSClient,
  SendMessageCommand,
} from "@aws-sdk/client-sqs";

const AWS_URL = process.env.AWS_ENDPOINT_URL || "http://localhost:4566";

class QueueService<T> {
  private queueUrl: string = "";
  private sqs: SQSClient;

  constructor(protected queueName: string) {
    this.sqs = new SQSClient({
      endpoint: AWS_URL,
      region: "eu-west-1",
      credentials: {
        accessKeyId: "na",
        secretAccessKey: "na",
      },
    });

    this.initQueue(this.queueName)
  }

  private async initQueue(queueName: string) {
    const response = await this.sqs.send(new CreateQueueCommand({ QueueName: queueName }));
    if (!response.QueueUrl) {
      throw new Error(`Unable to create queue with name ${queueName}`);
    }

    this.queueUrl = response.QueueUrl;
  }

  async awaitQueue(): Promise<boolean> {
    if (this.queueUrl) {
      return true;
    }

    return new Promise((resolve) => {
      const checkQueueInitialized = setInterval(() => {
        if (this.queueUrl) {
          clearInterval(checkQueueInitialized);
          resolve(true);
        }
      }, 100);
    });
  }

  async sendMessage(body: T): Promise<string> {
    const params = { MessageBody: JSON.stringify(body), QueueUrl: this.queueUrl };
    const response = await this.sqs.send(new SendMessageCommand(params));
    if (!response.MessageId) {
      throw new Error(`Unable to send message to queue ${this.queueUrl}`);
    }

    return response.MessageId;
  }

  async listen(callback: (body: T) => void) {
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

        callback(body);

        const deleteCommand = new DeleteMessageCommand({
          QueueUrl: this.queueUrl,
          ReceiptHandle: message.ReceiptHandle || "",
        });

        await this.sqs.send(deleteCommand);
      }
    }
  }
}

export default QueueService;
