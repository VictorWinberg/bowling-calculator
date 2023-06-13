import { CreateQueueCommand, SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Roll } from "../types";

const AWS_URL = process.env.AWS_ENDPOINT_URL || "http://localhost:4566";
const QUEUE_NAME = "bowling-rolls";

class QueueService {
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

  async init(): Promise<QueueService> {
    this.queueUrl = await this.createQueue(QUEUE_NAME);
    return this;
  }

  private async createQueue(queueName: string): Promise<string> {
    const response = await this.sqs.send(new CreateQueueCommand({ QueueName: queueName }));
    if (!response.QueueUrl) {
      throw new Error(`Unable to create queue with name ${queueName}`);
    }

    return response.QueueUrl;
  }

  async queueRolls(rolls: Roll[]): Promise<string> {
    const params = { MessageBody: JSON.stringify(rolls), QueueUrl: this.queueUrl };
    const response = await this.sqs.send(new SendMessageCommand(params));
    if (!response.MessageId) {
      throw new Error(`Unable to send message to queue ${this.queueUrl}`);
    }

    return response.MessageId;
  }
}

export default QueueService;