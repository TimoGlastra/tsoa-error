import { Body, Controller, Post, Route } from "tsoa";

interface Payload {
  key: string;
  payload: unknown;
}

export interface ThePayload extends Payload {
  key: "theKey";
  payload: {
    thePayload: string;
  };
}

type PayloadMap<Payloads extends Payload[]> = {
  [Payload in Payloads[number] as Payload["key"]]?: Payload["payload"];
};

type PayloadTypes = [ThePayload];

// Use generic, pass payloads using payload array
export interface TheRequestBodyWithGeneric<Payloads extends Payload[]> {
  payloadData: PayloadMap<Payloads>;
}

// Do not use generic, pass PayloadTypes directly
export interface TheRequestBodyWithoutGeneric {
  payloadData: PayloadMap<PayloadTypes>;
}

@Route("example")
export class ExampleController extends Controller {
  @Post("with-generic")
  public async withGeneric(
    @Body()
    requestBody: TheRequestBodyWithGeneric<PayloadTypes>
  ) {
    console.log(requestBody);
  }

  @Post("without-generic")
  public async withoutGeneric(
    @Body()
    requestBody: TheRequestBodyWithoutGeneric
  ) {
    console.log(requestBody);
  }
}
