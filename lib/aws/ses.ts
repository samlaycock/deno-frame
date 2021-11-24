import SES from "./_build/ses.js";

const SESClientConstructor = SES as SESClientConstructor;

export default SESClientConstructor;
export { SESClientConstructor as SQS };

export interface SESHTTPOptions {
  abortSignal: AbortSignal;
}

export interface SESClientOptions {
  endpoint?: string;
  region?: string;
  credentials?: {
    accessKeyId?: string;
    secretAccessKey?: string;
  };
}

export interface SESClientConstructor {
  new (options?: SESClientOptions): SESClient;
}

export interface SESClient {
  sendEmail(
    options: {
      Destination: {
        BccAddresses?: Array<string>;
        CcAddresses?: Array<string>;
        ToAddresses?: Array<string>;
      };
      Content?: {
        Body?: {
          Html?: string;
          Text?: string;
        };
        Subject?: string;
      };
      FromEmailAddres?: string;
      FromEmailAddressIdentityArn?: string;
      ReplyToAddresses?: Array<string>;
      FeedbackForwardingEmailAddress?: string;
      FeedbackForwardingEmailAddressIdentityArn?: string;
    },
    httpOptions?: SESHTTPOptions,
  ): Promise<SESEmailReceipt>;
}

export interface SESEmailReceipt {
  MessageID: string;
}
