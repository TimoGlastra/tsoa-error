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

// To make this work, remove the `Payloads` generic and pass `PayloadTypes` directly
// to the `PayloadMap` generic type.
export interface TheRequestBody<Payloads extends Payload[]> {
  payloadData: PayloadMap<Payloads>;
}

@Route("example")
export class ExampleController extends Controller {
  @Post()
  public async method(
    @Body()
    requestBody: TheRequestBody<PayloadTypes>
  ) {
    console.log(requestBody);
  }
}
